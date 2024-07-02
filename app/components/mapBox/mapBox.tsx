"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapBox() {
  return (
    <div id="map" className="flex-1 basis-[50%] rounded-lg border shadow-sm dark:shadow-none ">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}
