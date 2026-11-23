/**
 * Geofencing & Spatial Ray-Casting Utilities
 * Implements the Jordan Curve Theorem (Even-Odd rule) for 2D Point-in-Polygon detection.
 * Developed for the Mohan N.V. Engineering Lab & MapUp Fleet Simulation.
 */

export interface Point {
  x: number;
  y: number;
}

export interface RayIntersectionResult {
  inside: boolean;
  intersections: Point[];
  rayCrossings: number;
}

// Hosur Logistics Hub Geofence Polygon (Tamil Nadu / Karnataka border)
export const GEOFENCE_POLYGON: Point[] = [
  { x: 140, y: 80 },
  { x: 380, y: 60 },
  { x: 490, y: 160 },
  { x: 430, y: 320 },
  { x: 220, y: 340 },
  { x: 100, y: 220 },
];

export const REF_LAT = 12.7409;
export const REF_LNG = 77.8253;

/**
 * Converts local 2D simulation canvas coordinates to real-world WGS84 GPS coordinates
 * centered around Hosur / Bangalore industrial corridor.
 */
export function canvasToGps(x: number, y: number): { lat: number; lng: number } {
  const lat = REF_LAT + (200 - y) * 0.00018;
  const lng = REF_LNG + (x - 320) * 0.00018;
  return { lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) };
}

/**
 * Ray-Casting Algorithm for Point-in-Polygon (Jordan Curve Theorem).
 * Casts an infinite horizontal ray towards +X and counts boundary edge crossings.
 * An odd number of crossings indicates the point is strictly inside the polygon.
 */
export function checkPointInPolygonWithRay(
  point: Point,
  polygon: Point[]
): RayIntersectionResult {
  if (!polygon || polygon.length < 3) {
    return { inside: false, intersections: [], rayCrossings: 0 };
  }

  let inside = false;
  const intersections: Point[] = [];

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    // Check if horizontal ray crosses this edge
    const intersectY = (yi > point.y) !== (yj > point.y);
    if (intersectY) {
      // Calculate X coordinate of intersection with the edge
      const intersectX = xi + ((point.y - yi) * (xj - xi)) / (yj - yi);
      if (point.x < intersectX) {
        inside = !inside;
        intersections.push({ x: Number(intersectX.toFixed(2)), y: point.y });
      }
    }
  }

  return {
    inside,
    intersections,
    rayCrossings: intersections.length,
  };
}
