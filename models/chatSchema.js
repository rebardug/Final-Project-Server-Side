const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required:true
    },
    receiver:{
        type: String,
        required: true
    },
    message: {
        type: Date,
        default: Date.now
    },
})

module.exports=mongoose.model('posts',ChatSchema)