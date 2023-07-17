import logo from "../assets/logo.png";
import searchIcon from "../assets/svg/searchIcon.svg";
import menuLineIcon from "../assets/svg/menuLineIcon.svg";
import userIcon from "../assets/svg/userIcon.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <header className="flex justify-between">
        <Link to={"/"} className="flex items-center gap-1">
          <img src={logo} />
          <span className="font-bold text-xl text-mainRed">airbnb</span>
        </Link>
        <div className="flex border border-grey-300 rounded-full py-2 px-4 gap-3 shadow-md shadow-gray-200">
          <div>Anywhere</div>
          <div className="border-l border-grey-300"></div>
          <div>Any week</div>
          <div className="border-l border-grey-300"></div>
          <div>Add guests</div>
          <button className="bg-mainRed p-2 rounded-full">
            <img src={searchIcon} alt="" className="w-4 h-4" />
          </button>
        </div>
        <Link
          to={user ? "/account" : "/login"}
          className="flex border border-grey-300 rounded-full py-2 px-4 gap-3"
        >
          <img
            src={menuLineIcon}
            alt="menuLineIcon"
            className="w-6 h-6 relative top-1"
          />
          <div className="bg-gray-500 rounded-full p-1">
            <img
              src={userIcon}
              alt="userIcon"
              className="w-6 h-6 relative top-1"
            />
          </div>
          {Boolean(user) ? <div>{user.name}</div> : null}
        </Link>
      </header>
    </div>
  );
}
