<template>
  <div class="container sm:flex">
    <transition-page v-if="isMobileScreen">
      <sidebar
          :items="pageStarships"
          route-name="starshipInfo"
          :pagination-info="paginationInfo"
          @change-page="getStarships"
          v-if="$route.name === 'starships'"/>
      <router-view v-else class="router-view"/>
    </transition-page>
    <template v-else>
      <sidebar :items="pageStarships" route-name="starshipInfo"/>
      <router-view class="router-view"/>
    </template>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from "vuex"
  import Sidebar from "@/components/Sidebar"
  import TransitionPage from "@/components/TransitionPage"

  const {mapActions, mapState} = createNamespacedHelpers("starships")
  import isMobileScreenMixin from "@/mixins/isMobileScreen"

  export default {
    mixins: [isMobileScreenMixin],
    components: {Sidebar, TransitionPage},
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
      paginationInfo () {
        return {
          page: this.page,
          totalCount: this.count,
          perPage: this.perPage
        }
      },
      ...mapState(["pageStarships", "page", "count", "perPage"])
    }
  }
</script>

<style lang="scss">
</style>
