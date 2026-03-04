import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeatherQuery";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

/**
 * WeatherDashboardPage Component
 *
 * Purpose:
 * - Displays weather information based on user's geolocation.
 * - Handles loading, error, and missing location states gracefully.
 * - Provides retry and refresh functionality for location retrieval.
 *
 * Flow:
 * 1. Attempt to fetch geolocation via `useGeoLocation`.
 * 2. Show skeleton loader while fetching.
 * 3. Show error alerts if location fails or is unavailable.
 * 4. Render dashboard UI once coordinates are available.
 */
const WeatherDashboardPage = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeoLocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  /**
   * Refresh handler:
   * - Re-triggers location fetch
   * - Intended to reload weather data once coordinates are available
   */
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      // refetch data
    }
  };

  // Show skeleton loader while location is being fetched
  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  // Show error alert if geolocation fails
  if (locationError) {
    return (
      <Alert variant={"destructive"}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <div className="text-sm text-muted-foreground">
            If permission was denied, please enable location access in your
            browser settings.
          </div>
          <Button
            onClick={getLocation}
            variant={"outline"}
            className="w-fit cursor-pointer"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Retry Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Show alert if no coordinates are available (e.g., initial failure)
  // locationError is handled above; this branch catches a null result
  // without a descriptive message.
  if (!coordinates) {
    return (
      <Alert variant={"destructive"}>
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError ?? "Unable to determine your location."}</p>
          <div className="text-sm text-muted-foreground">
            If permission was denied, please enable location access in your
            browser settings.
          </div>
          <Button
            onClick={getLocation}
            variant={"outline"}
            className="w-fit cursor-pointer"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Retry Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Main dashboard UI once location is available
  return (
    <div className="space-y-4">
      {/* Header: My Location + Refresh button */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={"outline"} size={"icon"} onClick={handleRefresh}>
          <RefreshCw className={`h-4 w-4`} />
        </Button>
      </div>

      {/* Current and Hourly Weather (to be implemented) */}
    </div>
  );
};

export default WeatherDashboardPage;
