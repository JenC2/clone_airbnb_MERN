import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import MyAccomodations from "../components/MyAccomodations";
import plusIcon from "../assets/svg/plusIcon.svg";
import axios from "axios";

export default function AccountPlacePage() {
  const [places, setPlaces] = useState([]);
  const { ready, user } = useContext(UserContext);

  useEffect(() => {
    axios.get("places").then(({ data }) => {
      setPlaces(data);
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
      <div className="mt-4 flex flex-wrap justify-center">
        {places.length > 0 && places.map(place => (
          <Link to={"/account/places/"+place._id} className="flex items-center cursor-pointer w-5/6 gap-4 bg-gray-100 p-4 m-2 rounded-2xl">
            <div className="flex w-32 h-32 bg-gray-200 shrink-0">
              {place.photos.length > 0 && (
                <img className="object-cover w-full h-full" src={"http://localhost:8000/uploads/"+place.photos[0]} alt="photo of the place"/>
              )}
            </div>
            <div>
            <h2 className="text-xl">{place.title}</h2>
            <p className="test-sm mt-2 line-clamp-3">{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}