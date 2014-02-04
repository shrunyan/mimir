app.Views.noteList = Backbone.View.extend({
	tag: 'li',
	template: _.template($('#note-list')),
	events: {
		'click #new': 'create',
		'click .edit': 'edit',
		'click .load': 'load',
		'focusout input': 'setTitle'
	},
	initalize: function initalize() {

	}, 
	render: function render() {
		
	},

	/**
	 *	create
	 *	Makes a new note
	 */
	create: function create() {

	},

	/**
	 * edit
	 * Edit id of selected note in list context
	 */
	edit: function edit() {

	},

	/**
	 *	load
	 *	Loads selected note in viewer
	 */
	load: function load() {

	},

	/**
	 *	setTitle
	 *	Sets new title name to model
	 */
	setTitle: function setTitle() {
		
	}
});