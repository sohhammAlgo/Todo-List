const express = require('express');
const router = express.Router();

// Import controller functions
const {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask
} = require('../controllers/taskControllers');

// Define routes and associate them with controller functions
router.post('/',createTask);
router.get('/',getAllTasks);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);

module.exports = router;

