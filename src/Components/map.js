
import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const CustomMap = ({center}) => {

    const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBBJU7dxSRfQwXS0Sruco9NF05IlgvFxVE',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="map-container">
   {/* <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={20}
        center={center}
        
      >
        <Marker position={center} />
      </GoogleMap> */}
      
    </div>
  );
}

export default CustomMap;