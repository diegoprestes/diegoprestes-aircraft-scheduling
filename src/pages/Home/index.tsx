import { useContext } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import AircraftPicker from '../../components/AircraftPicker';
import AircraftTimeline from '../../components/AircraftTimeline';
import FlightList from '../../components/FlightList';
import { AircraftContext } from '../../contexts/AircraftContext';
import { FlightContext } from '../../contexts/FlightContext';

import './styles.css';
import '../../styles/loader.css';
import { oneDayInMilliseconds } from '../../utils/DateUtils';

export default function Home() {
  const { isFlightsLoading, activeFlights } = useContext(FlightContext);
  const {
    isAircraftLoading,
    isValidRoute,
    aircraftUsage,
    currentAircraftIdent
  } = useContext(AircraftContext);

  const tomorrow = new Date(new Date().getTime() + oneDayInMilliseconds());

  const options: Intl.DateTimeFormatOptions = {
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

          <div className="home__status">
            <h2 className="home__headline">Aircraft status:</h2>

            <span className="home__status-text">Usage during day: {aircraftUsage}%</span>
            { currentAircraftIdent && activeFlights.length > 0 && isValidRoute && (
              <span className="home__status-text home__status-valid">
                Route is valid
                <AiOutlineCheckCircle size={20} />
              </span>
            )}

            { currentAircraftIdent && activeFlights.length > 0 && !isValidRoute && (
              <span className="home__status-text home__status-invalid">
                Route is invalid
                <RiErrorWarningLine size={20} />
              </span>
            )}
          </div>

          <h2 className="home__headline">Select the flights for the aircraft</h2>
          <FlightList />

          <AircraftTimeline />
        </>
      )}
    </div>
  );
}
