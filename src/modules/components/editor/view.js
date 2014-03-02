/**
 *	Editor View
 */
define(function(require) {

	"use strict";

	var Backbone = require('backbone');
	var Snap = require('snap');
	var Note = require('components/note/model');
	
	var View = Backbone.View.extend({
		
		tag: 'div',

		className: 'editor-area',
		
		model: new Note(),
		
		template: require('tmpl!./template'),
		
		events: {
			'focusout textarea': 'save'
		},

		initialize: function initialize() {
			
			// Load blank note on instaniation
			// this.model.set( 'note', '');

			this.listenTo( this.collection, 'note:load', this.load );
			this.listenTo( this.collection, 'note:save', this.save );
		}, 

		render: function render() {
			console.log('Rendering Editor', this);
			
			this.$el.html( $( this.template( this.model.toJSON() )));

			return this;
		},

		save: function save() {
			console.log('executing save', arguments);

			var content = this.$el.find( 'textarea' ).val();
			
			this.model.set( 'note', content );

			this.collection.saveNote( this.model );

			/*localStorage.removeItem( this.model.get( 'id' ) );
			localStorage.setItem( this.model.get( 'id' ), JSON.stringify(this.model.toJSON()) );*/

		},

		load: function load( id ) {
			console.log('executing load', arguments);

			var note = this.collection.get( id );

			this.model = note;
			this.$el.data( 'id', id);
			this.render();

			this.collection.setLast( id );

		}

	});


	return View;

});
