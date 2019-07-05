<template>
  <router-link tag="button" :to="path">
    &larr; Back
  </router-link>
</template>

<script>
  export default {
    data () {
      return {
        path: "/"
      }
    },
    created () {
      const parent = this.$route.matched[this.$route.matched.length-1].parent
      this.path = parent && parent.path || "/"
    }
  }
</script>

<style scoped>
  button {
    @apply bg-blue-100 text-xl px-6 py-2 rounded mb-8;
  }
</style>
