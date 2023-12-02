const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: String,
    password: String
});
const User = mongoose.model('Users', userSchema);

const newsSchema = new mongoose.Schema({
    title: String,
    text: String
});
const New = mongoose.model('New', newsSchema);

module.exports = {User, New};