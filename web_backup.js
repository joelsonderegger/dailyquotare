var express = require('express');
var fs = require('fs');
var hbs = require('hbs');
var Sneaker = require('./models/Sneaker.js');
var routes = require('./routes');

var app = express();
app.use(express.logger());

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

var blogEngine = require('./artsneaker');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());

app.get('/', function(req, res){
	 res.redirect('/showroom');
});

app.get('/upload', function(req, res){
	res.render('upload', {title:"Battle"});
});

app.post('/uploadsubmit', function(req, res){
	
	var newuser;
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
  			Sneaker.addSneaker(description, function(err, user) {
    		if (err) throw err;
    		imgId=user._id;
    		var newPath = __dirname + '/public/img/uploads/fullsize/' + imgId +'.png';

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {

		  	/// let's see it
		  	res.redirect("/");

		  });
  		});		  
		}
	});
});

/* THIS ROUTE CAN BE DELETED
/// Show files
app.get('/uploads/fullsize/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + '/public/img/uploads/fullsize/' + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});
delete until here*/


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

	//res.render('article',{title:sneaker.title, sneaker:sneaker});*/
});

app.get('/admin', function(req, res){
    	res.render('admin',{title:"Editor's Choice"});
});

app.get('bootstrapelements', function(req, res){
	res.render('bootstrapelements', {title:"bootstrapelements"});
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
