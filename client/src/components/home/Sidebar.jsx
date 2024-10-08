import React from "react";
import { GoTasklist } from "react-icons/go";
import { MdLabelImportant } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const data = [
    {
      title: "All task",
      icon: <GoTasklist />,
      path: "/",
    },
    {
      title: "Important Task",
      icon: <MdLabelImportant />,
      path: "/important-task",
    },
    {
      title: "Completed Task",
      icon: <GrCompliance />,
      path: "/completed-task",
    },
    {
      title: "Incomplete Task",
      icon: <FaWindowClose />,
      path: "/incompleted-task",
    },
  ];
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <div>
        <h2 className="text-xl"> {name} </h2>
        <h4 className="mb-1 text-gray-200"> {email}</h4>
        <hr />
      </div>
      <div>
        {data.map((item, i) => {
          return (
            <Link
              to={item.path}
              key={i}
              className="my-2 flex items-center gap-3 cursor-pointer hover:bg-gray-600 p-2 rounded transition-all duration-300"
            >
              <span className="text-purple-300 text-xl">{item.icon}</span>
              {item.title}
            </Link>
          );
        })}
      </div>
      <div>
        {token && (
          <button
            className="bg-gray-600 w-full p-2 rounded "
            onClick={handleLogout}
          >
            Log Out
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
