// // Mock API for demo purposes
//
// const dummyTasks = [
//     { _id: "1", title: "Task 1", description: "Description of Task 1", status: "todo" },
//     { _id: "2", title: "Task 2", description: "Description of Task 2", status: "in-progress" },
//     { _id: "3", title: "Task 3", description: "Description of Task 3", status: "completed" },
// ];
//
// export const fetchTasks = () =>
//     new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({ data: dummyTasks });
//         }, 500); // Simulate network delay
//     });
//
// export const addTask = (task) =>
//     new Promise((resolve) => {
//         setTimeout(() => {
//             const newTask = { ...task, _id: Date.now().toString() };
//             dummyTasks.push(newTask);
//             resolve({ data: newTask });
//         }, 500);
//     });
//
// export const updateTask = (id, updatedTask) =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const index = dummyTasks.findIndex((task) => task._id === id);
//             if (index !== -1) {
//                 dummyTasks[index] = { ...dummyTasks[index], ...updatedTask };
//                 resolve({ data: dummyTasks[index] });
//             } else {
//                 reject(new Error("Task not found"));
//             }
//         }, 500);
//     });
//
// export const deleteTask = (id) =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const index = dummyTasks.findIndex((task) => task._id === id);
//             if (index !== -1) {
//                 const deletedTask = dummyTasks.splice(index, 1);
//                 resolve({ data: deletedTask });
//             } else {
//                 reject(new Error("Task not found"));
//             }
//         }, 500);
//     });



// api.js
import axios from 'axios';

const apiUrl = "http://localhost:8000/api"; // Replace with your actual API URL

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