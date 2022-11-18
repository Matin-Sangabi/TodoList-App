import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import SwipeToOption from "../../components/swipe/swipe";
import Layout from "../../layout/layout";
import calculateTotalTasks from "../../utils/calculateTotalTasks";

const TasksShow = () => {
  const [searchParams] = useSearchParams();
  const getQueryParamsCategorie = searchParams.get("cat");
  const getQueryParamsId = searchParams.get("id");
  const { todos, categories } = useSelector((state) => state.tasks);

  const [categorisName, setCategoriesName] = useState(null);
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    const selectOneCategorie = categories.find((c) => c.id === Number(getQueryParamsId));
    setCategoriesName(selectOneCategorie);
  }, [getQueryParamsId, categories]);

  useEffect(() => {
    const filterTodos = todos.filter(
      (t) => t.categorie.toLowerCase() === getQueryParamsCategorie.toLocaleLowerCase()
    );
    if (filterTodos.length !== 0) {
      setTasks(filterTodos);
    }else{
      setTasks(null)
    }
  }, [getQueryParamsCategorie, todos]);

  return (
    <Layout>
      <section className="w-full px-4">
        <div className="w-full flex items-center justify-between pt-10">
          {categorisName && <h1 className="text-slate-700 dark:text-gray-100 font-semibold text-xl">{categorisName.name} Task's</h1>}
          <Link to="/" className="text-xs text-sky-500">
            Back HomePage
          </Link>
        </div>
        {categorisName && (
          <div className="pt-4 w-full">
            <div
              className={`w-full bg-white dark:bg-[#041955] shadow-md p-2 rounded-lg flex flex-col transition-all ease-in-out duration-300 items-start gap-y-4 hover:bg-${categorisName.color} hover:bg-opacity-50 group`}
            >
              <h1
                className={`text-gray-400 group-hover:text-${categorisName.color}`}
              >
                {categorisName.total} tasks
              </h1>
              <h1 className="text-2xl font-semibold text-slate-700 dark:text-gray-100 group-hover:text-gray-100">
                {categorisName.name}
              </h1>
              <div className="w-full h-[6px] bg-gray-300 dark:bg-stone-600 relative rounded">
                <span
                  style={{
                    width: `${calculateTotalTasks(categorisName.total)}%`,
                  }}
                  className={`absolute transition-all ease-in-out duration-300 h-[6px]    left-0 bg-${categorisName.color} rounded`}
                ></span>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col pt-6 gap-y-4">
          {tasks ? (
            tasks.map((task) => <SwipeToOption key={task.id} task={task} />)
          ) : (
            <span>not task's yet</span>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default TasksShow;
