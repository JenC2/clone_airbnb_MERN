import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header className="p-8 flex justify-between">
        <a href="" className="flex items-center gap-1">
          <img src={logo} />
          <span className="font-bold text-xl text-mainRed">airbnb</span>
        </a>
        <div className="flex border border-grey-300 rounded-full py-2 px-4 gap-3 shadow-md shadow-gray-200">
          <div>Anywhere</div>
          <div className="border-l border-grey-300"></div>
          <div>Any week</div>
          <div className="border-l border-grey-300"></div>
          <div>Add guests</div>
          <button className="bg-mainRed text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <Link
          to={"/login"}
          className="flex border border-grey-300 rounded-full py-2 px-4 gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 relative top-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="bg-gray-500 text-white rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 2 24 24"
              fill="currentColor"
              class="w-6 h-6 relative top-1"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </Link>
      </header>
    </div>
  );
}
