const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const router = express.Router();

// CREATE a new task
router.post("/add", async (req, res) => {
  try {
    const { name, description, link } = req.body;

    const task = new Task({ name, description, link });
    await task.save();

    return res.status(201).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// READ all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/user/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Fetch tasks associated with the user's ObjectId
      const tasks = await Task.find({ link: userId });
  
      return res.json(tasks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

// READ a single task by ID
router.get("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE a task by ID
router.put("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { name, description, link } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { name, description, link },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findByIdAndRemove(taskId);

    if (!task) {
      return res.status(200).json({ message: "No Task Found" });
    }

    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
