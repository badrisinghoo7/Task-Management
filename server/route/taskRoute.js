const express = require("express");
const { taskModel } = require("../model/task.model");
const { auth } = require("../middleware/authMiddleware");
const taskRouter = express.Router();

// 1. Task Creation: Create a new task
taskRouter.post("/create", auth, async (req, res) => {
  try {
    const task = new taskModel({
      ...req.body,
      user: req.user._id, // Associate the task with the logged-in user
    });
    await task.save();
    res.status(201).send({ msg: "Task created successfully", task });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Failed to create task", error: error.message });
  }
});

// 2. Task List: Get all tasks with pagination
taskRouter.get("/all", auth, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tasks = await taskModel
      .find({ user: req.user._id })
      .skip(skip)
      .limit(limit);
    const totalTasks = await taskModel.countDocuments({ user: req.user._id });
    const totalPages = Math.ceil(totalTasks / limit);

    res.send({
      tasks,
      currentPage: page,
      totalPages,
      totalTasks,
    });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Failed to retrieve tasks", error: error.message });
  }
});

// 3. Task Details: Get details of a specific task
taskRouter.get("/details/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }

    const currentDate = new Date();
    const dueDate = new Date(task.dueDate);
    let statusMessage = "";

    if (dueDate < currentDate) {
      statusMessage = "This task is overdue.";
    } else if (
      dueDate.getDate() === currentDate.getDate() &&
      dueDate.getMonth() === currentDate.getMonth() &&
      dueDate.getFullYear() === currentDate.getFullYear()
    ) {
      statusMessage = "This task is due today.";
    } else {
      statusMessage = `This task is due on ${dueDate.toDateString()}.`;
    }

    res.send({
      task,
      statusMessage,
    });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Failed to retrieve task details", error: error.message });
  }
});

// 4. Task Editing: Update an existing task
taskRouter.patch("/update/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await taskModel.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }

    res.status(200).send({ msg: "Task updated successfully", task });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Failed to update task", error: error.message });
  }
});

// 5. Task Deletion: Delete a task with confirmation
taskRouter.delete("/delete/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }

    res.status(200).send({ msg: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Failed to delete task", error: error.message });
  }
});

// 6. Task Status Update: Update the status of a task
taskRouter.patch("/status/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await taskModel.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }

    res.status(200).send({ msg: "Task status updated successfully", task });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Failed to update task status", error: error.message });
  }
});

module.exports = { taskRouter };
