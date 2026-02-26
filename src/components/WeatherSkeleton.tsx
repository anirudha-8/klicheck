import { Skeleton } from "./ui/skeleton";

/**
 * WeatherSkeleton Component
 *
 * Purpose:
 * - Provides a loading placeholder UI while weather data is being fetched.
 * - Uses Skeleton components to mimic the layout of the final weather cards.
 *
 * Structure:
 * - Outer container with vertical spacing
 * - Grid layout for multiple skeleton blocks
 * - Responsive sub-grid (2 columns on medium screens) for additional placeholders
 */
const WeatherSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {/* Large skeleton blocks simulating main weather cards */}
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />

        {/* Responsive grid for smaller weather details */}
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default WeatherSkeleton;
