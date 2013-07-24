/**
 * Sizz App
 * @author Stuart Runyan
 * @beta 0.0.1
 *
 * Based on: http://backbonejs.org/docs/todos.html
 * and: http://tutorialzine.com/2013/04/services-chooser-backbone-js/
 */
(function(){

    var app = {};
          //notes = [];

    app.Note = Backbone.Model.extend({
        //localStorage: new Backbone.LocalStorage('notes-backbone'),
        defaults: function(){
            return {
                id: 1,
                title: 'New Note',
                content: 'Hi, this is a new note.'
            };
        },
        initialize: function() {
            console.log('Note Created');

            // Listen for changes
            this.on('change:title', function() {
                this.save();
            });
            this.on('change:content', function() {
                this.save();
            });
            this.on("invalid", function(model, error){
                console.log(error);
            });
        },
        save: function() {
            console.log('Note:save');

            // Remove note
            //localStorage.removeItem(this.get('title'));
            localStorage.removeItem(this.get('title'));

            // Re-Add note
            localStorage.setItem(this.get('title'), this.get('content'));
        }
    });
    //var note = new app.Note();
    //note.set('title', 'testing out a new');
    //note.set('content', 'changing the content test');

    /*notes.push(new app.Note());
    notes.push(new app.Note());
    notes.push(new app.Note());

    console.log(notes);*/



    app.NoteView = Backbone.View.extend({
        tagName: 'li',
        notes_list: $('#notes'),
        template: _.template('<a href="#load" class="load"><%- title %></a>'),
        events: {
            'click .load' : 'load',
            'dblclick .load' : 'edit',
            'keypress .edit': 'updateOnEnter'
        },
        initialize: function() {
            console.log('NoteView:initialize');
            //this.listenTo(this.model, 'change', this.render);
            this.render();
        },
        render: function() {
            console.log('NoteView:render');
            var html = this.model.toJSON();
            console.log(html);
            //console.log(this.model.get('title'));
            //var link = this.$el.html();
            //this.$('p').prop();
            return this;
        },
        edit: function() {
            console.log('NoteView:edit');
        },
        load: function() {
            console.log('NoteView:load');
            //$('#editor textarea').val(this.get('content'));
        }
    });
    //var noteView = new app.NoteView();




    app.Notes = Backbone.Collection.extend({
        model: app.Note,
        localStorage: new Backbone.LocalStorage('notes-backbone'),
        open: function() {
            console.log('NoteList:open');
            $('#editor textarea').val(this.model.content);
        },
        save: function() {
            //save this collection
        }
    });
    // var ntoes = new Backbone.collection();
    var notes = new app.Notes();
    notes.add([
        {id: 1, title: 'tet ad test', content: 'fuck dis'},
        {id: 2, title: 'tetaa   aef test', content: 'fuck dis'},
        {id: 3, title: 'tet te a df st', content: 'fuck dis'}
    ]);

    console.log(notes.length);

    notes.forEach(function(model){
        console.log(model.get('title'));
    });

    console.log(notes.pluck('content'));



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
            var note = new app.Note();

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
    //app.appView = new app.AppView();


    /*return {
        notes: notes
    };*/

})();