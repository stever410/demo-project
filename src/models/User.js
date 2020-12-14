const mongoose = require('mongoose');

const UserScema = new mongoose.Schema({
    email: {
        type: 'String',
        required: true
    },
    name: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    created_at: {
        type: 'Date',
        default: Date.now()
    },
    updated_at: {
        type: 'Date',
        default: Date.now()
    }
})


module.exports = mongoose.model('User', UserScema);