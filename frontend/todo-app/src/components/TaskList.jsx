import TaskItem from "./TaskItem";
import "./TaskList.css";

// TaskList component to display a list of tasks
const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  // Empty state
  if (!tasks || tasks.length === 0) {
    return <p className="empty-text">No tasks yet</p>;
  }

  return (
    <div className="task-list">
      {/* Optional header (CSS already supports this) */}
      <div className="task-list-header">
        <h3>Your Tasks</h3>
        <span className="task-count">{tasks.length}</span>
      </div>

      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
