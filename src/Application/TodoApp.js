import React, { useEffect, useRef, useState } from "react";

const TodoApp = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const itemDrag = useRef(null);
  const itemDragover = useRef(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        taskName: input,
        checked: false,
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

  function handlecleartask() {
    setTasks([]);
  }

  function handleSort() {
    const itemClone = [...tasks];
    [itemClone[itemDrag.current], itemClone[itemDragover.current]] = [
      itemClone[itemDragover.current],
      itemClone[itemDrag.current],
    ];
    setTasks(itemClone);
  }

  const handleChecked = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, checked: !task.checked };
        }
        return task;
      });
    });
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
            className="border border-black px-2 m-2 rounded "
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
          <button
            onClick={handlecleartask}
            className="bg-black text-white p-2 mx-2 rounded"
          >
            Clear Task
          </button>
        </form>
      </div>

      <div className="mt-5 text-center ">
        <h2 className="text-lg font-bold mb-2">Tasks:</h2>
        <ol>
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="relative flex space-x-3 justify-center m-2 p-2 items-center cursor-grab "
              draggable
              onDragStart={() => (itemDrag.current = index)}
              //onDragEnter={() => (itemDragover.current = index)}
              onDragEnd={handleSort}
              onDragOver={() => {
                itemDragover.current = index; // Update itemDragover.current when dragged over
              }}
            >
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => handleChecked(task.id)}
                className="bg-black text-xl text-white p-1 px-2 mx-2 rounded"
              />
              <li className={task.checked ? "line-through text-gray-500" : ""}>
                {index + 1}. {task.taskName}
              </li>
              {!task.checked && (
                <button
                  onClick={() => handleEdit(task.id)}
                  className="bg-black text-white p-1 px-2 mx-2  mr-1 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-black text-white p-1 px-2 mx-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TodoApp;
