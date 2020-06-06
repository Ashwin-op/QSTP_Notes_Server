const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const saltRounds = 10;

// Define users schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash the user password
UserSchema.pre('save', function (next) {
    this.password = bCrypt.hashSync(this.password, saltRounds);
    next();
});


module.exports = mongoose.model('users', UserSchema);
