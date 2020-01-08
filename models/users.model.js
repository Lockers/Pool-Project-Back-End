const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: { type: String, required: true, trim: true },
    role: { type: String, required: false, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
}, {
    timestamps: true,
});

const User = mongoose.model('Users', usersSchema);

module.exports = User;