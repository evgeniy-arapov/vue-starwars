<template>
  <div class="sidebar">
    <pagination v-bind="paginationInfo" @change-page="$emit('change-page', $event)"/>
    <router-link class="item"
                 v-for="item in items"
                 :key="item.id"
                 :to="{name: routeName, params: {id: item.id}}">
      {{ item.name }}
    </router-link>
    <pagination v-bind="paginationInfo"/>
  </div>
</template>

<script>
  import Pagination from "@/components/Pagination"

  export default {
    components: {Pagination},
    props: {
      paginationInfo: {
        type: Object,
        default: () => ({})
      },
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
