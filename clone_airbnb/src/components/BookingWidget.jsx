import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookPlace() {
    const data = {
      checkIn, checkOut, numberOfGuests, name, mobile, email,
      place:place._id,
      price:numberOfNights * place.price,
    };
    const response = await axios.post("/bookings", data);
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`)
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }


  //toISOString() method converts the date into format "YYYY-MM-DDTHH:mm:ss.sssZ"
  // const currentDate = new Date().toISOString().split("T")[0];

  // const checkOutDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
  //   .toISOString()
  //   .split("T")[0];

  return (
    <div className="bg-white border border-gray-200 shadow-md shadow-gray-300 p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: €{place.price} / per night
      </div>
      <div className="border rounded-xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>CHECK-IN</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>CHECKOUT</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="py-3 px-4 border-t">
            <label>GUESTS</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full name</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <label>Phone number</label>
              <input
                type="tel"
                value={mobile}
                onChange={(ev) => setMobile(ev.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <button className="buttonRed" onClick={bookPlace}>Reserve</button>
      <div>
        {numberOfNights > 0 && (
          <div>
            <div className="flex justify-between italic py-8 border-b">
              <p className="border-b border-gray-400">
                € {place.price} x {numberOfNights} nights
              </p>
              <p>€ {numberOfNights * place.price}</p>
            </div>
            <div className="flex justify-between py-5 text-lg font-semibold">
              <p>Total</p>
              <p>€ {numberOfNights * place.price}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
