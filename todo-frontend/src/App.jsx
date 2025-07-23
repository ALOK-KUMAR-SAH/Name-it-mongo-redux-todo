// App.jsx
import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Redux MongoDB Todo</h2>
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default App;
