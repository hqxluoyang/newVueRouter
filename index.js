// warning: vue-router requires Vue 0.12.10+
import Vue from 'vue'
import VueRouter from './src'
import { configRouter } from './route-config'
import $ from 'jquery'
import main from './services/main'
import Material from 'vue-material'; 
window.$ = $;

//import channel from './services/channelControl'

//channel.setChannel()

//console.log("channel:" , channel);

require('es6-promise').polyfill()

// install router
Vue.use(VueRouter)

// create router
const router = new VueRouter({
  history: true,
  saveScrollPosition: true
})
// configure router
configRouter(router)

// boostrap the app
const App = Vue.extend(require('./app.vue'))
router.start(App, '#app')

// just for debugging
window.router = router
Material.regAll(Vue);
//Material.reg(Vue , ['buttons' , 'cards'])
main.start();
console.log("services.channelurl:" , services.channelurl , services)

