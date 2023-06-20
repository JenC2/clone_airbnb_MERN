import { Link } from "react-router-dom";
import userBlackLineIcon from "../assets/svg/userBlackLineIcon.svg";
import bookingIcon from "../assets/svg/bookingIcon.svg";
import buildingWhiteIcon from "../assets/svg/buildingWhite.svg";

export default function MyAccomodations() {
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
          className="inline-flex gap-1 py-2 px-6 bg-gray-200 rounded-full"
          to={"/account/bookings"}
        >
          <img src={bookingIcon} alt="bookingIcon" className="w-6 h-6" />
          My bookings
        </Link>
        <Link
          className="inline-flex gap-1 py-2 px-6 bg-mainRed text-white rounded-full"
          to={"/account/places"}
        >
          <img src={buildingWhiteIcon} alt="buildingIcon" className="w-6 h-6" />
          My accomodations
        </Link>
      </nav>
    </div>
  );
}
