import Vue from "vue"
import Vuex from "vuex"
//import axios from "axios"

import people from "@/store/modules/people"
import starships from "@/store/modules/starships"
import films from "@/store/modules/films"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {

  },
  mutations: {
    NEW_MUTATION (/*state, payload*/) {

    }
  },
  actions: {
    async newMutation (/*{commit, dispatch, state}, payload*/) {

    }
  },
  getters: {
    newGetter (/*state*/) {

    }
  },
  modules: {
    people,
    starships,
    films
  },
  plugins: []
})
