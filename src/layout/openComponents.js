
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuTasks } from "../redux/tasks/tasksSlice";

const OpenComponents = ({children}) => {
  const openMenu = useSelector((state) => state.tasks.openMenu);
  const dispatch = useDispatch();
  const closeMenuHandler = () =>{
    openMenu && dispatch(toggleMenuTasks());
  }
  return (
    <div
      className={`transition-all ease-linear duration-300  ${
        openMenu
          ? "h-[90%] absolute rounded-l-2xl top-[5%] w-full -right-52 bg-gray-100 dark:bg-blue-900 z-40 select-none"
          : "h-full relative w-full top-0 right-0"
      }`}
      onClick={closeMenuHandler}
    >
      {children}
    </div>
  );
};

export default OpenComponents;
