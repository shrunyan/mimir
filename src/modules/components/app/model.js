/**
 *	App Main Model
 */
 define(function(require) {

	var Backbone = require('backbone');
	var Model = Backbone.Model.extend({
		defaults: {
			'title': 'Mímir'
		}
	});

	return Model;

});