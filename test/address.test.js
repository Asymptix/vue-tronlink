import TronWeb from "tronweb"
import TronLink  from "../src/TronLink"

let tronLink = new TronLink(new TronWeb({
  fullHost: 'https://api.trongrid.io',
}))

const addresses = {
  contract: {
    hex: "0x41f01c85e1529abf2793a031a3a40283bbf3479276",
    base58: "TXroLufzC4WcXWmfTH3awYGJxtx7Hg6YK8",
    tron: "TXroLufzC4WcXWmfTH3awYGJxtx7Hg6YK8",
    trx: "TXroLufzC4WcXWmfTH3awYGJxtx7Hg6YK8",
  },
  address: {
    hex: "0x415f7e38d7a9a0feb60fd49b4102b1251e75dbc8a9",
    base58: "TJg8QLua4ULPWsiHpAa8KLXDaBeTd87M3R",
    tron: "TJg8QLua4ULPWsiHpAa8KLXDaBeTd87M3R",
    trx: "TJg8QLua4ULPWsiHpAa8KLXDaBeTd87M3R",
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
      addresses.contract.hex, format, format
    )).toThrow()
  })
}

for (let fromFormat in supportedAddrConversions) {
  for (let toFormat of supportedAddrConversions[fromFormat])
  test(`Conversion: ${fromFormat} --> ${toFormat}`, () => {
    for (let key in addresses) {
      expect(tronLink.convertAddress(
        addresses[key][fromFormat], fromFormat, toFormat
      )).toBe(
        addresses[key][toFormat]
      )
    }
  })
}

// Invalid address format tests
test(`Invalid input format`, () => {
  expect(() => tronLink.convertAddress(
    addresses.contract.hex, 'test', 'hex'
  )).toThrow()
})

test(`Invalid output format`, () => {
  expect(() => tronLink.convertAddress(
    addresses.contract.hex, 'hex', 'test'
  )).toThrow()
})

test(`Invalid both formats`, () => {
  expect(() => tronLink.convertAddress(
    addresses.contract.hex, 'test1', 'test2'
  )).toThrow()
})

// Invalid address value tests
for (let addr of ["0x1234567890abcdef", "Test", "Hello World!", "", null, 0, 0x0, -1, new Object]) {
  test(`Invalid input HEX addresses: ${addr}`, () => {
    expect(() => tronLink.convertAddress(
      addr, 'hex', 'base58'
    )).toThrow()
  })
}
