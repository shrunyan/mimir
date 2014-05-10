/**
 *    Note Model
 */
define(function(require) {

    "use strict";


    var Backbone = require('backbone');
    var Model = Backbone.Model.extend({

		defaults: {
			id: 0,
			title: 'New Note',
			note: 'You have created a new note.'
		}

	});

	return Model;

});
