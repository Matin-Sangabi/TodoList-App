import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SwipeToOption from "../swipe/swipe";
import TodayTasks from "./todayTask";

const Tasks = () => {
  const tasks = useSelector((state) => state.tasks.todos);
  const [sortTasks, setSortTasks] = useState([]);
  useEffect(() => {
    let resault = tasks;
    resault = sortedTasks(resault);
    resault = categorieByDate(resault);
    setSortTasks(resault);
  }, [tasks]);
  const categorieByDate = (root) => {
    const categorie = [...root];
    const tasks = categorie.reduce((tasks, task) => {
      const date = new Date(task.taskUpdated).toDateString();
      if (!tasks[date]) {
        tasks[date] = [];
      }
      tasks[date].push(task);
      return tasks;
    }, {});
    const tasksArray = Object.keys(tasks).map((date) => {
      return {
        date,
        tasks: tasks[date],
      };
    });
    return tasksArray;
  };
  const sortedTasks = (root) => {
    let sort = [...root];
    return sort.sort((a, b) => {
      return new Date(a.taskUpdated) > new Date(b.taskUpdated) ? 1 : -1;
    });
  };

  return (
    <section className="px-4 pt-4 w-full">
      <TodayTasks tasks={tasks} />
      <h1 className="text-gray-500 dark:text-stone-300 font-semibold px-1 pt-3 pb-2">
        ALL TASKS
      </h1>
      <div className="flex flex-col gap-y-2 h-[450px] md:h-[600px] mb-40  overflow-y-auto scrollbar">
        {sortTasks.length === 0 ? (
          <div className="text-center text-slate-700 dark:text-stone-300">
            No Task's yet
          </div>
        ) : (
          <>
            {sortTasks.map((item , i) =>{
              return (
                <Fragment key={i}>
                  <h1 className="text-xs px-2 font-semibold dark:text-slate-400 text-gray-500">{new Date(item.date).toDateString()}</h1>
                  {item.tasks.map((task) =>{
                    return <SwipeToOption key={task.id} task={task}/> 
                  })}
                </Fragment> 
              )
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default Tasks;
/**
 * sortTasks.map((task) => <SwipeToOption key={task.id} task={task} />)
 */