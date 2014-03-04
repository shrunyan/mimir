/**
 *	Note View
 */
define(function(require) {

	var Backbone = require('backbone');
	var View = Backbone.View.extend({

		tagName: 'li',

		template: require('tmpl!./template'),

		render: function render() {
			console.log('Note:render', this);

			this.$el.data( 'id', this.model.id );
			this.$el.html( $( this.template( this.model.toJSON() )));

			return this;
		},

		/*edit: function edit() {
			console.log('Note:edit', arguments);
		},

		load: function load() {
			console.log('Note:load', arguments);
		}*/
		
	});

	return View;

});