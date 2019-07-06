import capitalize from "lodash/capitalize"
import axios from "axios"
import getIdFromUrl from "@/libs/getIdFromUrl"
import { singular, isPlural, plural } from "pluralize"
import ResourceModel from "@/store/models/resource"


export default class StoreResourceModule {
  constructor (resourceName = "resources") {
    const LOWERCASE_PLURAL = isPlural(resourceName) ?
      resourceName.toLowerCase() : plural(resourceName.toLowerCase())
    const CAPITALIZE_PLURAL = capitalize(LOWERCASE_PLURAL)
    const CAPITALIZE_SINGULAR = singular(CAPITALIZE_PLURAL)
    const UPPERCASE_PLURAL = LOWERCASE_PLURAL.toUpperCase()

    StoreResourceModule.resources.push(LOWERCASE_PLURAL)

    this.namespaced = true
    this.state = {
      count: 0,
      page: 1,
      perPage: 10,
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
        commit("SET_COUNT", parseInt(data.count))
        return state[`page${CAPITALIZE_PLURAL}`]
      },
      [`get${CAPITALIZE_SINGULAR}`]: async ({commit, getters}, id) => {
        const cachedResource = getters[`get${CAPITALIZE_SINGULAR}`](id)
        if (cachedResource) return cachedResource

        const {data} = await axios.get(`${LOWERCASE_PLURAL}/${id}`)
        commit(`SET_${UPPERCASE_PLURAL}`, [{...data, id}])
        return getters[`get${CAPITALIZE_SINGULAR}`](id)
      },
      [`resolve${CAPITALIZE_PLURAL}`]: async ({dispatch}, urls) => {
        const promises = urls.map(url => {
          const id = url instanceof ResourceModel ? url.id : getIdFromUrl(url)
          return dispatch(`get${CAPITALIZE_SINGULAR}`, id)
        })
        return Promise.all(promises)
      }
    }
    this.mutations = {
      [`SET_${UPPERCASE_PLURAL}`]: (state, payload) => {
        payload.forEach(el => {
          state[LOWERCASE_PLURAL][el.id] = new ResourceModel(el)
        })
      },
      [`SET_PAGE_${UPPERCASE_PLURAL}`]: (state, payload) => {
        state[`page${CAPITALIZE_PLURAL}`] = payload.map(el => new ResourceModel(el))
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

StoreResourceModule.resources = []
