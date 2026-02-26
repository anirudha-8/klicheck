import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

/**
 * Represents the state of geolocation data.
 * - coordinates: latitude & longitude values (or null if unavailable)
 * - error: error message string (or null if no error)
 * - isLoading: indicates whether a location request is in progress
 */
interface GeoLocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

/**
 * Custom React hook for retrieving the user's geolocation.
 * Handles:
 * - Initial location fetch on mount
 * - Error states (permission denied, unavailable, timeout, unknown)
 * - Loading state management
 *
 * Returns:
 * - coordinates: { lat, lon } or null
 * - error: descriptive error message or null
 * - isLoading: boolean flag
 * - getLocation: function to manually trigger location retrieval
 */
export function useGeoLocation() {
  const [locationData, setLocationData] = useState<GeoLocationState>({
    coordinates: null,
    error: null,
    isLoading: false,
  });

  /**
   * Attempts to retrieve the user's current location.
   * Updates state with coordinates or error message accordingly.
   */
  const getLocation = () => {
    // Reset error and mark loading state
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    // Check if geolocation API is supported
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser!",
        isLoading: false,
      });
      return;
    }

    // Request current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        // Map error codes to user-friendly messages
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true, // request precise location
        timeout: 5000, // fail if not resolved within 5s
        maximumAge: 0, // do not use cached location
      },
    );
  };

  // Automatically fetch location on component mount
  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
