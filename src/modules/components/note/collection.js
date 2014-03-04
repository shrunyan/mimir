define(function(require) {

	var Backbone = require('backbone');
	var Note = require('components/note/model');

	var Collection = Backbone.Collection.extend({

		last: 0,

		model: Note,

		initialize: function initialize() {
			//this.listenTo( this, 'note:load', this.load );
			this.listenTo( this, 'note:save', this.save );
		}, 

		setLast: function setLast( id ) {
			this.last = id;
			localStorage.setItem( 'lastNote', id );
		},

		saveNote: function saveNote( note ) {

			this.set( note, {
				merge: true
			})

			localStorage.removeItem( note.get( 'id' ) );
			localStorage.setItem( note.get( 'id' ), JSON.stringify( note.toJSON() ));

			return this;

		},

		// TODO: sync to server
		sync: function sync() {
			console.log('executing sync', arguments);
		},

		/*getNotes: function getNotes() {

		},*/

	});

	return Collection;

});