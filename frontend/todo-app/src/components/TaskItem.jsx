import React from "react";
import "./TaskItem.css";

// TaskItem component to display individual tasks
const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  if (!task) return null;

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content" onClick={() => onToggle(task)}>
        <h4>{task.title}</h4>

        {task.description && (
          <p className="task-desc">{task.description}</p>
        )}
      </div>

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          ✏️
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
          title="Delete task"
        >
          ❌
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
