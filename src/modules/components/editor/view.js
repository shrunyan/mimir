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
			this.listenTo( this.collection, 'note:load', this.load );
			this.listenTo( this.collection, 'note:save', this.save );
		}, 

		render: function render() {
			console.log('Editor:render', this);
			
			this.$el.html( $( this.template( this.model.toJSON() )));

			return this;
		},

		save: function save() {
			console.log('Editor:save', arguments);

			var content;

			content = this.$el.find( 'textarea' ).val();
			
			this.model.set( 'note', content );

			this.collection.saveNote( this.model );

			return this;
		},

		load: function load( id ) {
			console.log('Editor:load', arguments);

			var note;

			note = this.collection.get( id );

			if ( note ) {
			
				this.model = note;
				this.$el.data( 'id', id);
				this.render();

				this.collection.setLast( id );
			
			}

		}

	});


	return View;

});
