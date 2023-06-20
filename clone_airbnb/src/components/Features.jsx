import wifiIcon from "../assets/svg/wifiIcon.svg";
import parkingIcon from "../assets/svg/parkingIcon.svg";
import tvIcon from "../assets/svg/tvIcon.svg";
import poolIcon from "../assets/svg/poolIcon.svg";
import kitchenIcon from "../assets/svg/kitchenIcon.svg";

export default function Features() {
  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" />
        <img src={wifiIcon} alt="wifiIcon" className="w-6 h-6" />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" />
        <img src={parkingIcon} alt="parkingIcon" className="w-6 h-6" />
        <span>Free parking</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" />
        <img src={tvIcon} alt="tvIcon" className="w-6 h-6" />
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" />
        <img src={poolIcon} alt="poolIcon" className="w-6 h-6" />
        <span>Private pool</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" />
        <img src={kitchenIcon} alt="kitchenIcon" className="w-6 h-6" />
        <span>Kitchen</span>
      </label>
    </>
  );
}
