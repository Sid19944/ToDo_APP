import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { deleteTask, getAllTasks, taskDone } from "../../store/slice/task.slice";

function AllTodo() {
    const dispatch = useDispatch()
  const [showSubList, setShowSubList] = useState("");
  const { tasks, task, taskError, taskMessage } = useSelector(
    (state) => state.task,
  );

  const handleTaskDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleTaskDone = (value, id) => {
    dispatch(taskDone(id, JSON.parse(value)));
  };



  if (tasks.length) {
    const data = new Date(tasks[0].todoDate);
    // console.log(
    //   data.toLocaleDateString(),
    // );
    
  }
  return (
    <div className="overflow-y-scroll rounded-l-lg h-full">
      <ul className="flex flex-col gap-1">
        {tasks?.map((task) => (
          <li
            className="bg-gray-600 p-2 rounded-lg flex items-center flex-col"
            key={task._id}
          >
            <div className="w-full flex items-center justify-between py-2 px-1 rounded-lg bg-gray-400">
              <span className="flex gap-1 items-center">
                <span className=" flex">
                  <input
                    type="checkbox"
                    className="w-5 h-4 accent-purple-600"
                    checked={task.isCompleted}
                    value={!task.isCompleted}
                    onChange={(e) => handleTaskDone(e.target.value, task._id)}
                  />
                </span>
                <span
                  className={`${task?.isCompleted && "line-through opacity-50"}`}
                >
                  {task.title}
                </span>
              </span>
              <span>
                {task?.subTask?.length != 0 &&
                  (showSubList == task._id ? (
                    <Link onClick={() => setShowSubList("")}>
                      <ArrowDropUpIcon />
                    </Link>
                  ) : (
                    <Link onClick={() => setShowSubList(task._id)}>
                      <ArrowDropDownIcon />
                    </Link>
                  ))}

                <Link
                  className="active:text-red-600"
                  onClick={() => handleTaskDelete(task._id)}
                >
                  <DeleteForeverIcon />
                </Link>
              </span>
            </div>

            {showSubList == task._id && (
              <ol className="w-[95%] flex flex-col gap-1 my-2 ">
                {task?.subTask?.map((sub) => (
                  <li
                    key={sub._id}
                    className="border px-1 rounded-lg flex w-full justify-between bg-gray-400 items-center"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-4 accent-purple-600"
                      checked={sub.isCompleted}
                      value={!sub.isCompleted}
                      // onChange={(e) =>
                      // handleTaskDone(e.target.value, task._id)  // TODO
                      // }
                    />
                    <span>{sub.title}</span>
                    <Link
                      className="active:text-red-600"
                      onClick={() => handleTaskDelete(task.subTask._id)} // TODO
                    >
                      <DeleteForeverIcon />
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTodo;
