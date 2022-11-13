import { useSelector , useDispatch } from "react-redux";

const Tasks = () => {
  const tasks = useSelector((state) => state.tasks.todos);
  const CalCulateTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <section className="px-4 w-full ">
      <h1 className="text-gray-400 font-semibold px-2 pt-3 pb-2">
        TODAY'S TASKS
      </h1>
      <div className="flex flex-col gap-y-4 h-[300px] lg:h-full overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="text-center text-slate-700">No Task's yet</div>
        ) : (
          tasks.map((task) => (
            <div
              className="bg-gray-100 rounded-lg shadow-md flex items-center justify-between p-3"
              key={task.id}
            >
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  className={`rounded-full ring-0 border-none outline-none focus:ring-gray-400 transition-all ease-in-out duration-300 bg-${task.color} text-gray-500 focus:border-none focus:outline-none`}
                />
                <h3 className="text-slate-700 font-semibold">{task.title}</h3>
              </div>
              <div className="text-gray-500 text-sm">
                {CalCulateTime(task.dateUpdated)}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Tasks;
/**
 * <div className="bg-gray-100 rounded-lg shadow-md flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center border border-red-500 rounded-full"></span>
            <h3 className="text-slate-700 font-semibold">
              Daily meeting with team
            </h3>
          </div>
          <div className="text-gray-500 text-sm">10PM</div>
        </div>
 */
