var path = require('path');
var express  = require('express');
var compress = require('compression');

var app = express();
app.use(compress());

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, '')));

app.listen(process.env.PORT || 3000);

console.log('server started on port: ', process.env.PORT || 3000);