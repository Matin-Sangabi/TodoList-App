import Layout from "../../layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown } from "react-icons/fi";

import { useState } from "react";
import { colors } from "../../utils/colors";
import { addCategories, toggleMenuTasks } from "../../redux/tasks/tasksSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const {categories} = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [color, setColor] = useState("blue-500");
  const [toggleColor, setToggleColor] = useState(false);
  const [categoriValue, setCategorieValue] = useState("");

  const changeColorHandler = ({ color }) => {
    setToggleColor(false);
    setColor(color);
  };
  const toggleColorHandler = () => {
    setToggleColor(!toggleColor);
  };
  const sectionClickHandler = () => {
    toggleColor && setToggleColor(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const findCategorie = categories.find(
      (c) => c.name.toLowerCase() === categoriValue.toLocaleLowerCase()
    );
    if (findCategorie) {
      toast.error("Categorie has declered", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (categoriValue.length === 0) {
      toast.error("Categorie Title must be added", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const categorieAction = {
      id: Date.now(),
      total: 0,
      name: categoriValue,
      color: color,
    };
    dispatch(addCategories(categorieAction));
    setCategorieValue("");
  };
  
  return (
    <Layout>
      <section className="pt-4 px-4 space-y-4" onClick={sectionClickHandler}>
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xs text-sky-500">Back HomePage</Link>
        <h1 className="text-slate-700 font-semibold text-xl">Categorie</h1>
      </div>
        <div className="w-full flex flex-wrap items-start justify-center gap-2 h-[100px] md:h-[200px] overflow-auto">
          {categories.map((categorie) => {
            return (
              <div
                key={categorie.id}
                className={`p-2 bg-white h-24 flex-grow text-slate-800 font-semibold w-28 animate-waving-hand  rounded-lg shadow-md flex flex-col justify-between group hover:bg-${categorie.color} hover:bg-opacity-50 hover:text-gray-100`}
              >
                <span className="h-10 overflow-auto text-sm max-w-24 break-words">
                  {categorie.name}
                </span>
                <span
                  className={`text-sm text-gray-400  group-hover:text-${categorie.color}`}
                >
                  total tasks : {categorie.total}
                </span>
                <div className="w-full h-[6px] bg-gray-300 relative rounded">
                  <span
                    style={{ width: categorie.total }}
                    className={` absolute h-[6px] left-0 bg-${categorie.color} rounded`}
                  ></span>
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="text-slate-700 font-semibold pt-8">Add New categori</h1>
        <form
          className="w-full h-[370px] md:h-[400px] p-2 flex flex-col items-start relative"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col w-full">
            <div className="w-full">
              <input
                type="text"
                className="font-semibold text-slate-700 w-full hover:ring-2 p-2 ring-1 ring-gray-300 bg-transparent transition-all ease-in-out duration-300 focus:shadow-md focus:shadow-gray-500 hover:ring-gray-500 rounded-md outline-none border-none focus:ring-2 focus:ring-gray-500"
                placeholder="Categorie : "
                value={categoriValue}
                onChange={(e) => setCategorieValue(e.target.value)}
              />
            </div>
            <div className="relative mt-8 flex items-center gap-4">
              <h1 className="text-slate-500 ">Categorie color :</h1>
              <SetColors
                color={color}
                changeColorHandler={changeColorHandler}
                toggleColor={toggleColor}
                toggleColorHandler={toggleColorHandler}
              />
            </div>
          </div>
          <div className="flex-1 flex items-end justify-end w-full">
            <button
              type="submit"
              className={`bg-${color} p-2 text-slate-100 rounded-md flex items-center justify-center gap-x-2 hover:ring-2 hover:ring-offset-2 hover:ring-${color} group transition-all ease-linear duration-300`}
            >
              <span className="text-xl group-hover:rotate-[360deg] transition-all duration-500 ease-linear">
                <FiChevronDown />
              </span>
              <span className="">New Categorie</span>
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
};
const SetColors = ({
  color,
  changeColorHandler,
  toggleColorHandler,
  toggleColor,
}) => {
  return (
    <>
      <div
        className="w-10 h-10  rounded-full ring-1 ring-gray-400 flex items-center justify-center cursor-pointer group hover:ring-2 hover:ring-gray-500 transition-all ease-liner duration-300"
        onClick={toggleColorHandler}
      >
        <span
          className={`w-6 h-6 rounded-full  bg-${color} ring-1 ring-offset-1 ring-${color} group-hover:ring-2 group-hover:ring-offset-2 transition-all ease-linear duration-300`}
        ></span>
      </div>
      {toggleColor && (
        <div className="p-2 bg-gray-100 rounded-md flex items-center gap-2 absolute right-2 top-8 w-40 flex-wrap justify-center shadow-md">
          {colors.map((color, i) => (
            <span
              key={i}
              className={`w-6 h-6 rounded-full bg-${color.color} cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-${color.color} transition-all ease-linear duration-300`}
              onClick={() => changeColorHandler(color)}
            ></span>
          ))}
        </div>
      )}
    </>
  );
};
export default CategoriesPage;
