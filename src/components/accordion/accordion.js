import { useState } from "react";
import { useDispatch } from "react-redux";
import { HiChevronDown ,HiChevronLeft} from "react-icons/hi";
import { togglecompleteTasks } from "../../redux/tasks/tasksSlice";
const Accordion = ({ task  , counter }) => {
  const [accordion, setAccordion] = useState(false);
  const dispatch = useDispatch();

  const CalCulateTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="w-full p-2 z-20">
      <div className="flex items-center gap-x-2 w-full">
        <div className="">
          <input
            type="checkbox"
            className={`rounded-full cursor-pointer ring-0 border-none  outline-none focus:ring-gray-400 transition-all ease-in-out duration-300 bg-${task.color} text-gray-500 focus:border-none focus:outline-none`}
            checked={task.completed}
            onChange={() => dispatch(togglecompleteTasks({ id: task.id }))}
          />
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-between"
          onClick={() => setAccordion(!accordion)}
          disabled={accordion ? "" : task.completed}
        >
          <span className="flex items-center gap-x-1">
            <p
              className={`font-semibold transition-all ease-in-out duration-500 flex items-center justify-center  ${
                task.completed
                  ? "line-through text-sm text-gray-400"
                  : "text-slate-700"
              }`}
            >
              {task.title}
            </p>
            <span className={`transition-all ease-in-out duration-500  ${accordion ? 'rotate-180' : ''} ${task.completed ? 'text-gray-400 text-sm' : 'text-slate-700 text-lg'}`}><HiChevronDown/></span>
          </span>
          <span className="flex items-center justify-between">
          <p
            className={`transition-all ease-in-out duration-300 ${
              task.completed ? "text-gray-400 text-xs" : "text-gray-500 text-sm"
            }`}
          >
            {CalCulateTime(task.dateUpdated)}
          </p>
          <span className={`transition-all ease-in-out duration-300 ${counter >= 15 ? 'rotate-180' : '' }`}><HiChevronLeft/></span>
          </span>
        </button>
      </div>
      <div
        className={`text-gray-500 bg-gray-100 -z-20 text-sm  w-56 transition-all ease-linear duration-300 px-4 ${
          accordion ? "py-2  h-auto" : "h-0"
        } ${task.completed ? "text-xs " : ""}`}
      >
        {accordion ? task.desc : ""}
      </div>
    </div>
  );
};

export default Accordion;