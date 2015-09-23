var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Initiate and configure multer

var multer = require('multer')({ dest: './upload',

    rename: function(fieldname, filename){
      return filename + Date.now();
    },

    onFileUploadStart: function(file){
      console.log(file + ' uploading ...');
    },

    onFileUploadComplete: function(file){
      console.log(file.fieldname + 'uploaded!');
      uploadDone = true;
    }});

require('./db.js')

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//Checks whether the file upload has been finished
var uploadDone = false;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Config multer for file upload

app.use(multer.single('dream'));


app.use('/', routes);

routes.post('/api/image', function(req, res){

  if(uploadDone == true) console.log(req.files);
  res.send("File Uploaded");

});

//initialize db

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function(){
	console.log("Listening!");
});

module.exports = app;
