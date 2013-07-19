/**
 * Sizz App
 * @author Stuart Runyan
 * @beta 0.0.1
 *
 * Based on: http://backbonejs.org/docs/todos.html
 * and: http://tutorialzine.com/2013/04/services-chooser-backbone-js/
 */
(function(){

    var app ={};

    app.Note = Backbone.Model.extend({
        defaults: function(){
            console.log('Note:defaults');
            return {
                title: 'New Note',
                content: 'Hi, this is a new note.'
            };
        },
        save: function() {
            console.log('Note:save');
            console.log(this.content);
        },
        load: function() {
            console.log('Note:load');
            return this.content;
        }
    });

    /*app.NoteList = Backbone.Collection.extend({
        model: app.Note,
        localStorage: new Backbone.LocalStorage('notes-backbone'),
        open: function() {
            console.log('NoteList:open');
            $('#editor textarea').val(this.model.content);
        },
        save: function() {

        }
    });
    app.Notes = new app.NoteList();*/

    /*app.NoteView = Backbone.View.extend({
        tagName: 'li',
        //template: _.template($('#note-template').html()),
        events: {
            'click .load' : 'loadNote',
            'click .save' : 'saveNote'
        },
        initialize: function() {
            console.log('NoteView:initialize');
            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            console.log('AppView:render');
            this.$el.html('<p>Test render</p>');
            //this.$('p').prop();
            return this;
        }
    });*/


    app.AppView = Backbone.View.extend({
        el: '#app',
        note_cur: $('#editor textarea'),
        notes_list: $('#notes'),
        events: {
            'click .load' : 'loadNote',
            'click .save' : 'saveNote',
            'click .new-note' : 'newNote',
            'click .menu' : 'menu',
            'click .settings' : 'settings'
        },
        template: _.template('<a href="#load" class="load"><%- title %></a>'),
        initialize: function() {
            console.log('AppView:initialize');

            // Get All notes from localStorage
            // then render their titles in menu
            this.render();
        },
        render: function(){
            console.log('AppView:render');
            this.notes_list.html(this.template({
                title: 'Note One'
            }));
        },
        loadNote: function() {
            console.log('AppView:loadNote');
            console.log(this);
        },
        saveNote: function() {
            console.log('AppView:saveNote');
            var content = this.note_cur.val();
            console.log(content);
        },
        newNote: function() {
            console.log('AppView:newNote');
        },
        menu: function() {
            console.log('AppView:menu');
        },
        settings: function() {
            console.log('AppView:settings');
        }
    });

    /**
     * Party Time!!!
     */
    app.appView = new app.AppView();

})();