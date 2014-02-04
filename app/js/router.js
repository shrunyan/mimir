var app = new Object();

app.Router = Backbone.Router.extend({
	routes: {
		"/": "index",
		"note/:id": "note"
	}
	index: function index() {

	},
	note: function note(id) {

	}
});

Backbone.history.start({
	pushState: true
});