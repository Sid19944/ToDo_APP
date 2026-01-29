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

import { deleteTask, getAllTasks, taskDone } from "../store/slice/task.slice";

import AddTask from "./task/AddTask";
import AllTodo from "./task/AllTodo";

function Home() {
  const [showPage, setShowPage] = useState("to-do");
  const [mode, setMode] = useState("dark");
  let lastDate = null;

  const time = new Date().toLocaleTimeString();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, message, user } = useSelector(
    (state) => state.user,
  );
  const { tasks, task, taskError, taskMessage } = useSelector(
    (state) => state.task,
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
  return (
    <div
      className={`h-screen font-serif p-2 ${mode == "light" ? "bg-white text-black" : "bg-black text-white"} flex gap-4 w-full`}
    >
      <nav className="shadow-[0px_0px_3px_3px] h-full w-60 p-2 rounded-xl md:flex flex-col gap-2 hidden ">
        <div
          id="logo"
          className="w-full flex items-center gap-2 border-b pb-2 mb-2"
        >
          <img src="/logo.png" alt="logo" className="w-10" />
          <h1 className={`text-3xl font-semibold tracking-[2px]`}>TODO</h1>
        </div>
        <div
          id="to-do"
          className={`border p-2 rounded-lg cursor-pointer ${showPage == "to-do" && "bg-gray-400"}`}
          onClick={() => setShowPage("to-do")}
        >
          <i className="fa-solid fa-clipboard-list text-2xl" />
          <span className={`text-md font-semibold`}>To-do</span>
        </div>
        <div
          id="analytics"
          className={`border p-2 rounded-lg cursor-pointer ${showPage == "analytics" && "bg-gray-400"}`}
          onClick={() => setShowPage("analytics")}
        >
          <AnalyticsIcon style={{ fontSize: "30px" }} />
          <span className="text-md font-semibold">Analytics</span>
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
        <div className="shadow-[0px_0px_3px_3px] p-2 rounded-lg">
          {/* { time < "11:59:00 AM" && time >= "04:00:00 AM" && <h1>"Good Morning"</h1>} */}
          {/* { time >= "12:00:00 PM" && time < "03:59:00 PM"  && <h1>"Good AfterNoon"</h1>}
          { time >= "04:00:00 PM" && time >= "06:59:00 PM" && <h1>"Good Evening"</h1>}
          { time >= "07:00:00 PM" && time >= "11:59:00 PM" && <h1>"Good Night"</h1>} */}

          <h1 className="text-2xl font-semibold tracking-[2px]">
            Good Morning, {user?.name?.split(" ")[0]}
          </h1>
          <p className="opacity-60">What do you plain to-do today</p>
        </div>
        <div className="shadow-[0px_0px_3px_3px] h-full rounded-lg p-2">
          {(() => {
            switch (showPage) {
              case "to-do":
                return <AllTodo />;
              case "analytics":
                return "Analytics";
              case "add-task":
                return <AddTask />;
            }
          })()}
        </div>
      </div>

      <nav
        id="lists"
        className="shadow-[0px_0px_3px_3px] h-full w-90 p-2 rounded-xl flex flex-col gap-2 min-w-42"
      >
        <div className="flex justify-between text-xl items-center border-b pb-2 mb-4">
          <span className="font-semibold tracking-[2px]">LISTS</span>
          <Link
            onClick={() => setShowPage("add-task")}
            className="text-blue-600 active:animate-spin"
          >
            <AddCircleOutlineIcon style={{ fontSize: "30px" }} />
          </Link>
        </div>

        {tasks?.map((task, idx) => {
          let date = new Date(task?.todoDate).toLocaleDateString()
          if(date === lastDate) return null
          lastDate = date;
          return <p key={idx}>{date}</p>
        })}
      </nav>

      <ToastContainer />
    </div>
  );
}

export default Home;
