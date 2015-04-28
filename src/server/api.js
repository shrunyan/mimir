
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var db = require('./db');
var server = http.createServer(function (request, response) {});

server.on( 'request', function (request, response){

    var body = String();
    var reqObj = url.parse( request.url, true );

    // Default to 404
    response.statusCode = 404;
    body = 'Request not found';

    if ( reqObj.pathname === '/user/note' && request.method === 'GET' ) {
        if ( reqObj.query.id) {

            var note = db.find({ id: reqObj.query.id }, function (error, note) {

                if (error) console.log('Mongo Note Error:', error);

                console.log('note', note);

                response.statusCode = 200;
                body = JSON.stringify(note);

            });

        }
        else {
            body = 'No note specified';
        }
    }
    if ( reqObj.pathname === '/user/note/save' && request.method === 'GET' ) {

        var stub = {
            id: 1,
            title: 'test',
            note: 'test note'
        };

        var note = new db(stub);

        note.save(function (error) {

            if (error) console.log('Error saving', error);
            console.log('Saved!');

        });

        response.statusCode = 200;
        body = JSON.stringify(note);
    }


    // Set Headers and send response
    response.setHeader( 'Content-Type', 'text/plain');
    response.setHeader( 'Content-Length', body.length );
    response.write( body );
    response.end();

});


server.listen('8001');
