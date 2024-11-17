// CreateTaskModal.js
import React from "react";
import CreateTaskForm from "./CreateTaskForm"; // Import the form component

const CreateTaskModal = ({ isOpen, closeModal, setTasks }) => {
    if (!isOpen) return null; // Don't render if the modal is not open

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Create a New Task</h2>
                <CreateTaskForm setTasks={setTasks} closeModal={closeModal} />
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default CreateTaskModal;
