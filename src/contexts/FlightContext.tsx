import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

import api, { Pagination } from '../services/api';

export interface Flight {
  id: string;
  departuretime: number;
  arrivaltime: number;
  readable_departure: string;
  readable_arrival: string;
  origin: string;
  destination: string;
}

interface FlightResponse {
  data: FlightResponseData;
}

interface FlightResponseData {
  pagination: Pagination;
  data: Flight[];
}

interface FlightContextData {
  flights: Flight[];
  isFlightsLoading: boolean;
  toggleActiveFlight: (id: Flight) => boolean;
  activeFlights: Flight[];
  hasMorePages: boolean;
  loadNextPage: () => void;
}

interface FlightProviderProps {
  children: ReactNode;
}

export const FlightContext = createContext({} as FlightContextData);

export function FlightProvider({ children }: FlightProviderProps) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [isFlightsLoading, setIsFlightsLoading] = useState(true);
  const [activeFlights, setActiveFlights] = useState<Flight[]>([]);
  const [pageOffset, setPageOffset] = useState(-1);

  const pageLimit = 10;

  const toggleActiveFlight = (flight: Flight) => {
    if (activeFlights.includes(flight)) {
      removeFlight(flight);
      return false;
    } else {
      addFlight(flight);
      return true;
    }
  }

  const addFlight = (flight: Flight) => {
    setActiveFlights([...activeFlights, flight]);
  };

  const removeFlight = (flight: Flight) => {
    setActiveFlights(activeFlights.filter(item => item.id !== flight.id));
  };

  const loadNextPage = useCallback(async () => {
    if (!hasMorePages) return;

    try {
      const newOffset = pageOffset + 1;
      const response:FlightResponse = await api.get(`/flights?limit=${pageLimit}&offset=${newOffset}`);
      setIsFlightsLoading(false);
      setPageOffset(newOffset);
      setFlights([...flights, ...response.data.data]);
      setHasMorePages(pageLimit * (newOffset + 1) < response.data.pagination.total);
    } catch (error) {
      console.error('Error loading flights');
    };
  }, [flights, hasMorePages, pageOffset]);

  useEffect(() => {
    if (!isFlightsLoading) return;

    loadNextPage();
  }, [isFlightsLoading, loadNextPage]);

  return (
    <FlightContext.Provider value={{
      flights,
      isFlightsLoading,
      toggleActiveFlight,
      activeFlights,
      hasMorePages,
      loadNextPage
    }}>
      {children}
    </FlightContext.Provider>
  )
}
