const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    label: {
        type: String,
        required: true
    },

    dueDate: String,

    details: String,

    status: {
        type: String,
        default: "Due"
    }

});

module.exports = mongoose.model('Task', taskSchema);