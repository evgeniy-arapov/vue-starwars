<template>
  <div class="sidebar">
    <router-link class="item"
                 v-for="item in items"
                 :key="item.id"
                 :to="{name: routeName, params: {id: item.id}}">
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
      },
      routeName : {
        type: String,
        required: true
      }
    },
    data () {
      return {}
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
