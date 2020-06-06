const express = require('express');
const router = express.Router();
const apiController = require('../controllers/notes');

// Create a new note
router.post('/new/', apiController.create);

// Get all notes
router.get('/all/', apiController.getAll);

// Get a note by ID
router.get('/:id/', apiController.getById);

// Delete a note
router.delete('/:id/', apiController.deleteById);

// Update a note
router.put('/:id/', apiController.updateById);


module.exports = router;
