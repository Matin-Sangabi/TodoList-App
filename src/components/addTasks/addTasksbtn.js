import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleTaskBtn } from "../../redux/tasks/tasksSlice";
const AddTasksBtn = () => {
    const dispatch = useDispatch();
  return (
    <button
      type="button"
      className=" rounded-full bg-blue-500 text-white w-12 h-12 flex items-center justify-center absolute bottom-2 right-2  z-20 text-2xl group  hover:shadow-md hover:shadow-blue-500"
      onClick={() => dispatch(toggleTaskBtn())}
    >
      <FiPlus className="group-hover:rotate-180 transition-all ease-linear duration-500" />
    </button>
  );
};

export default AddTasksBtn;
