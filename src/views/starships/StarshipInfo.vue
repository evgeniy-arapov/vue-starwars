<template>
  <div>
    <BackBtn v-if="isMobileScreen"/>
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
        <template v-if="starship.pilots && starship.pilots.length">
          <p v-for="pilot in starship.pilots" :key="pilot.id">
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
        <template v-if="starship.films && starship.films.length">
          <p v-for="film in starship.films" :key="film.id">
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
  import BackBtn from "@/components/ui/BackBtn"
  import isMobileScreenMixin from "@/mixins/isMobileScreen"

  export default {
    components: {BackBtn},
    mixins: [isMobileScreenMixin],
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
        await newStarship.resolveRelations()
        this.starship = newStarship
      },
      ...mapActions("people", ["getPerson", "resolvePeople"]),
      ...mapActions("films", ["getFilm", "resolveFilms"]),
      ...mapActions("starships", ["getStarship"])
    }
  }
</script>

<style lang="scss">
</style>
