import React, { useState, useEffect, useRef } from 'react';
import './app.css';

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useState<Array<string>>([]);
  let [undone, setUndone] = useState<any>(0);
  const [type, setType] = useState<string>('');

  const handleClick = () => {
    setTodoList([...todoList, type]);
    setType('');
    inputRef?.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleClickItem = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if ((e.target as HTMLLIElement).className === 'todo-item') {
      (e.target as HTMLLIElement).classList.add('strike-through');
      setUndone(undone + 1);
    } else if (
      (e.target as HTMLLIElement).className === 'todo-item strike-through'
    ) {
      (e.target as HTMLLIElement).classList.remove('strike-through');
      setUndone(undone - 1);
    }
  };

  return (
    <div className='container'>
      <h3 className='heading'>Todo List</h3>
      <div className='header'>
        <input
          ref={inputRef}
          type='text'
          value={type}
          className='header-input'
          onChange={handleChange}
        />
        <button onClick={handleClick} className='header-button'>
          Add
        </button>
      </div>
      <div className='list-todo'>
        <span className='list-todo-title'>
          There are <span className='bold'>{todoList.length - undone}</span>{' '}
          tasks left out of {todoList.length} tasks{' '}
        </span>
        <ul className='list-todo-items' id='style-1'>
          {todoList.map((item: string, index: number) => (
            <li
              onClick={handleClickItem}
              value={item}
              className='todo-item'
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
