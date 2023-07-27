import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import { Card } from "antd";

const MapWithCountries = () => {
  const mapRef = useRef(null); // Ref to hold the map instance
  const selectRef = useRef(null); // Ref to hold the select element
  const [countryInfo, setCountryInfo] = useState(null); // State to hold the selected country information

  useEffect(() => {
    // Create a map centered on India
    mapRef.current = L.map("map").setView([20.5937, 78.9629], 3); // Centered on India with zoom level 3

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      mapRef.current
    );
  }, []);

  const showCountryBounds = () => {
    const countryName = selectRef.current.value.toLowerCase();
    const boundsMap = {
      india: [
        [8.0883, 68.1861], // South-West coordinates
        [35.6745, 97.3956], // North-East coordinates
      ],
      uk: [
        [49.6749, -13.4132], // South-West coordinates
        [60.8614, 2.6316], // North-East coordinates
      ],
      usa: [
        [24.396308, -125], // South-West coordinates
        [49.384358, -66.93457], // North-East coordinates
      ],
    };

    const countryBounds = boundsMap[countryName];

    if (countryBounds) {
      // Clear any existing rectangles on the map
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Rectangle) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Create rectangle to represent the bounding box for the selected country
      L.rectangle(countryBounds, { color: "red", weight: 2 }).addTo(
        mapRef.current
      );

      // Fit the map view to the bounding box
      mapRef.current.fitBounds(countryBounds);

      // Fetch country info from API and update the card
      fetchCountryInfo(countryName);
    } else {
      alert("Country not found!");
    }
  };

  const fetchCountryInfo = (countryName) => {
    let contryNameCopy = countryName;
    if (contryNameCopy !== "india") {
      contryNameCopy =
        countryName === "usa" ? "united states of america" : "united kingdom";
    }
    fetch(`https://restcountries.com/v3.1/name/${contryNameCopy}?fullText=true`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setCountryInfo(data[0]);
        } else {
          alert("Country information not available!");
          setCountryInfo(null);
        }
      })
      .catch((error) => {
        alert("Error fetching country information!");
        setCountryInfo(null);
      });
  };

  return (
    <>
      <h3>Select Region from Below</h3>
      <div>
        <select ref={selectRef}>
          <option value="india">India</option>
          <option value="uk">UK</option>
          <option value="usa">USA</option>
        </select>
        <button onClick={() => showCountryBounds()}>Show Country</button>
      </div>
      <h3>Info for {countryInfo?.name?.common}</h3>
      <Card>
        {countryInfo && (
          <Card style={{ border: "2px dotted blue" }}>
            <h2>{countryInfo.name.common}</h2>
            <p>Capital: {countryInfo.capital[0]}</p>
            <p>Population: {countryInfo.population}</p>
            <p>Region: {countryInfo.region}</p>
            <p>
              Currency:
              {Object.keys(countryInfo.currencies).map(
                (currency) => countryInfo.currencies[currency].symbol
              )}
            </p>
            {countryInfo.units && (
              <React.Fragment>
                <p>Units of Speed: {countryInfo.units.speed}</p>
                <p>Units of Distance: {countryInfo.units.distance}</p>
                <p>Units of Volume: {countryInfo.units.volume}</p>
              </React.Fragment>
            )}
            {countryInfo.timezone && <p>Timezone: {countryInfo.timezone}</p>}
          </Card>
        )}
      </Card>
      <h1>Map:</h1>
      <Card style={{ border: "4px solid black" }}>
        <div id="map" style={{ height: "300px" }} />
      </Card>
    </>
  );
};

export default MapWithCountries;
