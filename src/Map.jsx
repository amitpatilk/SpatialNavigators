import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './App.css';
import icon from "./constants";

class Map extends Component {
  state = { map: null, marker: null };

  componentDidUpdate(prevProps, prevState) {
    const { map } = this.state;
    if (prevState.map !== map && map) {
      map.on("click", this.handleMapClick);
    }
  }

  handleMapClick = (e) => {
    const newMarker = {
      position: e.latlng,
      key: new Date().getTime(), // Provide a unique key for the marker
    };

    this.setState({
      marker: newMarker,
    });
  };

  render() {
    const DEFAULT_LATITUDE = 32.313268;
    const DEFAULT_LONGITUDE = 35.022895;
    const latitude = this.props.coords
      ? this.props.coords.latitude
      : DEFAULT_LATITUDE;
    const longitude = this.props.coords
      ? this.props.coords.latitude
      : DEFAULT_LONGITUDE;

    const { marker } = this.state;

    return (
      <MapContainer
        className="map"
        center={[latitude, longitude]}
        zoom={17}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
        whenCreated={(map) => this.setState({ map })}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {marker && (
          <Marker key={marker.key} position={marker.position} icon={icon}>
            <Popup>
              Lat, Lon: {marker.position.lat.toFixed(6)},{" "}
              {marker.position.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    );
  }
}

export default Map;