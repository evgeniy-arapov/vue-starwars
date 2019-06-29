import Vue from "vue"
import Vuex from "vuex"
//import axios from "axios"

import newModule from "@/store/modules/newModule"

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
    newModule
  },
  plugins: []
})
