// routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
  updateTodo
} = require("../controllers/todoController");

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.delete("/todos/:id", deleteTodo);
router.put("/todos/:id/toggle", toggleTodo);
router.put("/todos/:id", updateTodo);

module.exports = router;
