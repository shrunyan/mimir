/**
 *  App View
 *  This is the main application parent view
 */
define(function( require ) {

    "use strict";


    var _ = require('underscore'),
        $ = require('zepto'),
        Backbone = require('backbone'),
        Snap = require('snap'),
        Editor = require('components/editor/view'),
        List = require('components/notes/view'),
        Collection = require('components/notes/collection'),
        Note = require('components/note/model'),
        pubsub = require('core/pubsub');


    var View = Backbone.View.extend({

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

            this.childViews = {
                'editor': new Editor({
                    model: new Note(),
                    collection: this.notes
                }),
                'list': new List({ collection: this.notes })
            };

            // TODO: instead of giving a reference to the child
            // the child should use pubsub to emit events
            this.childViews.list.parent = this;

            this.listenTo( pubsub, 'note:load', this.closeMenu );
            this.listenTo( pubsub, 'note:load', this.setTitle );
        },

        render: function render( id ) {
            console.log('AppView:render', arguments, this);

            this.$el.html( $( this.template() ));

            this.$el.find('#editor').html( this.childViews.editor.render().$el );

            this.$el.find('#list').html( this.childViews.list.render().$el );

            $('body').append( this.$el );

            // Setup after menu's been added to DOM
            // Needs to use native DOM selector, zepto object breaks
            this.drawer = new Snap({
                element: document.getElementById( 'editor' ),
                disable: 'right'
            });

            // Load last edited note
            pubsub.trigger( 'note:load', this.getLastNote() );

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

            this.$el.find( '.bar-title .title' ).text( note.get( 'title' ));

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

                pubsub.trigger( 'note:save' );

                return false;
            }

            return true;

        },


        loadLocalNotes: function loadLocalNotes() {
            console.log('AppView:loadLocalNotes', arguments);

            var self = this,
                notes = [];

            if ( localStorage.length ) {

                _.each( localStorage, function( note ) {

                    if ( note ) {

                        note = JSON.parse( note );

                        if ( note.id ) notes.push( note );

                    }

                });

            }

            return notes;
        },

        setLastNote: function setLastNote( id ) {
            console.log('AppView:setLastNote', arguments);
            pubsub.trigger( 'note:last', id );
        },

        getLastNote: function getLastNote() {
            console.log('AppView:getLastNote', arguments);

            var lastNoteId = localStorage.getItem( 'lastNote' ),
                lastNoteModel,
                notes = [],
                note = this.notes.get( lastNoteId );


            if ( note && note.id ) return note;

            // Else check if any notes exist
            for ( var i = localStorage.length - 1; i >= 0; i-- ) {

                notes.push( localStorage.getItem( localStorage.key( i )));

            };

            if ( notes.length ) {

                note = JSON.parse( notes.pop() );

                if ( note.id ) {

                    pubsub.trigger( 'note:last', note.id );

                    return this.notes.get( note );

                }

            }
            else {

                note = new Note({
                    'id': 1,
                    'title': 'Your First Note',
                    'note': 'Hi! This is your first note.'
                });

                pubsub.trigger( 'note:save', note );
                pubsub.trigger( 'note:last', note.id );

                return note;
            }

            console.log('Something went horribly wrong');
            //return new Note();

        }

    });

    return View;

});
