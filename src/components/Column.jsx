import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { updateTaskStatus, deleteTask } from "../api"; // Add your API delete function here

const Column = ({ status, tasks, setTasks }) => {
    // Function to update the task status locally and call the API to update it on the server
    const moveTask = async (task, newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((t) =>
                t._id === task._id ? { ...t, status: newStatus } : t
            )
        );

        try {
            await updateTaskStatus(task._id, newStatus);
        } catch (error) {
            console.log("Error while updating task status:", error);

            setTasks((prevTasks) =>
                prevTasks.map((t) =>
                    t._id === task._id ? { ...t, status: task.status } : t
                )
            );

            alert("Failed to move task. Please try again.");
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            // Call the API to delete the task
            await deleteTask(taskId);
            // Remove the task from the local state after deletion
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Failed to delete task. Please try again.");
        }
    };

    const [, dropRef] = useDrop(() => ({
        accept: "task",
        drop: (item) => moveTask(item, status),
    }));

    return (
        <div
            ref={dropRef}
            className="flex flex-col w-80 bg-gray-100 p-4 rounded-lg flex-shrink-0"
        >
            <h2 className="text-xl font-bold mb-4">{status.toUpperCase()}</h2>
            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-150px)]">
                {tasks?.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            handleDeleteTask={handleDeleteTask} // Pass down the delete handler
                        />
                    ))
                ) : (
                    <p>No tasks in this column</p>
                )}
            </div>
        </div>
    );
};

export default Column;
