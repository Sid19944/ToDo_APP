import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditTask from "./EditTask";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
  deleteTask,
  getTaskForEditPage,
  taskDone,
} from "../../store/slice/task.slice";

function AllTodo() {
  const dispatch = useDispatch();
  const [showSubList, setShowSubList] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPage, setShowPage] = useState("tasks");
  const { tasks } = useSelector((state) => state.task);
  const dates = [];

  const handleTaskDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleTaskDone = (value, id) => {
    dispatch(taskDone(id, JSON.parse(value)));
  };

  const goEditTask = (e, id) => {
    e.preventDefault();
    setShowPage("editTask");
    dispatch(getTaskForEditPage(id, tasks));
  };

  return (
    <div className="overflow-y-scroll rounded-l-lg h-full w-full">
      {showPage == "tasks" ? (
        <>
          <h1 className="sticky top-0 p-2 flex flex-wrap justify-between text-lg font-semibold bg-gray-500 rounded-lg mb-2">
            <span className="flex flex-wrap">
              Tasks for{" "}
              {new Date().toLocaleDateString("en-IN") ==
                date.toLocaleDateString("en-IN") && "Today"}{" "}
              &nbsp;
              <DatePicker
                id="date"
                selected={date}
                onChange={(date) => setDate(date)}
                className="border w-27 rounded-lg text-sm text-center"
                popperPlacement="bottom-start"
              />
            </span>
            <span className="flex gap-2 items-center">
              <span className="text-purple-400 text-xs sm:text-md ">Work</span>
              <span className="text-yellow-400 text-xs sm:text-md ">
                Personal
              </span>
            </span>
          </h1>
          <ul className="flex flex-col gap-1">
            {tasks?.map((task) => {
              let newdate = new Date(task.todoDate).toLocaleDateString("en-IN");
              if (dates.includes(newdate)) return;
              dates.push(newdate);

              return (
                date.toLocaleDateString("en-IN") == newdate &&
                tasks
                  .filter((task) => {
                    const viewData = new Date(task.todoDate).toLocaleDateString(
                      "en-IN",
                    );
                    return viewData == newdate;
                  })
                  .map((task) => {
                    return (
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
                                onChange={(e) =>
                                  handleTaskDone(e.target.value, task._id)
                                }
                              />
                            </span>
                            <span
                              className={`font-semibold ${task?.isCompleted && "line-through opacity-70"} ${task.category == "Work" ? "text-purple-600" : "text-yellow-400"}`}
                            >
                              {task.title}
                            </span>
                          </span>
                          <span className="flex gap-1">
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
                              className="active:text-red-600 hover:text-red-600"
                              onClick={() => handleTaskDelete(task._id)}
                            >
                              <DeleteForeverIcon />
                            </Link>

                            <Link
                              className="active:text-green-600 hover:text-green-600"
                              onClick={(e) => goEditTask(e, task._id)}
                            >
                              <EditDocumentIcon />
                            </Link>
                            <Link
                              className="active:text-blue-600  hover:text-blue-600"
                              onClick={(e) => goEditTask(e, task._id)}
                            >
                              <AddCircleOutlineIcon />
                              
                            </Link>
                          </span>
                        </div>

                        {showSubList == task._id && (
                          <ol className="w-[98%] flex flex-col gap-1 my-2 ">
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
                                  // handleSubTaskDone(e.target.value, task._id)  // TODO
                                  // }
                                />
                                <span>{sub.title}</span>

                                <div className="flex gap-2">
                                  <Link
                                    className="active:text-red-600 hover:text-red-600"
                                    onClick={() =>
                                      handleTaskDelete(task.subTask._id)
                                    }
                                  >
                                    <DeleteForeverIcon />
                                  </Link>
                                  <Link
                                    className="active:text-green-600 hover:text-green-600"
                                    onClick={(e) => goEditTask(e, task._id)}
                                  >
                                    <EditDocumentIcon />
                                  </Link>
                                </div>
                              </li>
                            ))}
                          </ol>
                        )}
                      </li>
                    );
                  })
              );
            })}
          </ul>
        </>
      ) : (
        <EditTask next={() => setShowPage("tasks")} />
      )}
    </div>
  );
}

export default AllTodo;
