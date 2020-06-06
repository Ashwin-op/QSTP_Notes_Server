const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define notes schema
const notesSchema = new Schema({
    heading: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('notes', notesSchema)
