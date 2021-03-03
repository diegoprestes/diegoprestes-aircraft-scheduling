import { createContext, ReactNode, useEffect, useState } from 'react';
import api, { Pagination } from '../services/api';

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
  currentAircraftIdent: string
}

interface AircraftProviderProps {
  children: ReactNode;
}

export const AircraftContext = createContext({} as AircraftContextData);

export function AircraftProvider({ children }: AircraftProviderProps) {
  // TODO: request to api
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [isAircraftLoading, setIsAircraftLoading] = useState(true);
  const [currentAircraftIdent, setCurrentAircraftIdent] = useState('');

  const selectAircraft = (ident: string) => {
    setCurrentAircraftIdent(ident);
  };

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
      currentAircraftIdent
    }}>
      {children}
    </AircraftContext.Provider>
  )
}
