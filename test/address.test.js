import TronWeb from "tronweb"
import TronLink  from "../src/TronLink"

let tronLink = new TronLink(new TronWeb({
  fullHost: 'https://api.trongrid.io',
}))

const addresses = {
  contractAddress: {
    hex: "0x41f01c85e1529abf2793a031a3a40283bbf3479276",
    base58: "TXroLufzC4WcXWmfTH3awYGJxtx7Hg6YK8",
  }
}

const supportedAddrConversions = {
  hex: ['base58'],
  base58: ['hex'],
}

test('Useless address conversion', () => {
  expect(() => tronLink.convertAddress(
    addresses.contractAddress.hex, 'hex', 'hex'
  )).toThrow()
})

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
