import { useEffect, useState } from "react";

import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { deleteTasks, editTaskToggler } from "../../redux/tasks/tasksSlice";

import Accordion from "../accordion/accordion";
const SwipeToOption = ({ task }) => {
  const { toggleOpenEdit } = useSelector((state) => state.tasks.editTask);
  const [touchStart, setTouchStart] = useState(null);
  const [DragStart, setDragStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [DragEnd, setDragEnd] = useState(null);
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const minSwipeDistance = 0;

  useEffect(() => {
    toggleOpenEdit && setCounter(0);
  }, [toggleOpenEdit]);
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
    if (counter <= 20) {
      setCounter((c) => (c = 0));
    } else {
      setCounter((c) => (c = 400));
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
    if (counter <= 20) {
      setCounter((c) => (c = 0));
    } else {
      setCounter((c) => (c = 400));
    }
  };
  return (
    <div
      className={`bg-white rounded-lg  flex items-center justify-between py-1 ${
        counter > 15 ? "" : "shadow-md"
      }  relative mx-auto w-full border-separate last:mb-36 lg:last:mb-8 animate-waving-hand`}
      draggable="true"
      onTouchStart={startTouchHandler}
      onTouchMove={moveTouchandler}
      onTouchEnd={endTouchHandler}
      onDragStart={dragStartHandler}
      onDrag={dragHandler}
      onDragEnd={dragEndHandler}
    >
      <div
        className={`absolute px-2 right-0 top-0 inline-flex justify-start items-center py-3 h-full w-full ${
          counter > 40 ? "bg-gray-100" : "bg-white"
        } gap-x-2 rounded-lg `}
      >
        <div className="flex justify-between w-full items-center gap-x-2">
          <div className="flex items-center gap-x-2">
            <button
              type="button"
              className=" transition-all ease-in-out duration-500  bg-transparent p-1 text-xl h-full text-slate-700 hover:text-2xl hover:text-red-600 "
              onClick={() =>
                dispatch(
                  deleteTasks({ id: task.id, categorie: task.categorie })
                )
              }
            >
              <HiOutlineTrash />
            </button>
            <span
              className="text-gray-400 hover:text-green-600"
              onClick={() => setCounter(0)}
            >
              Tap to restore the task
            </span>
          </div>
          <div>
            <button
              type="button"
              className={`ring ring-gray-300 h-6 w-12 bg-white flex  items-center justify-center rounded-2xl text-sm hover:text-gray-100 hover:bg-${task.color}  transition-all ease-in-out duration-700`}
              onClick={() => dispatch(editTaskToggler({ task: task }))}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <div
        className="flex items-center  relative transition-all ease-linear duration-500  w-full bg-white box-border"
        style={{ transform: `translateX(-${counter}px)` }}
      >
        <Accordion task={task} counter={counter} />
      </div>
    </div>
  );
};

export default SwipeToOption;
