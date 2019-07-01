<template>
  <div>
    <div>MGLT: {{ starship.MGLT }}</div>
    <div>Cargo Capacity: {{ starship.cargo_capacity }}</div>
    <div>Consumables: {{ starship.consumables }}</div>
    <div>Cost in credits: {{ starship.cost_in_credits }}</div>
    <div>Crew: {{ starship.crew }}</div>
    <div>Hyperdrive rating: {{ starship.hyperdrive_rating }}</div>
    <div>Length: {{ starship.length }}</div>
    <div>Manufacturer: {{ starship.manufacturer }}</div>
    <div>Max atmosphering speed: {{ starship.max_atmosphering_speed }}</div>
    <div>Model: {{ starship.model }}</div>
    <div>Passengers: {{ starship.passengers }}</div>
    <div>Starship class: {{ starship.starship_class }}</div>
    <div class="flex">
      <div>Pilots:</div>
      <div class="mx-2 flex flex-col">
        <template v-if="starship.resolvedPeople && starship.resolvedPeople.length">
          <p v-for="pilot in starship.resolvedPeople" :key="pilot.id">
            {{ pilot.name }}
          </p>
        </template>
        <p v-else>
          Unknown
        </p>
      </div>
    </div>
    <div class="flex">
      <div>Films:</div>
      <div class="mx-2 flex flex-col">
        <template v-if="starship.resolvedFilms && starship.resolvedFilms.length">
          <p v-for="film in starship.resolvedFilms" :key="film.id">
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
  import getIdFromUrl from "@/libs/getIdFromUrl"

  export default {
    data () {
      return {
        starship: {}
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
        const newStarship = await this.getStarship(this.$route.params.id)
        newStarship.resolvedPeople = await this.resolvePeople(newStarship.pilots)
        newStarship.resolvedFilms = await this.resolveFilms(newStarship.films)
        this.starship = newStarship
      },
      async resolvePeople (peopleUrls) {
        const promises = peopleUrls.map(url => this.getPerson(getIdFromUrl(url)))
        return Promise.all(promises)
      },
      async resolveFilms (filmsUrls) {
        const promises = filmsUrls.map(url => this.getFilm(getIdFromUrl(url)))
        return Promise.all(promises)
      },
      ...mapActions("people", ["getPerson"]),
      ...mapActions("films", ["getFilm"]),
      ...mapActions("starships", ["getStarship"])
    }
  }
</script>

<style lang="scss">
</style>
