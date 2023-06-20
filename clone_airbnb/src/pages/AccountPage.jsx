import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import userWhiteLineIcon from "../assets/svg/userWhiteLine.svg";
import bookingIcon from "../assets/svg/bookingIcon.svg";
import buildingIcon from "../assets/svg/buildingIcon.svg";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center m-8 gap-16">
        <Link
          className="inline-flex gap-1 py-2 px-6 bg-mainRed text-white rounded-full"
          to={"/account"}
        >
          <img src={userWhiteLineIcon} alt="userIcon" className="w-6 h-6" />
          My profile
        </Link>
        <Link
          className="inline-flex gap-1 py-2 px-6 bg-gray-200 rounded-full"
          to={"/account/bookings"}
        >
          <img src={bookingIcon} alt="bookingIcon" className="w-6 h-6" />
          My bookings
        </Link>
        <Link
          className="inline-flex gap-1 py-2 px-6 bg-gray-200 rounded-full"
          to={"/account/places"}
        >
          <img src={buildingIcon} alt="buildingIcon" className="w-6 h-6" />
          My accomodations
        </Link>
      </nav>
      <div className="text-center max-w-lg mx-auto">
        Logged in as {user.name}({user.email}) <br />
        <button onClick={logout} className="buttonRed text-white max-w-sm mt-2">
          Logout
        </button>
      </div>
    </div>
  );
}
