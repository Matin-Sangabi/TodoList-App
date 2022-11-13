import { FiPlus } from "react-icons/fi";

const AddTasksBtn = () => {
  return (
    <button
      type="button"
      className=" rounded-full bg-blue-500 text-white w-12 h-12 flex items-center justify-center fixed bottom-2 right-2 lg:absolute lg:bottom-4 lg:right-4 z-20 text-2xl group  hover:shadow-md hover:shadow-blue-500"
    >
      <FiPlus className="group-hover:rotate-180 transition-all ease-linear duration-500" />
    </button>
  );
};

export default AddTasksBtn;
