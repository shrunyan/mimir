/**
 *    List View
 */
define(function(require) {

    "use strict";


    var _, $, Backbone, NoteModel, NoteView, Model, View;

    _ = require('underscore');

    $ = require('zepto');

    Backbone = require('backbone');

    NoteModel = require('components/note/model');

    NoteView = require('components/note/view');

    View = Backbone.View.extend({

        template: require('tmpl!./template'),

        events: {
            'click .new': 'create',
            'click .edit': 'edit',
            'click .load': 'load',
            'focusout .newTitle': 'setTitle'
        },

        render: function render() {
            console.log('List:render', this);

            this.$el.html( $(this.template( {
                notes: this.collection.toJSON()
            })));

            return this;
        },

        /**
         *  create
         *  Makes a new note
         */
        create: function create() {
            console.log('List:create', arguments, this);

            var id, note, view;

            id = this.collection.length + 1;

            note = new NoteModel({
                id: id
            });

            view = new NoteView({
                model: note
            });

            this.collection.add( note );

            this.$el.find('#notes').append( view.render().$el );
        },

        /**
         *  load
         *  Loads selected note in viewer
         */
        load: function load( evt ) {
            console.log('List:load', arguments, this);

            var id = $( evt.target ).parents( 'li' ).data( 'id' );

            if ( id ) {

                this.parent.router.navigate( '/note/' + id );

                this.collection.trigger( 'note:load', id );

            } else {

                console.log('This note was not found: ', id);

            }
        },

        /**
         * edit
         * Edit id of selected note in list context
         */
        edit: function edit( evt ) {
            console.log('List:edit', arguments, this);

            var $li = $( evt.target ).parents( 'li' );

            this.toggle( $li );

        },

        toggle: function toggle( $li ) {

            $li.find( '.load' ).toggle();

            $li.find( '.newTitle' ).toggle();

            $li.find( '.newTitle' ).focus();

        },

        /**
         *  setTitle
         *  Sets new title name to model
         */
        setTitle: function setTitle( evt ) {
            console.log('List:setTitle', arguments, this);

            var $input, $li, id, title, note;

            $input = $( evt.target );

            $li = $input.parents( 'li' );

            id = $li.data( 'id' );

            title = $input.val();

            if ( title ) {

                note = this.collection.get( id );

                note.set( 'title', title );

                this.collection.trigger( 'note:save', note );

                this.render();

            }

        }
    });

    return View;

});
