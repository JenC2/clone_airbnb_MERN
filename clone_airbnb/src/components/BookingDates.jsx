import calendarIcon from "../assets/svg/calendarIcon.svg";
import nightIcon from "../assets/svg/nightIcon.svg";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns";

export default function BookingDates({booking}) {
    return (
        <div className="flex gap-1 items-center my-2">
        <img src={nightIcon} alt="nightIcon" className="w-5 h-5" />
        {differenceInCalendarDays(
          new Date(booking.checkOut),
          new Date(booking.checkIn)
        )}{" "}
        nights :
        <div className="flex gap-1 items-center ml-2">
          <img
            src={calendarIcon}
            alt="calendarIcon"
            className="w-5 h-5"
          />
          {format(new Date(booking.checkIn), "dd-MM-yyyy")}
        </div>
        &rarr;
        <div className="flex gap-1 items-center">
          <img
            src={calendarIcon}
            alt="calendarIcon"
            className="w-5 h-5"
          />
          {format(new Date(booking.checkOut), "dd-MM-yyyy")}
        </div>
      </div>
    )
}