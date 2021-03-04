import { useContext, useEffect, useRef, useState } from 'react';
import { Flight, FlightContext } from '../../contexts/FlightContext';
import { hourInSeconds } from '../../utils/DateUtils';
import './styles.css';

export default function AircraftTimeline() {
  const { activeFlights } = useContext(FlightContext);
  const barRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);

  const hoursList = new Array(24).fill(1);

  const barTotal = hourInSeconds(24);
  const hoursLabels = [
    { time: 0, label: '00:00' },
    { time: hourInSeconds(6), label: '06:00' },
    { time: hourInSeconds(12), label: '12:00' },
    { time: hourInSeconds(18), label: '18:00' },
    { time: barTotal, label: '24:00' },
  ]

  useEffect(() => {
    function handleResize() {
      if (barRef.current && barRef.current.clientWidth !== barWidth) {
        setBarWidth(barRef.current.clientWidth);
      }
    }

    if (barRef.current) {
      setBarWidth(barRef.current.clientWidth);
    }

    window.addEventListener('resize', handleResize);
  }, [barWidth])

  const calculateLeft = (time: number) => {
    return Math.round(time * 100 / barTotal);
  }

  const calculateFlightWidth = (flight: Flight) => {
    const flightTime = flight.arrivaltime - flight.departuretime;
    const flightPerc = flightTime * 100 / barTotal;

    return Math.round(barWidth * flightPerc / 100);
  }

  const calculateTurnaroundWidth = () => {
    const turnaroundTime = hourInSeconds(0.33); // 20 minutes
    const turnaroundPerc = turnaroundTime * 100 / barTotal;

    return Math.round(barWidth * turnaroundPerc / 100);
  }

  return (
    <div className="aircraft-timeline">
      <div className="aircraft-timeline__container">
        <div className="aircraft-timeline__labels">
          { hoursLabels.map(hour => (
            <span
              key={hour.time}
              className="aircraft-timeline__label"
              style={{ left: `${calculateLeft(hour.time)}%`}}
            >{hour.label}</span>
          ))}
        </div>
        <div
          className="aircraft-timeline__bar-container"
          ref={barRef}
        >
          <div className="aircraft-timeline__bar-flights">
            { activeFlights.map((flight, index) => (
              <div
                key={index}
                className="aircraft-timeline__flight"
                style={{ left: `${calculateLeft(flight.departuretime)}%`}}
              >
                <div
                  className="aircraft-timeline__flight-time"
                  style={{ width: `${calculateFlightWidth(flight)}px`}}
                ></div>
                <div
                  className="aircraft-timeline__turnaround-time"
                  style={{ width: `${calculateTurnaroundWidth()}px`}}
                ></div>
              </div>
            ))}
          </div>

          <div className="aircraft-timeline__bar">
            { hoursList.map((item, index) => (
              <div key={index} className="aircraft-timeline__hour"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
