import { useSelector } from "react-redux";

import SwipeToOption from "../swipe/swipe";

const Tasks = () => {
  const tasks = useSelector((state) => state.tasks.todos);
  
  return (
    <section className="px-4 w-full ">
      <h1 className="text-gray-400 font-semibold px-2 pt-3 pb-2">
        TODAY'S TASKS
      </h1>
      <div className="flex flex-col gap-y-4 h-[450px] md:h-[600px] mb-40  overflow-y-auto scrollbar">
        {tasks.length === 0 ? (
          <div className="text-center text-slate-700">No Task's yet</div>
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

