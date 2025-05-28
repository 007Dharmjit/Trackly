"use client";

import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import AddTask from "./Addtask";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
const TaskManager = () => {
  const ref = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save to localStorage
  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const handleAddTask = (task) => {
    const updatedTasks = [task, ...tasks]; // create updated array
    setTasks(updatedTasks); // update state
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // save updated tasks
    setShowForm(!showForm);
  };
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task deleted successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleSubtask = (taskId, subIndex) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedSubtasks = [...task.subtasks];
        updatedSubtasks[subIndex] = {
          ...updatedSubtasks[subIndex],
          done: !updatedSubtasks[subIndex].done,
        };
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <div className=" p-4 ">
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 cursor-pointer flex items-center gap-2 transition-transform duration-300"
        >
          {showForm ? "Cancel" : "Add Task"}
          <IoMdAddCircleOutline
            size={30}
            className={`transform transition-transform duration-300 ${
              showForm ? "rotate-45 text-red-600" : "rotate-0 text-white"
            }`}
          />
        </button>

        {showForm && <AddTask onAdd={handleAddTask} />}
      </div>

      <div ref={ref} className="bg-zinc-800">
        <div className="w-full h-full p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {tasks.length === 0 ? (
            <div className="text-center h-[49vh] col-span-full items-center flex justify-center">
              <p className=" text-4xl font-semibold text-zinc-600">No tasks available</p>
            </div>
          ) : (
            tasks.map((task) => (
              <Card
                key={task.id}
                data={task}
                reference={ref}
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
