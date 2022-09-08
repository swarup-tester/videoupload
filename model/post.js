const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    videoPath: { type: String, required: true }
});

const PostVideo = mongoose.model('postvideo', userSchema)
module.exports = PostVideo