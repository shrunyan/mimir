define(function(require) {

	var _ = require('underscore');
	var $ = require('zepto');
	var Backbone = require('backbone');

	var NoteModel = require('components/note/model');
	var NoteView = require('components/note/view');

	var Model = require('components/list/model')
	var View = Backbone.View.extend({
				
		template: require('tmpl!./template'),
		
		events: {
			'click .new': 'create',
			'click .edit': 'edit',
			'click .load': 'load',
			'focusout input': 'setTitle'
		},

		render: function render() {
			console.log('List:render', this);

			this.$el.html( $(this.template( { 
				notes: this.collection.toJSON()
			})));

			return this;
		},

		/**
		 *	create
		 *	Makes a new note
		 */
		create: function create() {
			console.log('List:create', arguments);

			var id,
					note,
					view;

			id = this.collection.length + 1;

			note = new NoteModel({
				id: id
			});

			view = new NoteView({
				model: note 
			});

			this.collection.add( note ).saveLocalStorage();

			this.$el.find('#notes').append( view.render().$el );
		},

		/**
		 *	load
		 *	Loads selected note in viewer
		 */
		load: function load( evt ) {
			console.log('List:load', arguments);

			var id = $(evt.target).parents('li').data('id');

			this.collection.trigger( 'note:load', id );
		},

		/**
		 * edit
		 * Edit id of selected note in list context
		 */
		/*edit: function edit() {
			console.log('List:edit', arguments);
		},*/

		/**
		 *	setTitle
		 *	Sets new title name to model
		 */
		/*setTitle: function setTitle() {
			console.log('List:setTitle', arguments);
		}*/
	});

	return View;

});
