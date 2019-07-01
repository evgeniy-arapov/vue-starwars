<template>
  <div>
    <div>Name: {{ person.name }}</div>
    <div>Birth year: {{ person.birth_year }}</div>
    <div>Eye Color: {{ person.eye_color }}</div>
    <div>Gender: {{ person.gender }}</div>
    <div>Hair Color: {{ person.hair_color }}</div>
    <div>Height: {{ person.height }}</div>
    <div>Mass: {{ person.mass }}</div>
    <div>Skin Color: {{ person.skin_color }}</div>
    <div class="flex">
      <div>Starships:</div>
      <div class="mx-2 flex flex-col">
        <template v-if="person.resolvedStarships && person.resolvedStarships.length">
          <p v-for="ship in person.resolvedStarships" :key="ship.id">
            {{ ship.name }}
          </p>
        </template>
        <p v-else>
          None
        </p>
      </div>
    </div>
    <div>Films: {{ person.films }}</div>
  </div>
</template>

<script>
  import { mapActions } from "vuex"
  import getIdFromUrl from "@/libs/getIdFromUrl"

  export default {
    data () {
      return {
        person: {}
      }
    },
    async created () {
      await this.fetchData()
    },
    watch: {
      "$route": "fetchData"
    },
    methods: {
      async fetchData () {
        const newPerson = await this.getPerson(this.$route.params.id)
        newPerson.resolvedStarships = await this.resolveStarships(newPerson.starships)
        this.person = newPerson
      },
      async resolveStarships (starshipsUrls) {
        const promises = starshipsUrls.map(url => this.getStarship(getIdFromUrl(url)))
        return Promise.all(promises)
      },
      ...mapActions("people", ["getPerson"]),
      ...mapActions("starships", ["getStarship"])
    }
  }
</script>

<style lang="scss">
</style>
