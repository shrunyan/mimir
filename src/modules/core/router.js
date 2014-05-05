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
            "settings": "settings",
            "/*": "error404"
        },

        index: function index() {
            this.app.render();
        },

        note: function note( id ) {

            //TODO: Figure out a place to check if note id exists,
            // otherwise 404

            this.app.render();
            this.app.notes.trigger( 'note:load', id );
        },

        settings: function settings () {
            alert('Coming soon.');
        },

        error404: function error404 () {
            alert('Note not found');
        }

    });


    // We start a router right away
    return new Router();

});
