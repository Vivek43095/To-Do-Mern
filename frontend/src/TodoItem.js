import React, { useState } from 'react';
import './App.css'

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = () => {
    onUpdate(todo._id, { ...todo, completed: !todo.completed });
  };

  const handleDelete = () => {
    onDelete(todo._id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo._id, { ...todo, text: editText });
    setIsEditing(false);
  };

  return (
    <div className='container'>
      {isEditing ? (
        <input
          value={editText}
          onChange={e => setEditText(e.target.value)}
          className='text'
        />
      ) : (
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <button onClick={handleSave} className='save'>Save</button>
      ) : (
        <button onClick={handleEdit} className='edit'>Edit</button>
      )}
      <button onClick={handleToggle} className='mark'>
        {todo.completed ? 'Unmark' : 'Mark'}
      </button>
      <button onClick={handleDelete} className="delete">Delete</button>

    </div>
  );
};

export default TodoItem;