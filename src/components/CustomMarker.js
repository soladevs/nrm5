import React, { useEffect } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import './CustomMarker.scss';

const CustomMarker = ({ position, onClick, color, strokeColor }) => {
  const iconRef = React.useRef(null);

  const icon = new L.DivIcon({
    className: 'custom-marker',
    html: `<div ref={iconRef} class="marker-wrapper"><svg xmlns="http://www.w3.org/2000/svg" fill="${color}" stroke="${strokeColor}" stroke-width="2%" width="36" height="48" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/></svg></div>`,
    iconSize: [40, 60],
    iconAnchor: [15, 30],
  });

  return (
    <Marker position={position} icon={icon} eventHandlers={{
      click: onClick,
    }} />
  );
};

export default CustomMarker;