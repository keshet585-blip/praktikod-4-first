import React, { useEffect, useState } from 'react';
import service from './service.js';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true); // טוען את הרשימות
  const navigate = useNavigate();

  async function getTodos() {
    try {
      const result = await service.getTasks();
      // וידוא שהנתון הוא מערך
      if (Array.isArray(result)) {
        setTodos(result);
      } else {
        console.error("Expected array from API, got:", result);
        setTodos([]); // fallback למערך ריק
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  }

  async function createTodo(e) {
    e.preventDefault();
    try {
      await service.addTask(newTodo);
      setNewTodo(""); // clear input
      await getTodos(); // refresh tasks list
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  }

  async function updateCompleted(todo, isComplete) {
    try {
      await service.setCompleted(todo.id, isComplete);
      await getTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  }

  async function deleteTodo(id) {
    try {
      await service.deleteTask(id);
      await getTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) return <div>Loading tasks...</div>; // מציג בזמן טעינה

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input
            className="new-todo"
            placeholder="Well, let's take on the day"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {Array.isArray(todos) && todos.length > 0 ? (
            todos.map(todo => (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    defaultChecked={todo.isComplete}
                    onChange={(e) => updateCompleted(todo, e.target.checked)}
                  />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            ))
          ) : (
            <li>No tasks available</li>
          )}
        </ul>
      </section>
      <footer>
        כל הזכויות שמורות לנועה קשת ©️
      </footer>
    </section>
  );
}

export default App;
