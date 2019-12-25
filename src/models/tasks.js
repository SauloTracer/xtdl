const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    periodicity: {
        type: Number,
        default: 0
    },
    dob: {
        type: Date,
        required: true,
        default: Date.now()
    },
    tags: {
        type: Array,
        default: []
    }
})

module.exports = Task