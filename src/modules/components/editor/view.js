/**
 *	EditorView
 */
define(function(require) {

	"use strict";


    var Backbone = require('backbone'),
        Snap = require('snap'),
        Note = require('components/note/model'),
        pubsub = require('core/pubsub');

    var View = Backbone.View.extend({

		tag: 'div',

		className: 'editor-area',

		model: new Note(),

		template: require('tmpl!./template'),

		events: {
			'focusout textarea': 'save'
		},

		initialize: function initialize() {
            // console.log('EditorView:initialize', this);
            this.listenTo( pubsub, 'note:load', this.load );
            //this.listenTo( this.collection, 'note:save', this.save );
		},

		render: function render() {
			console.log('EditorView:render', this);

			this.$el.html( $( this.template( this.model.toJSON() )));

			return this;
		},

		save: function save() {
			console.log('EditorView:save', arguments, this);

			var content = this.$el.find( 'textarea' ).val();

			this.model.set( 'note', content );

            pubsub.trigger( 'note:save', this.model );

			return this;
		},

		load: function load( id ) {
			console.log('EditorView:load', arguments, this);

            var note = this.collection.get( id );

			if ( note ) {

                console.log( note );

				this.model = note;

				this.$el.data( 'id', note.id );

                this.render();

			}

		}

	});


	return View;

});
