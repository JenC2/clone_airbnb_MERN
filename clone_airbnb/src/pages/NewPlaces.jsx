import Features from "../components/Features";
import MyAccomodations from "../components/MyAccomodations";
import PhotosUploader from "../components/PhotosUploader";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function NewPlaces() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [extraInfo, setExtraInfo] = useState("");
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/"+id).then(response => {
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setUploadedPhotos(data.photos);
      setDescription(data.description);
      setFeatures(data.features);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setExtraInfo(data.extraInfo);
    });
  }, [id]);

  function renderForm(title, description) {
    return (
      <>
        <h2 className="text-xl mt-4">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      uploadedPhotos,
      description,
      features,
      checkIn,
      checkOut,
      maxGuests,
      extraInfo,
    };
    if (id) {
      await axios.put("/places", {id, ...placeData});
      setRedirect("/account/places");
    } else {
      await axios.post("/places", placeData);
      setRedirect("/account/places");
    }
  }


  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <MyAccomodations />
      <form onSubmit={savePlace}>
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
          "Upload high-quality photos of your property (JPEG or PNG format) to showcase its features and attract potential renters. You can add up to 5 photos."
        )}
        <PhotosUploader uploadedPhotos={uploadedPhotos} onChange={setUploadedPhotos} />

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
          cols="20"
          rows="10"
        />
        <button className="buttonRed my-4">Save</button>
      </form>
    </div>
  );
}
