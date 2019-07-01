<template>
  <div class="container flex">
    <sidebar :items="pagePeople" route-name="personInfo"/>
    <router-view/>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from "vuex"
  import Sidebar from "@/components/Sidebar"

  const {mapActions, mapState} = createNamespacedHelpers("people")

  export default {
    components: {Sidebar},
    data () {
      return {}
    },
    async created () {
      await this.getPeople()
    },
    methods: {
      ...mapActions(["getPeople"])
    },
    computed: {
      ...mapState(["pagePeople"])
    }
  }
</script>

<style lang="scss">
</style>
