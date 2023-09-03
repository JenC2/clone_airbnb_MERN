import mapIcon from "../assets/svg/mapIcon.svg";

export default function AddressLink({children}) {
    return (
        <a
          className="flex gap-1 my-3 items-center font-semibold underline"
          target="_blank"
          href={"https://maps.google.com/?q=" + children}
        >
          <img src={mapIcon} alt="mapIcon" className="w-4 h-4" />
          {children}
        </a>
    );
}