import _ from 'lodash';
import * as turf from '@turf/turf';

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function calculateBearing(startLat, startLng, destLat, destLng) {
    const startLatRad = degreesToRadians(startLat);
    const startLngRad = degreesToRadians(startLng);
    const destLatRad = degreesToRadians(destLat);
    const destLngRad = degreesToRadians(destLng);

    const dLng = destLngRad - startLngRad;
    const x = Math.sin(dLng) * Math.cos(destLatRad);
    const y = Math.cos(startLatRad) * Math.sin(destLatRad) - Math.sin(startLatRad) * Math.cos(destLatRad) * Math.cos(dLng);
    const bearing = (Math.atan2(x, y) * 180 / Math.PI + 360) % 360;

    return bearing;
}

export class MapAnimator {
    constructor(map) {
        this.map = map;
        this.animationFrameId = null;
        this.calculateBearing = _.memoize(calculateBearing); // You can memoize the bearing calculation to enhance performance
        this.animateMarkerAlongRoute = _.debounce(this._animateMarkerAlongRoute, 7);
    }

    calculateDistance(coord1, coord2) {
        const from = turf.point(coord1);
        const to = turf.point(coord2);
        const distance = turf.distance(from, to, { units: 'kilometers' });
        return distance;
      }
    
      interpolatePoints(start, end, numPoints) {
        const interpolatedPoints = [];
        for (let i = 0; i <= numPoints; i++) {
          const t = i / numPoints;
          const lat = start[1] + t * (end[1] - start[1]);
          const lng = start[0] + t * (end[0] - start[0]);
          interpolatedPoints.push([lng, lat]);
        }
        return interpolatedPoints;
      }
    
      preprocessRoute(route, totalPoints = 3000) {
        const distances = route.map((_, i, arr) => i < arr.length - 1 ? this.calculateDistance(arr[i], arr[i + 1]) : 0);
        const totalDistance = distances.reduce((a, b) => a + b, 0);
        const pointsDistribution = distances.map(d => Math.round((d / totalDistance) * totalPoints));
    
        let newRoute = [];
        for (let i = 0; i < route.length - 1; i++) {
          const start = route[i];
          const end = route[i + 1];
          const pointsForSegment = pointsDistribution[i];
          const interpolatedPoints = this.interpolatePoints(start, end, pointsForSegment);
          newRoute.push(...interpolatedPoints);
        }
        newRoute.push(route[route.length - 1]);
    
        return newRoute;
      }

      _followMarker(markerLngLat) {
        if (this.map) {
          const newBearing = this.calculateBearing(
            this.map.getCenter().lat,
            this.map.getCenter().lng,
            markerLngLat[1],
            markerLngLat[0]
          );
      
          if (this.shouldFlyTo(markerLngLat)) {
            this.map.flyTo({
              center: markerLngLat,
              bearing: newBearing,
              pitch: 65,
              zoom: 18,
              speed: 1.2,
              curve: 1.2,
              duration: 250,
              easing: (t) => t,
            });
          } else {
            this.map.easeTo({
              center: markerLngLat,
              bearing: newBearing,
              pitch: 65,
              zoom: 16,
              speed: 1.1,
              curve: 1.5,
              duration: 50,
              easing: (t) => t,
            });
          }
        }
      }
      
      shouldFlyTo(markerLngLat) {
        const currentCenter = this.map.getCenter();
        const distance = this.calculateDistance([currentCenter.lng, currentCenter.lat], markerLngLat);
        return distance > 0.5; // Fly if the distance is greater than 0.5 km, adjust as necessary
      }

    lerp(start, end, t) {
        return start * (1 - t) + end * t;
      }

    _animateMarkerAlongRoute(route, updateMarkerPosition, onAnimationComplete) {
        const preprocessedRoute = this.preprocessRoute(route);
        let animationFrameId;
    let startTime;
    const duration = 100000; // Duration of the animation in milliseconds
    const points = preprocessedRoute.map(coord => ({ longitude: coord[0], latitude: coord[1] }));

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;

      const t = Math.min(elapsedTime / duration, 1);
      const currentIndex = Math.floor(t * (points.length - 1));
      const nextIndex = Math.min(currentIndex + 1, points.length - 1);

      const currentPoint = points[currentIndex];
      const nextPoint = points[nextIndex];

      const lat = this.lerp(currentPoint.latitude, nextPoint.latitude, t);
      const lng = this.lerp(currentPoint.longitude, nextPoint.longitude, t);

      updateMarkerPosition([lng, lat]);
      this._followMarker([lng, lat]);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
  }
      
      getDurationPerSegment(route) {
        const distances = route.map((_, i, arr) => i < arr.length - 1 ? this.calculateDistance(arr[i], arr[i + 1]) : 0);
        const maxDistance = Math.max(...distances);
        return 25500 * (maxDistance / 0.1); // Assuming 50ms for 0.1 km, adjust as necessary
      }
      

    cancelAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    componentWillUnmount() {
        this.mapAnimator.cancelAnimation();
      }
      
}
