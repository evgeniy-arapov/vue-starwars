import Vue from "vue"
import Router from "vue-router"
import Home from "@/views/Home"
import FourOhFour from "@/views/FourOhFour"
import People from "@/views/people/People.vue"
import PersonInfo from "@/views/people/PersonInfo.vue"
import Starships from "@/views/starships/Starships.vue"
import StarshipInfo from "@/views/starships/StarshipInfo.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/people",
      name: "people",
      component: People,
      children: [
        {
          path: ":id",
          name: "personInfo",
          component: PersonInfo
        }
      ]
    },
    {
      path: "/starships",
      name: "starships",
      component: Starships,
      children: [
        {
          path: ":id",
          name: "starshipInfo",
          component: StarshipInfo
        }
      ]
    },
    {
      path: "*",
      name: "404",
      component: FourOhFour
    }
  ]
})
