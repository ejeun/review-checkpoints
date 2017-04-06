var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var volleyball = require('volleyball')
var session = require('express-session')

var books = require('./routes/books')
var app = express();

module.exports = app;

//middleware
app.use(volleyball)
app.use((bodyParser.urlencoded({ extended: false })))
app.use(bodyParser.json())
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'jenny',
  cookie: {}
}))

app.use('/files', express.static(__dirname + '/public/static'))

// contrived error routing
app.get('/broken', function(req, res, next){
  res.sendStatus(500)
})

app.get('/forbidden', function(req, res, next){
/*	Promise.resolve()
	.then(function(){
		var err = Error('Forbidden')
		err.status = 403
		throw err
	}) */

  res.sendStatus(403)
})

// api routes
app.get('/api/numVisits', (req, res, next) => {
  if (!req.session.number) req.session.number = 0
  res.send({
    number: req.session.number++
  })
})

app.use('/api/books', books)

// error handling middleware
app.use(function(err, req, res, next){
  console.error(err)
  res.sendStatus(500)
})
