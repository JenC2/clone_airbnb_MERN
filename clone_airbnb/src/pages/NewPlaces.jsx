import Features from "../components/Features";
import MyAccomodations from "../components/MyAccomodations";
import uploadIcon from "../assets/svg/uploadIcon.svg";
import { useState } from "react";
import axios from "axios";

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
  const [addInfo, setAddInfo] = useState("");

  const renderForm = (title, description) => {
    return (
      <>
        <h2 className="text-xl mt-4">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  }

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    // {link: photoLink}) "link" is the name that we gonna send to data, "photoLink" is the state 
    const {data: fileName} = await axios.post("/upload-by-link", {link: photoLink});
    setUploadedPhotos(ev => {
      return [...ev, fileName];
    });
    setPhotoLink("");
  }
  
  return (
    <div>
      <MyAccomodations />
      <form action="">
        {renderForm("Title", "Enter a catchy and descriptive title for your property (e.g., \"Stunning Beachfront Villa with Private Pool\")")}
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title" />

        {renderForm("Address", "Enter the full address of your property, including street name, city, state and zip code (e.g., \"123 Main St, Cityville, State, 12345\")")}
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />

        {renderForm("Photos", "Upload high-quality photos of your property (JPEG or PNG format) to showcase its features and attract potential renters. <br />You can add up to 5 photos.")}
        <div className="flex gap-2">
          <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add photos using link ....jpg" />
          <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-xl">Upload</button>
        </div>
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {uploadedPhotos.length > 0 ? uploadedPhotos.map(link => (
            <div>
              <img className="rounded-2xl"  src={"http://localhost:8000/uploads/" + link} alt="" />
            </div>
          )) : null}
          <button className="flex border items-center rounded-2xl p-10 text-xl text-gray-500 gap-2">
            <img src={uploadIcon} alt="upload icon" className="w-8 h-8"/>
            Add Photos
          </button>
        </div>

        {renderForm("Description", " Provide a detailed description of your place. Highlight its unique features, amenities, and any additional information that can help potential guests understand what makes your place special.")}
        <textarea value={description} onChange={e => setDescription(e.target.value)} cols="20" rows="10"></textarea>

        {renderForm("Features", "Select all the features of your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <Features selected={features} onChange={setFeatures}/>
        </div>

        {renderForm("Check-in & Check-out times", "Specify the check-in and check-out times for your guests and the maximum number of guests allowed to stay at your place.")}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2">Check-in time</h3>
            <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="ex. 14:00" />
          </div>
          <div>
            <h3 className="mt-2">Check-out time</h3>
            <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder="ex. 11:00" />
          </div>
          <div>
            <h3 className="mt-2">Max number of guests</h3>
            <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} placeholder="ex. 4" />
          </div>
        </div>

        {renderForm("Additional Info", "Enter any additional information or details about your place that you would like potential guests to know. This can include specific house rules, amenities, nearby attractions, or any other relevant information.")}
        <textarea value={addInfo} onChange={e => setAddInfo(e.target.value)} />
        <button className="buttonRed my-4">Save</button>
      </form>
    </div>
  );
}
