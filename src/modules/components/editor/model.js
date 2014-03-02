/**
 *	Editor Model
 */
define(function(require) {

	"use strict";

	var Backbone = require('backbone');
	var Model = Backbone.Model.extend({
		defaults: {
			'title': 'editor'
		}
	});


	return Model;

});
