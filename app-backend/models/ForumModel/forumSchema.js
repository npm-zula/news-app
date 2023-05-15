const mongoose = require('mongoose')
const Schema = mongoose.Schema


const forumSchema = new Schema({

    question:{type: String, required: true},
    questionID: {type: String, required: true},
    userID: {type: String, required: true},
    answer: [{
            description: {type: String, required: true},
            userID: {type: String, required: true},
            isBestAnswer: {type: Boolean}
       }]
})


module.exports = mongoose.model('Forum', forumSchema);