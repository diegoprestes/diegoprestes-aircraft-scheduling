import { useContext } from 'react';
import AircraftCard from '../AircraftCard';
import { Aircraft, AircraftContext } from '../../contexts/AircraftContext';

import './styles.css';

export default function AircraftPicker() {
  const { aircrafts } = useContext(AircraftContext);

  return (
    <div className="aircraft-picker">
      { aircrafts.map((aircraft:Aircraft) => (
        <AircraftCard key={aircraft.ident} aircraft={aircraft} />
      ))}
    </div>
  );
}
