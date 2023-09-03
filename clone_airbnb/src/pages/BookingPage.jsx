import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PhotoGallery from "../components/PhotoGallery";
import BookingDates from "../components/BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="my-8 w-4/5">
        <h1 className="text-3xl">{booking.place.title}</h1>
        <AddressLink className="my-2 block">
          {booking.place.address}
        </AddressLink>
        <div className="flex justify-between items-center bg-gray-200 p-6 my-6 rounded-2xl">
            <div>
            <h2 className="text-2xl mb-4">Your booking information</h2>
            <BookingDates booking={booking} />
            </div>
            <div className="bg-mainRed text-white p-5 rounded-2xl">
            <div>Total Price</div>
            <div className="text-2xl">
                €{booking.price}
            </div>
            </div>
        </div>
        <PhotoGallery place={booking.place} />
      </div>
    </div>
  );
}
