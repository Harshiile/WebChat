const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    uname: String,
    avatar: String,
    username: String
})
const userModel = mongoose.model('users', userSchema)

module.exports = { userModel }