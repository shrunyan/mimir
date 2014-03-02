/**
 * Mímir
 * @author Stuart Runyan
 *
 * @tutorial ["http://backbonejs.org/docs/todos.html", "http://tutorialzine.com/2013/04/services-chooser-backbone-js/"]
 *
 * @required "http://backbonejs.org"
 * @required "https://www.dropbox.com/developers/dropins"
 *
 */

define(function(require) {

    "use strict";

    var Backbone = require('backbone');
    var $ = require('zepto');

    require('core/router');

    Backbone.history.start({
        pushState: true,
        root: "/"
    });

    $('.javascript-off').hide();


    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    // No bypass: "a[href^='#']:not([data-bypass])", 
    /*$(document).on("click", function(evt) {

        // Prevent the default event (including page refresh).
        evt.preventDefault();

        // `Backbone.history.navigate` is sufficient for all Routers and will
        // trigger the correct events. The Router's internal `navigate` method
        // calls this anyways. The fragment is sliced from the root.
        var href = $(evt.target).attr("href");
        Backbone.history.navigate(href, true);
    });*/

});
