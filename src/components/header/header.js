import { FiSearch , FiBell } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuTasks } from "../../redux/tasks/tasksSlice";

const Header = () => {
  const openMenu = useSelector((state) => state.tasks.openMenu);
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    openMenu && dispatch(toggleMenuTasks())
    dispatch(toggleMenuTasks());
  }
  return (
    <header className="px-4 pt-6  relative">
      <div className="w-full flex justify-between items-center">
        <div>
          <button className="p-2 text-gray-500  text-2xl  flex flex-col gap-y-1" onClick={toggleMenuHandler}>
            <span className={`w-4 h-[2px] bg-gray-400 dark:bg-gray-100 rounded-md transition-all ease-in-out duration-300 ${openMenu ? 'rotate-45 absolute': ''}`}></span>
            <span className={`w-4 h-[2px] bg-gray-400 dark:bg-gray-100 rounded-md transition-all ease-in-out duration-300  ${openMenu ? '-rotate-45 absolute': ''}`}></span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xl text-gray-500 dark:text-gray-100">
            <FiSearch/>
          </button>
          <button className="text-xl text-gray-500 dark:text-gray-100">
            <FiBell/>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
