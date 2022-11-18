import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import CategoriesPage from "./pages/Categories/Categories";
import TasksShow from "./pages/tasksShow/tasksShow";
import Setting from "./pages/setting/setting";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { tasksThemes } from "./redux/tasks/tasksSlice";
const RenderApps = () => {
    const theme = useSelector((state) => state.tasks.theme);
    useEffect(() => {
      tasksThemes(theme)
    } , [theme])
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
