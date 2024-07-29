import React from 'react';
import TodoList from './TodoList';
import './App.css';

function App() {
  return (
    <div className='header'>
      <h1>To-Do List</h1>
      <TodoList/>
    </div>
  );
}

export default App;