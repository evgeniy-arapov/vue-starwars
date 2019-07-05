import Vue from "vue"
import Vuex from "vuex"

import people from "@/store/modules/people"
import starships from "@/store/modules/starships"
import films from "@/store/modules/films"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {

  },
  modules: {
    people,
    starships,
    films
  }
})
