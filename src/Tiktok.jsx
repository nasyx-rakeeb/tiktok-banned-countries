import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import worldGeoData from "../countries.geojson.json";

const TikTokMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMapLoaded, setIsMapLoaded] = useState(false); // State to track map loading
  const bannedCountries = [
    { name: "Afghanistan", banDate: 2022 },
    { name: "Armenia", banDate: 2020 },
    { name: "Azerbaijan", banDate: 2020 },
    { name: "Bangladesh", banDate: 2018 },
    { name: "India", banDate: 2020 },
    { name: "Indonesia", banDate: 2018 },
    { name: "Iran", banDate: null },
    { name: "Jordan", banDate: 2022 },
    { name: "Pakistan", banDate: 2021 },
    { name: "Taiwan", banDate: 2022 },
    { name: "Austria", banDate: 2023 },
    { name: "Belgium", banDate: 2023 },
    { name: "Denmark", banDate: 2023 },
    { name: "Estonia", banDate: 2023 },
    { name: "France", banDate: 2023 },
    { name: "Ireland", banDate: 2023 },
    { name: "Latvia", banDate: 2023 },
    { name: "Netherlands", banDate: 2022 },
    { name: "Norway", banDate: 2023 },
    { name: "UK", banDate: 2023 },
    { name: "Canada", banDate: 2023 },
    { name: "US", banDate: 2023 },
    { name: "Australia", banDate: 2023 },
    { name: "New Zealand", banDate: 2023 },
  ];

  // Function to filter countries based on the search query
  const filterCountries = (country) => {
    return bannedCountries.some(
      (banned) =>
        banned.name.toLowerCase() === country.properties.ADMIN.toLowerCase()
    );
  };

  useEffect(() => {
    // Simulate map loading with a delay
    const delay = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1500);

    // Clear the delay when the component unmounts
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-500 p-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">
            <span className="text-slate-800">Test </span>12
          </h1>
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              placeholder="Search for TikTok"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-full text-gray-900 focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="absolute inset-y-0 left-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-5-5M11 5c-4 0-7 3-7 7s3 7 7 7s7-3 7-7s-3-7-7-7zm0 0v0"></path>
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Map Loading Indicator */}
      {!isMapLoaded ? (
        <div className="flex h-64 items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : null}

      {/* Map */}
      {isMapLoaded ? (
        <div className="map-container">
          <ComposableMap projection="geoNaturalEarth1">
            <Geographies geography={worldGeoData.features}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isBanned =
                    searchQuery.replace(/\s/g, "").toLowerCase() === "tiktok" &&
                    filterCountries(geo);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isBanned ? "yellow" : "#ECEFF1"}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      ) : null}
    </div>
  );
};

export default TikTokMap;
