import { useEffect, useState } from "react";
import API from "./services/api";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Error deleting task");
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          📋 Task Tracker
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <TaskForm
              fetchTasks={fetchTasks}
              editTask={editTask}
              setEditTask={setEditTask}
            />
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">
              My Tasks
            </h2>

            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center">
                No Tasks Found
              </p>
            ) : (
              <div className="space-y-5">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="border rounded-lg p-5 hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-bold text-gray-800">
                      {task.title}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {task.description}
                    </p>

                    <div className="flex justify-between items-center mt-4">

                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          task.priority === "High"
                            ? "bg-red-500"
                            : task.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      >
                        {task.priority}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          task.status === "Completed"
                            ? "bg-green-600"
                            : task.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-4">
                      <strong>Due Date:</strong>{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No Date"}
                    </p>

                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => handleEdit(task)}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
                      >
                        ✏ Edit
                      </button>

                      <button
                        onClick={() => deleteTask(task._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                      >
                        🗑 Delete
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;