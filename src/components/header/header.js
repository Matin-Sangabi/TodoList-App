import { HiMenuAlt4 } from "react-icons/hi";
import { FiSearch , FiBell } from "react-icons/fi";
const Header = () => {
  return (
    <header className="px-4 pt-6">
      <div className="w-full flex justify-between items-center">
        <div>
          <button className="p-2 text-gray-500 text-2xl">
            <HiMenuAlt4 />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xl text-gray-500">
            <FiSearch/>
          </button>
          <button className="text-xl text-gray-500">
            <FiBell/>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
