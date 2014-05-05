/**
 *    Router
 */
define(function(require) {

    "use strict";


    var Backbone, AppView, Router;

    Backbone = require('backbone');

    AppView = require('components/app/view');

    Router = Backbone.Router.extend({

        app: new AppView(),

        initialize: function initialize() {

            this.app.router = this;

        },

        routes: {
            "": "index",
            "note/:id": "note",
            "settings": "settings"
        },

        index: function index() {
            this.app.render();
        },

        note: function note( id ) {
            this.app.render();
            this.app.notes.trigger( 'note:load', id );
        },

        settings: function settings () {
            alert('Coming soon.');
        }

    });


    // We start a router right away
    return new Router();

});
