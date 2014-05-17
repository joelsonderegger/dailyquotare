var db = require('../lib/db');

var SneakerSchema = new db.Schema({
    title : {type: String, unique: false},
    isEditorsChoice: Boolean,
    isApproved: Boolean,
    wins: Number,
    created: {type: Date, default: Date.now}
})

var MySneaker = db.mongoose.model('Sneaker', SneakerSchema);


// Exports
module.exports.findAllSneaker = findAllSneaker;
module.exports.findAllSneakerEditorChoice = findAllSneakerEditorChoice;
module.exports.addSneaker = addSneaker;
module.exports.findOne = findOne;
module.exports.findAllSneakerNew = findAllSneakerNew;
module.exports.findAllSneakerPopular = findAllSneakerPopular;



// Find a single movie by name.
function findOne(idxd, callback) {
  console.dir(idxd);
  MySneaker.findOne({ _id: idxd }, function(err, sneaker) {
    if (err) return console.error(err);
    console.dir(sneaker);
    callback(sneaker);
});
}

// Find sneakers
function findAllSneaker(callback) {
MySneaker.find(function(err, movies) {
  if (err) return console.error(err);
  callback(movies);
});
}

// Find sneakers
function findAllSneakerEditorChoice(callback) {
MySneaker.find({ isEditorsChoice: true }, function(err, movies) {
  if (err) return console.error(err);
  callback(movies);
});
}

function findAllSneakerNew(callback) {
MySneaker.find({}, null, {sort: [['created', -1]]}, function(err, movies) { if (err) return console.error(err);
  callback(movies); });
}

function findAllSneakerPopular(callback) {
MySneaker.find({}, null, {sort: [['wins', -1]]}, function(err, movies) { if (err) return console.error(err);
  callback(movies); });
}

// Add user to database
function addSneaker(title, callback) {
  var instance = new MySneaker();
  instance.title = title;
  instance.isEditorsChoice = false;
  instance.isApproved = false;
  instance.save(function (err) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, instance);
    }
  });
}

