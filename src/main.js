import Vue from "vue"
import App from "@/App"
import router from "@/router"
import store from "@/store"
import axios from "axios"
import config from "@/config"
import Notification from "vue-notification"
import errorHandlers from "@/libs/errorHandlers"

Vue.use(Notification)
Vue.use(errorHandlers)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  async created () {
    axios.defaults.baseURL = config.baseApiUrl
  }
}).$mount("#app")
