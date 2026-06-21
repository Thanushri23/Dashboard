const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const auth = require('../middleware/auth');

// ✅ GET leaves
// Admins see all leaves, employees see only their own
router.get('/', auth, async (req, res) => {
  try {
    let leaves;
    if (req.user.role === 'admin') {
      leaves = await Leave.find().populate('userId', 'name email role position');
    } else {
      leaves = await Leave.find({ userId: req.user.id }).populate('userId', 'name email role position');
    }
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching leaves" });
  }
});

// ✅ APPLY for leave
router.post('/', auth, async (req, res) => {
  try {
    const leave = new Leave({
      ...req.body,
      userId: req.user.id
    });

    await leave.save();
    res.json(leave);
  } catch (err) {
    res.status(500).json({ msg: "Error applying for leave" });
  }
});

// ✅ UPDATE leave status (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: "Not authorized to update leave status" });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ msg: "Leave not found" });
    }

    res.json(updatedLeave);
  } catch (err) {
    res.status(500).json({ msg: "Error updating leave status" });
  }
});

module.exports = router;
