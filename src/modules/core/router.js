  define(function(require) {

  "use strict";

  var Backbone = require('backbone');
  var AppView = require('components/app/view');
  var app = new AppView();
  
  var Router = Backbone.Router.extend({
    
    routes: {
      "": "index",
      "menu": "menu",
      "note/:id": "note",
    },

    index: function index() { 
      app.render();
    },

    menu: function menu() {
      app.menu();
    },

    note: function note( id ) {
      app.render().childViews.editor.load( id );
    }
    

  });


  // We start a router right away
  return new Router();

});
