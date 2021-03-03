import { useContext } from 'react';
import AircraftPicker from '../../components/AircraftPicker';
import AircraftTimeline from '../../components/AircraftTimeline';
import FlightList from '../../components/FlightList';
import { AircraftContext } from '../../contexts/AircraftContext';
import { FlightContext } from '../../contexts/FlightContext';

import './styles.css';
import '../../styles/utils/loader.css';

export default function Home() {
  const { isFlightsLoading } = useContext(FlightContext);
  const { isAircraftLoading } = useContext(AircraftContext);

  const oneDay = 1000 * 60 * 60 * 24;
  const tomorrow = new Date(new Date().getTime() + oneDay);

  const options:Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric"
  };
  const americanDate = new Intl.DateTimeFormat("en-US", options).format(tomorrow);

  return (
    <div className="home">
      { isAircraftLoading || isFlightsLoading ? (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <>
          <h2 className="home__headline">Select aircraft for scheduling on {americanDate}</h2>

          <AircraftPicker />

          <h2 className="home__headline">Select the flights for the aircraft</h2>
          <FlightList />

          <AircraftTimeline />
        </>
      )}
    </div>
  );
}
