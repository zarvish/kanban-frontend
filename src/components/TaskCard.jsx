import React from "react";
import {useDrag} from "react-dnd";

const TaskCard = ({task, handleDeleteTask}) => {
    const [{isDragging}, dragRef] = useDrag(() => ({
        type: "task",
        item: {...task},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    // Badge color based on task status
    const getStatusColor = (status) => {
        switch (status) {
            case "todo":
                return "bg-blue-500 text-white";
            case "in-progress":
                return "bg-yellow-500 text-white";
            case "done":
                return "bg-green-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    const handleDelete = () => {
        // Show confirmation alert before deleting
        const isConfirmed = window.confirm("Are you sure you want to delete this task?");
        if (isConfirmed) {
            handleDeleteTask(task._id); // Call the delete handler passed as a prop
        }
    };

    return (
        <div
            ref={dragRef}
            className={`bg-white p-4 rounded shadow-md relative ${
                isDragging ? "opacity-50" : ""
            }`}
        >
            {/* Delete Icon */}
            <button
                onClick={handleDelete}
                className="absolute top-2 left-2 bg-red-500 text-white py-0 px-2 rounded cursor-pointer font-semibold hover:text-red-700"
            >
              x
            </button>

            {/* Badge */}
            <span
                className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${getStatusColor(
                    task?.status
                )}`}
            >
                {task?.status.replace("-", " ").toUpperCase()}
            </span>

            {/* Task Content */}
            <h3 className="text-lg font-semibold mt-8">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
        </div>
    );
};

export default TaskCard;
