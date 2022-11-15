const Categories = () => {
  return (
    <section className="px-4 w-full">
      <div className="flex flex-col w-full">
        <h1 className="text-gray-400 pt-3 px-4 font-semibold pb-2">CATEGORIES</h1>
        <div className="flex  items-center justify-between gap-2 overflow-x-auto flex-nowrap w-full ">
          <div className="bg-white rounded-lg shadow-md  pt-2 px-2 pb-6 flex flex-col gap-y-2 items-center flex-1  mb-4 ">
            <h2 className="text-gray-400">40Tasks</h2>
            <h2 className="text-slate-700 text-xl font-semibold">Business</h2>
            <div className="w-full h-[3px] bg-gray-300 relative rounded">
                <span className="w-1/2 absolute h-[3px] left-0 bg-cyan-800 rounded"></span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md  pt-2 px-2 pb-6 flex flex-col gap-y-2 items-center flex-1 mb-4">
            <h2 className="text-gray-400">40Tasks</h2>
            <h2 className="text-slate-700 text-xl font-semibold">Business</h2>
            <div className="w-full h-[3px] bg-gray-300 relative rounded">
                <span className="w-1/2 absolute h-[3px] left-0 bg-cyan-800 rounded"></span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Categories;
