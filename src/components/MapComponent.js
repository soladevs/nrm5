import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker';
import countriesBorders from './borders.json';

const MapComponent = ({ tours, onSelectTour, onSelectLocation, activeTour }) => {
  const handleMarkerClick = (location, tour) => {
    onSelectLocation(location, tour);
  };

  const handleLineClick = (tour) => {
    onSelectTour(tour);
  };

  
  const defaultStyle = {
    color: "#cccccc", // Default border color
    weight: 2,
    opacity: 1,
    fillOpacity: 0.1,
  };

  // Style when a country border is hovered over
  const highlightStyle = {
    color: "#ffca28", // Highlight color
    weight: 5,
    opacity: 1,
    fillOpacity: 0.5,
  };

  const highlightFeature = (e) => {
    var layer = e.target;
  
    // Apply highlight style to this specific layer (country)
    layer.setStyle(highlightStyle);
    layer.bringToFront();
  };
  
  const resetHighlight = (e) => {
    var layer = e.target;
  
    // Reset the style to default for this specific layer (country)
    layer.setStyle(defaultStyle);
  };
  

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.ISO_A2) {
      layer.bindTooltip(feature.properties.NAME, { permanent: false, direction: "auto", sticky: true });
    } else {
      // Log an error or handle features without ISO_A2 appropriately
      console.error('Feature is missing ISO_A2 property:', feature);
    }
  };
  

  const TourPolyline = ({ tour }) => {
    const positions = tour.locations.map(loc => [loc.lat, loc.lng]);
  
    return <Polyline positions={positions} color={activeTour ? (activeTour === tour.name ? tour.color : 'transparent') : 'transparent'} onClick={() => handleLineClick(tour)} />;
  };

  const generateRandomColor = () => {
    // Fixed green and blue values for 70% saturation
    const green = Math.floor(Math.random() * 128) + Math.floor(Math.random() * 128); // Random value between 128 and 255
    const blue = Math.floor(Math.random() * 128) + Math.floor(Math.random() * 128); // Random value between 128 and 255
    const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
  
    // Convert the RGB values to hexadecimal and format the color
    const colorHex = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
  
    return colorHex;
  }
    
  return (
      <MapContainer 
      style={{ width: '75vw', height: '90vh' }}
      center={[0, 0]} 
      zoom={3} 
      minZoom={3}
      scrollWheelZoom={true}
      maxBounds={[
        [-90, -180],
        [90, 180]
      ]}
      maxBoundsViscosity={1.0}
      >
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png" />
      <GeoJSON
        data={countriesBorders}
        style={defaultStyle}
        onEachFeature={onEachFeature}
      />
      {tours.map((tour) =>
        tour.locations.map((location, index) => (
          <CustomMarker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => handleMarkerClick(location, tour)}
            color={ '#ffca28'} 
            //color={generateRandomColor()}
            strokeColor={'#1c1c1c'}
            scale={10*Math.random()*0.5}
            style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 100%)"}}
          />
        ))
      )}

      {/* Render lines */}
      {tours.map((tour) => (
        <TourPolyline
          key={tour.name} 
          tour={tour}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
