import Features from "../components/Features";
import MyAccomodations from "../components/MyAccomodations";
import uploadIcon from "../assets/svg/uploadIcon.svg";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function NewPlaces() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [extraInfo, setExtraInfo] = useState("");
  const [redirect, setRedirect] = useState("");

  const renderForm = (title, description) => {
    return (
      <>
        <h2 className="text-xl mt-4">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  };

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    // {link: photoLink}) "link" is the name that we gonna send to data, "photoLink" is the state
    const { data: fileName } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setUploadedPhotos((ev) => {
      return [...ev, fileName];
    });
    setPhotoLink("");
  };

  const addPhotoByDevice = async (e) => {
    try {
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }
      const { data: fileNames } = await axios.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedPhotos((prev) => {
        return [...prev, ...fileNames];
      });
    } catch (error) {
      console.error("Error occurred during file upload:", error);
      // Handle the error, show an error message, or perform any necessary actions.
    }
  };

  const addNewPlace = async (ev) => {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      uploadedPhotos,
      photoLink,
      description,
      features,
      checkIn,
      checkOut,
      maxGuests,
      extraInfo,
    };
    await axios.post("/places", placeData);
    setRedirect("/account/places");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <MyAccomodations />
      <form onSubmit={addNewPlace}>
        {renderForm(
          "Title",
          'Enter a catchy and descriptive title for your property (e.g., "Stunning Beachfront Villa with Private Pool")'
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />

        {renderForm(
          "Address",
          'Enter the full address of your property, including street name, city, state and zip code (e.g., "123 Main St, Cityville, State, 12345")'
        )}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="address"
        />

        {renderForm(
          "Photos",
          "Upload high-quality photos of your property (JPEG or PNG format) to showcase its features and attract potential renters. <br />You can add up to 5 photos."
        )}
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

        {renderForm(
          "Description",
          " Provide a detailed description of your place. Highlight its unique features, amenities, and any additional information that can help potential guests understand what makes your place special."
        )}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          cols="20"
          rows="10"
        ></textarea>

        {renderForm("Features", "Select all the features of your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <Features selected={features} onChange={setFeatures} />
        </div>

        {renderForm(
          "Check-in & Check-out times",
          "Specify the check-in and check-out times for your guests and the maximum number of guests allowed to stay at your place."
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2">Check-in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="ex. 14:00"
            />
          </div>
          <div>
            <h3 className="mt-2">Check-out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="ex. 11:00"
            />
          </div>
          <div>
            <h3 className="mt-2">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              placeholder="ex. 4"
            />
          </div>
        </div>

        {renderForm(
          "Additional Info",
          "Enter any additional information or details about your place that you would like potential guests to know. This can include specific house rules, amenities, nearby attractions, or any other relevant information."
        )}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <button className="buttonRed my-4">Save</button>
      </form>
    </div>
  );
}
