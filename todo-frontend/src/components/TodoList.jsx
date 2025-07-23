import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "../redux/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editTime, setEditTime] = useState("");

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditStart = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
    setEditTime(todo.time);
  };

  const handleEditSave = (id) => {
    if (editText && editTime) {
      dispatch(updateTodo({ id, text: editText, time: editTime }));
      setEditingId(null);
    }
  };

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="todo-item"
          style={{
            background: "#f8f8f8",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo._id)}
            />

            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <input
                  type="text"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                />
              </>
            ) : (
              <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>{todo.text}</p>
                <small style={{ color: "gray" }}>{todo.time}</small>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {editingId === todo._id ? (
              <button
                onClick={() => handleEditSave(todo._id)}
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditStart(todo)}
                style={{
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                }}
              >
                Edit
              </button>
            )}

            <button
              onClick={() => handleDelete(todo._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
