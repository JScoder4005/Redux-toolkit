import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { removeTodo, editTodo } from '../../features/todo/todoSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeTodo, editTodo } from '../features/todo/todoSlice';

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editedText, setEditedText] = useState('');
  const [editId, setEditId] = useState(null);

  
  const notifyError = (errorMessage) => {
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_CENTER, // Ensure this line is correct
    });
  };

  const handleEditTodo = (id, text) => {
    setEditedText(text);
    setEditId(id);
  };

  const handleUpdateTodo = () => {
    if (editedText.trim() !== '') {
      dispatch(editTodo({ id: editId, newText: editedText }));
      setEditedText('');
      setEditId(null);
    } else {
      notifyError('Please enter a valid todo.');
    }
  };

  const handleCancelEdit = () => {
    setEditedText('');
    setEditId(null);
  };

  return (
    <>
      <div>Todos</div>
      <ToastContainer />
      {todos.map((todo) => (
        <li
          className='mt-4 flex justify-between items-center bg-zinc-800 
          px-4 py-2 rounder'
          key={todo.id}
        >
          {editId === todo.id ? (
            <>
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <button onClick={handleUpdateTodo}>Update</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              {todo.text}
              <button
                onClick={() => handleEditTodo(todo.id, todo.text)}
                className='text-white bg-blue-500 border-0
                py-1 px-4 focus:outline-none hover:bg-blue-600 rounder text-md'
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className='text-white bg-red-500 border-0
                py-1 px-4 focus:outline-none hover:bg-red-600 rounder text-md'
              >
                X
              </button>
            </>
          )}
        </li>
      ))}
    </>
  );
}

export default Todos;
