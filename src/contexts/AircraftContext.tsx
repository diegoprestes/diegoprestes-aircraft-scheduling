import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Flight, FlightContext } from './FlightContext';
import api, { Pagination } from '../services/api';
import { calculateRouteUsage, validateRoute } from '../utils/RouteUtils';

export interface Aircraft {
  ident: string;
  type: string;
  economySeats: number;
  base: string;
}

interface AircraftResponse {
  data: AircraftResponseData;
}

interface AircraftResponseData {
  pagination: Pagination;
  data: Aircraft[];
}

interface AircraftContextData {
  aircrafts: Aircraft[];
  isAircraftLoading: boolean;
  selectAircraft: (ident: string) => void;
  currentAircraftIdent: string;
  isValidRoute: boolean;
  aircraftUsage: number;
}

interface AircraftProviderProps {
  children: ReactNode;
}

export const AircraftContext = createContext({} as AircraftContextData);

export function AircraftProvider({ children }: AircraftProviderProps) {
  const { activeFlights } = useContext(FlightContext);

  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [isAircraftLoading, setIsAircraftLoading] = useState(true);
  const [currentAircraftIdent, setCurrentAircraftIdent] = useState('');

  const [isValidRoute, setIsValidRoute] = useState(true);
  const [aircraftUsage, setAircraftUsage] = useState(0);

  const selectAircraft = (ident: string) => {
    setCurrentAircraftIdent(ident);
  };

  useEffect(() => {
    activeFlights.sort(function(a: Flight, b: Flight) {
      if (a.departuretime < b.departuretime)
        return -1;
      else if (a.departuretime > b.departuretime) {
        return 1;
      }

      return 0;
    });

    setIsValidRoute(validateRoute(activeFlights))
    setAircraftUsage(calculateRouteUsage(activeFlights));
  }, [activeFlights]);

  useEffect(() => {
    api.get(`/aircrafts?limit=10&offset=0`).then((response:AircraftResponse) => {
      setAircrafts(response.data.data);
      setIsAircraftLoading(false);
    });
  }, []);

  return (
    <AircraftContext.Provider value={{
      aircrafts: aircrafts,
      isAircraftLoading,
      selectAircraft,
      currentAircraftIdent,
      isValidRoute,
      aircraftUsage
    }}>
      {children}
    </AircraftContext.Provider>
  )
}
