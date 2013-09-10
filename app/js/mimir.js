/**
 * Mímir
 * @author Stuart Runyan
 * @version 0.2.0 Adding grunt build system
 * @alpha 0.1.0
 *
 * @tutorial ["http://backbonejs.org/docs/todos.html", "http://tutorialzine.com/2013/04/services-chooser-backbone-js/"]
 *
 * @required "http://backbonejs.org"
 * @required "https://www.dropbox.com/developers/dropins"
 *
 */
(function(){
    console.log('Hello. Interested in what makes this tick? Click here -> https://github.com/shrunyan/webdown');

    var app = {};

    app.Note = Backbone.Model.extend({
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



    app.AppView = Backbone.View.extend({
        el: '#app',
        editor: $('#editor textarea'),
        list: $('#notes'),
        notes: new app.Notes(),
        events: {
            'click .load' : 'loadNote',
            'click .save' : 'saveNote',
            'click .new-note' : 'newNote',
            'click .menu' : 'menu',
            'click .settings' : 'settings',
            'dblclick .load' : 'editNote',
            'click .edit' : 'editNote',
            'keyup #note' : 'saveNote'
        },
        template: _.template('<li><a href="#load" class="load"><span class="title"><%- title %></span><span class="edit">&#9998;</span></a></li>'),
        initialize: function() {
            console.log('AppView:initialize');

            // Get All notes from localStorage
            // then render their titles in menu

            var notes = localStorage;
            // Do these need to be handed to the collection? And the collection would render them?
            for (var title in notes) {
                this.render(title);
            }
        },
        render: function(title){
            console.log('AppView:render');
            this.list.append(this.template({
                title: title
            }));
        },
        loadNote: function(e) {
            console.log('AppView:loadNote');

            var el = $(e.currentTarget);
            var title = el.find('.title').html();
            var content = localStorage.getItem(title);

            this.editor.val(content);
            this.editor.attr('data-title', title);

            $('.bar-title .title').html(title);
        },
        saveNote: function() {
            console.log('AppView:saveNote');

            var content = this.editor.val();
            var title = this.editor.attr('data-title');

            localStorage.setItem(title, content);
        },
        newNote: function() {
            console.log('AppView:newNote');

            var note = new app.Note();
            //console.log(note);
            this.notes.add(note);

            this.render(note.attributes.title);
            //this.loadNote(note);
            this.editor.val(note.attributes.content);
            this.editor.attr('data-title', note.attributes.title);
        },
        editNote: function(e) {
            console.log('AppView:editNote');

            // Store reference to editor; we lose it later the "on" function
            var editor = this.editor;

            var el = $(e.currentTarget);
            var parEl = el.parent('.load');
            var orgTitle = el.prev().html();
            var edit = '<input type="text" placeholder="Enter a new title" />';
            var content = editor.val();

            parEl.html(edit);
            parEl.find('input').focus().on('blur', function (e) {

                var input = $(e.currentTarget);
                var newTitle = input.val();

                if (newTitle.length > 0) {
                    parEl.html('<span class="title">' + newTitle + '</span><span class="edit">&#9998;</span>');
                } else {
                    parEl.html('<span class="title">' + orgTitle + '</span><span class="edit">&#9998;</span>');
                }

                // Reset content
                editor.val(content);
            });

        },
        menu: function() {
            console.log('AppView:menu');

            this.list.toggle();
        },
        settings: function() {
            console.log('AppView:settings');
            alert('This will be a settings modal.');
        }
    });

    /**
     * Party Time!!!
     */
    app.appView = new app.AppView();


})();