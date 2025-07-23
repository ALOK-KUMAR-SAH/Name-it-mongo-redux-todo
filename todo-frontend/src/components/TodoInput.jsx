// components/TodoInput.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";

const TodoInput = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const time = new Date().toLocaleString();
    dispatch(addTodo({ text, time }));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        placeholder="Enter task"
        className="form-control mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-success w-100">Add Todo</button>
    </form>
  );
};

export default TodoInput;
