<template>
  <div class="sidebar">
    <router-link class="item"
                 v-for="item in items"
                 :key="item.id"
                 :to="{name: 'personInfo', params: {id: item.id}}">
      {{ item.name }}
    </router-link>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {}
    },
    methods: {
      getIdFromUrl (url) {
        const urlArr = url.split("/")
        console.log(urlArr)
        return urlArr[urlArr.length - 2]
      }
    }
  }
</script>

<style lang="scss">
  .sidebar {
    .item {
      display: block;

      &.router-link-active {
        @apply bg-gray-200;
      }
    }
  }
</style>
