import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
const Cards = ({ home, setInputshow }) => {
  const data = [
    {
      title: "Task Management System",
      description:
        "A project management tool that helps teams organize tasks, set priorities, and manage workloads efficiently.",
      status: "Complete",
    },
    {
      title: "Online Portfolio Builder",
      description:
        "A web application that allows users to create and customize their portfolios. It includes various templates.",
      status: "Incomplete",
    },
    {
      title: "Timezone Converter",
      description:
        "An intuitive application that allows users to convert time across different time zones. ",
      status: "Incomplete",
    },
    {
      title: "E-commerce Product Page",
      description:
        "A dynamic and responsive product page for an online store. The page features product details,.",
      status: "Incomplete",
    },
    {
      title: "Virtual Event Platform",
      description:
        "An interactive platform designed for hosting virtual events, webinars, and conferences.",
      status: "Complete",
    },
  ];
  const [important, setImportant] = useState("Incomplete");

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data.map((item, i) => {
        return (
          <div>
            <div className="p-4 border border-gray-200 rounded-xl justify-between">
              <div key={i}>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-300 my-2">{item.description}</p>
              </div>
              <div className="mt-4 flex">
                <button
                  className={`${
                    item.status === "Complete" ? "bg-green-800" : "bg-red-400"
                  } p-2 rounded-md w-3/6 `}
                >
                  {item.status}
                </button>
                <div className="text-white p-2 w-3/6 text-2xl flex justify-around rounded-md">
                  <button>
                    <CiHeart />
                  </button>
                  <button>
                    <FaEdit />
                  </button>
                  <button>
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
