/**
 *	App View
 *	This is the main application parent view
 */
define(function(require) {

	"use strict";

	var _ = require('underscore');
	var $ = require('zepto');
	var Backbone = require('backbone');
	var Snap = require('snap');

	//var App = require('components/app/model');
	var Editor = require('components/editor/view');
	var List = require('components/list/view');
	var Collection = require('components/note/collection');
	
	var Note = require('components/note/model');
	
	var View = Backbone.View.extend({
		
		id: 'app',
		
		tagName: 'div',
				
		template: require('tmpl!./template'),
		
		events: {
			'click #open-left': 'toggleMenu',
			'keypress': 'onKey'
		},

		initialize: function initialize() {

			var notes = this.getNotes();
			this.notes = new Collection( notes );

			this.childViews = {};
			
			this.childViews.editor = new Editor({
				model: this.getLastNote(),
				collection: this.notes
			}).render();

			this.childViews.list = new List({
				collection: this.notes
			}).render();

			this.listenTo( this.notes, 'note:load', this.closeMenu)
		
		},

		render: function render() {
			console.log('Rendering app', this);

			this.$el.html( $( this.template( {} )));

			this.$('#editor').html( this.childViews.editor.$el );

			this.$('#list').html( this.childViews.list.$el );

			$('body').append( this.$el );

			// Setup after menu's been added to DOM
			// Needs to use native DOM selector, zepto breaks
			this.drawer = new Snap({
				element: document.getElementById( 'editor' )
			});

			return this;
		},

		toggleMenu: function menu() {			
			if( this.drawer.state().state=="left" ){
			  this.drawer.close();
			} else {
			  this.drawer.open('left');
			}
		},

		closeMenu: function closeMenu() {
			this.drawer.close();
		},

		onKey: function onKey( evt ) {
			console.log('executing onKey', arguments);

			// save on ctrl + s
			if ( ( evt.which == 19 ) || evt.which == 115 && ( evt.ctrlKey || evt.metaKey ) ) {
		      
	      evt.preventDefault();
	      
	      this.notes.trigger( 'note:save' );

	      return false;
		  }

		  return true;
		},


		getNotes: function getNotes() {

			var self = this;
			var notes = [];
			
			_.each( localStorage, function( value, key, list ) {

				if ( value ) {

					var value = JSON.parse( value );

					if ( value.id ) {
						notes.push( value );
					}

				}

			});

			return notes;
		},

		setLastNote: function setLastNote( id ) {
			localStorage.setItem( 'lastNote', id );
		},

		getLastNote: function getLastNote() {

			var lastNote = localStorage.getItem( 'lastNote' );
			var lastNoteModel = this.notes.get( lastNote )

			if ( lastNoteModel ) {
				return lastNoteModel;
			}

			//this.setLastNote( 0 );
			return new Note({
				'note': 'Hi! This is your first note.'
			});

		}

	});

	return View;

});