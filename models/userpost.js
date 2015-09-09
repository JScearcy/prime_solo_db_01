var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PostSchema = new Schema({
    username: {type: String, required: true},
    brew: {type: String, required: true, index: {unique: true}},
    brewnotes: {type: String, required: true}
});

module.exports = mongoose.model('userpost', PostSchema);
