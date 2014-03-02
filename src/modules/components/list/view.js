define(function(require) {

	var _ = require('underscore');
	var $ = require('zepto');
	var Backbone = require('backbone');

	var NoteModel = require('components/note/model');
	var NoteView = require('components/note/view');

	var Model = require('components/list/model')
	var View = Backbone.View.extend({
		
		//model: new Model(),
		
		template: require('tmpl!./template'),
		
		events: {
			'click .new': 'create',
			'click .edit': 'edit',
			'click .load': 'load',
			'focusout input': 'setTitle'
		},
		
		initialize: function initialize() {
			//console.log('Initalizing List', this);
		}, 

		render: function render() {
			console.log('Rendering List', this);

			this.$el.html( $(this.template( { 
				notes: this.collection.toJSON()
			})));

			return this;
		},

		/**
		 *	create
		 *	Makes a new note
		 */
		create: function createNote() {
			console.log('executing create', arguments);

			var id = this.collection.length + 1;
			var note = new NoteModel({
				id: id
			});
			var view = new NoteView({
				model: note 
			});

			this.collection.add( note )

			this.$el.find('#notes').append( view.render().$el );
		
		},

		/**
		 * edit
		 * Edit id of selected note in list context
		 */
		edit: function edit() {
			console.log('executing edit', arguments);
		},

		/**
		 *	load
		 *	Loads selected note in viewer
		 */
		load: function load( evt ) {
			//console.log('executing load', arguments);

			var id = $(evt.target).parents('li').data('id');
			this.collection.trigger( 'note:load', id );
		},

		/**
		 *	setTitle
		 *	Sets new title name to model
		 */
		setTitle: function setTitle() {
			console.log('executing setTitle', arguments);
		}
	});

	return View;

});
