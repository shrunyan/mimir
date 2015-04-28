
var koa = require('koa');
var app = koa();

app.use( function *() {
    return 'hello world';
});


app.listen(8001);
