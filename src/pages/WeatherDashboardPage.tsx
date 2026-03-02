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

  console.log(coordinates);

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

  if (!coordinates) {
    return (
      <Alert variant={"destructive"}>
        <AlertTitle>Location Required</AlertTitle>
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

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          // disabled={}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Current and Hourly Weather */}
    </div>
  );
};

export default WeatherDashboardPage;
