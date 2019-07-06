<template>
  <div class="container sm:flex">
    <transition-page v-if="isMobileScreen">
      <sidebar :items="pagePeople" route-name="personInfo" v-if="$route.name === 'people'"/>
      <router-view v-else class="router-view"/>
    </transition-page>
    <template v-else>
      <sidebar :items="pagePeople" route-name="personInfo"/>
      <router-view class="router-view"/>
    </template>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from "vuex"
  import Sidebar from "@/components/Sidebar"
  import TransitionPage from "@/components/TransitionPage"

  const {mapActions, mapState} = createNamespacedHelpers("people")
  import isMobileScreenMixin from "@/mixins/isMobileScreen"

  export default {
    mixins: [isMobileScreenMixin],
    components: {Sidebar, TransitionPage},
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

<style scoped lang="scss"></style>
