// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueValidator from 'vue-validator'
import App from './App'
import Room from './components/vue/room'
/* eslint-disable no-new */
Vue.use(VueValidator)
Vue.filter('wrap', function (value) {
  return '{' + value + '}'
})

window.vm = new Vue({
  el: '#app',
  template: '<component v-bind:is="currentView"></component>',
  components: { App, Room },
  data: {
    currentView: 'app'
  }
})
