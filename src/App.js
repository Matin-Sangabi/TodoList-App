import { Provider } from "react-redux";
import { store } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import RenderApps from "./RenderApps";

function App() {
  return (
    <Provider store={store}>
      <div className="w-full h-screen dark:bg-[#041955] dark:bg-opacity-60 bg-opacity-10 bg-gray-100">
        <RenderApps/>
      </div>
    </Provider>
  );
}

export default App;
