import { useSelector } from "react-redux";

import SwipeToOption from "../swipe/swipe";
import TodayTasks from "./todayTask";

const Tasks = () => {
  const tasks = useSelector((state) => state.tasks.todos);
  
  return (
    <section className="px-4 pt-4 w-full ">
      <TodayTasks tasks={tasks} />
      <div className="flex flex-col gap-y-4 h-[450px] md:h-[600px] mb-40  overflow-y-auto scrollbar">
        {tasks.length === 0 ? (
          <div className="text-center text-slate-700 dark:text-stone-300">No Task's yet</div>
        ) : (
          tasks.map((task) => (
            <SwipeToOption key={task.id} task={task}/>
          ))
        )}
      </div>
    </section>
  );
};

export default Tasks;

