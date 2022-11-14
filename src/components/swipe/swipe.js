import { useState } from "react";
import { togglecompleteTasks } from "../../redux/tasks/tasksSlice";
import { HiChevronDown, HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import { useDispatch } from "react-redux";
const SwipeToOption = ({ task }) => {
  const dispatch = useDispatch();
  const CalCulateTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const [touchStart, setTouchStart] = useState(null);
  const [DragStart, setDragStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [DragEnd, setDragEnd] = useState(null);
  const [counter, setCounter] = useState(0);

  const minSwipeDistance = 0;

  const startTouchHandler = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const moveTouchandler = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    const distance = touchStart - touchEnd;
    const leftSwipe = distance > minSwipeDistance;
    leftSwipe ? setCounter((c) => c + 1) : setCounter((c) => c - 1);
  };
  const endTouchHandler = () => {
    if (!touchStart || !touchEnd) return;
    if (counter <= 15) {
      setCounter((c) => (c = 0));
    } else {
      setCounter((c) => (c = 60));
    }
  };

  const dragStartHandler = (e) => {
    setDragEnd(null);
    setDragStart(e.clientX);
  };
  const dragHandler = (e) => {
    setDragEnd(e.clientX);
    const disabled = DragStart - DragEnd;
    const leftSwipe = disabled > minSwipeDistance;
    leftSwipe ? setCounter((c) => c + 1) : setCounter((c) => c - 1);
  };
  const dragEndHandler = () => {
    if (counter <= 15) {
      setCounter((c) => (c = 0));
    } else {
      setCounter((c) => (c = 60));
    }
  };  
  return (
    <div
      className="bg-gray-100 rounded-lg shadow-md flex items-center justify-between  relative h-12 max-h-[300px]  w-full "
      draggable="true"
      onTouchStart={startTouchHandler}
      onTouchMove={moveTouchandler}
      onTouchEnd={endTouchHandler}
      onDragStart={dragStartHandler}
      onDrag={dragHandler}
      onDragEnd={dragEndHandler}
    >
      <div className="absolute right-0 top-0 inline-flex justify-start items-center h-full w-full bg-gray-100 gap-x-2 ">
        <div className="flex justify-end w-full items-center gap-x-2">
          <button
            type="button"
            className="transition-all  ease-in-out duration-500 bg-transparent   text-xl h-full p-1 text-slate-700"
          >
            <HiPencilAlt />
          </button>
          <button
            type="button"
            className=" transition-all ease-in-out duration-500  bg-transparent p-1 text-xl h-full text-red-600"
          >
            <HiOutlineTrash />
          </button>
        </div>
      </div>
      <div
        className="flex items-center justify-between relative transition-all ease-in-out duration-300 h-12 w-full px-3  bg-gray-100 box-border"
        style={{ transform: `translateX(-${counter}px)` }}
      >
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            className={`rounded-full cursor-pointer ring-0 border-none  outline-none focus:ring-gray-400 transition-all ease-in-out duration-300 bg-${task.color} text-gray-500 focus:border-none focus:outline-none`}
            checked={task.completed}
            onChange={() => dispatch(togglecompleteTasks({ id: task.id }))}
          />
          <Accordion task={task} />
        </div>

        <div
          className={`transition-all ease-in-out duration-300 ${
            task.completed ? "text-gray-400 text-xs" : "text-gray-500 text-sm"
          }`}
        >
          {CalCulateTime(task.dateUpdated)}
        </div>
      </div>
    </div>
  );
};

export default SwipeToOption;

const Accordion = ({ task }) => {
  const [accordion, setAccordion] = useState(false);

  return (
    <div className="flex flex-col z-20 ">
      <button
        type="button"
        className="flex items-center  justify-start gap-x-2 w-56"
        onClick={() => setAccordion(!accordion)}
        disabled={accordion ? "" : task.completed}
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
          <HiChevronDown
            className={`transition-all ease-in-out duration-500 ${
              accordion ? "rotate-180 transform" : ""
            }`}
          />
        </span>
      </button>
      <div
        className={`text-gray-500 bg-gray-100 -z-20 text-sm  w-56 transition-all ease-in-out duration-500 px-4 ${
          accordion ? "py-2 translate-y-0" : "-translate-y-10"
        } ${task.completed ? "text-xs line-through" : ""}`}
      >
        {accordion ? task.desc : ""}
      </div>
    </div>
  );
};
