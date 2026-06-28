import { useState, useEffect } from "react";
import API from "../services/api";

function TaskForm({ fetchTasks, editTask, setEditTask }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (editTask) {
      setTask({
        title: editTask.title,
        description: editTask.description,
        priority: editTask.priority,
        status: editTask.status,
        dueDate: editTask.dueDate
          ? editTask.dueDate.split("T")[0]
          : "",
      });
    }
  }, [editTask]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setTask({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
    });

    setEditTask(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editTask) {
        // UPDATE TASK
        await API.put(`/tasks/${editTask._id}`, task);
        alert("Task Updated Successfully!");
      } else {
        // ADD TASK
        await API.post("/tasks", task);
        alert("Task Added Successfully!");
      }

      resetForm();
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">
        {editTask ? "Update Task" : "Add Task"}
      </h2>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Task Title
        </label>

        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={task.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Description
        </label>

        <textarea
          name="description"
          placeholder="Enter task description"
          value={task.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full rounded-lg border border-gray-300 p-3 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Priority
          </label>

          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Status
          </label>

          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Due Date
        </label>

        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
        >
          {editTask ? "Update Task" : "Add Task"}
        </button>

        {editTask && (
          <button
            type="button"
            onClick={resetForm}
            className="flex-1 rounded-lg bg-gray-500 py-3 text-white font-semibold hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;