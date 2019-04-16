export default class TronLink {

  constructor(tronWeb) {
    this.tronWeb = tronWeb
  }

  isInstalled() {
    return !!this.tronWeb
  }

  isLoggedIn() {
    return this.tronWeb && this.tronWeb.ready
  }

  isUnlocked() {
    return this.isLoggedIn()
  }

  getAccountAddress() {
    return this.tronWeb.defaultAddress.base58
  }

  convertAddress(address, fromFormat, toFormat) {
    switch (toFormat) {
      case 'base58':
        switch (fromFormat) {
          case 'hex':
            if (address.startsWith("0x")) {
              address = address.substr(2)
            }

            return this.tronWeb.address.fromHex(address)
        }
    }
  }

}
