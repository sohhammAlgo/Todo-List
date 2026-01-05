const Task = require('../models/tasks');
const mongoose = require('mongoose');

// Create a new task
exports.createTask = async (req, res) => {

    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {

    try {
        const tasks = await Task.find().sort({ createdAt: -1 }); //get latest tasks first
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {

    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid task ID" });
    }

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true });
        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid task ID" });
    }

    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}