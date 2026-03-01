import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

const WeatherDashboardPage = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeoLocation();

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      // reload weather data
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant={"destructive"}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p>{locationError}</p>
        </AlertDescription>
      </Alert>
    );
  }

  return <div></div>;
};

export default WeatherDashboardPage;
