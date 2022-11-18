import Layout from "../../layout/layout";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineDeviceMobile,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeTasks } from "../../redux/tasks/tasksSlice";

const people = [
  { name: "light", icon: () => HiOutlineSun() },
  { name: "dark", icon: () => HiOutlineMoon() },
  { name: "system", icon: () => HiOutlineDeviceMobile() },
];


const Setting = () => {
  const [selected, setSelected] = useState(null);
  const theme = useSelector((state) => state.tasks.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    const systemTheme = people.find((t) => t.name === theme); 
    setSelected(systemTheme)
  } , [theme , people])
  const changeHandler = (e) =>{
    setSelected(e);
    dispatch(toggleThemeTasks({type : e.name}))
  }

  return (
    <Layout>
      <section className="pt-16 px-4">
        <h1 className={` text-slate-700 dark:text-gray-100  text-xl font-semibold flex items-center`}>
          <span>Theme</span>
        </h1>
        <div className="w-full pt-4">
          {selected && <Listbox value={selected} onChange={changeHandler}>
            <div className="relative mt-1">
              <Listbox.Button className={`cursor-pointer relative w-full flex items-center  rounded-lg bg-white dark:bg-[#041955] py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 `}>
                <span className="pointer-events-none flex items-center pr-2 text-2xl text-slate-700 dark:text-gray-100">
                  {selected.icon()}
                </span>
                <span className="block truncate font-semibold text-slate-700 dark:text-gray-100">
                  {selected.name}
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-[#041955] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 h-full rounded-md pr-4 flex items-center justify-around hover:bg-gray-500 dark:hover:bg-blue-900 text-slate-700 dark:text-gray-100 hover:bg-opacity-30 ${
                          active
                            ? "bg-gray-300 text-gray-900 dark:bg-blue-900 dark:text-gray-100 font-semibold"
                            : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span className="text-xl">
                            {person.icon()}
                          </span>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>

                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>}
        </div>
      </section>
    </Layout>
  );
};

export default Setting;
