define(function(require) {

	var Backbone = require('backbone');
	var View = Backbone.View.extend({

		tagName: 'li',

		template: require('tmpl!./template'),

		render: function render() {
			console.log('Rendering Note', this);

			this.$el.data( 'id', this.model.id );
			this.$el.html( $( this.template( this.model.toJSON() )));

			return this;
		},

		edit: function edit() {
			console.log('executing edit', arguments);
		},

		load: function load() {
			console.log('executing load', arguments);
		}
		
	});

	return View;

});