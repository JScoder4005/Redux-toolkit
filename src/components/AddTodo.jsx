import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';

function AddTodo() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      setError('Please enter a valid Todo.');
      return;
    }

    dispatch(addTodo(input));
    setInput('');
    setError('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError(''); // Clear error when user starts entering a todo
  };

  return (
    <form onSubmit={addTodoHandler} className='space-x3 mt-12'>
      <input
        type="text"
        className='bg-gray-800 border border-gray-700
        focus:border-indigo-500
        focus:ring-2'
        placeholder='Enter a Todo...'
        value={input}
        onChange={handleInputChange}
      />
      <button
        type='submit'
        className='text-white bg-indigo-500 border-0 py-2
        px-5 focus:outline-none hover:bg-indigo-600
        rounded text-lg'
      >
        Add Todo
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default AddTodo;
