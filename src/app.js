require('./app.styl');

var Promise = require('bluebird');
var Vue = require('vue');
var VueRouter = require('vue-router');  

Promise.config({
  cancellation: true
});

Vue.use(VueRouter);

require('./comp/icon');
require('./comp/page/style.styl');
require('./comp/header/style.styl');
require('./comp/cell/style.styl');

var App = Vue.extend({
  methods: {
    logout: function () {
      this.$router.go({ name: 'index' });
    }
  },
  template: require('html!./app.html')
});

var router = new VueRouter({
  hashbang: false,
  history: true
});

router
  .map({
    '/index': {
      name: 'index',
      component: loadView('index')
    }
  })
  .redirect({
    '*':'/index'
  })
  .start(App, '#hb-app');

function loadView(name) {
  return function (resolve) {
    require('bundle!./page/'+name+'/index')(function (module) {
      resolve(module);
    });
  }
}
