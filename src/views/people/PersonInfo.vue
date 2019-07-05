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
        <template v-if="person.starships && person.starships.length">
          <p v-for="ship in person.starships" :key="ship.id">
            {{ ship.name }}
          </p>
        </template>
        <p v-else>
          None
        </p>
      </div>
    </div>
    <div class="flex">
      <div>Films:</div>
      <div class="mx-2 flex flex-col">
        <template v-if="person.films && person.films.length">
          <p v-for="film in person.films" :key="film.id">
            {{ film.title }}
          </p>
        </template>
        <p v-else>
          None
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex"

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
        await newPerson.resolveRelations()
        this.person = newPerson
      },
      ...mapActions("people", ["getPerson"]),
      ...mapActions("films", ["getFilm"]),
      ...mapActions("starships", ["getStarship"])
    }
  }
</script>

<style lang="scss">
</style>
