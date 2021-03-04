import { useContext, useState } from 'react';
import { AircraftContext } from '../../contexts/AircraftContext';
import { Flight, FlightContext } from '../../contexts/FlightContext';

import './styles.css';

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const { currentAircraftIdent } = useContext(AircraftContext);
  const { toggleActiveFlight } = useContext(FlightContext);

  const [isActive, setIsActive] = useState(false);

  const disabledClass = !currentAircraftIdent ? 'flight-card--disabled' : '';
  const activeClass = isActive ? 'flight-card--active' : '';

  const handleCardClick = () => {
    const cardIsActive = toggleActiveFlight(flight);
    setIsActive(cardIsActive);
  };

  return (
    <div
      className={`flight-card ${disabledClass} ${activeClass}`}
      onClick={handleCardClick}
    >
      <h3 className="flight-card__name">
        {flight.id}
      </h3>
      <div className="flight-card__info">
        <div className="flight-card__leg">
          <span className="flight-card__leg-label">Origin</span>
          <span className="flight-card__leg-name">{flight.origin}</span>
          <span className="flight-card__leg-time">{flight.readable_departure}</span>
        </div>
        <div className="flight-card__leg">
          <span className="flight-card__leg-label">Destination</span>
          <span className="flight-card__leg-name">{flight.destination}</span>
          <span className="flight-card__leg-time">{flight.readable_arrival}</span>
        </div>
      </div>
    </div>
  );
}
