<template>
  <header>
    <div class="container">
      <div class="head">
        <div class="head-top">
          <div class="brand">
            <router-link to="/">
              <h1>
                Star Wars
              </h1>
            </router-link>
          </div>
          <div
              :class="[
                'hamburger',
                'hamburger--elastic',
                'sm:hidden',
                { 'is-active': isMenuOpen }
              ]"
              @click="isMenuOpen = !isMenuOpen">
            <div class="hamburger-box">
              <div class="hamburger-inner"></div>
            </div>
          </div>
        </div>
        <div class="head-bottom">
          <transition name="slide-fade">
            <nav v-if="isMenuShow">
              <router-link to="people">
                People
              </router-link>
              <router-link to="starships">
                Starships
              </router-link>
            </nav>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import tailwindConfig from "@/../tailwind.config"

  export default {
    data () {
      return {
        isMenuOpen: false,
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
      isMenuShow () {
        return this.documentWidth >= parseInt(tailwindConfig.theme.screens.sm) || this.isMenuOpen
      }
    },
    beforeDestroy () {
      window.removeEventListener("resize", this.onResize)
    }
  }
</script>

<style lang="scss">
  $hamburger-padding-x: 15px !default;
  $hamburger-padding-y: 15px !default;
  $hamburger-layer-width: 40px !default;
  $hamburger-layer-height: 4px !default;
  $hamburger-layer-spacing: 6px !default;
  $hamburger-layer-color: #000 !default;
  $hamburger-layer-border-radius: 4px !default;
  $hamburger-hover-opacity: 0.7 !default;
  $hamburger-active-layer-color: $hamburger-layer-color !default;
  $hamburger-active-hover-opacity: $hamburger-hover-opacity !default;

  // To use CSS filters as the hover effect instead of opacity,
  // set $hamburger-hover-use-filter as true and
  // change the value of $hamburger-hover-filter accordingly.
  $hamburger-hover-use-filter: false !default;
  $hamburger-hover-filter: opacity(50%) !default;
  $hamburger-active-hover-filter: $hamburger-hover-filter !default;
  @import "~hamburgers/_sass/hamburgers/hamburgers";

  .head {
    @screen sm {
      display: flex;
      padding-top: 8px;
      justify-content: space-between;
      align-items: center;
    }
  }

  .head-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      @apply text-4xl;
    }
  }

  .head-bottom {
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    nav {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      @apply text-xl;

      a {
        margin-bottom: 10px;
      }
    }

    @screen sm {
      display: block;
      nav {
        flex-direction: row;
        a {
          margin-bottom: 0;
          margin-left: 10px;
        }
      }
    }
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    /*transform: translateY(-110px);*/
    margin-top: -100px;
    opacity: 0;
  }
</style>
