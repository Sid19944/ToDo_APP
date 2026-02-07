import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/slice/user.slice";

function LandingPage() {
  const {isAuthenticated, user}= useSelector(state=>state.user)
  const dispacth = useDispatch()
  const navigate = useNavigate()

    useEffect(() => {
      if (Object.keys(user).length == 0) dispacth(getUser());
      if (isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated]);
  
  return (
    <div className="font-serif bg-gradient-to-r from-blue-300 to-purple-400 h-screen overflow-y-auto">
      <nav className="bg-gradient-to-l items-center from-blue-400 to-purple-500 h-14 p-1 flex justify-between sticky top-0">
        <div className="h-full flex items-center gap-2">
          <img src="logo.png" alt="Logo" className="h-[90%]" />
          <span className="sm:text-3xl font-semibold tracking-[2px]">
            Daily Plain
          </span>
        </div>
        <Link
          to={"/auth"}
          className="shadow-[0px_0px_3px_3px] sm:text-2xl outline px-3 py-1 rounded-full bg-blue-800 tracking-[2px]"
        >
          Let's Start
        </Link>
      </nav>

      

      <div
        id="hero"
        className="flex flex-col w-full items-center justify-center my-8"
      >
        <motion.span
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-xl sm:text-3xl w-fit"
        >
          Effortless task management{" "}
        </motion.span>
        <motion.span
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: false }}
          className="text-xl sm:text-3xl w-fit text-yellow-300"
        >
          Anytime
        </motion.span>
        <motion.span
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 2 }}
          className="text-xl sm:text-3xl w-fit"
        >
          In One Plateform
        </motion.span>
      </div>

      <div id="btn" className="w-full flex justify-center my-5">
        <Link
          className="shadow-[0px_0px_3px_3px] bg-blue-600 px-4 text-2xl rounded-full py-1 outline tracking-[2px]"
          to={`/auth`}
        >
          Let's Start
        </Link>
      </div>
      
      <div
        id="features"
        className="my-5 w-full items-center flex flex-col gap-3"
      >
        <p className="font-semibold tracking-[2px]">Features</p>
        <div className="w-full flex flex-wrap justify-center gap-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="group cursor-pointer shadow-[0px_0px_3px_3px] flex flex-wrap w-[90%] max-w-90 outline p-2 rounded-lg"
          >
            <span className="w-full text-center mb-2 group-hover:scale-130">
              <HomeRepairServiceIcon
                style={{ width: "40px", height: "40px" }}
              />
            </span>
            <span className="w-full text-xl font-semibold text-center">
              Manage Task
            </span>
            <p className="text-center w-full text-sm text-gray-200">
              Manage your task efficiently in a plateform
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="group cursor-pointer shadow-[0px_0px_3px_3px] flex flex-wrap w-[90%] max-w-90 outline p-2 rounded-lg"
          >
            <span className="w-full text-center mb-2 group-hover:scale-130">
              <AnalyticsIcon style={{ width: "40px", height: "40px" }} />
            </span>
            <span className="w-full text-xl font-semibold text-center">
              Analytics
            </span>
            <p className="text-center w-full text-sm text-gray-200">
              Analyze your task with chart, daily status,
              <br /> previous status and upcomming status,
              <br />
              full history
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="cursor-pointe group shadow-[0px_0px_3px_3px] flex flex-wrap w-[90%] max-w-90 outline p-2 rounded-lg"
          >
            <span className="w-full text-center mb-2 group-hover:scale-130">
              <CalendarMonthIcon style={{ width: "40px", height: "40px" }} />
            </span>
            <span className="w-full text-xl font-semibold text-center">
              Task by Dates
            </span>
            <p className="text-center w-full text-sm text-gray-200">
              Efficiently tasks divided based on dates
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
