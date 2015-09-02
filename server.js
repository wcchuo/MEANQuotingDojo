var path = require("path");
var express = require("express");
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quotingdojo');
var QuoteSchema = new mongoose.Schema({
	name: String,
	quote: String,
  datetime: String
})
var Quote = mongoose.model('Quote', QuoteSchema);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

 res.render('index');

})

app.get('/main', function(req, res) {
  Quote.find({}, function(err, quotes) {
     if(err) {
      console.log('Failed to connect to database or there is no data.');
    } else { 
      console.log('Successfully display quotes!');
    }

 res.render('main', {quotes : quotes});
  })
})

app.post('/main', function(req, res) {
  console.log("POST DATA", req.body);

  var quote = new Quote({name: req.body.name, quote: req.body.quote, datetime: req.body.datetime });

  quote.save(function(err) {

    if(err) {
      console.log('something went wrong');
    } else { 
      console.log('successfully added a quote!');
    }
  })
 res.redirect('/main');

})

app.listen(8006, function() {
 console.log("listening on port 8006");
})