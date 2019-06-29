<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
    <notifications/>
  </div>
</template>

<script>
  import Header from "@/components/layout/Header"
  import Footer from "@/components/layout/Footer"

  export default {
    components: {Footer, Header}
  }
</script>

<style lang="scss">
  @import "~tailwindcss/base";
  @import "~tailwindcss/components";
  @import "~tailwindcss/utilities";

  html {
    /** NOTE: set rem
    */
    font-size: 14px;
  }

  body {
    @apply bg-gray-100 text-black;
    font-family: sans-serif;
    font-size: 14px;
  }

  #app {
    position: relative;
    height: 100vh;
  }

  a {
    background-color: transparent;
  }

  img {
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
  }

  input:focus {
    outline: none;
    box-shadow: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin-bottom: 10px;
  }

  h1 {
    margin: 0.67em 0;
  }

  hr {
    border-top: 1px solid #D8D8D8;
    height: 1px;
  }

  .notifications {
    top: 5px !important;
    right: 0 !important;

    @media (max-width: 576px) {
      width: 100% !important;
    }

    @screen sm {
      top: 15px !important;
      right: 10px !important;
    }

    .notification-title {
      font-weight: normal;
      font-size: 13px;
    }
  }

</style>
