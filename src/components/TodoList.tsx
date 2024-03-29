import { useState } from "react";
import { TodoItem } from "./TodoItem";

// Define the Todo interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState([] as Todo[]);
  const [text, setText] = useState("");

  const addTask = () => {
    // prevent adding empty tasks
    // if text is empty, return
    if (text.trim() === "") return;
    // update todos state with new task
    setTodos([
      ...todos, // spread/copy todos array
      // add new task object
      {
        id: todos.length + 1,
        text,
        completed: false,
      },
    ]);
    // clear input field / reset after adding task
    setText("");
  };

  const deleteTask = (id: number) => {
    // filter out the task with the id to be deleted
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id: number) => {
    // map through todos array
    // if todo.id is equal to id, toggle the completed property
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </>
  );
};
