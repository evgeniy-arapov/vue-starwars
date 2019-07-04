import capitalize from "lodash/capitalize"
import axios from "axios"
import getIdFromUrl from "../libs/getIdFromUrl"
import { singular, isPlural, plural } from "pluralize"

export default class StoreResourceModule {
  constructor (resourceName = "resources") {
    const LOWERCASE_PLURAL = isPlural(resourceName) ?
      resourceName.toLowerCase() : plural(resourceName.toLowerCase())
    const CAPITALIZE_PLURAL = capitalize(LOWERCASE_PLURAL)
    const CAPITALIZE_SINGULAR = singular(CAPITALIZE_PLURAL)
    const UPPERCASE_PLURAL = LOWERCASE_PLURAL.toUpperCase()

    this.namespaced = true
    this.state = {
      count: null,
      page: 1,
      [LOWERCASE_PLURAL]: {},
      [`page${CAPITALIZE_PLURAL}`]: []
    }
    this.actions = {
      [`get${CAPITALIZE_PLURAL}`]: async ({commit, state}, pageNumber) => {
        const page = pageNumber || state.page
        const {data} = await axios.get(LOWERCASE_PLURAL, {params: {page}})
        const resources = data.results.map(el => {
          return {...el, id: getIdFromUrl(el.url)}
        })
        commit(`SET_${UPPERCASE_PLURAL}`, resources)
        commit(`SET_PAGE_${UPPERCASE_PLURAL}`, resources)
        commit("SET_PAGE", page)
        commit("SET_COUNT", data.count)
        return data.results
      },
      [`get${CAPITALIZE_SINGULAR}`]: async ({commit, getters}, id) => {
        const cachedResource = getters[`get${CAPITALIZE_SINGULAR}`](id)
        if (cachedResource) return cachedResource

        const {data} = await axios.get(`${LOWERCASE_PLURAL}/${id}`)
        commit(`SET_${UPPERCASE_PLURAL}`, [{...data, id}])
        return data
      }
    }
    this.mutations = {
      [`SET_${UPPERCASE_PLURAL}`]: (state, payload) => {
        payload.forEach(el => {
          state[LOWERCASE_PLURAL][el.id] = el
        })
      },
      [`SET_PAGE_${UPPERCASE_PLURAL}`]: (state, payload) => {
        state[`page${CAPITALIZE_PLURAL}`] = payload
      },
      SET_PAGE (state, payload) {
        state.page = payload
      },
      SET_COUNT (state, payload) {
        state.count = payload
      }
    }
    this.getters = {
      [`get${CAPITALIZE_SINGULAR}`]: state => id => {
        return state[LOWERCASE_PLURAL][id]
      }
    }

  }
}
