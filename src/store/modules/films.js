import axios from "axios"

export default {
  namespaced: true,
  state: {
    films: []
  },
  actions: {
    async getFilm ({commit, getters}, id) {
      const cachedFilms = getters.getFilm(id)
      if(cachedFilms) return cachedFilms

      const {data} = await axios.get(`films/${id}`)
      commit("SET_FILMS", [{...data, id}])
      return data
    }
  },
  mutations: {
    SET_FILMS (state, payload) {
      payload.forEach(el => {
        state.films[el.id] = el
      })
    }
  },
  getters: {
    getFilm: state => id => {
      return state.films[id]
    }
  }
}
