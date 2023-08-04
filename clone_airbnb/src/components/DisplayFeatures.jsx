import wifiIcon from "../assets/svg/wifiIcon.svg";
import parkingIcon from "../assets/svg/parkingIcon.svg";
import tvIcon from "../assets/svg/tvIcon.svg";
import poolIcon from "../assets/svg/poolIcon.svg";
import kitchenIcon from "../assets/svg/kitchenIcon.svg";

export default function DisplayFeatures ({features}) {
    function getIcon (feature) {
        switch (feature) {
            case "wifi":
                return wifiIcon;
            case "parking":
                return parkingIcon;
            case "tv":
                return tvIcon;
            case "pool":
                return poolIcon;
            case "kitchen":
                return kitchenIcon;
            default:
                return null;
        }
    };

    return (
        <div className="flex gap-20 mb-8">
            {features.map(feature => (
                <div className="flex items-center gap-3">
                    <img src={getIcon(feature)} alt={`${feature} Icon`} className="w-8 h-8" />
                    <span>{feature}</span>
                </div>
            ))}
        </div>
    );
};