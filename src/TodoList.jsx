
import React, { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index]);
  };

  const handleUpdateTask = () => {
    if (editedTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editedTask;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditedTask('');
    }
  };

  const searchTasks = () => {
    if (searchKeyword.trim() === '') {
      return tasks;
    }
    return tasks.filter(task => task.toLowerCase().includes(searchKeyword.toLowerCase()));
  };

  return (
    <div className="todo-container">
      <h1>Todo List Application</h1>
      <form className="input-form" onSubmit={(e) => { e.preventDefault(); }}>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="button" onClick={handleAddTask}>Add Task</button>
      </form>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      <h2>Tasks</h2>
      <ul className="tasks-list">
        {searchTasks().map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={handleUpdateTask}>Update</button>
              </>
            ) : (
              <>
                {task}
                <button onClick={() => handleEditTask(index)}>Edit</button>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
