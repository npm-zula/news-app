const mongoose = require('mongoose')
const Schema = mongoose.Schema


const commentSchema = new Schema({
    articleID:{type: String, required: true},
    userName: {type: String, required: true},
    commentID:{type: String, required: true},
    body: {type: String, required: true}
})


module.exports = mongoose.model('Comment', commentSchema);