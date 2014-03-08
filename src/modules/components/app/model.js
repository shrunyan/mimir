/**
 *	App Main Model
 */
 define(function( require ) {

    "use strict";


    var Backbone, Model;

    Backbone = require('backbone');

    Model = Backbone.Model.extend({

        defaults: {
            'title': 'Mímir'
        }

    });

    return Model;

});
