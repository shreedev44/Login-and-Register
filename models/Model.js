const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, required: true }
})

module.exports = mongoose.model('user', userSchema, 'users');