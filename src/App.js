import { Provider } from "react-redux";
import { store } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";

import CategoriesPage from "./pages/Categories/Categories";
function App() {
  return (
    <Provider store={store}>
      <div className="max-w-screen-sm md:max-w-sm mx-auto relative h-screen overflow-hidden bg-gray-100">
        <ToastContainer />
        <Routes>
          <Route element={<Homepage />} path="/" />
          <Route element={<CategoriesPage />} path="Categories" />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
