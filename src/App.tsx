import Navigation from "./components/Navigation";
import { AircraftProvider } from "./contexts/AircraftContext";
import { FlightProvider } from "./contexts/FlightContext";
import Home from "./pages/Home";
import './styles/global.css';

export default function App() {
  return (
    <div className="App">
      <FlightProvider>
        <AircraftProvider>
          <Navigation />
          <Home />
        </AircraftProvider>
      </FlightProvider>
    </div>
  );
}
