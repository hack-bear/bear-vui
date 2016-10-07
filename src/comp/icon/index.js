var Vue = require('vue');

var ICONS = [
  'back',
  'right',
  'home'
];

ICONS.forEach(function (filename) {
  Vue.component('icon-'+filename, {
    props: {
      width: {
        type: Number,
        default: 16
      },
      height: {
        type: Number,
        default: 16
      }
    },
    template: '<i class="svg-icon icon-'+filename+'">'+require('raw!./svg/'+filename+'.svg').replace('<svg', '<svg :width="width" :height=height')+'</i>'
  });
});
