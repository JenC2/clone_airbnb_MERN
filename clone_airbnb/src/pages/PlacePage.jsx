import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import menuIcon from "../assets/svg/menuIcon.svg";
import closeIcon from "../assets/svg/closeIcon.svg";
import mapIcon from "../assets/svg/mapIcon.svg";
import BookingWidget from "../components/BookingWidget";
import DisplayFeatures from "../components/DisplayFeatures";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showMorePhotos, setShowMorePhotos] = useState(false);

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

  if (showMorePhotos) {
    return (
      <div className="absolute inset-0 bg-black min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <button
              onClick={() => setShowMorePhotos(false)}
              className=" bg-gray-200 flex items-center gap-2 py-2 px-4 rounded-2xl shadow shadow-gray-500"
            >
              <img src={closeIcon} alt="close" className="w-5 h-5" />
              Close
            </button>
          </div>
          {place.photos.length > 0
            ? place.photos.map((photo) => (
                <div className="flex justify-center">
                  <img
                    className="w-2/3 h-full"
                    src={"http://localhost:8000/uploads/" + photo}
                    alt="photos"
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="mt-8 w-4/5">
        <h1 className="text-3xl">{place.title}</h1>
        {/* <a>tag is a inline-level elemant, so we add block to make it a block-level element */}
        <a
          className="flex gap-1 my-3 items-center font-semibold underline"
          target="_blank"
          href={"https://maps.google.com/?q=" + place.address}
        >
          <img src={mapIcon} alt="mapIcon" className="w-4 h-4" />
          {place.address}
        </a>
        <div className="relative">
          <div
            onClick={() => setShowMorePhotos(true)}
            className="cursor-pointer grid gap-2 grid-cols-4 grid-row-2 rounded-2xl overflow-hidden"
          >
            {place.photos.length > 0 && (
              <div className="col-span-2 row-span-2">
                <img
                  className="aspect-[4/3] object-cover"
                  src={"http://localhost:8000/uploads/" + place.photos[0]}
                  alt=""
                />
              </div>
            )}
            {place.photos.slice(1, 5).map((photo, index) => (
              <div>
                {photo && (
                  <img
                    className="aspect-[4/3] object-cover"
                    src={"http://localhost:8000/uploads/" + photo}
                    alt={`Photo ${index + 1}`}
                  />
                )}
              </div>
            ))}
            <button
              onClick={() => setShowMorePhotos(true)}
              className="flex absolute bottom-2 right-2 py-1 px-3 bg-white rounded-xl border border-black"
            >
              <div className="flex items-center gap-1">
                <img src={menuIcon} alt="menu" className="w-4 h-4" />
                <p>show more photos</p>
              </div>
            </button>
          </div>
        </div>
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
