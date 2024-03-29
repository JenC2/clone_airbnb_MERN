import { useState } from "react";
import uploadIcon from "../assets/svg/uploadIcon.svg";
import axios from "axios";
import trashIcon from "../assets/svg/trashIcon.svg";
import starIcon from "../assets/svg/starIcon.svg";
import fullStarIcon from "../assets/svg/fullStarIcon.svg";

export default function PhotosUploader({ uploadedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");
  async function addPhotoByLink(e) {
    e.preventDefault();
    // {link: photoLink}) "link" is the name that we gonna send to data, "photoLink" is the state
    const { data: fileName } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((ev) => {
      return [...ev, fileName];
    });
    setPhotoLink("");
  }

  async function addPhotoByDevice(e) {
    try {
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }
      const { data: fileNames } = await axios.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange((prev) => {
        return [...prev, ...fileNames];
      });
    } catch (error) {
      console.error("Error occurred during file upload:", error);
      // Handle the error, show an error message, or perform any necessary actions.
    }
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    onChange([...uploadedPhotos.filter((photo) => photo !== filename)]);
  }

  function selectCover(ev, filename) {
    ev.preventDefault();
    onChange([filename, ...uploadedPhotos.filter(photo => photo !== filename)]);
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Add photos using link ....jpg"
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 px-4 rounded-xl"
        >
          Upload
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {uploadedPhotos.length > 0
          ? uploadedPhotos.map((link) => (
              <div className="h-36 flex relative" key={link}>
                <img
                  className="rounded-2xl w-full object-cover "
                  src={"http://localhost:8000/uploads/" + link}
                  alt=""
                />
                <button
                  onClick={(ev) => removePhoto(ev, link)}
                  className="cursor-pointer absolute bottom-1 right-1 bg-black bg-opacity-40 rounded-xl p-1"
                >
                  <img src={trashIcon} alt="trash icon" className="w-8 h-8" />
                </button>
                <button                  
                  onClick={(ev) => selectCover(ev, link)}
                  className="cursor-pointer absolute bottom-1 left-1 bg-black bg-opacity-40 rounded-xl p-1"
                >
                  {link === uploadedPhotos[0] ?
                    <img src={fullStarIcon} alt="fullStar icon" className="w-8 h-8" />:
                    <img src={starIcon} alt="star icon" className="w-8 h-8" /> 
                  }
                </button>
              </div>
            ))
          : null}
        <label className="h-36 cursor-pointer flex border items-center rounded-2xl p-10 text-xl text-gray-500 gap-2">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={addPhotoByDevice}
          />
          <img src={uploadIcon} alt="upload icon" className="w-8 h-8" />
          Add Photos
        </label>
      </div>
    </>
  );
}
