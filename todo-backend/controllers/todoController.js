// controllers/todoController.js
const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { text, time } = req.body;
    if (!text || !time) return res.status(400).json({ error: "Text and time are required" });

    const newTodo = new Todo({ text, time });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

exports.toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch {
    res.status(500).json({ error: "Failed to toggle todo" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { text, time } = req.body;
    const updated = await Todo.findByIdAndUpdate(req.params.id, { text, time }, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update todo" });
  }
};
