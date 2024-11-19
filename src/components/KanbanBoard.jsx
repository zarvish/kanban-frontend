
// KanbanBoard.js
import React, { useState, useEffect } from "react";
import Column from "./Column";
import CreateTaskModal from "./CreateTaskModal"; // Import modal component
import { fetchTasks, createTask } from "../api"; // Fetch tasks from the API

const KanbanBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const loadTasks = async () => {
        const response = await fetchTasks();
        setTasks(response?.data?.response?.data); // Setting the tasks fetched from the API
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const columns = ["in-progress", "todo", "completed"];

    // Open the modal
    const openModal = () => setIsModalOpen(true);

    // Close the modal
    const closeModal = () => setIsModalOpen(false);

    // Function to handle adding a new task
    const handleCreateTask = async (newTask) => {
        try {
            // Assuming `createTask` is an API call to create a new task
            const response = await createTask(newTask); // Create new task via API
            const createdTask = response.data.response.data;
            console.log('created taks',createdTask)

            // Optimistically update the tasks array with the newly created task
            setTasks((prevTasks) => [...prevTasks, createdTask]);

            // Close the modal after creation
            closeModal();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen p-4 lg:items-center">
            <h1 className="text-2xl font-bold mb-4 text-center">Kanban Board</h1>

            {/* Create Task Button */}
            <button
                onClick={openModal}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600"
            >
                Create New Task
            </button>

            {/* Modal to create new task */}
            <CreateTaskModal
                loadTasks={loadTasks}
                setTasks={setTasks}
                isOpen={isModalOpen}
                closeModal={closeModal}
                handleCreateTask={handleCreateTask} // Passing the create task handler
            />

            <div className="flex space-x-4 overflow-x-auto">
                {columns.map((status) => (
                    <Column
                        key={status}
                        status={status}
                        tasks={tasks?.filter((task) => task.status === status)} // Filter tasks based on status
                        setTasks={setTasks} // Pass down setTasks to handle updates
                    />
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
