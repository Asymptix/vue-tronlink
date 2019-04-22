import TronLink from "../TronLink"

export default {
  data() {
    return {
      tronLink: null,
      tronWeb: null,
    }
  },
  methods: {
    checkTronLink() {
      if (window && window.hasOwnProperty("tronWeb")) {
        this.tronWeb = window.tronWeb
        this.tronLink = new TronLink(this.tronWeb)
        console.log("TronLink is OK!")
      }

      console.log("TronLink is not installed")
    },
  },
  mounted() {
    let _this = this

    setTimeout(function tick() {
      _this.checkTronLink()
      if (!this.tronWeb) {
        setTimeout(tick, 1000)
      }
    }, 0)
  },
}
