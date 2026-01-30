import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";

function AddSubTask({next}) {
  const dispatch = useDispatch();
  const {task} = useSelector(state=>state.task)

  const [taskTitle, setTaskTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("Personal");
  return (
    <div className="w-full h-full p-2 rounded-lg">
      <h1 className="text-sm text-center mb-4 p-2 rounded-lg bg-gray-400 font-semibold text-blue-700">
        Add Sub Task For : {task.title}
      </h1>
      <form className="flex flex-wrap gap-2 ">
        <div className="items-center flex gap-2 w-full p-2 rounded-lg bg-gray-400 font-semibold">
          <label htmlFor="date " className="underline">
            Select Date to-do :
          </label>
          <DatePicker
            id="date"
            selected={date}
            minDate={new Date()}
            onChange={(date) => setDate(date)}
          />
        </div>
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
            value={taskTitle}
            // onChange={(e) => setTaskTitle(e.target.value)}
            className="border w-full p-1 px-2 rounded-lg outline-purple-400"
          />
        </div>
        <div className="w-full flex flex-wrap p-2 rounded-lg bg-gray-400 gap-2 justify-between">
          <label
            htmlFor="category"
            className="w-1/2 font-lg font-semibold tracking-[2px] underline"
          >
            Select Category
          </label>
          <select
            name="category"
            id=""
            className="bg-gray-400 px-2 border rounded-lg cursor-pointer"
            // onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={taskTitle == ""}
        //   onClick={handleAddTask}
          className="w-full border p-2 rounded-lg bg-blue-500 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
        >
          Add Sub To-Do
        </button>
      </form>
    </div>
  );
}

export default AddSubTask;
