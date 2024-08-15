import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AllTasks from "../pages/AllTasks";
import CompletedTask from "../pages/CompletedTask";
import IncompleteTask from "../pages/IncompleteTask";
import ImportantTask from "../pages/ImportantTask";

const AllRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<AllTasks />} />
      <Route path="/completed-task" element={<CompletedTask />} />
      <Route path="/incompleted-task" element={<IncompleteTask />} />
      <Route path="/important-task" element={<ImportantTask />} />
    </Routes>
  );
};

export default AllRoutes;
