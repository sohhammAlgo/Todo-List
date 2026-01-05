import { useEffect, useState } from "react";
import { API_URL } from "../api";
import "./TaskForm.css";

// TaskForm component for adding and editing tasks
const TaskForm = ({ onAdd, onUpdate, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Prefill inputs when editing
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      return alert("Please fill in all fields");
    }

    // EDIT MODE
    if (editingTask) {
      const res = await fetch(`${API_URL}/${editingTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const updatedTask = await res.json();
      onUpdate(updatedTask);
      setEditingTask(null);
    }

    // ADD MODE
    else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const newTask = await res.json();
      onAdd(newTask);
    }

    setTitle("");
    setDescription("");
  };

  return (
    <form
      className={`task-form ${editingTask ? "editing" : ""}`}
      onSubmit={submitHandler}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
      />

      {/* Buttons container required by CSS */}
      <div className="task-form-buttons">
        <button type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setEditingTask(null)}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
