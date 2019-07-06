<template>
  <div class="navigations flex">
    <div class="btn" @click="$emit('change-page', previousPage)" v-if="previousPage">
      &lang;
    </div>
    <div class="current-page">
      {{ page }} {{ totalPages ? "from " + totalPages: "" }}
    </div>
    <div class="btn" @click="$emit('change-page', nextPage)" v-if="nextPage">
      &rang;
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      totalCount: {
        type: Number,
        default: null
      },
      page: {
        type: Number,
        default: null
      },
      perPage: {
        type: Number,
        default: null
      }
    },
    data () {
      return {}
    },
    computed: {
      previousPage () {
        return this.page < 1 ? null : this.page - 1
      },
      nextPage () {
        return this.page >= this.totalPages ? null : this.page + 1
      },
      totalPages () {
        return Math.ceil(this.totalCount / this.perPage)
      }
    }
  }
</script>

<style lang="scss">
  .navigations {
    > * {
      @apply border px-2 py-1 mr-1 my-2;
    }

    .btn {
      cursor: pointer;
    }
  }
</style>
