import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import AddTask from "./Addtask";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const TaskManager = () => {
  const ref = useRef(null);

  // State for all tasks and form visibility
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // 🔹 Add New Task
  const handleAddTask = (task) => {
    const updatedTasks = [task, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowForm(false); // close form after adding
  };

  // 🔹 Edit an existing task
  const editTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast.success("Task Updated!", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
  };

  // 🔹 Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast.success("Task deleted successfully!", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
  };

  // 🔹 Toggle task completion
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // 🔹 Toggle subtask completion
  const toggleSubtask = (taskId, subIndex) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedSubtasks = [...task.subtasks];
        updatedSubtasks[subIndex].done = !updatedSubtasks[subIndex].done;
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      {/* Add Task Button + Form */}
      <div className="p-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 flex items-center gap-2 transition-transform duration-300"
        >
          {showForm ? "Cancel" : "Add Task"}
          <IoMdAddCircleOutline
            size={30}
            className={`transition-transform duration-300 ${
              showForm ? "rotate-45 text-red-600" : "rotate-0 text-white"
            }`}
          />
        </button>

        {/* Form for adding new task */}
        {showForm && <AddTask onAdd={handleAddTask} />}
      </div>

      {/* Task Grid Display */}
      <div ref={ref} className="bg-zinc-800">
        <div className="w-full h-full p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {tasks.length === 0 ? (
            // Empty state
            <div className="text-center h-[49vh] col-span-full flex justify-center items-center">
              <p className="text-4xl font-semibold text-zinc-600">
                No tasks available
              </p>
            </div>
          ) : (
            // Render each task card
            tasks.map((task) => (
              <Card
                key={task.id}
                data={task}
                reference={ref}
                editTask={editTask}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                toggleSubtask={toggleSubtask}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TaskManager;
