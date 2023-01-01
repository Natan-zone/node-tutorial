const mongoose = require('mongoose');
require('mongoose-type-email');

const postsSchema = new mongoose.Schema({
    title: String,
    //author: mongoose.SchemaTypes.Email,
    author: String,
    creationDate: { type: Date, default: Date.now },
    content: String
});

const Post = mongoose.model('Post', postsSchema);

async function init() {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/tomer-tutorial');
    console.log('db connected');
}

module.exports = {
    init,
    Post
}
