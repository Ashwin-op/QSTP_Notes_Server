const dbURL = require('./personal.json');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(dbURL.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
const db = mongoose.connection;


db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


module.exports = db;
