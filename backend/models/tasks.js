const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = mongoose.Schema({
    'title': {type:String,
        required:true},
    'description': String,
    'completed':{type:Boolean,
        default:false},
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Task', taskSchema);