const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    Description: {
        type: string,
        default: "empty"
    }
})

module.exports=mongoose.model('Task',TaskSchema)