import { CiFolderOn, CiHome, CiSearch } from "react-icons/ci";
import { NavLink } from "react-router";
const BottomBar = () => {
  return (
    <div className="absolute bottom-0 w-full h-40  bg-gradient-to-b from-transparent to-black flex flex-col justify-end">
      <div className="flex items-center justify-between py-2 px-6">
        <NavLink
          to="/home"
          className="flex flex-col items-center justify-center text-white cursor-pointer text-sm"
        >
          <CiHome className="text-xl font-bold" />
          Home
        </NavLink>
        <NavLink
          to="/explore"
          className="flex flex-col items-center justify-center text-white cursor-pointer text-sm"
        >
          <CiSearch className="text-xl font-bold" />
          Explore
        </NavLink>
        <NavLink
          to="/library"
          className="flex flex-col items-center justify-center text-white cursor-pointer text-sm"
        >
          <CiFolderOn className="text-xl font-bold" />
          Library
        </NavLink>
      </div>
    </div>
  );
};

export default BottomBar;
