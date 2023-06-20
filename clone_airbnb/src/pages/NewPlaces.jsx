import Features from "../components/Features";
import MyAccomodations from "../components/MyAccomodations";

export default function NewPlaces() {
  return (
    <div>
      <MyAccomodations />
      <form action="">
        <h2 className="text-xl mt-4">Title</h2>
        <p className="text-gray-500 text-sm">
          Enter a catchy and descriptive title for your property (e.g.,
          "Stunning Beachfront Villa with Private Pool")
        </p>
        <input type="text" placeholder="title" />
        <h2 className="text-xl mt-4">Address</h2>
        <p className="text-gray-500 text-sm">
          Enter the full address of your property, including street name, city,
          state, and zip code (e.g., "123 Main St, Cityville, State, 12345")
        </p>
        <input type="text" placeholder="address" />
        <h2 className="text-xl mt-4">Photos</h2>
        <p className="text-gray-500 text-sm">
          Upload high-quality photos of your property (JPEG or PNG format) to
          showcase its features and attract potential renters. <br />
          You can add up to 5 photos.
        </p>
        <div className="flex gap-2">
          <input type="text" placeholder="Add photos using link ....jpg" />
          <button className="bg-gray-200 px-4 rounded-xl">Upload</button>
        </div>
        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <button className="flex border bg-transparent rounded-2xl p-10 text-xl text-gray-500 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Add Photos
          </button>
        </div>
        <h2 className="text-xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm">
          Provide a detailed description of your place. Highlight its unique
          features, amenities, and any additional information that can help
          potential guests understand what makes your place special.
        </p>
        <textarea cols="20" rows="10"></textarea>
        <h2 className="text-xl mt-4">Features</h2>
        <p className="text-gray-500 text-sm">
          Select all the features of your place
        </p>
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <Features />
        </div>
        <h2 className="text-xl mt-4">Check-in & Check-out times</h2>
        <p className="text-gray-500 text-sm">
          Specify the check-in and check-out times for your guests and the
          maximum number of guests allowed to stay at your place.
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2">Check-in time</h3>
            <input type="text" placeholder="ex. 14:00" />
          </div>
          <div>
            <h3 className="mt-2">Check-out time</h3>
            <input type="text" placeholder="ex. 16:00" />
          </div>
          <div>
            <h3 className="mt-2">Max number of guests</h3>
            <input type="text" placeholder="ex. 4" />
          </div>
        </div>
        <h2 className="text-xl mt-4">Additional Info</h2>
        <p className="text-gray-500 text-sm">
          Enter any additional information or details about your place that you
          would like potential guests to know. This can include specific house
          rules, amenities, nearby attractions, or any other relevant
          information.
        </p>
        <textarea />
        <button className="buttonRed my-4">Save</button>
      </form>
    </div>
  );
}
