import { API_CONFIG } from "./config";

class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });

    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData() {}

  async getCurrentWeather() {}

  async getForecast() {}

  async reverseGeocode() {}

  async searchLocations() {}
}

export const weatherAPI = new WeatherAPI();
