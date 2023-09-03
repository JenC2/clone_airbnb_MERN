import { useState } from "react";
import menuIcon from "../assets/svg/menuIcon.svg";
import closeIcon from "../assets/svg/closeIcon.svg";

export default function PhotoGallery({place}) {
    const [showMorePhotos, setShowMorePhotos] = useState(false);

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
    )
}