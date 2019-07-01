import axios from "axios"
import getIdFromUrl from "@/libs/getIdFromUrl"

export default {
  namespaced: true,
  state: {
    count: null,
    page: 1,
    people: [],
    pagePeople: []
  },
  actions: {
    async getPeople ({commit, state}, pageNumber) {
      const page = pageNumber || state.page
      const {data} = await axios.get("people", {params: {page}})
      const people = data.results.map(el => {
        return {...el, id: getIdFromUrl(el.url)}
      })
      commit("SET_PEOPLE", people)
      commit("SET_PAGE_PEOPLE", people)
      commit("SET_PAGE", page)
      commit("SET_COUNT", data.count)
      return data.results
    },
    async getPerson ({commit, getters}, id) {
      const cachedPerson = getters.getPerson(id)
      if(cachedPerson) return cachedPerson

      const {data} = await axios.get(`people/${id}`)
      commit("SET_PEOPLE", [{...data, id}])
      return data
    }
  },
  mutations: {
    SET_PAGE_PEOPLE (state, payload) {
      state.pagePeople = payload
    },
    SET_PEOPLE (state, payload) {
      payload.forEach(el => {
        state.people[el.id] = el
      })
    },
    SET_PAGE (state, payload) {
      state.page = payload
    },
    SET_COUNT (state, payload) {
      state.count = payload
    }
  },
  getters: {
    getPerson: state => id => {
      return state.people[id]
    }
  }
}
