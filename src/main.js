// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
// import VueFire from 'vuefire'
import VueRouter from 'vue-router'

import MakeLink from './components/MakeLink'
import ViewLink from './components/ViewLink'
import App from './App'
import Firebase from 'firebase'

// Vue.use(VueFire)
Vue.use(VueRouter)

let config = {
  apiKey: 'AIzaSyApIrAspdVpN3lhH9W1RGrLJEzIVS9mEaQ',
  authDomain: 'shutupandbuyit-a2731.firebaseapp.com',
  databaseURL: 'https://shutupandbuyit-a2731.firebaseio.com',
  projectId: 'shutupandbuyit-a2731',
  storageBucket: 'shutupandbuyit-a2731.appspot.com',
  messagingSenderId: '173424466260'
}

// Here we are initializing the Firebase connection.
let app = Firebase.initializeApp(config)
let db = app.database()
window.firebaseDB = db.ref('suabiLinks')

const routes = [
  { path: '/p/:id', component: ViewLink },
  { path: '/', component: MakeLink },
  { path: '*', component: { template: '<div>Not found</div>' } }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
