// ======================
// Recipe Schema/Model
// ======================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);