import { useContext } from "react";
import { Flight, FlightContext } from "../../contexts/FlightContext";
import FlightCard from "../FlightCard";

import './styles.css';

export default function FlightList() {
  const { flights, hasMorePages, loadNextPage } = useContext(FlightContext);

  const handleLoadMore = () => {
    loadNextPage();
  }

  return (
    <div className="flight-list">
      <div className="flight-list__container">
        { flights.map((flight:Flight, index: number) => (
          <FlightCard key={index} flight={flight} />
        ))}
      </div>
      { hasMorePages && (
        <div className="flight-list__load-more-container">
          <button
            className="flight-list__load-more"
            onClick={handleLoadMore}
          >Load more</button>
        </div>
      )}
    </div>
  );
}
