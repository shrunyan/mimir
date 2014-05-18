require.config({
  baseUrl: '..',
  paths: {
    zepto: 'bower_components/zepto/zepto',
    backbone: 'bower_components/backbone/backbone',
    underscore: 'bower_components/lodash/dist/lodash.underscore',
    lodash: 'bower_components/lodash/dist/lodash',
    tmpl: "bower_components/lodash-template-loader/loader",
    snap: "bower_components/snapjs/snap",
    showdown: 'bower_components/showdown/src/showdown',
    components: 'src/modules/components',
    core: 'src/modules/core',
  },
  shim: {
    backbone: {
      exports: 'Backbone',
      deps: ['underscore', 'zepto']
    },
    underscore: {
      exports: '_',
    },
    zepto: {
      exports: '$',
    }
  },
  deps: ['src/mimir', ]
});
