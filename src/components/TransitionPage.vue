<template>
  <div :class="['transition-wrapper', transitionName]">
    <transition :name="transitionName">
      <slot></slot>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      toChild: {
        type: String,
        default: "slide-left"
      },
      toParent: {
        type: String,
        default: "slide-right"
      }
    },
    data () {
      return {
        transitionName: null
      }
    },
    watch: {
      $route: {
        handler (to, from) {
          if(!from) return false
          const toDepth = to.path.split("/").length
          const fromDepth = from.path.split("/").length
          this.transitionName = toDepth < fromDepth ? this.toParent : this.toChild
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss">
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
    flex-direction: row-reverse;

    &-enter {
      margin-right: 20%;
    }

    &-enter-to {
      margin-right: 20%;
    }

    &-leave {
      margin-right: 0;
    }

    &-leave-to {
      margin-right: -120%;
    }

    &-enter-active, &-leave-active {
      transition: all 0.4s ease;
    }
  }
</style>
