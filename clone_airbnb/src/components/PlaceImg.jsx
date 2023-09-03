export default function PlaceImg({ place }) {
    if (!place.photos?.length) {
      return null; // Return null if no photos are available
    }
  
    const imageUrl = `http://localhost:8000/uploads/${place.photos[0]}`;
  
    return (
      <img
        className="object-cover w-full h-full"
        src={imageUrl}
        alt={`Photo of ${place.title}`}
      />
    );
  }
  
