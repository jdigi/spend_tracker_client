import { useState } from "react";

// Define the Todo interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define the TodoItemProps interface
interface TodoItemProps {
  todo: Todo;
  deleteTask: (id: number) => void;
  toggleCompleted: (id: number) => void;
}

export const TodoItem = ({
  todo,
  deleteTask,
  toggleCompleted,
}: TodoItemProps) => {
  const [completed, setCompleted] = useState(todo.completed);

  const handleToggle = () => {
    toggleCompleted(todo.id);
    setCompleted(!completed);
  };

  return (
    <li>
      <span
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
        onClick={handleToggle}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTask(todo.id)}>Delete</button>
    </li>
  );
};
