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
    StoreResourceModule.resources.forEach(resource => {
      if(this[resource] && this[resource].length > 0) {
        promises.push(store
          .dispatch(`${resource}/resolve${capitalize(resource)}`, this[resource])
          .then(res => {
            this[resource] = res
            this.resolved = true
            return res
          }))
      }
    })
    return Promise.all(promises)
  }
}
