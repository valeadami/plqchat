import Vue from 'vue'
import App from './components/App.vue'
import Axios from 'axios'
import Utf8 from 'utf8'
import http from 'http'
import https from 'https'
import querystring from 'querystring'
import Chat from 'vue-beautiful-chat'
//import VueSessionStorage from 'vue-sessionstorage'


//
import Router from 'vue-router'
Vue.use(Chat);
//Vue.use(VueSessionStorage)
//
Vue.use(Router)
//Vue.use(Axios);
Vue.prototype.$http = Axios
Vue.prototype.$utf8 = Utf8
Vue.prototype.$myhttp = http
Vue.prototype.$myhttps = https
Vue.prototype.$querystring = querystring

import {Launcher} from 'vue-beautiful-chat'

Vue.config.productionTip = false

//inserito qui per router
const router=new Router({
  routes: [
       {
      path: '/?ava=pippo&msg=zzzstart',
      name: 'home',
      component: App,
      props: (route) => ({
        ava: route.query.ava,
        msg: (typeof route.query.msg!=='undefined') ? route.query.msg:'prova'
       
      
    })
    },
   
  ]
})
//
var vm=new Vue({
  el: '#app',
  //inserito
  router,
  render: h => h(App)
  
})
