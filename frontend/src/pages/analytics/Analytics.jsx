import React from "react";
import { Chart as Chartjs } from "chart.js/auto";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

function Analytics() {
  const { tasks } = useSelector((state) => state.task);
  const today = new Date().setHours(0, 0, 0, 0);

  // Tasks Status for today
  const todaysTask = tasks.filter(
    (task) => new Date(task.todoDate).setHours(0, 0, 0, 0) == today,
  );
  const todaysCompletedTasks = todaysTask.filter(
    (task) => task.isCompleted == true,
  );
  const todayUnCompletedTasks = todaysTask.filter(
    (task) => task.isCompleted == false,
  );

  // Tasks Status for previous dates
  const previousTasks = tasks.filter(
    (task) => new Date(task.todoDate).setHours(0, 0, 0, 0) < today,
  );
  const previousComletedTasks = previousTasks.filter(
    (task) => task.isCompleted == true,
  );
  const previousUnCompletedTasks = previousTasks.filter(
    (task) => task.isCompleted == false,
  );

  // Tasks Status for Upcomming dates
  const upCommingTasks = tasks.filter(
    (task) => new Date(task.todoDate).setHours(0, 0, 0, 0) > today,
  );

  // unique dates
  const dates = [];
  tasks.map((task) => {
    let newDate = new Date(task.todoDate).toLocaleDateString("en-IN");
    if (dates.includes(newDate)) return;
    dates.push(newDate);
  });

  const completedDatas = [];
  const unCompletedDates = [];
  // group task by dates
  const SeperateTasksByDate = Object.groupBy(tasks, (task) =>
    new Date(task.todoDate).toLocaleDateString("en-IN"),
  );
  Object.values(SeperateTasksByDate).map((arr, idx) => {
    let tasks = arr.filter(
      (task) =>
        new Date(task.todoDate).toLocaleDateString("en-IN") == dates[idx],
    );
    let Tcount = tasks.filter((task) => task.isCompleted == true);

    completedDatas.push(Tcount.length);
    unCompletedDates.push(tasks.length - Tcount.length);
  });

  return (
    <div className="flex flex-wrap gap-2 overflow-x-hidden">
      <div className="w-full flex gap-2 flex-wrap justify-around">
        <div className="border rounded-lg p-5 w-full sm:w-[48%] flex justify-center items-center flex-col gap-2">
          <Pie
            data={{
              labels: ["Completed", "UnCompleted"],
              datasets: [
                {
                  label: "To-do",
                  data: [
                    todaysCompletedTasks.length,
                    todayUnCompletedTasks.length,
                  ],
                },
              ],
            }}
          />
          <span className="text-sm my-2">Today Status</span>
        </div>
        <div className="border rounded-lg p-2 w-full sm:sm:w-[48%] flex flex-col justify-center items-center">
          <Doughnut
            data={{
              labels: [
                "Previous Completed",
                "Previous Uncompleted",
                "Upcomming Tasks",
              ],
              datasets: [
                {
                  label: "To-Do's",
                  data: [
                    previousComletedTasks.length,
                    previousUnCompletedTasks.length,
                    upCommingTasks.length,
                  ],
                },
              ],
            }}
          />
          <span className="text-sm my-2">Previous and Upcomming</span>
        </div>
      </div>
      <div className="border rounded-lg w-full p-2 flex flex-col  items-center">
        <Bar
          data={{
            labels: dates.map((date) => date),
            datasets: [
              {
                label: "Completed",
                data: completedDatas.map((com) => com),
                backgroundColor: "rgb(55, 162, 235)",
              },
              {
                label: "UnCompleted",
                data: unCompletedDates.map((unCom) => unCom),
                backgroundColor: "rgb(255, 64, 105)",
              },
            ],
          }}
        />
        <span className="my-2">Status By Date</span>
      </div>
    </div>
  );
}

export default Analytics;
