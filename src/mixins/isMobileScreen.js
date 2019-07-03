import tailwindConfig from "@/../tailwind.config"

export default {
  data () {
    return {
      documentWidth: null
    }
  },
  created() {
    this.onResize()
  },
  mounted () {
    window.addEventListener("resize", this.onResize)
  },
  methods: {
    onResize () {
      this.documentWidth = document.documentElement.clientWidth
    }
  },
  computed: {
    isMobileScreen () {
      return this.documentWidth < parseInt(tailwindConfig.theme.screens.sm)
    }
  },
  beforeDestroy () {
    window.removeEventListener("resize", this.onResize)
  }
}
