var express = require('express');
var fs = require('fs');
var hbs = require('hbs');
var Quote = require('./models/Quote.js');
var routes = require('./routes');

var app = express();
app.use(express.logger());

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

var blogEngine = require('./dailyquotare');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());


app.get('/', function(req, res){
	 Quote.findAllQuotes(function(p) {
	 	for (var i = 0; i < p.length; i++) {
		   if (p[i].author === ""){
		   	p[i].author = "Unknown";
		   };
		}
    	res.render('overview',{title:"My Blog", quotes:p});
  	});
});

app.get('/addquote', function(req, res){
	Quote.getBoards( function(boards){
		res.render('addquote', {title:"Add Quote", boards:boards});
	});	
});

app.get('/addboard', function(req, res){
	res.render('addboard', {title:"Add Board"});
});

app.get('/boards', function(req, res){
	Quote.getBoards(function(boards) {
		res.render('boards', {title:"Boards", boards:boards});
	});
});

app.post('/addsubmit', function(req, res){
	var text = req.body.text;
	var author = req.body.author;
	var boardId = req.body.board;

	Quote.addQuote(text, author, boardId, function(err, quote) {
		  	/// redirect to root
		  	res.redirect("/"); 
  		});		  
	}
);

app.post('/addboardsubmit', function(req, res){

	var name = req.body.name;
	

	Quote.addBoard(name, function(err, quote) {
		  	/// redirect to root
		  	res.redirect("/boards");
		 
  		});		  
	}
);


/*
app.get('/', function(req, res){
	 res.redirect('/showroom');
});

app.get('/upload', function(req, res){
	res.render('upload', {title:"Battle"});
});

app.post('/uploadsubmit', function(req, res){
	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name
		var imgId;
		/// If there's an error
		if(!imageName){
			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {
			var description = req.body.description;
  			Sneaker.addSneaker(description, function(err, sneaker) {
    		if (err) throw err;
    		var newPath = __dirname + '/public/img/uploads/fullsize/' + sneaker._id +'.png';

		 	/// write file to uploads/fullsize folder
		  	fs.writeFile(newPath, data, function (err) {

		  	/// redirect to root
		  	res.redirect("/");
		  });
  		});		  
		}
	});
});



app.get('/battle', function(req, res){
	res.render('battle', {title:"Battle"});
});

app.get('/showroom', function(req, res){
	Sneaker.findAllSneaker(function(p) {
    	res.render('showroom',{title:"My Blog", sneakers:p});
  	});
});

app.get('/showroom/popular', function(req, res){
	Sneaker.findAllSneakerPopular(function(p) {
    	res.render('showroom',{title:"Popular", sneakers:p});
  	});
});

app.get('/showroom/new', function(req, res){
	Sneaker.findAllSneakerNew(function(p) {
    	res.render('showroom',{title:"New", sneakers:p});
  	});
});

app.get('/showroom/editorschoice', function(req, res){
	Sneaker.findAllSneakerEditorChoice(function(p) {
    	res.render('showroom',{title:"Editor's Choice", sneakers:p});
  	});
});


app.get('/sneaker/:id', function(req, res){
	
	Sneaker.findOne(req.params.id, function(p){
		res.render('article',{title:"test", sneaker:p});
	});

});

app.get('/admin', function(req, res){
    	res.render('admin',{title:"Editor's Choice"});
});

*/

app.get('bootstrapelements', function(req, res){
	res.render('bootstrapelements', {title:"bootstrapelements"});
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
