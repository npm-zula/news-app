const mongoose = require('mongoose')
const Schema = mongoose.Schema


const approvalSchema = new Schema({
    articleID:{type: String, required: true},
    title:{type: String, required: true},
    body: {type: String, required: true},
    published: {type: Boolean},
    tags: {type: Array, required: true},
    authorUserName: {type: String, required: true}
})


module.exports = mongoose.model('Approval', approvalSchema)