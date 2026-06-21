const express = require('express');
const router = express.Router();
const Task = require('../models/Tasks');
const auth = require('../middleware/auth');

// ✅ GET tasks
router.get('/', auth, async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.find().populate('userId', 'name email');
    } else {
      tasks = await Task.find({ userId: req.user.id }).populate('userId', 'name email');
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
});

// ✅ ADD task
router.post('/', auth, async (req, res) => {
  try {
    // Admin can specify a userId, otherwise it defaults to the logged-in user
    const taskUserId = (req.user.role === 'admin' && req.body.userId) ? req.body.userId : req.user.id;
    
    const task = new Task({
      ...req.body,
      userId: taskUserId
    });

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error adding task" });
  }
});

// ✅ DELETE task
router.delete('/:id', auth, async (req, res) => {
  try {
    const query = { _id: req.params.id };
    if (req.user.role !== 'admin') {
      query.userId = req.user.id; // Non-admins can only delete their own
    }

    const task = await Task.findOneAndDelete(query);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Error deleting task" });
  }
});

// ✅ UPDATE task
router.put('/:id', auth, async (req, res) => {
  try {
    const query = { _id: req.params.id };
    if (req.user.role !== 'admin') {
      query.userId = req.user.id; // Non-admins can only update their own
    }

    const updatedTask = await Task.findOneAndUpdate(
      query,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(updatedTask);

  } catch (err) {
    res.status(500).json({ msg: "Error updating task" });
  }
});

module.exports = router;