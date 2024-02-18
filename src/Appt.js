import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import './index.scss';
import './App.scss';

const tours = [
  {
    name: "USA Tour",
    color: "red",
    strokeColor: "white",
    locations: [
      { lat: 40.7128, lng: -74.0060, name: 'New York', image: 'https://unsplash.it/200/300', text: 'A bustling metropolis known for its iconic landmarks and vibrant culture.' },
      { lat: 34.0522, lng: -118.2437, name: 'Los Angeles', image: 'https://unsplash.it/250/350', text: 'The entertainment capital of the world, famous for Hollywood and beautiful beaches.' },
      { lat: 41.8781, lng: -87.6298, name: 'Chicago', image: 'https://unsplash.it/220/320', text: 'Known for its impressive architecture and rich history.' }
    ]
  },
  {
    name: "Europe Tour",
    color: "blue",
    strokeColor: "white",
    locations: [
      { lat: 48.8566, lng: 2.3522, name: 'Paris', image: 'https://unsplash.it/230/330', text: 'The city of love, known for the Eiffel Tower and its art museums.' },
      { lat: 51.5074, lng: -0.1278, name: 'London', image: 'https://unsplash.it/240/340', text: 'The capital of England, rich in history and culture.' },
      { lat: 41.9028, lng: 12.4964, name: 'Rome', image: 'https://unsplash.it/210/310', text: 'A city with nearly 3,000 years of globally influential art, architecture, and culture.' }
    ]
  },
  {
    name: "World Tour",
    color: "green",
    strokeColor: "white",
    locations: [
      { lat: -33.8688, lng: 151.2093, name: 'Sydney', image: 'https://unsplash.it/200/320', text: 'Australia’s largest city, known for its Sydney Opera House and beautiful harbor.' },
      { lat: 35.6895, lng: 139.6917, name: 'Tokyo', image: 'https://unsplash.it/220/340', text: 'Japan’s busy capital, mixing the ultramodern and the traditional.' },
      { lat: -1.2921, lng: 36.8219, name: 'Nairobi', image: 'https://unsplash.it/230/310', text: 'The capital city of Kenya, known for its national park and unique culture.' },
      { lat: 19.4326, lng: -99.1332, name: 'Mexico City', image: 'https://unsplash.it/210/300', text: 'The densely populated, high-altitude capital of Mexico.' }
    ]
  }
];

function App() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeTour, setActiveTour] = useState(null);

  const onSelectLocation = (location) => {
    setSelectedLocation(location);
    setSelectedTour(null);
  };

  const onSelectTour = (tour) => {
    setSelectedTour(tour);
    setSelectedLocation(null);
    setActiveTour(tour.name);
  };

  const handleTourButtonClick = (tour) => {
    onSelectTour(tour);
  };

  return (
    <div className="app">
      <div className="map-container">
        <MapComponent tours={tours} onSelectLocation={onSelectLocation} onSelectTour={onSelectTour} activeTour={activeTour} />
        <div className="bottombar">
          {tours.map((tour, index) => (
            <button key={index} onClick={() => handleTourButtonClick(tour)}>
              {tour.name}
            </button>
          ))}
        </div>
      </div>
      <div className="sidebar">
        <div className="logo-container">
          <img src="NRM.jpg" alt="Logo" className="logo"/>
          <p>NRM 5th Anniversary</p>
          <p>World Tour</p>
        </div>
        <hr />
        {selectedTour ? (
          <div className="tour-info">
            <h2>{selectedTour.name}</h2>
            <ul>
              {selectedTour.locations.map((location, index) => (
                <li key={index}>
                  <h3>{location.name}</h3>
                  <img src={location.image} alt={location.name} />
                  <p>{location.text}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : selectedLocation ? (
          <div className="location-info">
            <h2>{selectedLocation.name}</h2>
            <img src={selectedLocation.image} alt={selectedLocation.name} />
            <p>{selectedLocation.text}</p>
          </div>
        ) : (
          <div className="info">
            <h2>Select a tour or location</h2>
          </div>
        )}
      </div>
      </div>
  );
}

export default App;