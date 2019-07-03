<template>
  <div class="container sm:flex">
    <div class="transition-wrapper relative" v-if="isMobileScreen">
      <transition name="slide-left">
        <sidebar :items="pagePeople" route-name="personInfo" v-if="$route.name === 'people'"/>
        <router-view v-else class="router-view"/>
      </transition>
    </div>
    <template v-else>
      <sidebar :items="pagePeople" route-name="personInfo"/>
      <router-view class="router-view"/>
    </template>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from "vuex"
  import Sidebar from "@/components/Sidebar"

  const {mapActions, mapState} = createNamespacedHelpers("people")
  import isMobileScreenMixin from "@/mixins/isMobileScreen"

  export default {
    mixins: [isMobileScreenMixin],
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

<style scoped lang="scss">

  .transition-wrapper {
    overflow-x: hidden;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;

    > * {
      width: 100%;
      min-width: 100%;
    }
  }

  .slide-left-enter {
    margin-left: 20%;
  }
  .slide-left-enter-to {
    margin-left: 20%;
  }
  .slide-left-leave {
    margin-left: 0;
  }
  .slide-left-leave-to {
    margin-left: -120%;
  }

  .slide-left-enter-active, .slide-left-leave-active {
    transition: all 0.4s ease;
  }

</style>
