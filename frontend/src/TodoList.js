import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(err => {
        console.error(err);
        setError('Error fetching todos. Please try again later.');
      });
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:5000/todos', { text })
      .then(response => {
        setTodos([...todos, response.data]);
        setText('');
      })
      .catch(err => {
        console.error(err);
        setError('Error adding todo. Please try again later.');
      });
  };

  const updateTodo = (id, updatedTodo) => {
    axios.put(`http://localhost:5000/todos/${id}`, updatedTodo)
      .then(response => {
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      })
      .catch(err => {
        console.error(err);
        setError('Error updating todo. Please try again later.');
      });
  };

  const deleteTodo = id => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => {
        console.error(err);
        setError('Error deleting todo. Please try again later.');
      });
  };

  return (
    <div >
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input value={text} onChange={e => setText(e.target.value)} placeholder='Add task...' className='input' />
      <button onClick={addTodo} className="button">Add</button>
      <div>
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;