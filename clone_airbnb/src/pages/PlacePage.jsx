import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import DisplayFeatures from "../components/DisplayFeatures";
import PhotoGallery from "../components/PhotoGallery";
import AddressLink from "../components/AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  // we put id as dependency, so each the id changed, the useEffect will run again
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";



  return (
    <div className="w-full h-full flex justify-center">
      <div className="mt-8 w-4/5">
        <h1 className="text-3xl">{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        <PhotoGallery place={place} />
        <div className="mt-8 grid gap-8 gird-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="mb-3 font-semibold text-xl">Description</h2>
              {place.description}
            </div>
            <div className="w-5/6 border-t -mx-8 mt-8 p-8">
              <h2 className="mb-3 font-semibold text-xl">What this place offers</h2>
              <DisplayFeatures features={place.features} />
              <div>
                Check-in: {place.checkIn}
                <br />
                Check-out: {place.checkOut}
                <br />
                Max number of guests: {place.maxGuests}
              </div>
            </div>
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
        <div className="border-t -mx-8 mt-8 p-8">
          <div>
            <h2 className="font-semibold text-xl">Extra info</h2>
          </div>
          <div className="mt-2 mb-4 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </div>
  );
}
