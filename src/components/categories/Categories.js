import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {useHorizontalScroll} from "../../hooks/useHorizontalScroll";
import calculateTotalTasks from "../../utils/calculateTotalTasks";

const Categories = () => {
  const { categories } = useSelector((state) => state.tasks);
  const horizontalScroll = useHorizontalScroll();
  return (
    <section className="px-4 w-full">
      <div className="flex flex-col w-full">
        <h1 className="text-gray-400 pt-3 px-4 font-semibold pb-2">
          CATEGORIES
        </h1>
        <div className="flex  items-center justify-between gap-2 overflow-x-scroll scrollbar  w-[100%] box-content " ref={horizontalScroll}>
          {categories.map((item) => (
            <Link
              to={`/tasks?cat=${item.name}&id=${item.id}`}
              key={item.id}
              className={`bg-white rounded-lg shadow-md transition-all ease-in-out duration-300 pt-2 px-2 pb-6  flex-1  mb-4 hover:bg-${item.color} hover:bg-opacity-50 group `}
            >
              <div className="flex flex-col gap-y-2 items-center w-40">
                <h2
                  className={`text-gray-400 font-semibold group-hover:text-${item.color} `}
                >
                  {item.total} tasks
                </h2>
                <h2
                  className={`text-slate-700 text-xl font-semibold group-hover:text-gray-100`}
                >
                  {item.name}
                </h2>
                <div className="w-full h-[6px] bg-gray-300 relative rounded">
                  <span
                    style={{ width: `${calculateTotalTasks(item.total)}%` }}
                    className={`absolute transition-all ease-in-out duration-300 h-[6px]    left-0 bg-${item.color} rounded`}
                  ></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
