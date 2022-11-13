import AddTasks from "./components/addTasks/addTasks";
import AddTasksBtn from "./components/addTasks/addTasksbtn";
import Categories from "./components/categories/Categories";
import Header from "./components/header/header";
import Tasks from "./components/tasks/tasks";
import WelComeSection from "./components/welcome/welcome";

function App() {
  return (
    <div className="max-w-sm mx-auto relative h-screen">
      <Header/>
      <WelComeSection/>
      <Categories/>
      <Tasks/>
      <AddTasksBtn/>
      <AddTasks/>
    </div>
  );
}

export default App;
