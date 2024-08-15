import React from "react";
import Sidebar from "../components/home/Sidebar";
import AllRoutes from "../allRoutes/AllRoutes";

const Home = () => {
  return (
    <div className="flex h-[98vh] gap-4">
      <div className="bg-gray-700 w-2/6 border border-gray-600 rounded p-4 flex flex-col justify-between">
        <Sidebar />
      </div>
      <div className="bg-gray-800 w-5/6 border border-gray-600 rounded p-4">
        <AllRoutes />
      </div>
    </div>
  );
};

export default Home;
