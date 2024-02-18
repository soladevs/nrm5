import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import './index.scss';
import './App.scss';
import PreviewGrid from './components/PreviewGrid';
import ReactPlayer from 'react-player';

const fileNameArray = {
  'cleopatrick/bremen':{'images': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
                       '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg']},
  'cleopatrick/losangeles':{'images': ['1.jpg', '2.jpg']},
  'cleopatrick/london':{'images': ['1.jpg', '1.mp4', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
            '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg',
            '21.jpg', '22.jpg', '23.jpg', '2.mp4', '3.mp4', '4.mp4',]},
  'cleopatrick/hamburg':{'images': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
                        '11.jpg', '12.jpg', '13.jpg']},
  'cleopatrick/tunbridgewells':{'images': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg',
                    '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg']},
  'cleopatrick/nashville': {'images':['1.jpg']},
  'rtp/bremen':{'images': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
                       '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg']},
  'rtp/dresden':{'images': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
  '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg']},
};

const fetchImages = async (folderName) => {
  try {
    const folderPath = `/img/${folderName}`;
    const fileNames = fileNameArray[folderName].images;
    const imagePromises = fileNames.map((fileName) => fetch(`${folderPath}/${fileName}`));

    const mediaItems = await Promise.all(imagePromises);

    const mediaItemsWithMetadata = {
    };

    const bandName = folderName.split('/')[0];

    if (!mediaItemsWithMetadata[bandName]) {
      mediaItemsWithMetadata[bandName] = {
        mediaItems: []
      };
    }

    mediaItems.forEach((media) => {
        mediaItemsWithMetadata[bandName].mediaItems.push({
          src: media.url,
          type: media.url.endsWith('.mp4') ? 'video' : 'image',
          submitter: 'John Doe',
          country: 'USA'
        });
    });

    console.log('Media items:', mediaItemsWithMetadata);

    return mediaItemsWithMetadata;

  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

const tours = [
  {
    strokeColor: "white",
    locations: [
      { lat: 53.079296, lng: 8.801694, name: 'Bremen', folderName: 'cleopatrick/bremen', text: 'Submitted by: John Doe' },
      { lat: 34.052235, lng: -118.243683, name: 'Los Angeles', folderName: 'cleopatrick/losangeles', text: 'The entertainment capital of the world, famous for Hollywood and beautiful beaches.'},
      { lat: 51.507351, lng: -0.127758, name: 'London', folderName: 'cleopatrick/london', text: 'Known for its impressive architecture and rich history.'},
      { lat: 53.551086, lng: 9.993682, name: 'Hamburg', folderName: 'cleopatrick/hamburg', text: 'A bustling metropolis known for its iconic landmarks and vibrant culture.'},
      { lat: 36.162663, lng: -86.781601, name: 'Nashville', folderName: 'cleopatrick/nashville', text: 'The entertainment capital of the world, famous for Hollywood and beautiful beaches.'},
      { lat: 51.1324, lng: 0.2637, name: 'Tunbridge Wells', folderName: 'cleopatrick/tunbridgewells', text: 'Known for its impressive architecture and rich history.'},
      { lat: 51.0504, lng: 13.7373, name: 'Dresden', folderName: 'rtp/dresden', text: 'Known for its impressive architecture and rich history.'},
      { lat: 53.027296, lng: 9.201694, name: 'Bremen', folderName: 'rtp/bremen', text: 'Known for its impressive architecture and rich history.'},
    ]
  },
];

tours.forEach((tour) => {
  tour.locations.forEach((location) => {
     fetchImages(location.folderName).then((mediaItems) => {
      location.mediaItems = mediaItems;
    });
  });
});

console.log(tours);


function App() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);

  const onSelectTour = (tour) => {
    setSelectedTour(tour);
    setCarouselIndex(tours.findIndex(t => t === tour));
    toggleTourModal();
  };

  // Function to handle the left navigation button
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
          <li>Home</li>
          <li>About</li>
          <span>NRM 5TH ANNIVERSARY</span>
          <li>Submit</li>
          <li>Help</li>
        </ul>
        </nav>
      <main className="main-content">
        <MapComponent tours={tours} onSelectTour={onSelectTour} onSelectLocation={onSelectLocation} activeTour={selectedTour?.name} />
        <div className="sidebar">
      {showLocationModal && selectedLocation && (
          <div className="location-modal-content">
            <h2>{selectedLocation.name}</h2>
            <PreviewGrid mediaItems={selectedLocation.mediaItems} />
            {console.log(selectedLocation)}
          </div>
      )}
      </div>
      </main>
    </div>
  );
}

export default App;
