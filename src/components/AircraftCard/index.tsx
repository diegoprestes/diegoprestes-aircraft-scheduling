import { useContext } from 'react';
import { Aircraft, AircraftContext } from '../../contexts/AircraftContext';

import './styles.css';

interface AircraftCardProps {
  aircraft: Aircraft;
}

export default function AircraftCard({ aircraft }: AircraftCardProps) {
  const { selectAircraft, currentAircraftIdent } = useContext(AircraftContext);

  function handleAircraftClick() {
    selectAircraft(aircraft.ident);
  }

  return (
    <div
      className={`aircraft ${aircraft.ident === currentAircraftIdent ? 'aircraft--active' : ''}`}
      onClick={handleAircraftClick}
    >
      <h3 className="aircraft__name">{aircraft.ident}</h3>
      <div>
        <p className="aircraft__item">
          <strong>Type:</strong> {aircraft.type}
        </p>
        <p className="aircraft__item">
          <strong>Seats:</strong> {aircraft.economySeats}
        </p>
        <p className="aircraft__item">
          <strong>Base:</strong> {aircraft.base}
        </p>
      </div>
    </div>
  );
}
