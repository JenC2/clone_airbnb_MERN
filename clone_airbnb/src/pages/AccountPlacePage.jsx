import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import MyAccomodations from "../components/MyAccomodations";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      </div>
    </div>
  );
}
