define(function(require) {

    "use strict";


    var Backbone = require('backbone'),
        _ = require('underscore');

    var pubsub = _.extend( {}, Backbone.Events );

    return pubsub;
});
