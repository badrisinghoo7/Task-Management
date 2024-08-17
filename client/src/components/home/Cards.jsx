import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

const Cards = ({ home, setInputshow }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://task-backend-uaar.onrender.com/task/all"
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Function to handle task deletion
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://task-backend-uaar.onrender.com/task/delete/${id}`
      );
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to handle task completion status toggle
  const toggleTaskStatus = async (id, status) => {
    try {
      const updatedStatus = status === "Complete" ? "Incomplete" : "Complete";
      const response = await axios.patch(
        `https://task-backend-uaar.onrender.com/task/update/${id}`,
        {
          status: updatedStatus,
        }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {tasks.map((task, i) => {
        return (
          <div key={task._id}>
            <div className="p-4 border border-gray-200 rounded-xl justify-between">
              <div>
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-gray-300 my-2">{task.description}</p>
              </div>
              <div className="mt-4 flex">
                <button
                  className={`${
                    task.status === "Complete" ? "bg-green-800" : "bg-red-400"
                  } p-2 rounded-md w-3/6 `}
                  onClick={() => toggleTaskStatus(task._id, task.status)}
                >
                  {task.status}
                </button>
                <div className="text-white p-2 w-3/6 text-2xl flex justify-around rounded-md">
                  <button>
                    <CiHeart />
                  </button>
                  <button>
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteTask(task._id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {home === "true" && (
        <button
          className="flex items-center flex-col justify-center bg-gray-600 rounded-sm p-4 hover:scale-105 cursor-pointer transition-all duration-300"
          onClick={() => setInputshow("fixed")}
        >
          <IoIosAddCircleOutline className="text-5xl" />
          <h2 className="text-2xl text-gray-300">Add Task </h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
