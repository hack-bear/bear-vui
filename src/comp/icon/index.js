var Vue = require('vue');

var ICONS = [
  'back',
  'right',
  'home'
];

ICONS.forEach(function (filename) {
  Vue.component('icon-'+filename, {
    template: '<i class="svg-icon icon-'+filename+'">'+require('raw!./svg/'+filename+'.svg')+'</i>'
  });
});
