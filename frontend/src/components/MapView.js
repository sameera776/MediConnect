import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix missing default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
iconRetinaUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView() {
const [pharmacies, setPharmacies] = useState([]);

useEffect(() => {
axios
.get("http://localhost:5000/api/medicines/all")
.then((res) => {
setPharmacies(res.data);
})
.catch((err) => {
console.error("Error fetching pharmacies:", err);
});
}, []);

return (
<div>
<h3>Pharmacy Locations</h3>
<MapContainer
center={[17.385, 78.4867]} // Hyderabad coordinates
zoom={12}
style={{ height: "500px", width: "100%" }}
>
<TileLayer attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
{pharmacies.map((pharmacy, index) => (
pharmacy.latitude && pharmacy.longitude && (
<Marker
key={index}
position={[pharmacy.latitude, pharmacy.longitude]}
>
<Popup>
<strong>{pharmacy.pharmacy_name}</strong>
<br />
{pharmacy.name}
<br />
Stock: {pharmacy.stock}
</Popup>
</Marker>
)
))}
</MapContainer>
</div>
);
}

export default MapView;