import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import MyAccomodations from "../components/MyAccomodations";
import plusIcon from "../assets/svg/plusIcon.svg";


export default function AccountPlacePage() {
  const { ready, user } = useContext(UserContext);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <MyAccomodations />
      <div className="w-full flex justify-center mt-8">
        <div>
          <Link
            className="inline-flex gap-1 bg-mainRed text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <img src={plusIcon} alt="" className="w-6 h-6" />
            Add new place
          </Link>
        </div>
      </div>
    </div>
  );
}
