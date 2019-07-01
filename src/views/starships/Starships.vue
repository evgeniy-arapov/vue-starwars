<template>
  <div class="container flex">
    <sidebar :items="pageStarships" route-name="starshipInfo"/>
    <router-view/>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from "vuex"
  import Sidebar from "@/components/Sidebar"

  const {mapActions, mapState} = createNamespacedHelpers("starships")

  export default {
    components: {Sidebar},
    data () {
      return {}
    },
    async created () {
      await this.getStarships()
    },
    methods: {
      ...mapActions(["getStarships"])
    },
    computed: {
      ...mapState(["pageStarships"])
    }
  }
</script>

<style lang="scss">
</style>
