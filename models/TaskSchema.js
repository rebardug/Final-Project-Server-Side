const { number } = require('@hapi/joi')
const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    Description: {
        type: String,
        default: "empty"
    }
})

module.exports=mongoose.model('task',TaskSchema)