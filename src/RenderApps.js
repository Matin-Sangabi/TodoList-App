import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import CategoriesPage from "./pages/Categories/Categories";
import TasksShow from "./pages/tasksShow/tasksShow";
import Setting from "./pages/setting/setting";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const RenderApps = () => {
    const {dark} = useSelector((state) => state.tasks.theme);
    useEffect(() => {
        if(dark) {
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark')
        }
    } , [dark])
  return (
    <div className="max-w-screen-sm md:max-w-sm mx-auto relative h-screen overflow-hidden bg-gray-100 dark:bg-blue-900">
      <ToastContainer />
      <Routes>
        <Route element={<Homepage />} path="/" />
        <Route element={<CategoriesPage />} path="Categories" />
        <Route element={<TasksShow />} path="tasks" />
        <Route element={<Setting />} path="setting" />
      </Routes>
    </div>
  );
};

export default RenderApps;
