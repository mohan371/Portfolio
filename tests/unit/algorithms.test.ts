import { describe, it, expect } from "vitest";
import {
  checkPointInPolygonWithRay,
  canvasToGps,
  GEOFENCE_POLYGON,
  Point,
} from "@/lib/algorithms/geofence";

describe("Geofence Ray-Casting Algorithm (Jordan Curve Theorem)", () => {
  it("correctly identifies points strictly INSIDE the polygon", () => {
    // Center of polygon roughly at (300, 200)
    const insidePoints: Point[] = [
      { x: 300, y: 160 },
      { x: 250, y: 200 },
      { x: 320, y: 180 },
      { x: 400, y: 220 },
    ];

    for (const pt of insidePoints) {
      const result = checkPointInPolygonWithRay(pt, GEOFENCE_POLYGON);
      expect(result.inside).toBe(true);
      expect(result.rayCrossings % 2).toBe(1); // Odd number of crossings
      expect(result.intersections.length).toBeGreaterThan(0);
    }
  });

  it("correctly identifies points strictly OUTSIDE the polygon", () => {
    const outsidePoints: Point[] = [
      { x: 50, y: 140 },   // Far to the left
      { x: 600, y: 200 },  // Far to the right
      { x: 300, y: 20 },   // Above the polygon
      { x: 300, y: 400 },  // Below the polygon
    ];

    for (const pt of outsidePoints) {
      const result = checkPointInPolygonWithRay(pt, GEOFENCE_POLYGON);
      expect(result.inside).toBe(false);
      expect(result.rayCrossings % 2).toBe(0); // Even (or 0) number of crossings
    }
  });

  it("handles degenerated polygons or empty polygons safely", () => {
    const emptyResult = checkPointInPolygonWithRay({ x: 10, y: 10 }, []);
    expect(emptyResult.inside).toBe(false);
    expect(emptyResult.rayCrossings).toBe(0);

    const linePolygon: Point[] = [
      { x: 0, y: 0 },
      { x: 10, y: 10 },
    ];
    const lineResult = checkPointInPolygonWithRay({ x: 5, y: 5 }, linePolygon);
    expect(lineResult.inside).toBe(false);
  });

  it("converts simulation canvas coordinates to valid GPS lat/lng", () => {
    const gps = canvasToGps(320, 200); // Origin at (320, 200)
    expect(gps.lat).toBeCloseTo(12.7409, 4);
    expect(gps.lng).toBeCloseTo(77.8253, 4);
  });
});
