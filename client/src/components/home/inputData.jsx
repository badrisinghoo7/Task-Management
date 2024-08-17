import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const InputData = ({ inputshow, setInputshow }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const id = localStorage.getItem("id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://task-backend-uaar.onrender.com/task/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            dueDate,
            status,
            priority,
            user: id, // replace with actual user ID
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        return;
      }

      const data = await response.json();
      console.log("Task created successfully:", data);
      setInputshow("hidden"); // Close the form on successful submission
    } catch (error) {
      console.error("Error submitting the task:", error);
    }
  };

  return (
    <>
      <div
        className={`${inputshow} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${inputshow} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 h-[90vh] p-4 rounded">
          <div className="flex justify-end">
            <button className="text-2xl" onClick={() => setInputshow("hidden")}>
              <RxCross2 />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 w-full rounded my-3 text-black placeholder:text-black"
              required
            />
            <textarea
              name="description"
              cols="30"
              rows="10"
              placeholder="Enter Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 w-full rounded bg-gray-700 my-3"
              required
            ></textarea>
            <input
              type="date"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-3 py-2 w-full rounded my-3"
              required
            />
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 w-full rounded bg-gray-700 my-3"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3 py-2 w-full rounded bg-gray-700 my-3"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded text-black text-xl font-semibold mx-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputData;
