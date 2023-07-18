import wifiIcon from "../assets/svg/wifiIcon.svg";
import parkingIcon from "../assets/svg/parkingIcon.svg";
import tvIcon from "../assets/svg/tvIcon.svg";
import poolIcon from "../assets/svg/poolIcon.svg";
import kitchenIcon from "../assets/svg/kitchenIcon.svg";

export default function Features ({ selected, onChange }) {
  function handleCheckbox(ev) {
    const { checked, name } = ev.target;
    // console.log(ev.target.name);
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }
  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("wifi")} name="wifi" onChange={handleCheckbox} />
        <img src={wifiIcon} alt="wifiIcon" className="w-6 h-6" />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("parking")} name="parking" onChange={handleCheckbox} />
        <img src={parkingIcon} alt="parkingIcon" className="w-6 h-6" />
        <span>Free parking</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("tv")} name="tv" onChange={handleCheckbox} />
        <img src={tvIcon} alt="tvIcon" className="w-6 h-6" />
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("pool")} name="pool" onChange={handleCheckbox} />
        <img src={poolIcon} alt="poolIcon" className="w-6 h-6" />
        <span>Private pool</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes("kitchen")} name="kitchen" onChange={handleCheckbox} />
        <img src={kitchenIcon} alt="kitchenIcon" className="w-6 h-6" />
        <span>Kitchen</span>
      </label>
    </>
  );
};
