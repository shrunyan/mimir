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
      console.log('Navigate to "/menu"', this);
      app.menu();
    },

    note: function note( id ) {
      console.log('Navigate to "/note"', this, id);
      //app.render();
    }
    

  });


  // We start a router right away
  return new Router();

});
