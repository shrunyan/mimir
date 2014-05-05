/**
 *    NotesCollection
 */
define(function(require) {

	"use strict";


    var Backbone, Note, Collection;

    Backbone = require('backbone');

    Note = require('components/note/model');

    Collection = Backbone.Collection.extend({

		last: 0,

		model: Note,

		initialize: function initialize() {
            console.log('NotesCollection:initialize', this);

            this.on( 'note:save add', this.save, this );
            this.on( 'note:load', this.load, this );
            this.on( 'note:last', this.setLast, this );

        },

		setLast: function setLast( id ) {
            console.log('NotesCollection:setLast', arguments, this);

			this.last = id;

			localStorage.setItem( 'lastNote', id );
		},

		save: function save( note ) {
            console.log('NotesCollection:saveNote', arguments, this);

			this.set( note, {
				merge: true,
                remove: false
			})

			localStorage.removeItem( note.get( 'id' ) );

            localStorage.setItem( note.get( 'id' ), JSON.stringify( note.toJSON() ));

            // TODO: Send to server

			return note;

		},

        load: function load( id ) {
            console.log('NotesCollection:load', arguments, this);

            var note = this.get( id );

            this.setLast( note.id );

            return note;
        },

		// TODO: sync to server
		sync: function sync() {
			console.log('executing sync', arguments);
		}

	});

	return Collection;

});
