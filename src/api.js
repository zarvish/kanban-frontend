// api.js
import axios from 'axios';

const apiUrl = "https://kanban-backend-w6fo.onrender.com/api"; // Replace with your actual API URL

// Fetch all tasks
export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${apiUrl}/task`);
        return response;
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

// Update task status
export const updateTaskStatus = async (taskId, newStatus) => {
    try {
        const response = await axios.put(`${apiUrl}/task/${taskId}`, { status: newStatus });
        return response.data;
    } catch (error) {
        console.error("Error updating task status:", error);
        throw error; // We throw error to handle rollback in UI
    }
};


// Create a new task
export const createTask = async (taskData) => {
    try {
        const response = await axios.post(`${apiUrl}/task`, taskData);
        return response.data; // Return the created task
    } catch (error) {
        console.error("Error creating task:", error);
        throw error; // Throw error to handle it in the component
    }
};

// Delete a task
export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${apiUrl}/task/${taskId}`);
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error; // Throw error to handle it in the component
    }
};