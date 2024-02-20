import 'react-app-polyfill/stable';
import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';
import './index.scss';
import './App.scss';
import PreviewGrid from './components/PreviewGrid';
import ReactPlayer from 'react-player';
import contentMetadata from './content/content-metadata.json';

const tours = [
  {
    strokeColor: "white",
    locations: [
      { lat: 53.0793, lng: 8.8017, name: 'Bremen', country: 'Germany', bands: ['cleopatrick', 'readytheprince']},
      { lat: 34.052235, lng: -118.243683, name: 'Los Angeles', country: 'USA', bands: ['cleopatrick']},
      { lat: 51.507351, lng: -0.127758, name: 'London', country: 'UK', bands: ['cleopatrick']},
      { lat: 53.551086, lng: 9.993682, name: 'Hamburg', country: 'Germany', bands: ['cleopatrick']},
      { lat: 36.162663, lng: -86.781601, name: 'Nashville', country: 'USA', bands: ['cleopatrick']},
      { lat: 51.1324, lng: 0.2637, name: 'Tunbridge Wells', country: 'UK', bands: ['cleopatrick']},
      { lat: 51.0504, lng: 13.7373, name: 'Dresden', country: 'Germany', bands: ['readytheprince']},
      { lat: 52.4862, lng: -1.8904, name: 'Birmingham', country: 'UK', bands: ['cleopatrick']},
      { lat: 30.2672, lng: -97.7431, name: 'Austin', country: 'USA', bands: ['cleopatrick']},
      // { lat: 42.3601, lng: -71.0589, name: 'Boston', country: 'USA', bands: ['cleopatrick']},
      { lat: 51.4545, lng: -2.5879, name: 'Bristol', country: 'UK', bands: ['cleopatrick']},
      // { lat: 43.5448, lng: -80.2482, name: 'Guelph', country: 'Canada', bands: ['cleopatrick']},
      { lat: 54.9783, lng: -1.6178, name: 'Newcastle', country: 'UK', bands: ['cleopatrick']},
      { lat: 40.7128, lng: -74.0060, name: 'New York City', country: 'USA', bands: ['cleopatrick']},
      { lat: 37.7749, lng: -122.4194, name: 'San Francisco', country: 'USA', bands: ['cleopatrick']},
      { lat: 43.6532, lng: -79.3832, name: 'Toronto', country: 'Canada', bands: ['cleopatrick']},
      { lat: 31.0461 , lng: 34.8516, name: 'Israel', country:' ', bands: ['cleopatrick']},
    ]
  },
];



function App() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false); 

  const fetchImages = (city) => {
    try {
      const mediaItemsWithMetadata = {};
    
      contentMetadata.forEach((metadata) => {
        if (metadata.city === city) {
          const band = metadata.band;
          if (!mediaItemsWithMetadata[band]) {
            mediaItemsWithMetadata[band] = {
              mediaItems: [],
            };
          }
          mediaItemsWithMetadata[band].mediaItems.push({
            src: metadata.src,
            type: metadata.type,
            submitter: metadata.submitter,
            country: metadata.country,
            city: metadata.city,
          });
        }
      });
    
      return mediaItemsWithMetadata;
    } catch (error) {console.error(error);} finally {
      setImagesLoaded(true);
    }
  };

  const onSelectTour = (tour) => {
    setSelectedTour(tour);
    setCarouselIndex(tours.findIndex(t => t === tour));
    toggleTourModal();
  };

  const handlePrevClick = () => {
    if (selectedTour) {
      setCarouselIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : selectedTour.locations.length - 1;
      setSelectedLocation(selectedTour.locations[newIndex]);
      setCarouselIndex(newIndex);
    });
   }
  };

  // Update to handleNextClick
  const handleNextClick = () => {
    if (selectedTour) {
      setCarouselIndex((prevIndex) => {
      const newIndex = prevIndex < selectedTour.locations.length - 1 ? prevIndex + 1 : 0;
      setSelectedLocation(selectedTour.locations[newIndex]);
      setCarouselIndex(newIndex);
    });
  }
};

  const toggleTourModal = () => {
    setShowTourModal(prev => !prev);
    setShowLocationModal(showTourModal); 
  };

  const onSelectLocation = (location) => {
    setSelectedLocation(location);
    setShowLocationModal(true); 
  };

  const closeLocationModal = () => {
    setShowLocationModal(false);
  };
  
  return (
    <div className="app">
      <nav className="navbar">
        <ul className="nav-links">
          <span className="nav-logo-text">NEW ROCK MAFIA</span>
          <span className="nav-logo-subtext">{"Happy 5th anniversary from fans around the world <3"}</span>
        </ul>
        <div>
        </div>
        </nav>
        <div className="sidebar">
        {!showLocationModal && !selectedLocation && (
          <div className="location-modal-content">
          <h2 className="location-modal-name">Tap a marked location</h2>
          <h3 className="location-modal-country">to view content submitted from there!</h3>
        </div>
        )}
        {showLocationModal && selectedLocation && (
            <div className="location-modal-content">
              <h2 className="location-modal-name">{selectedLocation.name}</h2>
              <h3 className="location-modal-country">{selectedLocation.country}</h3>
              <PreviewGrid city={selectedLocation.name} country={selectedLocation.country} imagesLoaded={imagesLoaded} mediaItems={selectedLocation.mediaItems} />
            </div>
        )}
        </div>
      <main className="main-content">
        <MapComponent tours={tours} onSelectTour={onSelectTour} onSelectLocation={onSelectLocation} activeTour={selectedTour?.name} fetchImages={fetchImages} selectedLocation={selectedLocation} />
      </main>
    </div>
  );
}

export default App;
