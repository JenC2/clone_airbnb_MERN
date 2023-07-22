import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function IndexPage() {
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(() => {
    axios.get("/all_places").then(response => {
      setAllPlaces(response.data);
    });
  }, []);

  return (
    <div className=" mt-12 gap-x-8 gap-y-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
       {allPlaces.length > 0 && allPlaces.map(place => (
        <div key={place._id}>
          <div className="bg-gray-400 mb-2 rounded-2xl flex">    
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:8000/uploads/" +place.photos?.[0]} alt="place photo" />
            )}
          </div>
          <h3 className="font-bold">{place.address}</h3>
          <h2 className="text-sm text-gray-500">{place.title}</h2>
          <div className="mt-1">
            <span className="font-semibold">€{place.price}</span> night
          </div>
        </div>
       ))}
    </div>
  );
}
