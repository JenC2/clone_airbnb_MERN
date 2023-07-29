
export default function BookingWidget({place}) {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: €{place.price} / per night
      </div>
      <div className="border rounded-xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>CHECK-IN</label>
            <input type="date" />
          </div>
          <div className="py-3 px-4 border-l">
            <label>CHECKOUT</label>
            <input type="date" />
          </div>
        </div>
        <div>
          <div className="py-3 px-4 border-t">
            <label>GUESTS</label>
            <input type="number" value={1} />
          </div>
        </div>
      </div>
      <button className="buttonRed">Reserve</button>
    </div>
  );
}
