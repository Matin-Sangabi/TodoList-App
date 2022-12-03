import { useEffect, useState } from "react";
import SwipeToOption from "../swipe/swipe";

const TodayTasks = ({ tasks }) => {
  const [todayTask, setTodayTask] = useState([]);
  useEffect(() => {
    if (tasks) {
      const filtersTodayTasks = tasks.filter(
        (t) =>
          new Date(t.taskUpdated).toLocaleDateString() ===
          new Date().toLocaleDateString()
      );
      setTodayTask(filtersTodayTasks);
    }
  }, [tasks]);

  return (
    <>
      <h1 className="text-gray-500 dark:text-stone-300 font-semibold px-1 pt-3 pb-2">
        TODAY'S TASKS
      </h1>
      {todayTask.length ? (
        todayTask.map((task) => {
          return <SwipeToOption key={task.id} task={task} />;
        })
      ) : (
        <span className="flex items-center justify-center text-gray-700 text-sm dark:text-slate-100 ">
          Not Task's Today
        </span>
      )}
    </>
  );
};

export default TodayTasks;
