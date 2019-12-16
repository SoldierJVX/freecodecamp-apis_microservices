const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track' )
const Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connection Successful!");
});

const urlSchema = new Schema({
  url: { type: String, required: true },
  url_short: { type: Number, required: true }
});

var URL = mongoose.model("URL", urlSchema);

var createAndSaveURL = function(done, url) {
  URL.findOne({'url': url}, function(err,obj) { 
    if (err) return console.error(err);
    
    console.log("inside")
    
    
  });
  
  console.log('outside')
  
  /*
  const me = new URL({url: url});
  me.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
  */
};

exports.createAndSaveURL = createAndSaveURL

exports.URLModel = URL;
exports.mongoose = mongoose