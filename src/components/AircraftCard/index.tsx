import { useContext } from 'react';
import { Aircraft, AircraftContext } from '../../contexts/AircraftContext';

import './styles.css';

interface AircraftCardProps {
  aircraft: Aircraft;
}

export default function AircraftCard({ aircraft }: AircraftCardProps) {
  const { selectAircraft, currentAircraft, aircraftUsage } = useContext(AircraftContext);

  function handleAircraftClick() {
    selectAircraft(aircraft);
  }

  return (
    <div
      className={`aircraft ${aircraft.ident === currentAircraft?.ident ? 'aircraft--active' : ''}`}
      onClick={handleAircraftClick}
    >
      <div className="aircraft__info">
        <h3 className="aircraft__name">{aircraft.ident}</h3>
        <span className="aircraft__usage">{aircraftUsage}%</span>
      </div>
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
