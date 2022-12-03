import Layout from "../../layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiTrash2, FiEdit2 } from "react-icons/fi";

import { useEffect, useState } from "react";
import { colors } from "../../utils/colors";
import {
  addCategories,
  deleteCategorie,
  editCategories,
} from "../../redux/tasks/tasksSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import calculateTotalTasks from "../../utils/calculateTotalTasks";

const CategoriesPage = () => {
  const { categories } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [color, setColor] = useState("blue-500");
  const [toggleColor, setToggleColor] = useState(false);
  const [categoriValue, setCategorieValue] = useState("");
  const [editCat, setEditCat] = useState({
    value: "",
    isEdit: false,
    cat: null,
  });

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
  const deleteCateGorieHandler = (categori) => {
    if (categori.total === 0) {
      dispatch(deleteCategorie({ id: categori.id }));
      toast.success("Categorie Delected", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("There are tasks in this category, you cannot delete them!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
  };
  const editCategorieHandler = (e) => {
    e.preventDefault();
    if (editCat.value.length === 0) {
      toast.error("categori title not empty !", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else {
      dispatch(
        editCategories({
          afterName: editCat.value,
          cat: editCat.cat,
          color: color,
        })
      );
      toast.success("categori successfuly Edited !", {
        position: toast.POSITION.TOP_CENTER,
      });
      setEditCat({ value: "", isEdit: false, cat: "" });
    }
  };
  return (
    <Layout>
      <section className="pt-4 px-4 space-y-4 " onClick={sectionClickHandler}>
        <div className="flex items-center justify-between">
          <h1 className="text-slate-700 dark:text-gray-100 font-semibold text-xl">
            Categorie
          </h1>
          <Link to="/" className="text-xs text-sky-500">
            Back HomePage
          </Link>
        </div>
        <div className="w-full flex flex-wrap items-start justify-center gap-2 h-[200px]  overflow-auto scrollbar">
          {categories.map((categorie) => {
            return (
              <div
                key={categorie.id}
                className={`p-2 bg-white group/item dark:bg-[#041955] h-24 flex-grow text-slate-800 font-semibold w-28 animate-waving-hand  rounded-lg shadow-md flex flex-col justify-between group hover:bg-${categorie.color} hover:bg-opacity-50 hover:text-gray-100`}
              >
                <span className=" text-sm max-w-24 break-words text-slate-700 dark:text-gray-100">
                  {categorie.name}
                </span>
                <div className="flex gap-x-1 items-center w-8 invisible group/edit group-hover/item:visible">
                  <button
                    onClick={() => deleteCateGorieHandler(categorie)}
                    type="button"
                    className="hover:text-red-500"
                  >
                    <FiTrash2 />
                  </button>
                  <button
                    onClick={() =>
                      setEditCat({
                        value: categorie.name,
                        isEdit: true,
                        cat: categorie,
                      })
                    }
                    type="button"
                    className="hover:text-yellow-500"
                  >
                    <FiEdit2 />
                  </button>
                </div>
                <span
                  className={`text-sm text-gray-400  group-hover:text-${categorie.color}`}
                >
                  total tasks : {categorie.total}
                </span>
                <div className="w-full h-[6px] bg-gray-300 dark:bg-stone-400 relative rounded">
                  <span
                    style={{
                      width: `${calculateTotalTasks(categorie.total)}%`,
                    }}
                    className={` absolute h-[6px] left-0 bg-${categorie.color} rounded`}
                  ></span>
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="text-slate-700 dark:text-gray-100 font-semibold pt-8">
          {editCat.isEdit ? "Edit" : "Add"} New categori
        </h1>
        <form
          className="w-full h-[370px] md:h-[400px] p-2 flex flex-col items-start "
          onSubmit={(e) => {
            editCat.isEdit ? editCategorieHandler(e) : submitHandler(e);
          }}
        >
          <div className="flex flex-col w-full">
            <div className="w-full">
              <input
                type="text"
                className="font-semibold text-slate-700 dark:text-gray-100 w-full hover:ring-2 p-2 ring-1 ring-gray-300 dark:ring-stone-200 bg-transparent transition-all ease-in-out duration-300 focus:shadow-md focus:shadow-gray-500 dark:focus:shadow-stone-500 hover:ring-gray-500 rounded-md outline-none border-none focus:ring-2 focus:ring-gray-500"
                placeholder="Categorie : "
                value={editCat.isEdit ? editCat.value : categoriValue}
                onChange={(e) => {
                  editCat.isEdit
                    ? setEditCat({ ...editCat, value: e.target.value })
                    : setCategorieValue(e.target.value);
                }}
              />
            </div>
            {editCat.isEdit && (
              <button
                type="button"
                className="text-blue-600 text-xs text-left pt-2 px-2"
                onClick={() => setEditCat({ isEdit: false })}
              >
                Back to Add Categorie
              </button>
            )}
            <div className="relative mt-8 flex items-center gap-4">
              <h1 className="text-slate-500 dark:text-gray-300 ">
                Categorie color :
              </h1>
              <SetColors
                color={color}
                changeColorHandler={changeColorHandler}
                toggleColor={toggleColor}
                toggleColorHandler={toggleColorHandler}
              />
            </div>
          </div>
          <div className="flex-1 flex items-end justify-end w-full absolute bottom-4 right-4">
            <button
              type="submit"
              className={`bg-${color} dark:bg-fuchsia-500 p-2 text-slate-100 rounded-md flex items-center justify-center gap-x-2 hover:ring-2 hover:ring-offset-2 hover:ring-${color} group transition-all ease-linear duration-300`}
            >
              <span className="text-xl group-hover:rotate-[360deg] transition-all duration-500 ease-linear">
                <FiChevronDown />
              </span>
              <span className="">
                {editCat.isEdit ? "Edit" : "New"} Categorie
              </span>
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
        <div className="p-2 bg-gray-100 dark:bg-[#041955] rounded-md flex items-center gap-2 absolute right-0 top-10 w-40 flex-wrap justify-center shadow-md">
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
