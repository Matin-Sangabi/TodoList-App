import AddTasks from "./components/addTasks/addTasks";
import AddTasksBtn from "./components/addTasks/addTasksbtn";
import Categories from "./components/categories/Categories";
import Header from "./components/header/header";
import Tasks from "./components/tasks/tasks";
import WelComeSection from "./components/welcome/welcome";
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <div className="max-w-sm mx-auto relative h-screen overflow-hidden">
        <Header />
        <WelComeSection />
        <Categories />
        <Tasks />
        <AddTasksBtn />
        <AddTasks />
      </div>
    </Provider>
  );
}

export default App;
