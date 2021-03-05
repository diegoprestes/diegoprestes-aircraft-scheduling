import { useContext } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import AircraftTimeline from '../../components/AircraftTimeline';
import { Aircraft, AircraftContext } from '../../contexts/AircraftContext';
import { Flight, FlightContext } from '../../contexts/FlightContext';

import './styles.css';
import '../../styles/loader.css';
import { oneDayInMilliseconds } from '../../utils/DateUtils';
import List from '../../components/List';
import AircraftCard from '../../components/AircraftCard';
import FlightCard from '../../components/FlightCard';

export default function Home() {
  const {
    isFlightsLoading,
    isFlightsLoadingMore,
    flights,
    activeFlights,
    hasMorePages,
    loadNextPage
  } = useContext(FlightContext);

  const {
    aircrafts,
    isAircraftLoading,
    isValidRoute,
    aircraftUsage,
    currentAircraft
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
          <h2 className="home__headline">{americanDate}</h2>

          <div className="container">
            <div className="row">
              <div className="column col-12 col-md-3">
                <h2 className="home__headline">Aircraft</h2>

                <List>
                  { aircrafts.map((aircraft:Aircraft) => (
                    <AircraftCard key={aircraft.ident} aircraft={aircraft} />
                  ))}
                </List>
              </div>
              <div className="column col-12 col-md-6">
                <h2 className="home__headline">Rotation {currentAircraft?.ident}</h2>

                <List>
                  <div className="home__status">
                    <span className="home__status-text">Usage during day: {aircraftUsage}%</span>
                    { currentAircraft && activeFlights.length > 0 && isValidRoute && (
                      <span className="home__status-text home__status-valid">
                        Route is valid
                        <AiOutlineCheckCircle size={20} />
                      </span>
                    )}

                    { currentAircraft && activeFlights.length > 0 && !isValidRoute && (
                      <span className="home__status-text home__status-invalid">
                        Route is invalid
                        <RiErrorWarningLine size={20} />
                      </span>
                    )}
                  </div>

                  { activeFlights.map((flight:Flight, index: number) => (
                    <FlightCard key={index} flight={flight} preview />
                  ))}
                </List>
              </div>
              <div className="column col-12 col-md-3">
                <h2 className="home__headline">Flights</h2>

                <List styleModifier="list--flights">
                  { flights.map((flight:Flight, index: number) => (
                    <FlightCard key={index} flight={flight} />
                  ))}
                  { hasMorePages && (
                    <button
                      className={`flight-list__load-more ${isFlightsLoadingMore ? 'loading' : ''}`}
                      onClick={() => loadNextPage()}
                    >
                      {isFlightsLoadingMore ? 'Loading...' : 'Load more'}
                    </button>
                  )}
                </List>
              </div>
            </div>
          </div>

          <AircraftTimeline />
        </>
      )}
    </div>
  );
}
