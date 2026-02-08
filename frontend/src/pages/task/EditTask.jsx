import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { taskEdit } from "../../store/slice/task.slice";

function EditTask({ next }) {
  const { task } = useSelector((state) => state.task);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [date, setDate] = useState(task.todoDate);

  const [category, setCategory] = useState(task.category);
  const dispatch = useDispatch();

  const handleEditTask = (e, id) => {
    e.preventDefault();
    dispatch(
      taskEdit(id, {
        title: taskTitle,
        todoDate: new Date(date).toISOString(),
        description: taskDescription,
        priority: priority,
        category,
      }),
    );
    next();
  };

  return (
    <div className="w-full h-full p-2 rounded-lg">
      <h1 className="text-xl text-center mb-4 p-2 rounded-lg bg-gray-400 font-semibold text-blue-700">
        Edit Your Task
      </h1>
      <form className="flex flex-wrap gap-2 ">
        <div className="items-center flex gap-2 w-full p-2 rounded-lg bg-gray-400 font-semibold">
          <label htmlFor="date " className="underline">
            Due date :
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
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter To Do"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="border w-full p-1 px-2 rounded-lg outline-purple-400"
          />
        </div>
        <div className="w-full flex flex-wrap p-2 rounded-lg bg-gray-400 gap-2">
          <label
            htmlFor="title"
            className="w-full font-lg font-semibold tracking-[2px] underline"
          >
            Enter Description
          </label>
          <textarea
            rows={4}
            type="text"
            name="description"
            id="description"
            placeholder="Enter Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="border w-full p-1 px-2 rounded-lg outline-purple-400"
          />
        </div>
        <div className="w-full flex flex-wrap p-2 rounded-lg bg-gray-400 gap-2 justify-between">
          <label htmlFor="priority" className="w-1/2 font-lg font-semibold tracking-[2px] underline">Select Priotity : </label>
          <select
            name="priority"
            id="priority"
            className="bg-gray-400 px-2 border rounded-lg cursor-pointer"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
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
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={taskTitle == "" || taskDescription == ""}
          onClick={(e) => handleEditTask(e, task._id)}
          className="w-full border p-2 rounded-lg bg-blue-500 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
        >
          Update To-Do
        </button>
      </form>
    </div>
  );
}

export default EditTask;
