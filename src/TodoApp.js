import React, { useState } from "react";

const TodoApp = () => {
  const initialState = {
    id: 1,
    taskName: "Do walk",
  };

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([initialState]);
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: tasks.length + 1,
        taskName: input,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTask(taskToEdit);
    setInput(taskToEdit.taskName);
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    if (input.trim() !== "") {
      const updatedTasks = tasks.map((task) =>
        task.id === editTask.id ? { ...task, taskName: input } : task
      );
      setTasks(updatedTasks);
      setInput("");
      setEditMode(false);
      setEditTask(null);
    }
  };

  return (
    <div>
      <h1 className="bg-black text-white p-2 m-2 rounded font-bold text-2xl text-center">
        TO DO APP
      </h1>

      <div className="text-center mt-5">
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="text-lg font-bold">Add a task : </label>
          <input
            className="border border-black px-2 m-2 rounded"
            placeholder="Enter a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {editMode ? (
            <button
              className="bg-black text-white p-2 mx-2 rounded"
              onClick={handleSaveEdit}
            >
              SAVE
            </button>
          ) : (
            <button
              className="bg-black text-white p-2 mx-2 rounded"
              onClick={handleAddTask}
            >
              ADD
            </button>
          )}
        </form>
      </div>

      <div className="mt-5 text-center">
        <h2 className="text-lg font-bold">Tasks:</h2>
        <ul>
          {tasks.map((task) => (
            <div className="flex justify-center m-2 p-2 items-center">
              <li key={task.id}>{task.taskName}</li>
              <button
                onClick={() => handleEdit(task.id)}
                className="bg-black text-white p-1 px-2 mx-2  mr-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-black text-white p-1 px-2 mx-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
