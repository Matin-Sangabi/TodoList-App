import { useSelector, useDispatch } from "react-redux";
import { FiArrowLeft, FiX, FiCalendar, FiChevronDown } from "react-icons/fi";
import { editTasksAdd, editTaskToggler } from "../../redux/tasks/tasksSlice";
import { useEffect, useState } from "react";
import { colors } from "../../utils/colors";
import { toast } from "react-toastify";
import SelectDatePicker from "../DatePicker/DatePicker.";

const EditTasks = () => {
  const { editTask, categories } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const { toggleOpenEdit, task } = editTask;
  const [color, setColor] = useState("");
  const [toggleColor, setToggleColor] = useState(false);
  const [titleTask, setTitleTask] = useState("");
  const [descTask, setDescTask] = useState("");
  const [selectCat, setSelectCat] = useState("");
  const [date, setDate] = useState();
  useEffect(() => {
    if (task) {
      setColor(task.color);
      setTitleTask(task.title);
      setDescTask(task.desc);
      setSelectCat(task.categorie);
      setDate(new Date(task.taskUpdated));
    }
  }, [task]);
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
    if (titleTask.length === 0 || descTask.length === 0) {
      toast.error("Please complete the forms !", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const editTask = {
        id: task.id,
        title: titleTask,
        desc: descTask,
        color: color,
        completed: task.completed,
        categorie: selectCat,
        createdAt: new Date().toISOString(),
        taskUpdated: date,
      };
      dispatch(editTasksAdd({ task: editTask, beforeCat: task.categorie }));
    }
  };
  return (
    <section
      className={`w-full  h-screen px-2 bg-gray-100 dark:bg-blue-900 absolute pt-6 top-0 left-0 overflow-hidden  ${
        toggleOpenEdit ? "translate-y-0 block" : " translate-y-full"
      } transition-all ease-in-out duration-500 delay-500 z-30`}
      onClick={sectionClickHandler}
    >
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          className="text-2xl text-gray-500 dark:text-gray-100 hover:-translate-x-2 transition-all duration-300 ease-linear"
          onClick={() => dispatch(editTaskToggler())}
        >
          <FiArrowLeft />
        </button>
        <button
          type="button"
          className="w-6 h-6 rounded-full ring-gray-500 dark:text-gray-100 ring-2 flex items-center justify-center group text-lg hover:rotate-180 transition-all ease-in-out duration-500"
          onClick={() => dispatch(editTaskToggler())}
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
              <h1 className="text-slate-700 dark:text-gray-100  font-semibold">
                Enter Task's Title
              </h1>
              <input
                placeholder="Type Task's Title"
                className="resize-none font-semibold text-slate-700 dark:text-gray-200 text-sm hover:ring-2 p-2 ring-1 ring-gray-300 bg-transparent transition-all ease-in-out duration-300 focus:shadow-md focus:shadow-gray-500 dark:focus:shadow-stone-500 hover:ring-gray-500 rounded-md outline-none border-none focus:ring-2 focus:ring-gray-500"
                value={titleTask}
                onChange={(e) => setTitleTask(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <h1 className="text-slate-700 dark:text-gray-100  font-semibold">
                Enter Task's Desc
              </h1>
              <textarea
                placeholder="Type Task's Title"
                className="resize-none text-slate-700 dark:text-gray-200 text-sm bg-transparent hover:ring-2 p-2 ring-1 ring-gray-300 transition-all ease-in-out duration-300 focus:shadow-md focus:shadow-gray-500 dark:focus:shadow-stone-500 hover:ring-gray-500 rounded-md outline-none border-none focus:ring-2 focus:ring-gray-500"
                value={descTask}
                onChange={(e) => setDescTask(e.target.value)}
              ></textarea>
              <h1 className="text-slate-700 dark:text-gray-100  font-semibold">
                Enter Task's Categories
              </h1>
              <select
                className="bg-gray-100 dark:bg-[#041955] dark:text-gray-100 border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 form-select"
                onChange={(e) => setSelectCat(e.target.value)}
                value={selectCat}
              >
                <option className="p-2">Choose a categorie</option>$
                {categories.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-x-2 pt-8  relative">
            <SelectDatePicker value={date} setValue={setDate} />
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
            className={`bg-${color} dark:bg-fuchsia-500 p-2 text-slate-100 dark:text rounded-md flex items-center justify-center gap-x-2 hover:ring-2 hover:ring-offset-2 hover:ring-${color} group transition-all ease-linear duration-300`}
          >
            <span className="text-xl group-hover:rotate-[360deg] transition-all duration-500 ease-linear">
              <FiChevronDown />
            </span>
            <span className="">Edit Task</span>
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
        <div className="p-2 bg-gray-100 dark:bg-[#041955] rounded-md flex items-center gap-2 absolute right-10 top-16 w-40 flex-wrap justify-center shadow-md">
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

export default EditTasks;
