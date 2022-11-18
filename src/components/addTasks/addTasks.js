import { useSelector, useDispatch } from "react-redux";
import { FiArrowLeft, FiX, FiCalendar, FiChevronDown } from "react-icons/fi";
import { addTasks, toggleTaskBtn } from "../../redux/tasks/tasksSlice";
import { useState } from "react";
import { colors } from "../../utils/colors";
import { toast } from "react-toastify";
const AddTasks = () => {
  const {openTasks , categories} = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [color, setColor] = useState("blue-500");
  const [toggleColor, setToggleColor] = useState(false);
  const [titleTask, setTitleTask] = useState("");
  const [descTask, setDescTask] = useState("");
  const [selectCat, setSelectCat] = useState("");
  const toggleColorHandler = () => {
    setToggleColor(!toggleColor);
  };
  const changeColorHandler = ({ color }) => {
    setToggleColor(false);
    setColor(color);
  };
  const sectionClickHandler = () => {
    toggleColor && setToggleColor(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (titleTask.length === 0 || descTask.length === 0 ) {
      toast.error("Please complete the forms !", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const task = {
        id: Date.now(),
        title: titleTask,
        desc: descTask,
        color: color,
        completed: false,
        categorie : selectCat, 
        dateUpdated: new Date().toISOString(),
      };
      dispatch(addTasks(task));

      setTitleTask("");
      setDescTask("");
    }
  };

  return (
    <section
      className={`w-full  h-screen px-2 bg-gray-100 absolute pt-6 top-0 left-0 overflow-hidden  ${
        openTasks ? "translate-y-0 block" : " translate-y-full"
      } transition-all ease-linear delay-500 z-30`}
      onClick={sectionClickHandler}
    >
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          className="text-2xl text-gray-500 hover:-translate-x-2 transition-all duration-300 ease-linear"
          onClick={() => dispatch(toggleTaskBtn())}
        >
          <FiArrowLeft />
        </button>
        <button
          type="button"
          className="w-6 h-6 rounded-full ring-gray-500 ring-2 flex items-center justify-center group text-lg hover:rotate-180 transition-all ease-in-out duration-500"
          onClick={() => dispatch(toggleTaskBtn())}
        >
          <FiX />
        </button>
      </div>
      <form
        className="flex flex-col gap-y-6 w-full pt-20"
        onSubmit={submitHandler}
      >
        <div className="space-y-4">
          <div className="space-y-6">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-slate-700  font-semibold">
                Enter Task's Title
              </h1>
              <input
                placeholder="Type Task's Title"
                className="resize-none font-semibold text-slate-700 hover:ring-2 p-2 ring-1 ring-gray-300 bg-transparent transition-all ease-in-out duration-300 focus:shadow-md focus:shadow-gray-500 hover:ring-gray-500 rounded-md outline-none border-none focus:ring-2 focus:ring-gray-500"
                value={titleTask}
                onChange={(e) => setTitleTask(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <h1 className="text-slate-700  font-semibold">
                Enter Task's Desc
              </h1>
              <textarea
                placeholder="Type Task's Title"
                className="resize-none text-slate-700 bg-transparent hover:ring-2 p-2 ring-1 ring-gray-300 transition-all ease-in-out duration-300 focus:shadow-md focus:shadow-gray-500 hover:ring-gray-500 rounded-md outline-none border-none focus:ring-2 focus:ring-gray-500"
                value={descTask}
                onChange={(e) => setDescTask(e.target.value)}
              ></textarea>
              <h1 className="text-slate-700  font-semibold">
                Enter Task's Categories
              </h1>
              <select
                className="bg-gray-100 border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 form-select"
                onChange={(e) => setSelectCat(e.target.value)}
                value={selectCat}
              >
                <option className="p-2">Choose a categorie</option>
                ${categories.map((item)=>(
                  <option key={item.id} value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-x-2 pt-8  relative">
            <div className="w-28 p-2 rounded-3xl ring-1 ring-gray-400 flex items-center gap-2 group cursor-pointer hover:ring-2 hover:ring-gray-500 transition-all duration-300 ease-linear">
              <span className="text-gray-400 group-hover:text-gray-700 transition-all ease-linear duration-300">
                <FiCalendar />
              </span>
              <span className="text-gray-400 group-hover:text-gray-700 transition-all ease-linear duration-300">
                Today
              </span>
            </div>
            <SetColors
              color={color}
              changeColorHandler={changeColorHandler}
              toggleColorHandler={toggleColorHandler}
              toggleColor={toggleColor}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-end absolute bottom-4 right-4">
          <button
            type="submit"
            className={`bg-${color} p-2 text-slate-100 rounded-md flex items-center justify-center gap-x-2 hover:ring-2 hover:ring-offset-2 hover:ring-${color} group transition-all ease-linear duration-300`}
          >
            <span className="text-xl group-hover:rotate-[360deg] transition-all duration-500 ease-linear">
              <FiChevronDown />
            </span>
            <span className="">New Task</span>
          </button>
        </div>
      </form>
    </section>
  );
};

const SetColors = ({
  color,
  changeColorHandler,
  toggleColorHandler,
  toggleColor,
}) => {
  return (
    <>
      <div
        className="w-10 h-10  rounded-full ring-1 ring-gray-400 flex items-center justify-center cursor-pointer group hover:ring-2 hover:ring-gray-500 transition-all ease-liner duration-300"
        onClick={toggleColorHandler}
      >
        <span
          className={`w-6 h-6 rounded-full  bg-${color} ring-1 ring-offset-1 ring-${color} group-hover:ring-2 group-hover:ring-offset-2 transition-all ease-linear duration-300`}
        ></span>
      </div>
      {toggleColor && (
        <div className="p-2 bg-gray-100 rounded-md flex items-center gap-2 absolute right-7 top-6 w-40 flex-wrap justify-center shadow-md">
          {colors.map((color, i) => (
            <span
              key={i}
              className={`w-6 h-6 rounded-full bg-${color.color} cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-${color.color} transition-all ease-linear duration-300`}
              onClick={() => changeColorHandler(color)}
            ></span>
          ))}
        </div>
      )}
    </>
  );
};

export default AddTasks;
