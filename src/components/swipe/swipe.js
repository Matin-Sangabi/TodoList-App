import { useState } from "react";

import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";

import Accordion from "../accordion/accordion";
const SwipeToOption = ({ task }) => {
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
      className="bg-gray-100 rounded-lg  flex items-center justify-between py-1 shadow-md relative w-full border-separate "
      draggable="true"
      onTouchStart={startTouchHandler}
      onTouchMove={moveTouchandler}
      onTouchEnd={endTouchHandler}
      onDragStart={dragStartHandler}
      onDrag={dragHandler}
      onDragEnd={dragEndHandler}
    >
      <div className="absolute  right-0 top-0 inline-flex justify-start items-center py-3 h-full w-full bg-gray-100 gap-x-2 rounded-lg ">
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
        className="flex items-center  relative transition-all ease-in-out duration-300 w-full bg-gray-100 box-border"
        style={{ transform: `translateX(-${counter}px)` }}
      >
        <Accordion task={task} counter={counter}/>
      </div>
    </div>
  );
};

export default SwipeToOption;

