import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";

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
<nav className="w-full flex justify-center m-8 gap-16">        <Link className="py-2 px-6" to={"/account"}>
          My profile
        </Link>
        <Link className="py-2 px-6 bg-mainRed text-white rounded-full" to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className="py-2 px-6" to={"/account/places"}>
          My accomodations
        </Link>
      </nav>
      <h1>Bookings</h1>
    </div>
  );
}
