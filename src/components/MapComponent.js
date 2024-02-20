import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker';
import countriesBorders from './borders.json';

const MapComponent = ({ tours, onSelectTour, onSelectLocation, activeTour, fetchImages }) => {
  const [mediaItems, setMediaItems] = useState({});

  const handleMarkerClick = async (location, tour) => {
    try {
      const newMediaItems = await fetchImages(location.folderName);
      location.mediaItems = newMediaItems;
      setMediaItems(newMediaItems);
      onSelectLocation(location, tour);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
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


  const getTotalMediaItemsLength = (mediaItems) => {
    let totalLength = 0;

    for (const band in mediaItems) {
      if (mediaItems[band].mediaItems) {
        totalLength += mediaItems[band].mediaItems.length;
      }
    }
    
    return totalLength;
  };

  const renderCustomMarker = (tour, location, index) => {
    const locationMediaItems = mediaItems[location.folderName]?.mediaItems || [];
    const mediaItemsLength = getTotalMediaItemsLength(locationMediaItems);
    
    return (
      <CustomMarker
        key={`${location.name}-${index}`}
        position={{ lat: location.lat, lng: location.lng }}
        onClick={() => handleMarkerClick(location, tour)}
        index={index}
        mediaItemsLength={mediaItemsLength}
        strokeColor={'#1c1c1c'}
        city={location.name}
        country={location.country}
      />
    );
  };

  return (
      <MapContainer 
      style={{ width: '100vw', height: '100vh' }}
      center={[33, 44]} 
      zoom={2} 
      minZoom={3}
      scrollWheelZoom={true}
      maxBounds={[
        [-90, -360],
        [90, 360]
      ]}
      maxBoundsViscosity={1.0}
      >
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png" />
      <GeoJSON
        data={countriesBorders}
        style={{color: '#FFC927', fill: false, weight: 0.1}}
        onEachFeature={onEachFeature}
      />
        
        {tours.map((tour, tourIndex) => (
          tour.locations.map((location, index) => (
            renderCustomMarker(tour, location, index)
          ))
        ))}

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
