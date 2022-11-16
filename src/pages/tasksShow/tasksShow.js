import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import SwipeToOption from "../../components/swipe/swipe";
import Layout from "../../layout/layout";
import calculateTotalTasks from "../../utils/calculateTotalTasks";

const TasksShow = () => {
  const [searchParams] = useSearchParams();
  const getQueryParams = searchParams.get("cat");
  const { todos, categories } = useSelector((state) => state.tasks);

  const [categorisName, setCategoriesName] = useState(null);
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    const selectOneCategorie = categories.find(
      (c) => c.name.toLowerCase() === getQueryParams.toLowerCase()
    );
    setCategoriesName(selectOneCategorie);
  }, [getQueryParams, categories]);
  useEffect(() => {
    const filterTodos = todos.filter(
      (t) => t.categorie.toLowerCase() === getQueryParams.toLocaleLowerCase()
    );
    if(filterTodos.length !== 0){
        setTasks(filterTodos);
    }
  }, [getQueryParams, todos]);

  return (
    <Layout>
      <section className="w-full px-4">
        <div className="w-full flex items-center justify-between pt-10">
          <Link to="/" className="text-xs text-sky-500">
            Back HomePage
          </Link>
          <h1 className="text-slate-700 font-semibold text-xl">Categorie</h1>
        </div>
        {categorisName && (
          <div className="pt-4 w-full">
            <div className={`w-full bg-white shadow-md p-2 rounded-lg flex flex-col transition-all ease-in-out duration-300 items-start gap-y-4 hover:bg-${categorisName.color} hover:bg-opacity-50 group`}>
              <h1 className={`text-gray-400 group-hover:text-${categorisName.color}`}>{categorisName.total} tasks</h1>
              <h1 className="text-2xl font-semibold text-slate-700 group-hover:text-gray-100">
                {categorisName.name}
              </h1>
              <div className="w-full h-[6px] bg-gray-300 relative rounded">
                <span
                  style={{ width: `${calculateTotalTasks(categorisName.total)}%` }}
                  className={`absolute w-1/2 transition-all ease-in-out duration-300 h-[6px]    left-0 bg-${categorisName.color} rounded`}
                ></span>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col pt-6 gap-y-4">
          {tasks ?
            tasks.map((task) => <SwipeToOption key={task.id} task={task} />): <span>not task's yet</span>}
        </div>
      </section>
    </Layout>
  );
};

export default TasksShow;
