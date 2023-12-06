import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import "./Map.css";

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

function MapLocation(post) {
  //   console.log(post);
  return (
    <div className="map">
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyA9N5tXH3YWoi9tCnLCGbRYFy805p3N5V8",
          }}
          center={post?.location?.center}
          defaultZoom={post?.location?.zoom}
        >
          <LocationPin
            lat={post.location.center?.lat}
            lng={post.location.center?.lng}
            text={post.location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default MapLocation;
