import React, { useState } from "react";
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

  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);

  // Keep a snapshot of original task for canceling edits
  const [originalData, setOriginalData] = useState(() => ({
    title: data.title,
    disc: data.disc,
    dueDate: data.dueDate,
    subtasks: data.subtasks ? JSON.parse(JSON.stringify(data.subtasks)) : [],
  }));

  // Editable fields
  const [title, setTitle] = useState(originalData.title);
  const [disc, setDisc] = useState(originalData.disc);
  const [dueDate, setDueDate] = useState(originalData.dueDate);
  const [subtasks, setSubtasks] = useState(originalData.subtasks || []);
  const [newSubtask, setNewSubtask] = useState(""); // Input for new subtask

  /**
   * Save edited task details.
   * Cleans subtasks, updates local state and invokes parent callback.
   */
  const handleSave = () => {
    setIsEditing(false);
    const cleanedSubtasks = subtasks.filter((sub) => sub.name.trim() !== "");
    const updatedTask = {
      ...data,
      title,
      disc,
      dueDate,
      subtasks: cleanedSubtasks,
      updatedAt: new Date().toISOString(),
    };
    setOriginalData(updatedTask);
    editTask?.(data.id, updatedTask); // Safe call to parent update function
  };

  /**
   * Cancel edits and restore original task values.
   */
  const handleCancel = () => {
    setTitle(data.title);
    setDisc(data.disc);
    setDueDate(data.dueDate);
    setSubtasks(data.subtasks);
    setIsEditing(false);
  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      className={`rounded-3xl text-white p-4 h-fit flex flex-col justify-between ${
        isExpired ? "bg-zinc-800 opacity-70" : "bg-zinc-900"
      }`}
    >
      {/* Task Header: Title & Priority Badge */}
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <input
            type="text"
            className="bg-transparent border-b border-zinc-600 text-lg md:text-xl font-semibold outline-none w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        )}
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

      {/* Description Field */}
      {isEditing ? (
        <textarea
          className="bg-transparent border border-zinc-600 rounded-md p-1 text-sm md:text-base resize-none"
          value={disc}
          onChange={(e) => setDisc(e.target.value)}
        />
      ) : (
        <p className="text-sm md:text-base text-zinc-300">{disc}</p>
      )}

      {/* Due Date Field */}
      <p
        className={`text-xs md:text-sm mt-1 ${
          isExpired ? "text-red-500 font-semibold" : "text-zinc-400"
        }`}
      >
        Due:{" "}
        {isEditing ? (
          <input
            type="date"
            className="bg-transparent border-b border-zinc-600 outline-none text-white"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        ) : isExpired ? (
          "Expired"
        ) : (
          data.dueDate
        )}
      </p>
      <span className="text-xs md:text-sm mt-1 text-zinc-400">
        Created: {new Date(data.createdAt).toLocaleDateString()}
      </span>

      {/* Completion Checkbox */}
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

      {/* Subtask Editing (When isEditing is true) */}
      {isEditing
        ? subtasks.length > 0 && (
            <>
              {/* Editable Subtasks List */}
              <ul className="my-3 space-y-1 text-xs md:text-sm">
                {subtasks.map((sub, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => {
                        const updated = [...subtasks];
                        updated[i].name = e.target.value;
                        setSubtasks(updated);
                      }}
                      className="bg-transparent border-b border-zinc-600 outline-none w-full"
                    />
                    <button
                      onClick={() => {
                        const updated = subtasks.filter(
                          (_, index) => index !== i
                        );
                        setSubtasks(updated);
                      }}
                      className="text-red-400 hover:text-red-500 text-xs"
                      title="Remove subtask"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              {/* New Subtask Input */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  placeholder="New subtask"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  className="bg-transparent border-b border-zinc-600 outline-none w-full text-xs md:text-sm"
                />
                <button
                  onClick={() => {
                    if (newSubtask.trim()) {
                      setSubtasks([
                        ...subtasks,
                        { name: newSubtask.trim(), done: false },
                      ]);
                      setNewSubtask("");
                    }
                  }}
                  className="text-green-400 text-xs hover:text-green-500"
                >
                  Add
                </button>
              </div>
            </>
          )
        : data.subtasks?.length > 0 && (
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
                  <span
                    className={sub.done ? "line-through text-zinc-500" : ""}
                  >
                    {sub.name}
                  </span>
                </li>
              ))}
            </ul>
          )}

      {/* Footer Action Buttons */}
      <div className="mt-4 border-t border-zinc-700 pt-2 flex justify-between items-center text-xs md:text-sm">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-400 hover:text-green-500"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-red-400 hover:text-red-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => !isExpired && setIsEditing(true)}
              className={`flex items-center gap-2 ${
                isExpired
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-400 hover:text-blue-400 cursor-pointer"
              }`}
              disabled={isExpired}
            >
              <MdModeEdit /> Edit
            </button>
            <button
              onClick={() => deleteTask?.(data.id)}
              className="text-gray-400 hover:text-red-400 cursor-pointer flex items-center gap-2"
            >
              <MdDelete /> Delete
            </button>
          </>
        )}
      </div>
      {/* Timestamps */}
      <div className="mt-2 flex justify-between text-[10px] sm:text-xs text-zinc-500">
        <span>Updated: {new Date(data.updatedAt).toLocaleString()}</span>
      </div>
    </motion.div>
  );
};

export default Card;
