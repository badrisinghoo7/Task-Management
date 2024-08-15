import React from "react";
import { RxCross2 } from "react-icons/rx";
const InputData = ({ inputshow, setInputshow }) => {
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
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 w-full rounded my-3"
          />
          <textarea
            name="description"
            cols="30"
            rows="17"
            placeholder="Ender Description..."
            className="px-3 py-2 w-full rounded bg-gray-700 my-3 "
          ></textarea>
          <button className="px-4 py-2 bg-blue-600 rounded text-black  text-xl font-semibold mx-2  ">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
