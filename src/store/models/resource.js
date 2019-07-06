import store from "@/store"
import capitalize from "lodash/capitalize"
import StoreResourceModule from "@/store/modules/StoreResourceModule"

export default class ResourceModel {
  constructor (object) {
    for(let key in object) {
      if(object.hasOwnProperty(key)) {
        this[key] = object[key]
      }
    }
    this.resolved = false
  }
  async resolveRelations () {
    const promises = []
    const resources = {...this.aliases}
    StoreResourceModule.resources.forEach(el => {
      resources[el] = el
    })
    Object.entries(resources).forEach(([alias, resource]) => {
      if(this[alias] && this[alias].length > 0) {
        promises.push(store
          .dispatch(`${resource}/resolve${capitalize(resource)}`, this[alias])
          .then(res => {
            this[alias] = res
            this.resolved = true
            return res
          }))
      }
    })
    return Promise.all(promises)
  }
}

ResourceModel.prototype.aliases = {}
