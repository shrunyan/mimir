var mongoose = require('mongoose');
var db = mongoose.connection;
var Note = mongoose.model('Note', {
    id: Number,
    title: String,
    note: String
});

mongoose.connect('mongodb://localhost/mimir');

db.on('error', function (error) {

    console.log( 'Mongo Error', error );
    return error;

});

db.on( 'open', function (connection) {

    console.log( 'Connected', connection );

});

module.exports = Note;
