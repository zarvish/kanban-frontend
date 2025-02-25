// CreateTaskForm.js
import React, { useState } from "react";
import {createTask, fetchTasks} from "../api"; // Import API call to create task

const CreateTaskForm = ({ setTasks, closeModal,loadTasks }) => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("todo"); // Default to "todo"

    const handleSubmit = async (e) => {
        e.preventDefault();

        // // Optimistically update the task list with the new task
        const newTask = { title, status };

        try {
            // Call API to create the task
            await createTask(newTask);
            loadTasks()
            closeModal(); // Close modal after task creation
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
                Create Task
            </button>
        </form>
    );
};

export default CreateTaskForm;
