const mongoose = require('mongoose')
const Schema = mongoose.Schema


const articleSchema = new Schema({
    artcieID:{type: String, required: true},
    title:{type: String, required: true},
    body: {type: String, required: true},
    published: {type: Boolean},
    tags: {type: Array, required: true},
    authorUserName: {type: String, required: true}
})


module.exports = mongoose.model('Article', articleSchema);