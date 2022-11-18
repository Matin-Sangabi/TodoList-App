import { Provider } from "react-redux";
import { store } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import RenderApps from "./RenderApps";

function App() {
  return (
    <Provider store={store}>
      <RenderApps/>
    </Provider>
  );
}

export default App;
