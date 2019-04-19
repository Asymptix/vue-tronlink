import TronWeb from "tronweb"
import TronLink  from "../src/TronLink"

let tronLink = new TronLink(new TronWeb({
  fullHost: 'https://api.trongrid.io',
}))

const addresses = {
  contractAddress: {
    hex: "0x41f01c85e1529abf2793a031a3a40283bbf3479276",
    base58: "TXroLufzC4WcXWmfTH3awYGJxtx7Hg6YK8",
    tron: "TXroLufzC4WcXWmfTH3awYGJxtx7Hg6YK8",
    trx: "TXroLufzC4WcXWmfTH3awYGJxtx7Hg6YK8",
  }
}

const supportedAddrConversions = {
  hex: ['base58', 'tron', 'trx'],
  base58: ['hex'],
  tron: ['hex'],
  trx: ['hex'],
}

for (let format in supportedAddrConversions) {
  test(`Useless conversion: ${format} --> ${format}`, () => {
    expect(() => tronLink.convertAddress(
      addresses.contractAddress.hex, format, format
    )).toThrow()
  })
}

for (let fromFormat in supportedAddrConversions) {
  for (let toFormat of supportedAddrConversions[fromFormat])
  test(`Conversion: ${fromFormat} --> ${toFormat}`, () => {
    expect(tronLink.convertAddress(
      addresses.contractAddress[fromFormat], fromFormat, toFormat
    )).toBe(
      addresses.contractAddress[toFormat]
    )
  })
}

// Invalid address format tests
test(`Invalid input format`, () => {
  expect(() => tronLink.convertAddress(
    addresses.contractAddress.hex, 'test', 'hex'
  )).toThrow()
})

test(`Invalid output format`, () => {
  expect(() => tronLink.convertAddress(
    addresses.contractAddress.hex, 'hex', 'test'
  )).toThrow()
})

test(`Invalid both formats`, () => {
  expect(() => tronLink.convertAddress(
    addresses.contractAddress.hex, 'test1', 'test2'
  )).toThrow()
})
