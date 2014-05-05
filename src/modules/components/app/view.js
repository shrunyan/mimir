/**
 *  App View
 *  This is the main application parent view
 */
define(function( require ) {

    "use strict";


    var _, $, Backbone, Snap, Editor, List, Collection, Note, View;

    _ = require('underscore');

    $ = require('zepto');

    Backbone = require('backbone');

    Snap = require('snap');

    Editor = require('components/editor/view');

    List = require('components/notes/view');

    Collection = require('components/notes/collection');

    Note = require('components/note/model');

    View = Backbone.View.extend({

        id: 'app',

        tagName: 'div',

        template: require('tmpl!./template'),

        events: {
            'click #open-left': 'toggleMenu',
            'keypress': 'onKey'
        },

        initialize: function initialize() {
            console.log('AppView:initialize', this);

            this.notes = new Collection( this.loadLocalNotes() );

            this.childViews = {};

            this.childViews.editor = new Editor({
                model: this.getLastNote(),
                collection: this.notes
            });

            this.childViews.list = new List({
                collection: this.notes
            });

            // Give List reference to app
            // So it can use the router
            this.childViews.list.parent = this;

            this.listenTo( this.notes, 'note:load', this.setTitle)
        },

        render: function render( id ) {
            console.log('AppView:render', arguments, this);

            this.$el.html( $( this.template() ));

            this.$el.find('#editor').html( this.childViews.editor.render().$el );

            this.$el.find('#list').html( this.childViews.list.render().$el );

            $('body').append( this.$el );

            // Setup after menu's been added to DOM
            // Needs to use native DOM selector, zepto breaks
            this.drawer = new Snap({
                element: document.getElementById( 'editor' ),
                disable: 'right'
            });

            return this;
        },

        toggleMenu: function toggleMenu( evt ) {
            console.log('AppView:toggleMenu', arguments);

            if ( this.drawer.state().state === 'left' ) {

                this.drawer.close();

            } else {

                this.drawer.open( 'left' );

            }
        },

        closeMenu: function closeMenu() {
            console.log('AppView:closeMenu', arguments);

            this.drawer.close();
        },

        setTitle: function setTitle( id ) {

            var note = this.notes.get( id );

            this.$el.find( '.list li[data-id="'+ id +'"] .title' ).text( note.get( 'title' ));

            this.closeMenu();

        },

        /**
         *    onKey: Capture `ctrl + s` keypress from anywher
         *           in the application and save
         */
        onKey: function onKey( evt ) {
            console.log('AppView:onKey', arguments);

            // save on ctrl + s
            if ( ( evt.which == 19 ) || evt.which == 115 && ( evt.ctrlKey || evt.metaKey ) ) {

                evt.preventDefault();

                this.notes.trigger( 'note:save' );

                return false;
            }

            return true;

        },


        loadLocalNotes: function loadLocalNotes() {
            console.log('AppView:loadLocalNotes', arguments);

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
            console.log('AppView:setLastNote', arguments);

            this.note.trigger( 'note:last', id );
        },

        getLastNote: function getLastNote() {
            console.log('AppView:getLastNote', arguments);

            var lastNoteId, lastNoteModel, notes = [], note;

            lastNoteId = localStorage.getItem( 'lastNote' );

            note = this.notes.get( lastNoteId );

            if ( note ) {

                return note;

            }
            else {

                for (var i = localStorage.length - 1; i >= 0; i--) {

                    notes.push( localStorage.getItem( localStorage.key( i )));

                };

                note = JSON.parse( notes.pop() );

                if ( note.id ) {

                    this.notes.trigger( 'note:last', note.id );

                    return this.notes.get( note );

                }
                else {

                    note = new Note({
                        'id': 1,
                        'title': 'Your First Note',
                        'note': 'Hi! This is your first note.'
                    });

                    this.notes.trigger( 'note:save', note );

                    this.notes.trigger( 'note:last', note.id );

                    return note;
                }

            }

            console.log('Something went horribly wrong');
            //return new Note();

        }

    });

    return View;

});
