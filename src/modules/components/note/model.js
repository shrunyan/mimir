define(function(require) {

	var Backbone = require('backbone');
	var Model = Backbone.Model.extend({
		
		defaults: {
			id: 0,
			title: 'New Note',
			note: 'You have created a new note.'
		},

		saveLocalStorage: function saveLocalStorage() {

			localStorage.removeItem( this.get( 'id' ) );
			localStorage.setItem( this.get( 'id' ), JSON.stringify( this.toJSON() ));

			return this;

		}

	});

	return Model;

});