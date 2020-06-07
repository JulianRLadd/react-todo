import React, { useState } from "react";
import "./App.css";

function ListForm({ newItem }) {
  const [value, setValue] = useState("");
  const handleSubmit = (target) => {
    if (!value) return;
    newItem(value);
    setValue("");
    target.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="buttons">Submit</button>
    </form>
  );
}

function Todo({ todo, finish, deleteItem, index }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "red line-through" : "" }}
    >
      {todo.text}
      <section>
        <button onClick={() => finish(index)}>Done!</button>
        <button className="delete buttons" onClick={() => deleteItem(index)}>
          Delete
        </button>
      </section>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  const newItem = (text) => {
    const newTodo = [...todos, { text }];
    setTodos(newTodo);
  };
  const deleteItem = (index) => {
    const newTodo = [...todos];
    newTodo.splice(index, 1);
    setTodos(newTodo);
  };
  const finish = (index) => {
    const newTodo = [...todos];
    newTodo[index].isCompleted = true;
    setTodos(newTodo);
  };

  return (
    <div className="app">
      <h1>Items</h1>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            finish={finish}
            deleteItem={deleteItem}
          />
        ))}
        <ListForm newItem={newItem} />
      </div>
    </div>
  );
}

export default App;
