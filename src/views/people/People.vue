<template>
  <div class="container sm:flex">
    <transition-page v-if="isMobileScreen">
      <sidebar
          :items="pagePeople"
          route-name="personInfo"
          :pagination-info="paginationInfo"
          @change-page="getPeople"
          v-if="$route.name === 'people'"/>
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
      paginationInfo () {
        return {
          page: this.page,
          totalCount: this.count,
          perPage: this.perPage
        }
      },
      ...mapState(["pagePeople", "page", "count", "perPage"])
    }
  }
</script>

<style scoped lang="scss"></style>
