import axios from "axios"
import getIdFromUrl from "@/libs/getIdFromUrl"

export default {
  namespaced: true,
  state: {
    count: null,
    page: 1,
    starships: [],
    pageStarships: []
  },
  actions: {
    async getStarships ({commit, state}, pageNumber) {
      const page = pageNumber || state.page
      const {data} = await axios.get("starships", {params: {page}})
      const starships = data.results.map(el => {
        return {...el, id: getIdFromUrl(el.url)}
      })
      commit("SET_STARSHIPS", starships)
      commit("SET_PAGE_STARSHIPS", starships)
      commit("SET_PAGE", page)
      commit("SET_COUNT", data.count)
      return data.results
    },
    async getStarship ({commit, getters}, id) {
      const cachedStarship = getters.getStarship(id)
      if(cachedStarship) return cachedStarship

      const {data} = await axios.get(`starships/${id}`)
      commit("SET_STARSHIPS", [{...data, id}])
      return data
    }
  },
  mutations: {
    SET_PAGE_STARSHIPS (state, payload) {
      state.pageStarships = payload
    },
    SET_STARSHIPS (state, payload) {
      payload.forEach(el => {
        state.starships[el.id] = el
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
    getStarship: state => id => {
      return state.starships[id]
    }
  }
}
