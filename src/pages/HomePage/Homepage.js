
import AddTasks from "../../components/addTasks/addTasks";
import AddTasksBtn from "../../components/addTasks/addTasksbtn";
import Categories from "../../components/categories/Categories";
import EditTasks from "../../components/editTasks/editTask";
import Tasks from "../../components/tasks/tasks";
import WelComeSection from "../../components/welcome/welcome";
import Layout from "../../layout/layout";
const Homepage = () => {
  return (
    <Layout>
      <WelComeSection />
      <Categories />
      
      <Tasks />
      <AddTasksBtn />
      <AddTasks />
      <EditTasks/>
    </Layout>
  );
};

export default Homepage;
