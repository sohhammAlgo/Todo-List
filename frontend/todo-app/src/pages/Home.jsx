import { useEffect, useState } from "react";
import { API_URL } from "../api";
import TaskForm from "../components/Taskform";
import TaskList from "../components/TaskList";
import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  //Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  //Add new task
  const addTask = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  //Update task
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  };

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  //Toggle completed
  const toggleTask = async (task) => {
    const res = await fetch(`${API_URL}/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !task.completed,
        title: task.title,
        description: task.description,
      }),
    });

    const updated = await res.json();
    updateTask(updated);
  };

  // Stats
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="home-container">
      {/* Header */}
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Organize your work and life</p>

        <div className="task-stats">
          <div className="stat-item">
            <span>{totalCount}</span>
            <label>Total Tasks</label>
          </div>

          <div className="stat-item">
            <span>{completedCount}</span>
            <label>Completed</label>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="content-wrapper">
        <TaskForm
          onAdd={addTask}
          onUpdate={updateTask}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />

        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={setEditingTask}
        />
      </div>
    </div>
  );
};

export default Home;
