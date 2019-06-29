import Vue from "vue"
import Notification from "vue-notification"
Vue.use(Notification)

export default function (Vue) {
  Vue.config.errorHandler = vueErrorHandler
  window.addEventListener("error", windowErrorHandler)
  window.addEventListener("unhandledrejection", unhandledRejectionHandler)
}

export function vueErrorHandler (err, vm) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  if (process.env.NODE_ENV !== "production") {
    console.log("vueErrorHandler")
    console.log(arguments)
    console.error(err)
  }
  if (!vm.$el) {
    vm.$once("hook:mounted", () => {
      vm.$nextTick(() => {
        notify(err.message)
      })
    })
  } else {
    notify(err.message)
  }
}

export function windowErrorHandler (errorEvent /*msg, url, line, col, error*/) {
  if (process.env.NODE_ENV !== "production") {
    console.log("windowErrorHandler")
    console.log(arguments)
    console.error(errorEvent)
  }
  notify(errorEvent.error.message)
}

export function unhandledRejectionHandler (event) {
  if (process.env.NODE_ENV !== "production") {
    console.log("unhandledRejectionHandler")
    console.log(arguments)
    console.log(event)
  }
  let errorMsg = ""
  if (event.reason.response) {
    try {
      errorMsg = event.reason.response.data.error
    } catch (e) {
      errorMsg = event.reason.response.statusText
    }
  } else {
    errorMsg = event.reason.message
  }

  notify(errorMsg)
}

function notify (msg, code) {
  let props = {
    title: code ? `Error code: ${code}` : msg,
    text: code ? msg : "",
    type: "error",
    duration: 7000
  }
  Vue.notify(props)
}
