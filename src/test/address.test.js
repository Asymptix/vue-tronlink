import TronWeb from "tronweb"
import TronLink  from "../TronLink"

let tronLink = new TronLink(new TronWeb({
  fullHost: 'https://api.trongrid.io',
}))

const addresses = {
  contractAddress: {
    hex: "0x41f01c85e1529abf2793a031a3a40283bbf3479276",
    base58: "TXroLufzC4WcXWmfTH3awYGJxtx7Hg6YK8"
  }
}

test('useless address conversion', () => {
  expect(() => tronLink.convertAddress(
    addresses.contractAddress.hex, 'hex', 'hex'
  )).toThrow()
})

test('hex --> base58', () => {
  expect(tronLink.convertAddress(
    addresses.contractAddress.hex, 'hex', 'base58'
  )).toBe(
    addresses.contractAddress.base58
  )
})

test('base58 --> hex', () => {
  expect(tronLink.convertAddress(
    addresses.contractAddress.base58, 'base58', 'hex'
  )).toBe(
    addresses.contractAddress.hex
  )
})
