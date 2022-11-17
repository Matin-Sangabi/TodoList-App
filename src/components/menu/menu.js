import { useSelector } from "react-redux";
import {  BiCategory ,BiCog } from "react-icons/bi";
import { TbSmartHome } from "react-icons/tb";
import { NavLink } from "react-router-dom";
const navLinks = [
  {id : 1 , path : '/', name : 'Home' , icon : () => TbSmartHome()},
  {id : 2 , path : '/categories', name : 'Categories' , icon : () => BiCategory()},
  {id : 3 , path : '/setting', name : 'setting' , icon : () => BiCog()},
]
const Menu = () => {
  const openMenu = useSelector((state) => state.tasks.openMenu);
  return (
    <div
      className={`w-full  absolute left-0 top-0 bg-[#041955]  h-screen transition-all ease-in-out duration-300 flex flex-col items-center justify-start ${
        openMenu ? "translate-x-0 z-30" : "-translate-x-full z-0"
      }`}
    >
      <div className="flex flex-col  gap-y-6 items-start w-full px-4 mt-20">
        <div className="w-20 h-20 rounded-full ring ring-gray-100"></div>
        <h1 className="text-3xl text-gray-100 w-20 font-semibold px-2 leading-10">Matin Sangabi</h1>
      </div>
      <ul className="flex flex-col items-start w-full gap-y-6 px-6 text-gray-100 mt-40">
        {navLinks.map((item)=>(
          <NavLink key={item.id} to={item.path} className="flex items-center gap-x-3 text-xl font-medium  group">
            <span className="text-gray-400 text-2xl">{item.icon()}</span>
            <span className="group-hover:border-b-[1px] group-hover:border-gray-100 transition-all ease-in-out duration-300">{item.name}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
