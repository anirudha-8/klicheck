import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { ThemeProvider } from "./contexts/theme-provider";
import WeatherDashboardPage from "./pages/WeatherDashboardPage";
import CityPage from "./pages/CityPage";

function App() {
  return (
    <div className="p-2">
      <BrowserRouter>
        <ThemeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashboardPage />} />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
