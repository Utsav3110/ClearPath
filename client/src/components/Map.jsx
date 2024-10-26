// Map.jsx
import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

const Map = ({ onMapClick }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const rajkot = { lng: 70.8022, lat: 22.3039};
  const zoom = 14;
  maptilersdk.config.apiKey = import.meta.env.VITE_MAP_API_KEY;

  useEffect(() => {
    if (map.current) return; 

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [rajkot.lng, rajkot.lat],
      zoom: zoom
    });

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      onMapClick(lat, lng);
    });
  }, [onMapClick]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default Map;
