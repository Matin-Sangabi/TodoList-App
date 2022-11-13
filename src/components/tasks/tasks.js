import { useSelector, useDispatch } from "react-redux";
import { togglecompleteTasks } from "../../redux/tasks/tasksSlice";
import { HiChevronDown } from "react-icons/hi";
import { useState } from "react";


const Tasks = () => {
  const tasks = useSelector((state) => state.tasks.todos);
  const dispatch = useDispatch();
  const CalCulateTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <section className="px-4 w-full ">
      <h1 className="text-gray-400 font-semibold px-2 pt-3 pb-2">
        TODAY'S TASKS
      </h1>
      <div className="flex flex-col gap-y-4 h-[300px] lg:h-full overflow-y-auto ">
        {tasks.length === 0 ? (
          <div className="text-center text-slate-700">No Task's yet</div>
        ) : (
          tasks.map((task) => (
            <div
              className="bg-gray-100 rounded-lg shadow-md flex items-center justify-between p-3 z-10 z-20"
              key={task.id}
            >
              <div className="flex items-center gap-x-2 relative">
                <input
                  type="checkbox"
                  className={`rounded-full cursor-pointer ring-0 border-none  outline-none focus:ring-gray-400 transition-all ease-in-out duration-300 bg-${task.color} text-gray-500 focus:border-none focus:outline-none`}
                  checked={task.completed}
                  onChange={() =>
                    dispatch(togglecompleteTasks({ id: task.id }))
                  }
                />
                <Accordion task={task}/>
              </div>

              <div
                className={`transition-all ease-in-out duration-300 ${
                  task.completed
                    ? "text-gray-400 text-xs"
                    : "text-gray-500 text-sm"
                }`}
              >
                {CalCulateTime(task.dateUpdated)}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Tasks;

const Accordion = ({ task }) => {
  const [accordion, setAccordion] = useState(false);
  
  return (
    <div className="flex flex-col z-20 ">
      <button
        type="button"
        className="flex items-center  justify-start gap-x-2 w-56"
        onClick={() => setAccordion(!accordion)}
        disabled={accordion ? '' : task.completed}
      >
        <p
          className={`font-semibold transition-all ease-in-out duration-500 flex items-center justify-center  ${
            task.completed
              ? "line-through text-sm text-gray-400"
              : "text-slate-700"
          }`}
        >
          {task.title}
        </p>
        <span
          className={` transition-all ease-in-out duration-300 ${
            task.completed
              ? "text-gray-400 text-base"
              : "pt-1 text-slate-800 text-xl"
          }`}
        >
          <HiChevronDown className={`transition-all ease-in-out duration-500 ${accordion ? 'rotate-180 transform' : ''}`}/>
        </span>
      </button>
      <div className={`text-gray-500 bg-gray-100 -z-20 text-sm  w-56 transition-all ease-in-out duration-500 px-4 ${accordion ? 'py-2 translate-y-0' : '-translate-y-10'} ${task.completed ? 'text-xs line-through' : ''}`}>{accordion ? task.desc: ''}</div>
    </div>
  );
};

