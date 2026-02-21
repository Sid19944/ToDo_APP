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
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import {
  deleteTask,
  getTaskForEditPage,
  taskDone,
} from "../../store/slice/task.slice";
import {
  deleteSubTask,
  editSubTask,
  selectSubTaskToEdit,
} from "../../store/slice/subTask.slice";
import AddSubTask from "../subrtask/AddSubTask";
import EditSubTask from "../subrtask/EditSubTask";

function AllTodo({ next }) {
  const dispatch = useDispatch();
  const [showSubList, setShowSubList] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPage, setShowPage] = useState("tasks");
  const { tasks } = useSelector((state) => state.task);
  const dates = [];
  const [filter, setFilter] = useState("today");

  const handleTaskDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleTaskDone = (value, id) => {
    dispatch(taskDone(id, JSON.parse(value)));
  };

  const goAddSubTask = (e, taskId) => {
    e.preventDefault();
    setShowPage("addSubTask");
    dispatch(getTaskForEditPage(taskId, tasks));
  };

  const handleSubTaskDelete = (subTaskId) => {
    dispatch(deleteSubTask(subTaskId));
  };

  const handleSubTaskDone = (value, subTaskId) => {
    dispatch(editSubTask(subTaskId, { isCompleted: JSON.parse(value) }));
  };

  const goEditSubTask = (e, subTaskId, taskId) => {
    e.preventDefault();
    setShowPage("editSubTask");
    dispatch(selectSubTaskToEdit(subTaskId, taskId, tasks));
  };

  const goEditTask = (e, id) => {
    e.preventDefault();
    setShowPage("editTask");
    dispatch(getTaskForEditPage(id, tasks));
  };

  return (
    <div className="overflow-y-scroll rounded-l-lg h-full w-full">
      {showPage == "tasks" && (
        <>
          <h1 className="sticky top-0 p-2 flex flex-wrap justify-between items-center text-md font-semibold bg-gray-500 rounded-lg mb-2">
            <span className="flex flex-wrap">
              Tasks for{" "}
              {new Date()?.toLocaleDateString("en-IN") ==
                date?.toLocaleDateString("en-IN") && "Today"}
              &nbsp;
              <DatePicker
                id="date"
                selected={date}
                onChange={(date) => setDate(date)}
                className="border w-25 rounded-lg text-sm text-center"
                popperPlacement="bottom-start"
              />
            </span>

            <span className="text-xs px-2 py-1 rounded-full flex items-center justify-center">
              Filter <FilterAltIcon style={{ height: "15px" }} />
              <select
                name={filter}
                id="filter"
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-400 rounded-lg p-1"
              >
                <option value="today">Today</option>
                <option value="all">All</option>
              </select>
            </span>

            <span className="gap-2 flex text-xs items-center">
              <span className="text-yellow-400">Work</span>
              <span className="text-purple-800">Personal</span>
            </span>
          </h1>
          <ul className="flex flex-col gap-1">
            {filter == "today"
              ? tasks?.map((task) => {
                  let newdate = new Date(task.todoDate).toLocaleDateString(
                    "en-IN",
                  );
                  if (dates.includes(newdate)) return;
                  dates.push(newdate);

                  return (
                    date?.toLocaleDateString("en-IN") == newdate &&
                    tasks
                      .filter((task) => {
                        const viewData = new Date(
                          task.todoDate,
                        ).toLocaleDateString("en-IN");
                        return viewData == newdate;
                      })
                      .map((task) => {
                        return (
                          <li
                            className="bg-gray-600 p-2 rounded-lg flex items-center flex-col gap-1"
                            key={task._id}
                          >
                            <div className="w-full flex items-center justify-between p-1 rounded-lg bg-gray-400">
                              <span className="flex gap-1 items-center">
                                <span className="flex">
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
                                    <Link
                                      onClick={() => setShowSubList(task._id)}
                                    >
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
                                  onClick={(e) => goAddSubTask(e, task._id)}
                                >
                                  <AddCircleOutlineIcon />
                                </Link>
                              </span>
                            </div>
                            <div
                              className={`w-full bg-gray-400 px-2 rounded-lg ${task.isCompleted && "line-through"}`}
                            >
                              {task.description}
                            </div>

                            {showSubList == task._id && (
                              <ol className="w-[98%] flex flex-col gap-1 ">
                                <span className="text-sm text-blue-200">
                                  Subtasks
                                </span>
                                {task?.subTask?.map((sub) => (
                                  <li
                                    key={sub._id}
                                    className="border px-1 rounded-lg flex w-full justify-between bg-gray-500 items-center flex-wrap gap-2 p-1"
                                  >
                                    <div className="flex justify-between w-full  rounded-lg px-2 bg-gray-400">
                                      <div className="flex gap-1 items-center">
                                        <input
                                          type="checkbox"
                                          className="w-5 h-4 accent-purple-600"
                                          checked={sub.isCompleted}
                                          value={!sub.isCompleted}
                                          onChange={(e) =>
                                            handleSubTaskDone(
                                              e.target.value,
                                              sub._id,
                                            )
                                          }
                                        />
                                        <span
                                          className={`${sub.isCompleted && "line-through"} ${task.category == "Work" ? "text-purple-600" : "text-yellow-400"}`}
                                        >
                                          {sub.title}
                                        </span>
                                      </div>
                                      <div className="flex gap-2">
                                        <Link
                                          className="active:text-red-600 hover:text-red-600"
                                          onClick={() =>
                                            handleSubTaskDelete(sub._id)
                                          }
                                        >
                                          <DeleteForeverIcon />
                                        </Link>
                                        <Link
                                          className="active:text-green-600 hover:text-green-600"
                                          onClick={(e) =>
                                            goEditSubTask(e, sub._id, task._id)
                                          }
                                        >
                                          <EditDocumentIcon />
                                        </Link>
                                      </div>
                                    </div>
                                    <div
                                      className={`w-full bg-gray-400 px-2 rounded-lg ${sub.isCompleted && "line-through"}`}
                                    >
                                      {sub.description}
                                    </div>
                                  </li>
                                ))}
                              </ol>
                            )}
                            <span
                              className={`w-full flex items-center gap-1 ${task.priority == "low" && "text-yellow-300 "} ${task.priority == "medium" && "text-green-300"} ${task.priority == "high" && "text-red-500"}`}
                            >
                              <span
                                className={`w-2 h-2 rounded-[100%] ${task.priority == "low" && "bg-yellow-300 "} ${task.priority == "medium" && "bg-green-300"} ${task.priority == "high" && "bg-red-500"} `}
                              ></span>
                              {task.priority}
                            </span>
                          </li>
                        );
                      })
                  );
                })
              : tasks.map((task) => {
                  return (
                    <li
                      className="bg-gray-600 p-2 rounded-lg flex items-center flex-col gap-1"
                      key={task._id}
                    >
                      <div className="w-full flex items-center justify-between p-1 rounded-lg bg-gray-400">
                        <span className="flex gap-1 items-center">
                          <span className="flex">
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
                            onClick={(e) => goAddSubTask(e, task._id)}
                          >
                            <AddCircleOutlineIcon />
                          </Link>
                        </span>
                      </div>
                      <div
                        className={`w-full bg-gray-400 px-2 rounded-lg ${task.isCompleted && "line-through"}`}
                      >
                        {task.description}
                      </div>

                      {showSubList == task._id && (
                        <ol className="w-[98%] flex flex-col gap-1 ">
                          <span className="text-sm text-blue-200">
                            Subtasks
                          </span>
                          {task?.subTask?.map((sub) => (
                            <li
                              key={sub._id}
                              className="border px-1 rounded-lg flex w-full justify-between bg-gray-500 items-center flex-wrap gap-2 p-1"
                            >
                              <div className="flex justify-between w-full  rounded-lg px-2 bg-gray-400">
                                <div className="flex gap-1 items-center">
                                  <input
                                    type="checkbox"
                                    className="w-5 h-4 accent-purple-600"
                                    checked={sub.isCompleted}
                                    value={!sub.isCompleted}
                                    onChange={(e) =>
                                      handleSubTaskDone(e.target.value, sub._id)
                                    }
                                  />
                                  <span
                                    className={`${sub.isCompleted && "line-through"} ${task.category == "Work" ? "text-purple-600" : "text-yellow-400"}`}
                                  >
                                    {sub.title}
                                  </span>
                                </div>
                                <div className="flex gap-2">
                                  <Link
                                    className="active:text-red-600 hover:text-red-600"
                                    onClick={() => handleSubTaskDelete(sub._id)}
                                  >
                                    <DeleteForeverIcon />
                                  </Link>
                                  <Link
                                    className="active:text-green-600 hover:text-green-600"
                                    onClick={(e) =>
                                      goEditSubTask(e, sub._id, task._id)
                                    }
                                  >
                                    <EditDocumentIcon />
                                  </Link>
                                </div>
                              </div>
                              <div
                                className={`w-full bg-gray-400 px-2 rounded-lg ${sub.isCompleted && "line-through"}`}
                              >
                                {sub.description}
                              </div>
                            </li>
                          ))}
                        </ol>
                      )}
                      <span
                        className={`w-full flex items-center gap-1 ${task.priority == "low" && "text-yellow-300 "} ${task.priority == "medium" && "text-green-300"} ${task.priority == "high" && "text-red-500"}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-[100%] ${task.priority == "low" && "bg-yellow-300 "} ${task.priority == "medium" && "bg-green-300"} ${task.priority == "high" && "bg-red-500"} `}
                        ></span>
                        {task.priority}
                      </span>
                    </li>
                  );
                })}

            <div
              id="add-task"
              className={`border my-4 p-2 rounded-lg cursor-pointer gap-1 flex items-center ${showPage == "add-task" ? "bg-blue-400" : "bg-gray-400"}`}
              onClick={next}
            >
              <AddCircleOutlineIcon style={{ fontSize: "30px" }} />
              <span className="text-md font-semibold">Add New</span>
            </div>
          </ul>
        </>
      )}

      {showPage == "editTask" && <EditTask next={() => setShowPage("tasks")} />}

      {showPage == "addSubTask" && (
        <AddSubTask next={() => setShowPage("tasks")} />
      )}

      {showPage == "editSubTask" && (
        <EditSubTask next={() => setShowPage("tasks")} />
      )}
    </div>
  );
}

export default AllTodo;
