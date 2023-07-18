import { useState } from "react";
import uploadIcon from "../assets/svg/uploadIcon.svg";
import axios from "axios";

export default function PhotosUploader({uploadedPhotos, onChange}) {
    const [photoLink, setPhotoLink] = useState("");
    async function addPhotoByLink(e) {
        e.preventDefault();
        // {link: photoLink}) "link" is the name that we gonna send to data, "photoLink" is the state
        const { data: fileName } = await axios.post("/upload-by-link", {
          link: photoLink,
        });
        onChange(ev => {
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
          onChange(prev => {
            return [...prev, ...fileNames];
          });
        } catch (error) {
          console.error("Error occurred during file upload:", error);
          // Handle the error, show an error message, or perform any necessary actions.
        }
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
              <div className="h-36 flex" key={link}>
                <img
                  className="rounded-2xl w-full object-cover "
                  src={"http://localhost:8000/uploads/" + link}
                  alt=""
                />
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
