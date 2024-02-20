import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import './CustomMarker.scss';
import NRMHand from './nrmb.png';


const CustomMarker = ({ position, onClick, index, mediaItemsLength, city, country, selectedLocation }) => {
  const [mediaLength, setMediaLength] = useState(null);
  const iconRef = React.useRef();
  const [size, setSize] = useState(15);
  const [icon, setIcon] = React.useState(null);
  const [zIndex, setZIndex] = useState(20);
  const [classNameToAdd, setClassNameToAdd] = useState('svg-brush');
  const [hovered, setHovered] = useState(false);
  const colorToUse ='#FFC927'

  const randomNumberInRange = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min; };

  const handleMouseEnter = () => {
  };

  const handleMouseLeave = () => {
  };

  useEffect(() => {
    if (size !== null && size !== undefined) {
      setZIndex(100 - size);
    }
  }, [size]);

  useEffect(() => {
    if(selectedLocation && selectedLocation.name === city) {
      
      setHovered(true);
    } else {
      setHovered(false);
      if (classNameToAdd === 'svg-brush') {
        setClassNameToAdd('svg-clean');
      } else if (classNameToAdd === 'svg-clean') {
        setClassNameToAdd('svg-graffiti');
      } else {
        setClassNameToAdd('svg-brush');
      }
    }
  }, [selectedLocation, city, hovered]);

  useEffect(() => {
    if (mediaItemsLength !== null) {
      setMediaLength(mediaItemsLength);
    }
  }, [mediaItemsLength]);

  useEffect(() => {
    // Update marker size based on mediaItemsLength
    if (mediaItemsLength !== null && mediaItemsLength > 0) {
      setSize(25 + mediaItemsLength * 2);
      console.log("Media items length:", mediaItemsLength);
      console.log("Marker size:", size);
    } else {
      setSize(40 + randomNumberInRange(0, 25));
    }
  }, [mediaItemsLength, size]);

  useEffect(() => {
    // Replace with nrm.png
    //const htmlSvg = `<div class="marker-wrapper"><svg width="${size}" height="${size}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"> <path d="M100.106 0L115 54.1591L158.884 19.0983L139.1 71.6687L195.211 69.0983L148.306 100L195.211 130.902L139.1 128.331L158.884 180.902L115 145.841L100.106 200L85.211 145.841L41.3271 180.902L61.111 128.331L5 130.902L51.9057 100L5 69.0983L61.111 71.6687L41.3271 19.0983L85.211 54.1591L100.106 0Z" fill="${colorToUse}" /> </svg></div>`;
    
    const htmlPng = `<div class="marker-wrapper"><img class="marker-image"src="${NRMHand}" width="${size}" height="${size}" /></div>`;
    const htmlWithTintOverlay = hovered ? `<div class="marker-tint-overlay marker-tint-overlay-active">${htmlPng}</div>` : `<div class="marker-tint-overlay">${htmlPng}</div>`
    const newIcon = new L.DivIcon({
      className: 'custom-marker',
      html: htmlWithTintOverlay,
      iconAnchor: [25, 25],
    });
  
    // Update the icon state
    setIcon(newIcon);
    iconRef.current?.setIcon(newIcon);
  }, [selectedLocation, size, hovered]);

  return (
    <Marker 
      position={position}
      eventHandlers={{ click: onClick, mouseover: handleMouseEnter, mouseout: handleMouseLeave }}
      ref={iconRef} 
    >
      {hovered && (
        <div className="hover-text">
          <p className='hover-info hover-info-city'>{city}</p>
          <div className={'hover-info hover-info-background hover-info-svg ' + classNameToAdd + ''}></div>
          <p className='hover-info hover-info-country'>{country}</p>
        </div>
      )}
    </Marker>
  );
};

export default CustomMarker;
