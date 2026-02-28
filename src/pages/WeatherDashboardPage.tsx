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

  return <div></div>;
};

export default WeatherDashboardPage;
