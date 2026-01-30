import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSubTask } from "../../store/slice/subTask.slice";

function EditSubTask({ next }) {
  const dispatch = useDispatch();
  const { subTask } = useSelector((state) => state.subTask);
  const [subTaskTitle, setSubTaskTitle] = useState(subTask.title);

  const EditSubTask = (e, subTaskId) => {
    e.preventDefault();
    dispatch(editSubTask(subTaskId, { title: subTaskTitle }));
    next();
  };

  return (
    <div className="w-full h-full p-2 rounded-lg">
      <h1
        className={`text-lg text-blue-700 text-center mb-4 p-2 rounded-lg bg-gray-400 font-semibold `}
      >
        Edit Your Task
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

        <button
          type="submit"
          disabled={subTaskTitle == ""}
          onClick={(e) => EditSubTask(e, subTask._id)}
          className="w-full border p-2 rounded-lg bg-blue-500 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
        >
          Update Sub To-Do
        </button>
      </form>
    </div>
  );
}

export default EditSubTask;
