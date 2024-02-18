import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import './CustomMarker.scss';


const CustomMarker = ({ position, onClick, colors, index, mediaItemsLength, city, country }) => {
  const [colorToUse, setColorToUse] = useState(null);
  const [mediaLength, setMediaLength] = useState(null);
  const iconRef = React.useRef();
  const [size, setSize] = useState(15);
  const [icon, setIcon] = React.useState(null);
  const [zIndex, setZIndex] = useState(20);
  const [hovered, setHovered] = useState(false);


  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    if (size !== null && size !== undefined) {
      setZIndex(100 - size); // Adjust the formula based on your specific requirements
    }
  }, [size]);

  useEffect(() => {
    if (mediaItemsLength !== null) {
      setMediaLength(mediaItemsLength);
    }
  }, [mediaItemsLength]);

  useEffect(() => {
    if (index !== undefined && colors[index] !== undefined) {
      setColorToUse(colors[index]);
    }
  }, [colors, index, mediaItemsLength, size]);

  useEffect(() => {
    // Update marker size based on mediaItemsLength
    if (mediaItemsLength !== null) {
      setSize(25 + mediaItemsLength * 2);
      console.log("Media items length:", mediaItemsLength);
      console.log("Marker size:", size);
    }
  }, [mediaItemsLength, size]);

  useEffect(() => {
    if (!colorToUse || size === null || size === undefined) return; // Skip if colorToUse is null or size is not valid
  
    // Replace with nrm.png
    //const htmlSvg = `<div class="marker-wrapper"><svg width="${size}" height="${size}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"> <path d="M100.106 0L115 54.1591L158.884 19.0983L139.1 71.6687L195.211 69.0983L148.306 100L195.211 130.902L139.1 128.331L158.884 180.902L115 145.841L100.106 200L85.211 145.841L41.3271 180.902L61.111 128.331L5 130.902L51.9057 100L5 69.0983L61.111 71.6687L41.3271 19.0983L85.211 54.1591L100.106 0Z" fill="${colorToUse}" /> </svg></div>`;
    
    const htmlPng = `<div class="marker-wrapper"><img class="marker-image"src="/nrmb.png" width="${size}" height="${size}" /></div>`;
    const htmlWithTintOverlay = `<div class="marker-tint-overlay">${htmlPng}</div>`;
    const newIcon = new L.DivIcon({
      className: 'custom-marker',
      html: htmlWithTintOverlay,
      iconAnchor: [25, 25],
    });
  
    // Update the icon state
    setIcon(newIcon);
    iconRef.current?.setIcon(newIcon);
  }, [colorToUse, size]);

  return (
    <Marker 
      position={position} 
      eventHandlers={{ click: onClick, mouseover: handleMouseEnter, mouseout: handleMouseLeave }}
      ref={iconRef} 
    >
      {hovered && (
        <div className="hover-text">
          <p className='hover-info hover-info-city'>{city}</p>
          <div className='hover-info hover-info-background'></div>
          <p className='hover-info hover-info-country'>{country}</p>
        </div>
      )}
    </Marker>
  );
};

export default CustomMarker;
