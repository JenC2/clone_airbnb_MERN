import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import userBlackLineIcon from "../assets/svg/userBlackLineIcon.svg";
import bookingWhiteIcon from "../assets/svg/bookingWhiteIcon.svg";
import buildingIcon from "../assets/svg/buildingIcon.svg";
import creditIcon from "../assets/svg/creditIcon.svg";
import PlaceImg from "../components/PlaceImg";
import BookingDates from "../components/BookingDates";

export default function AccountBookingsPage() {
  const { ready, user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

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

      <div  className="flex justify-center">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link to={`/account/bookings/${booking._id}`} className="flex w-4/5 gap-4 bg-gray-100 rounded-2xl overflow-hidden">
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="flex gap-3 border-t border-gray-300 mt-2 py-2">
                <BookingDates booking={booking} />
                </div>
                <div>
                  <div className="flex gap-1 items-center">
                    <img
                      src={creditIcon}
                      alt="creditIcon"
                      className="w-6 h-6"
                    />
                    <span className="text-xl">
                      Total price: €{booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
