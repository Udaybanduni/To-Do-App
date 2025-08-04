import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on first render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add Task
  const addTask = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask('');
  };

  // Delete Task
  const deleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Toggle Completed
  const toggleComplete = (index) => {
    const updatedTodos = todos.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h1 className="heading">To-Do App</h1>

      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {todos.map((t, i) => (
          <li key={i} className={t.completed ? 'completed' : ''}>
            {t.text}
            <button
              onClick={() => toggleComplete(i)}
              style={{ backgroundColor: t.completed ? 'orange' : 'green' }}
            >
              {t.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => deleteTask(i)}
              style={{ backgroundColor: 'red', marginLeft: '10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
