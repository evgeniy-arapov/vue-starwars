<template>
  <div class="container sm:flex">
    <div :class="[
           'transition-wrapper',
           {'flex-row-reverse': transitionName === 'slide-right'}
         ]"
         v-if="isMobileScreen">
      <transition :name="transitionName">
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
      return {
        transitionName: "slide-left"
      }
    },
    async created () {
      await this.getPeople()
    },
    methods: {
      ...mapActions(["getPeople"])
    },
    computed: {
      ...mapState(["pagePeople"])
    },
    watch: {
      $route (to, from) {
        const toDepth = to.path.split("/").length
        const fromDepth = from.path.split("/").length
        this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left"
      }
    }
  }
</script>

<style scoped lang="scss">

  .transition-wrapper {
    overflow-x: hidden;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    position: relative;

    > * {
      width: 100%;
      min-width: 100%;
    }
  }

  .slide-left {
    &-enter {
      margin-left: 20%;
    }

    &-enter-to {
      margin-left: 20%;
    }

    &-leave {
      margin-left: 0;
    }

    &-leave-to {
      margin-left: -120%;
    }

    &-enter-active, &-leave-active {
      transition: all 0.4s ease;
    }
  }

  .slide-right {
    &-enter {
      margin-right: 20%;
    }

    &-enter-to {
      margin-right: 20%;    }

    &-leave {
      margin-right: 0;    }

    &-leave-to {
      margin-right: -120%;
    }

    &-enter-active, &-leave-active {
      transition: all 0.4s ease;
    }
  }

</style>
