// import jQuery from 'jquery';
// if(process.client){
//     window.$ = window.jQuery = jQuery;
// }
// export default {};


// Example of a Vue.js plugin (jquery.js)
// import Vue from 'vue'
// import $ from 'jquery'

// Vue.prototype.$jquery = $


// import { defineNuxtPlugin } from 'nuxt3'
// import $ from 'jquery'
// export default defineNuxtPlugin(({ app }) => {
//   // Import jQuery and make it available on the Vue instance
  
//   app.config.globalProperties.$jquery = $
// })
import jQuery from 'jquery';
export default defineNuxtPlugin(() => {
    if(process.client){
        window.$ = window.jQuery = jQuery;
    }
})