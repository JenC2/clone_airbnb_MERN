import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import userBlackLineIcon from "../assets/svg/userBlackLineIcon.svg";
import bookingWhiteIcon from "../assets/svg/bookingWhiteIcon.svg";
import buildingIcon from "../assets/svg/buildingIcon.svg";

export default function AccountBookingPage() {
  const { ready, user } = useContext(UserContext);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center m-8 gap-16">
        <Link
          className="inline-flex gap-1 py-2 px-6 bg-gray-200 rounded-full"
          to={"/account"}
        >
          <img src={userBlackLineIcon} alt="userIcon" className="w-6 h-6" />
          My profile
        </Link>
        <Link
          className="inline-flex gap-1 py-2 px-6 bg-mainRed text-white rounded-full"
          to={"/account/bookings"}
        >
          <img src={bookingWhiteIcon} alt="bookingIcon" className="w-6 h-6" />
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
      <h1>Bookings</h1>
    </div>
  );
}
