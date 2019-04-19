/**
 * TronLink extension interaction functionality
 */
export default class TronLink {

  /**
   * Initiates TronLink support object.
   * 
   * @param {Object} tronWeb tronWeb entity object
   *           (details: https://github.com/tronprotocol/tron-web)
   */
  constructor(tronWeb) {
    this.tronWeb = tronWeb
  }

  /**
   * Checks if TronLink browser extension is installed
   */
  isInstalled() {
    return !!this.tronWeb
  }

  /**
   * Checks if user is logged in to the TronLink plugin
   */
  isLoggedIn() {
    return this.tronWeb && this.tronWeb.ready
  }

  /**
   * Checks if user is logged in to the TronLink plugin.
   * Alias for isLoggedIn() method.
   */
  isUnlocked() {
    return this.isLoggedIn()
  }

  /**
   * Returns logged in user Tron address
   */
  getAccountAddress() {
    return this.tronWeb.defaultAddress.base58
  }

  /**
   * Converts Tron address from one format to another.
   * 
   * @param {String, Number} address Address to convert
   * @param {String} fromFormat From format string
   * @param {String} toFormat To format string
   */
  convertAddress(address, fromFormat, toFormat) {
    if (fromFormat == toFormat) {
      throw "From and To address formats are equal"
    }

    switch (toFormat) {
      case 'hex':
        switch (fromFormat) {
          case 'base58':
          case 'tron':
          case 'trx':
            return "0x" + this.tronWeb.address.toHex(address)
        }
        break
      case 'base58':
      case 'tron':
      case 'trx':
        switch (fromFormat) {
          case 'hex':
            if (address.startsWith("0x")) {
              address = address.substr(2)
            }

            return this.tronWeb.address.fromHex(address)
        }
        break
    }

    throw "Invalid address formats"
  }

}
