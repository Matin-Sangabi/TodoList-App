import { useSelector } from "react-redux";
import AddTasks from "../../components/addTasks/addTasks";
import AddTasksBtn from "../../components/addTasks/addTasksbtn";
import Categories from "../../components/categories/Categories";
import Header from "../../components/header/header";
import Tasks from "../../components/tasks/tasks";
import WelComeSection from "../../components/welcome/welcome";
const OpenComponents = () => {
  const openMenu = useSelector((state) => state.tasks.openMenu);
  return (
    <div
      className={`transition-all ease-linear duration-300  ${
        openMenu
          ? "h-[90%] absolute rounded-l-2xl top-[5%] w-full -right-52 bg-gray-100 z-40 select-none"
          : "h-full relative w-full top-0 right-0"
      }`}
    >
      <Header />
      <WelComeSection />
      <Categories />
      <Tasks />
      <AddTasksBtn />
      <AddTasks />
    </div>
  );
};

export default OpenComponents;
