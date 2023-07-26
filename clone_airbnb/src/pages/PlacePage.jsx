import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import menuIcon from "../assets/svg/menuIcon.svg";

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
    <div className="mt-8">
      <h1 className="text-3xl">{place.title}</h1>
      {/* <a>tag is a inline-level elemant, so we add block to make it a block-level element */}
      <a
        className="my-3 block font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr_1fr]">
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
        </div>
      </div>
    </div>
  );
}
