const item = require('../models/notes');

module.exports = {
    // Create a new note
    create: (req, res, next) => {
        item.create({
            heading: req.body.heading,
            content: req.body.content
        }, err => {
            if (err)
                next(err);
            else
                res.json({
                    status: "Success",
                    message: "Note created!",
                    data: null
                });
        });
    },

    // Get all notes list
    getAll: (req, res, next) => {
        let notesList = [];
        item.find({}, (err, notes) => {
            if (err) {
                next(err);
            } else {
                for (let note of notes) {
                    notesList.push({
                        id: note._id,
                        heading: note.heading,
                        content: note.content
                    });
                }
                res.json({
                    status: "Success",
                    message: "List found!",
                    data: {
                        notes: notesList
                    }
                });
            }
        });
    },

    // Get a note by ID
    getById: (req, res, next) => {
        item.findById(req.params.id, (err, result) => {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "Success",
                    message: "Note found!",
                    data: {
                        notes: result
                    }
                });
            }
        });
    },

    // Delete a note by ID
    deleteById: (req, res, next) => {
        item.findByIdAndRemove(req.params.id, err => {
            if (err)
                next(err);
            else {
                res.json({
                    status: "Success",
                    message: "Note deleted!",
                    data: null
                });
            }
        });
    },

    // Update a note by ID
    updateById: (req, res, next) => {
        item.findByIdAndUpdate(req.params.id, {
            content: req.body.content
        }, err => {
            if (err)
                next(err);
            else {
                res.json({
                    status: "Success",
                    message: "Note updated!",
                    data: null
                });
            }
        });
    },
}
