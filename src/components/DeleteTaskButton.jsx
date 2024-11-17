// DeleteTaskButton.js
import React from "react";
import { deleteTask } from "../api"; // Import the API call to delete a task

const DeleteTaskButton = ({ task, setTasks }) => {
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );
        if (confirmDelete) {
            try {
                await deleteTask(task._id); // Call the API to delete the task
                setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
            Delete Task
        </button>
    );
};

export default DeleteTaskButton;
