"use client";

import React from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

const Card = ({
  data,
  reference,
  editTask,
  deleteTask,
  toggleComplete,
  toggleSubtask,
}) => {
  const isExpired = new Date(data.dueDate) < new Date();

  return (
    <motion.div
      drag
      dragConstraints={reference}
      className={`rounded-3xl text-white p-4 flex flex-col justify-between h-fit ${
        isExpired ? "bg-zinc-800 opacity-70" : "bg-zinc-900"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="title text-lg md:text-xl font-semibold">{data.title}</h2>
        <span
          className={`px-2 py-1 rounded-full text-xs md:text-sm font-bold ${
            data.priority === "High"
              ? "bg-red-600"
              : data.priority === "Medium"
              ? "bg-yellow-500"
              : "bg-green-600"
          }`}
        >
          {data.priority}
        </span>
      </div>

      <p className="text-sm md:text-base text-zinc-300">{data.disc}</p>
      <p
        className={`text-xs md:text-sm mt-1 ${
          isExpired ? "text-red-500 font-semibold" : "text-zinc-400"
        }`}
      >
        Due: {isExpired ? "Expired" : data.dueDate}
      </p>

      <div className="flex items-center gap-2 mt-3 text-sm">
        <input
          type="checkbox"
          checked={data.completed}
          onChange={() => !isExpired && toggleComplete(data.id)}
          disabled={isExpired}
          className="accent-green-400 cursor-pointer disabled:cursor-not-allowed"
        />
        <span className={data.completed ? "line-through text-zinc-500" : ""}>
          {data.completed ? "Completed" : "Mark as Done"}
        </span>
      </div>

      {data.subtasks?.length > 0 && (
        <ul className="my-3 space-y-1 text-xs md:text-sm">
          {data.subtasks.map((sub, i) => (
            <li key={i} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sub.done}
                onChange={() => !isExpired && toggleSubtask(data.id, i)}
                disabled={isExpired}
                className="cursor-pointer disabled:cursor-not-allowed"
              />
              <span className={sub.done ? "line-through text-zinc-500" : ""}>
                {sub.name}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 border-t border-zinc-700 pt-2 flex justify-between items-center text-xs md:text-sm">
        <button
          onClick={() => !isExpired && editTask?.(data.id)}
          className={`flex items-center gap-2 ${
            isExpired
              ? "text-gray-500 cursor-not-allowed"
              : "text-gray-400 hover:text-blue-400 cursor-pointer"
          }`}
          disabled={isExpired}
        >
          <MdModeEdit />
          Edit
        </button>
        <button
          onClick={() => deleteTask?.(data.id)}
          className="text-gray-400 hover:text-red-400 cursor-pointer flex items-center gap-2"
        >
          <MdDelete />
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default Card;
