import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addSubTask } from "../../store/slice/subTask.slice";

function AddSubTask({ next }) {
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.task);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [subTaskDescription, setSubTaskDescription] = useState("");

  const handleAddSubTask = (e) => {
    e.preventDefault();
    dispatch(
      addSubTask(task._id, {
        title: subTaskTitle,
        description: subTaskDescription,
      }),
    );
    next();
  };
  return (
    <div className="w-full h-full p-2 rounded-lg">
      <h1
        className={`text-sm text-center mb-4 p-2 rounded-lg bg-gray-400 font-semibold ${task.category == "Work" ? "text-purple-600" : "text-yellow-400"}`}
      >
        Add Sub Task For : {task.title}
      </h1>
      <form className="flex flex-wrap gap-2 ">
        <div className="w-full flex flex-wrap p-2 rounded-lg bg-gray-400 gap-2">
          <label
            htmlFor="title"
            className="w-full font-lg font-semibold tracking-[2px] underline"
          >
            What you want to do
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter To Do"
            value={subTaskTitle}
            onChange={(e) => setSubTaskTitle(e.target.value)}
            className="border w-full p-1 px-2 rounded-lg outline-purple-400"
          />
        </div>

        <div className="w-full flex flex-wrap p-2 rounded-lg bg-gray-400 gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id=""
            rows={4}
            className="border w-full p-1 px-2 rounded-lg outline-purple-400"
            value={subTaskDescription}
            onChange={(e) => setSubTaskDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={subTaskTitle == "" || subTaskDescription == ""}
          onClick={handleAddSubTask}
          className="w-full border p-2 rounded-lg bg-blue-500 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
        >
          Add Sub To-Do
        </button>
      </form>
    </div>
  );
}

export default AddSubTask;
