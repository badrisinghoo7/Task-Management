import React, { useState } from "react";
import Cards from "../components/home/Cards";
import { IoIosAddCircleOutline } from "react-icons/io";
import InputData from "../components/home/inputData";

const AllTasks = () => {
  const [inputshow, setInputshow] = useState("hidden");
  return (
    <>
      <div className="2-full flex justify-end p-4 py-2">
        <button onClick={() => setInputshow("fixed")}>
          <IoIosAddCircleOutline className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
        </button>
      </div>
      <Cards home={"true"} setInputshow={setInputshow} />
      <InputData inputshow={inputshow} setInputshow={setInputshow} />
    </>
  );
};

export default AllTasks;
