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

			this.notes = new Collection( this.loadLocalNotes() );

			this.childViews = {};

			this.childViews.editor = new Editor({
				model: this.getLastNote(),
				collection: this.notes
			});
			this.childViews.list = new List({
				collection: this.notes
			});

			this.listenTo( this.notes, 'note:load', this.closeMenu)
		},

		render: function render( id ) {
			console.log('App:render', this);

			this.$el.html( $( this.template( {} )));

			this.$('#editor').html( this.childViews.editor.render().$el );

			this.$('#list').html( this.childViews.list.render().$el );

			$('body').append( this.$el );

			// Setup after menu's been added to DOM
			// Needs to use native DOM selector, zepto breaks
			this.drawer = new Snap({
				element: document.getElementById( 'editor' ),
				disable: 'right'
			});

			return this;
		},

		toggleMenu: function menu() {
			console.log('App:toggleMenu', arguments);

			if( this.drawer.state().state=="left" ){
			  this.drawer.close();
			} else {
			  this.drawer.open('left');
			}
		},

		closeMenu: function closeMenu() {
			console.log('App:closeMenu', arguments);
			this.drawer.close();
		},

		onKey: function onKey( evt ) {
			//console.log('App:onKey', arguments);

			// save on ctrl + s
			if ( ( evt.which == 19 ) || evt.which == 115 && ( evt.ctrlKey || evt.metaKey ) ) {
		      
	      evt.preventDefault();
	      
	      this.notes.trigger( 'note:save' );

	      return false;
		  }

		  return true;
		},


		loadLocalNotes: function loadLocalNotes() {
			console.log('App:loadLocalNotes', arguments);

			var self = this,
					notes = [];
			
			_.each( localStorage, function( note ) {

				if ( note ) {

					note = JSON.parse( note );

					if ( note.id ) {
						notes.push( note );
					}

				}

			});

			return notes;
		},

		setLastNote: function setLastNote( id ) {
			console.log('App:setLastNote', arguments);

			localStorage.setItem( 'lastNote', id );
		},

		getLastNote: function getLastNote() {
			console.log('App:getLastNote', arguments);

			var lastNoteId = localStorage.getItem( 'lastNote' ),
					lastNoteModel = this.notes.get( lastNoteId ),
					note;

			if ( lastNoteModel ) return lastNoteModel;

			note = new Note({
				'id': 1,
				'title': 'Your First Note',
				'note': 'Hi! This is your first note.'
			});

			this.notes.set( note ).saveLocalStorage();

			this.setLastNote( note.id );

			return note;

		}

	});

	return View;

});