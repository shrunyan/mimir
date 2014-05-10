/**
 *    NotesView View
 */
define(function(require) {

    "use strict";


    var _ = require('underscore'),
        $ = require('zepto'),
        Backbone = require('backbone'),
        NoteModel = require('components/note/model'),
        NoteView = require('components/note/view'),
        pubsub = require('core/pubsub');

    var View = Backbone.View.extend({

        template: require('tmpl!./template'),

        events: {
            'click .new': 'handleNew',
            'click .load': 'handleLoad',
            'click .edit': 'showEdit',
            'focusout .newTitle': 'setNewTitle',
            'keypress': 'onKey'
        },

        initialize: function initialize () {},

        render: function render() {
            console.log('NotesView:render', this);

            this.$el.html( $(this.template({
                notes: this.collection.toJSON()
            })));

            return this;
        },

        onKey: function onKey( evt ) {

            // Set Title on Enter Key
            if ( evt.which == 13 ) {

                evt.preventDefault();

                this.setNewTitle( evt );

                return false;
            }

            return true;

        },

        /**
         *  create
         *  Makes a new note
         */
        handleNew: function handleNew() {
            console.log('NotesView:handleNew', arguments, this);

            var id = this.collection.length + 1,
                note = new NoteModel({ id: id }),
                view = new NoteView({ model: note });

            this.collection.add( note );

            this.$el.find('#notes').append( view.render().$el );
        },

        /**
         *  load
         *  Loads selected note in viewer
         */
        handleLoad: function handleLoad( evt ) {
            console.log('NotesView:handleLoad', arguments, this);

            var id = $( evt.target ).parents( 'li' ).data( 'id' );

            if ( id ) {

                this.parent.router.navigate( '/note/' + id );

                //TODO: Why am I directly triggering the note load on the collection?
                // the route should trigger loading the note.
                // just like if a note url was linked to directly it should load
                // the note into all the necessary views
                pubsub.trigger( 'note:load', id );

            } else {

                console.log('This note was not found: ', id);

            }
        },

        /**
         * edit
         * Edit id of selected note in NotesView context
         */
        showEdit: function showEdit( evt ) {
            console.log('NotesView:showEdit', arguments, this);

            var $li = $( evt.target ).parents( 'li' );

            $li.find( '.load' ).hide();
            $li.find( '.newTitle' ).show().focus();

        },

        /**
         *  setTitle
         *  Sets new title name to model
         */
        setNewTitle: function setNewTitle( evt ) {
            console.log('NotesView:setNewTitle', arguments, this);

            var $input = $( evt.target ),
                $li = $input.parents( 'li' ),
                id = $li.data( 'id' ),
                title = $input.val(),
                note;

            if ( title ) {

                note = this.collection.get( id ).set( 'title', title );

                pubsub.trigger( 'note:save', note );

                this.render();

            }
            else {
                $li.find( '.load' ).show();
                $li.find( '.newTitle' ).hide();
            }

        }

    });

    return View;

});
