<template>
  <a :href="getURL()" v-bind="$attrs">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    network: {
      type: String,
      default: "shasta"
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
  },
  methods: {
    getURL() {
      let baseUrl = "https://"
      switch (this.network) {
        case "mainnet":
          baseUrl+= "tronscan.org/#"
          break
        case "shasta":
          baseUrl+= "shasta.tronscan.org/#"
          break
      }

      return [baseUrl, this.type, this.value].join("/")
    }
  }
}
</script>
