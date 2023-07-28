import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import menuIcon from "../assets/svg/menuIcon.svg";
import closeIcon from "../assets/svg/closeIcon.svg";
import mapIcon from "../assets/svg/mapIcon.svg";

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
            <button onClick={() => setShowMorePhotos(false)}className=" bg-gray-200 flex items-center gap-2 py-2 px-4 rounded-2xl shadow shadow-gray-500">
              <img src={closeIcon} alt="close" className="w-5 h-5"/>
              Close
            </button>
          </div>
          {place.photos.length > 0 ? place.photos.map(photo => (
            <div className="flex justify-center">
              <img className="w-2/3 h-full" src={"http://localhost:8000/uploads/" + photo} alt="photos"/>
            </div>
          ))
          : null}
        </div>
      </div>
    )
  }


  return (
    <div className="mt-8">
      <h1 className="text-3xl">{place.title}</h1>
      {/* <a>tag is a inline-level elemant, so we add block to make it a block-level element */}
      <a
        className="flex gap-1 my-3 items-center font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        <img src={mapIcon} alt="mapIcon" className="w-4 h-4"/>
        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] rounded-2xl overflow-hidden">
          <div>
            {place.photos.length > 0 ? (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:8000/uploads/" + place.photos[0]}
                alt=""
              />
            ) : null}
          </div>
          <div className="grid">
            {place.photos.length > 0 ? (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:8000/uploads/" + place.photos[1]}
                alt=""
              />
            ) : null}
            <div className="overflow-hidden">
              {place.photos.length > 0 ? (
                <img
                  className="aspect-square object-cover relative top-2"
                  src={"http://localhost:8000/uploads/" + place.photos[2]}
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <div className="grid">
            {place.photos.length > 0 ? (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:8000/uploads/" + place.photos[3]}
                alt=""
              />
            ) : null}
            <div className="overflow-hidden">
              {place.photos.length > 0 ? (
                <img
                  className="aspect-square object-cover relative top-2"
                  src={"http://localhost:8000/uploads/" + place.photos[4]}
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <button onClick={() => setShowMorePhotos(true)} className="absolute bottom-2 right-2 py-1 px-3 bg-white rounded-xl border border-black">
            <div className="flex items-center gap-1">
              <img src={menuIcon} alt="menu" className="w-4 h-4" />
              <p>show more photos</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
