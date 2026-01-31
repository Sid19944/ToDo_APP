import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser, logoutUser } from "../store/slice/user.slice";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ClearIcon from "@mui/icons-material/Clear";

import { getAllTasks } from "../store/slice/task.slice";

import AddTask from "./task/AddTask";
import AllTodo from "./task/AllTodo";
import { clearSubMsg } from "../store/slice/subTask.slice";
import Analytics from "./analytics/Analytics";

function Home() {
  const [showPage, setShowPage] = useState("to-do");
  const [mode, setMode] = useState("dark");
  const [dateTask, setDateTask] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const greet = new Date().getHours();
  const dates = [];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, message, user } = useSelector(
    (state) => state.user,
  );
  const { tasks, task, taskError, taskMessage } = useSelector(
    (state) => state.task,
  );
  const { subLoading, subTaskError, subTaskMessage } = useSelector(
    (state) => state.subTask,
  );

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (Object.keys(user).length == 0) dispatch(getUser());
    if (!isAuthenticated) {
      navigate("/auth");
    }
    if (error) {
      toast.error(error, { position: "bottom-left" });
    }
    if (message) {
      toast.success(message, { position: "bottom-left" });
    }
  }, [isAuthenticated, error, message]);

  useEffect(() => {
    dispatch(getAllTasks());
    if (taskError) {
      toast.error(taskError, { position: "bottom-left" });
    }
    if (taskMessage) {
      toast.success(taskMessage, { position: "bottom-left" });
    }
  }, [taskError, taskMessage]);

  useEffect(() => {
    dispatch(getAllTasks());

    if (subTaskError) {
      toast.error(subTaskError, { position: "bottom-left" });
    }
    if (subTaskMessage) {
      toast.success(subTaskMessage, { position: "bottom-left" });
      dispatch(clearSubMsg());
    }
  }, [subTaskError, subTaskMessage]);
  return (
    <div
      className={`h-screen font-serif p-2 ${mode == "light" ? "bg-white text-black" : "bg-black text-white"} flex gap-4 w-full`}
    >
      {/* Nav for desktop */}
      <nav
        id="desktop-nav"
        className="shadow-[0px_0px_3px_3px] h-full w-60 p-2 rounded-xl md:flex flex-col gap-2 hidden md:w-50 lg:w-60"
      >
        <div
          id="logo"
          className="w-full flex items-center gap-2 border-b pb-2 mb-2"
        >
          <img src="/logo.png" alt="logo" className="w-10" />
          <h1 className={`text-3xl font-semibold tracking-[2px]`}>TODO</h1>
        </div>
        <div
          id="to-do"
          className={`border p-2 rounded-lg cursor-pointer ${showPage == "to-do" ? "bg-blue-400" : "bg-gray-400"}`}
          onClick={() => setShowPage("to-do")}
        >
          <i className="fa-solid fa-clipboard-list text-2xl" />
          <span className={`text-md font-semibold`}>All To-Do</span>
        </div>
        <div
          id="analytics"
          className={`border p-2 rounded-lg cursor-pointer ${showPage == "analytics" ? "bg-blue-400" : "bg-gray-400"}`}
          onClick={() => setShowPage("analytics")}
        >
          <AnalyticsIcon style={{ fontSize: "30px" }} />
          <span className="text-md font-semibold">Analytics</span>
        </div>

        <div
          id="add-task"
          className={`border p-2 rounded-lg cursor-pointer ${showPage == "add-task" ? "bg-blue-400" : "bg-gray-400"}`}
          onClick={() => setShowPage("add-task")}
        >
          <AddCircleOutlineIcon style={{ fontSize: "30px" }} />
          <span className="text-md font-semibold">Add Task</span>
        </div>

        <div
          id="mode"
          className="p-2 rounded-3xl mt-auto flex justify-between gap-1 bg-gray-500"
        >
          <div
            className={`border p-1 w-1/2 rounded-3xl flex items-center justify-center gap-3 bg-white text-black font-semibold cursor-pointer 
            ${mode == "light" && "blur-[1px]"}`}
            onClick={() => setMode("light")}
          >
            <LightModeIcon
              className={`${mode == "light" && "animate-spin"}`}
              style={{ animationDuration: "3s" }}
            />
            <span>Light</span>
          </div>
          <div
            className={`border p-2 w-1/2 rounded-3xl flex items-center justify-center gap-3 bg-black text-white font-semibold cursor-pointer
            ${mode == "dark" && "blur-[1px] "}`}
            onClick={() => setMode("dark")}
          >
            <DarkModeIcon /> <span>Dark</span>
          </div>
        </div>

        <div
          id="profile"
          className="border p-2 rounded-lg flex items-center justify-between bg-gray-400"
        >
          <img
            src={user.avatar}
            alt="avatar"
            className="w-10 rounded-[100%]"
            referrerPolicy="no-referrer"
          />
          <span className="text-sm overflow-hidden font-semibold">
            {user?.name?.split(" ")[0]}
          </span>
          <Link
            onClick={handleLogout}
            className={`hover:text-purple-600 active:text-purple-600`}
          >
            <LogoutIcon />
          </Link>
        </div>
      </nav>

      <div className="w-full rounded-lg flex gap-4 flex-col">
        <nav
          id="mobile-nav"
          className={`flex border-b items-center bg-gray-800 justify-center p-2 rounded-lg text-white gap-2 md:hidden`}
        >
          <div id="logo" className="w-full flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-10" />
            <h1 className={`text-2xl font-semibold tracking-[2px]`}>TODO</h1>
          </div>

          <div className="flex gap-2">
            <span
              className={`border rounded-[100%] p-1 flex justify-center items-center bg-white text-black ${mode == "light" && "blur-[1px] "}`}
              onClick={() => setMode("light")}
            >
              <LightModeIcon
                className={`${mode == "light" && "animate-spin "}`}
                style={{ animationDuration: "5s" }}
              />
            </span>
            <span
              className={`border rounded-[100%] p-1 flex justify-center items-center ${mode == "dark" && "blur-[1px] "}`}
              onClick={() => setMode("dark")}
            >
              <DarkModeIcon />
            </span>
          </div>

          <div
            onClick={() => setShowMenu(!showMenu)}
            className="cursor-pointer"
          >
            {showMenu ? (
              <ClearIcon style={{ height: "35px", width: "35px" }} />
            ) : (
              <FormatListBulletedIcon
                style={{ height: "35px", width: "35px" }}
              />
            )}
          </div>

          {showMenu && (
            <div className="absolute right-4 top-15 w-40 border rounded-lg bg-gray-800 p-2 flex flex-col gap-2 z-10">
              <Link
                className={`border p-1 rounded-lg ${showPage == "to-do" ? "bg-blue-700" : "bg-gray-600"}`}
                onClick={() => {
                  setShowPage("to-do");
                  setShowMenu(!showMenu);
                }}
              >
                All To-Do
              </Link>
              <Link
                className={`border p-1 rounded-lg ${showPage == "analytics" ? "bg-blue-700" : "bg-gray-600"}`}
                onClick={() => {
                  setShowPage("analytics");
                  setShowMenu(!showMenu);
                }}
              >
                <AnalyticsIcon /> Analytics
              </Link>
              <Link
                className={`border p-1 rounded-lg flex items-center gap-1 ${showPage == "add-task" ? "bg-blue-700" : "bg-gray-600"}`}
                onClick={() => {
                  setShowPage("add-task");
                  setShowMenu(!showMenu);
                }}
              >
                <AddCircleOutlineIcon /> Add Task
              </Link>
              <div className="flex gap-2 items-center border p-1 rounded-lg bg-gray-600">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-10 rounded-[100%] border"
                />
                <Link onClick={handleLogout}>
                  <LogoutIcon /> Logout
                </Link>
              </div>
            </div>
          )}
        </nav>

        <div className="shadow-[0px_0px_3px_3px] p-2 rounded-lg">
          <h1 className="text-2xl font-semibold tracking-[2px]">
            {greet >= 4 && greet < 12 && "Good Morning, "}
            {greet >= 12 && greet < 16 && "Good Afternoon, "}
            {greet >= 16 && greet < 20 && "Good Evening, "}
            {greet >= 20 && greet < 24 && "Good Night, "}
            {greet >= 0 && greet < 4 && "Good Night, "}

            {user?.name?.split(" ")[0]}
          </h1>
          <p className="opacity-60">What do you plain to-do today</p>
        </div>
        <div className="shadow-[0px_0px_3px_3px] h-full w-full rounded-lg p-2 overflow-y-auto">
          {(() => {
            switch (showPage) {
              case "to-do":
                return <AllTodo />;
              case "analytics":
                return <Analytics />;
              case "add-task":
                return <AddTask />;
            }
          })()}
          <ToastContainer />
        </div>
      </div>

      <nav
        id="lists"
        className="shadow-[0px_0px_3px_3px] h-full w-90 p-2 rounded-xl md:flex flex-col gap-2 min-w-42 hidden"
      >
        <div className="flex justify-between text-lg items-center border-b pb-2">
          <span className="font-semibold tracking-[2px]">DATES TO-DO</span>
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto">
          {tasks?.map((task, idx) => {
            let newdate = new Date(task?.todoDate).toLocaleDateString("en-IN");
            if (dates.includes(newdate)) return;
            dates.push(newdate);
            return (
              <div
                key={idx}
                className="flex flex-col border p-2 rounded-lg bg-gray-500"
              >
                <div className="w-full flex justify-between">
                  <span className="cursor-pointer">{newdate}</span>
                  {dateTask == newdate ? (
                    <Link onClick={() => setDateTask("")}>
                      <ArrowDropUpIcon />
                    </Link>
                  ) : (
                    <Link onClick={() => setDateTask(newdate)}>
                      <ArrowDropDownIcon />
                    </Link>
                  )}
                </div>

                <ol className="flex flex-col gap-2">
                  {dateTask == newdate &&
                    tasks
                      .filter((item) => {
                        const dateD = new Date(
                          item.todoDate,
                        ).toLocaleDateString("en-IN");
                        return dateD === newdate;
                      })
                      .map((item, idx) => {
                        return (
                          <p
                            key={idx}
                            className="w-full max-h-12 overflow-hidden border flex items-center px-1 rounded-lg bg-gray-400 mt-2"
                          >
                            {item.title}
                          </p>
                        );
                      })}
                </ol>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Home;
