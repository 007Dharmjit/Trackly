import { useState } from "react";
import { toast } from "react-toastify";

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [subtasks, setSubtasks] = useState([{ name: "", done: false }]);

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setPriority("Medium");
    setDueDate("");
    setSubtasks([{ name: "", done: false }]);
  };

  const generateRandomId = () => {
    const randomFiveDigit = Math.floor(10000 + Math.random() * 90000);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    return randomFiveDigit * currentTimeInSeconds;
  };

  const handleSubtaskChange = (index, value) => {
    const updated = [...subtasks];
    updated[index].name = value;
    setSubtasks(updated);
  };

  const addSubtaskField = () => {
    setSubtasks([...subtasks, { name: "", done: false }]);
  };

  const removeSubtaskField = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !desc || !dueDate) {
      toast.error("Please fill Title, Description, and Due Date", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    const timestamp = new Date().toISOString();

    const newTask = {
      id: generateRandomId(),
      title,
      disc: desc,
      priority,
      dueDate,
      completed: false,
      createdAt: timestamp,
      updatedAt: timestamp,
      subtasks: subtasks
        .filter((st) => st.name.trim() !== "")
        .map((st) => ({ name: st.name.trim(), done: false })),
    };

    onAdd(newTask);
    toast.success("Task added successfully!", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-4 sm:p-5 rounded-xl mb-5 w-full max-w-4xl mx-auto text-white"
    >
      <h3 className="text-lg sm:text-xl mb-4 font-semibold">Add New Task</h3>

      {/* Title, Due Date, and Priority */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full sm:flex-1 p-2 rounded-md bg-zinc-800 border border-zinc-700"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full sm:w-auto p-2 rounded-md bg-zinc-800 border border-zinc-700"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full sm:w-auto p-2 rounded-md bg-zinc-800 border border-zinc-700"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Description */}
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 mb-4 resize-none"
        rows={3}
      />

      {/* Subtasks */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Subtasks</label>
        {subtasks.map((subtask, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={subtask.name}
              onChange={(e) => handleSubtaskChange(index, e.target.value)}
              className="flex-1 p-2 rounded-md bg-zinc-800 border border-zinc-700"
              placeholder={`Subtask ${index + 1}`}
            />
            {subtasks.length > 1 && (
              <button
                type="button"
                onClick={() => removeSubtaskField(index)}
                className="px-2 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addSubtaskField}
          className="mt-1 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
        >
          + Add Subtask
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full sm:w-auto bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
