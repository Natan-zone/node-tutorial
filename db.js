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

const mongoIP = process.env.MONGO_IP ?? "127.0.0.1";

async function init() {
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb://${mongoIP}:27017/tomer-tutorial`);
    console.log('db connected');
}

module.exports = {
    init,
    Post
}
