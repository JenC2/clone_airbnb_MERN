
export default function BookingWidget({place}) {

  //toISOString() method converts the date into format "YYYY-MM-DDTHH:mm:ss.sssZ"
  const currentDate = new Date().toISOString().split('T')[0];

  const checkOutDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  return (
    <div className="bg-white border border-gray-200 shadow-md shadow-gray-300 p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: €{place.price} / per night
      </div>
      <div className="border rounded-xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>CHECK-IN</label>
            <input type="date" defaultValue={currentDate} />
          </div>
          <div className="py-3 px-4 border-l">
            <label>CHECKOUT</label>
            <input type="date" defaultValue={checkOutDate}/>
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
