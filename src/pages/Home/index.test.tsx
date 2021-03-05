import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '.';
import { FlightContext, FlightContextData } from '../../contexts/FlightContext';
import { AircraftContext, AircraftContextData } from '../../contexts/AircraftContext';

import aircrafts from '../../mock/aircrafts.json';
import flights from '../../mock/flights.json';

function renderHome(flightData: FlightContextData, aircraftData: AircraftContextData) {
  const {
    flights,
    isFlightsLoading,
    isFlightsLoadingMore,
    toggleActiveFlight,
    activeFlights,
    hasMorePages,
    loadNextPage
  } = flightData;

  const {
    aircrafts,
    isAircraftLoading,
    selectAircraft,
    currentAircraft,
    isValidRoute,
    aircraftUsage
  } = aircraftData;

  return render(
    <FlightContext.Provider value={{
      flights,
      isFlightsLoading,
      isFlightsLoadingMore,
      toggleActiveFlight,
      activeFlights,
      hasMorePages,
      loadNextPage
    }}>
      <AircraftContext.Provider value={{
        aircrafts,
        isAircraftLoading,
        selectAircraft,
        currentAircraft,
        isValidRoute,
        aircraftUsage
      }}>
        <Home />
      </AircraftContext.Provider>
    </FlightContext.Provider>
  )
}

test('loading state rendered', () => {
  const flightsData: FlightContextData = {
    flights: [],
    isFlightsLoading: true,
    isFlightsLoadingMore: false,
    toggleActiveFlight: () => false,
    activeFlights: [],
    hasMorePages: true,
    loadNextPage: () => false

  };
  const aircraftData: AircraftContextData = {
    aircrafts: [],
    isAircraftLoading: true,
    selectAircraft: () => false,
    currentAircraft: null,
    isValidRoute: true,
    aircraftUsage: 0
  };
  const {unmount} = renderHome(flightsData, aircraftData);

  const element = screen.getByText('Loading...');
  expect(element).toBeInTheDocument();
  unmount();
});

test('selected aircraft name is rendered', async () => {
  const flightsData: FlightContextData = {
    flights,
    isFlightsLoading: false,
    isFlightsLoadingMore: false,
    toggleActiveFlight: () => false,
    activeFlights: [],
    hasMorePages: true,
    loadNextPage: () => false

  };
  const aircraftData: AircraftContextData = {
    aircrafts,
    isAircraftLoading: false,
    selectAircraft: () => false,
    currentAircraft: aircrafts[0],
    isValidRoute: true,
    aircraftUsage: 0
  };
  const {unmount} = renderHome(flightsData, aircraftData);

  const element = screen.getByText('Rotation GABCD');
  expect(element).toBeInTheDocument();
  unmount();
});

test('that the route is valid', async () => {
  const flightsData: FlightContextData = {
    flights,
    isFlightsLoading: false,
    isFlightsLoadingMore: false,
    toggleActiveFlight: () => false,
    activeFlights: [flights[0]],
    hasMorePages: true,
    loadNextPage: () => false

  };
  const aircraftData: AircraftContextData = {
    aircrafts,
    isAircraftLoading: false,
    selectAircraft: () => false,
    currentAircraft: aircrafts[0],
    isValidRoute: true,
    aircraftUsage: 0
  };
  const {unmount} = renderHome(flightsData, aircraftData);

  const element = screen.getByText('Route is valid');
  expect(element).toBeInTheDocument();
  unmount();
});

test('that the route is invalid', async () => {
  const flightsData: FlightContextData = {
    flights,
    isFlightsLoading: false,
    isFlightsLoadingMore: false,
    toggleActiveFlight: () => false,
    activeFlights: [flights[0]],
    hasMorePages: true,
    loadNextPage: () => false

  };
  const aircraftData: AircraftContextData = {
    aircrafts,
    isAircraftLoading: false,
    selectAircraft: () => false,
    currentAircraft: aircrafts[0],
    isValidRoute: false,
    aircraftUsage: 0
  };
  const {unmount} = renderHome(flightsData, aircraftData);

  const element = screen.getByText('Route is invalid');
  expect(element).toBeInTheDocument();
  unmount();
});

test('load more button is visible', async () => {
  const flightsData: FlightContextData = {
    flights,
    isFlightsLoading: false,
    isFlightsLoadingMore: false,
    toggleActiveFlight: () => false,
    activeFlights: [flights[0]],
    hasMorePages: true,
    loadNextPage: () => false

  };
  const aircraftData: AircraftContextData = {
    aircrafts,
    isAircraftLoading: false,
    selectAircraft: () => false,
    currentAircraft: aircrafts[0],
    isValidRoute: true,
    aircraftUsage: 0
  };
  const {unmount} = renderHome(flightsData, aircraftData);

  const element = screen.getByText('Load more');
  expect(element).toBeInTheDocument();
  unmount();
});

test('load more button is in loading state', async () => {
  const flightsData: FlightContextData = {
    flights,
    isFlightsLoading: false,
    isFlightsLoadingMore: true,
    toggleActiveFlight: () => false,
    activeFlights: [flights[0]],
    hasMorePages: true,
    loadNextPage: () => false

  };
  const aircraftData: AircraftContextData = {
    aircrafts,
    isAircraftLoading: false,
    selectAircraft: () => false,
    currentAircraft: aircrafts[0],
    isValidRoute: true,
    aircraftUsage: 0
  };
  const {unmount} = renderHome(flightsData, aircraftData);

  const element = screen.getByText('Loading...');
  expect(element).toBeInTheDocument();
  unmount();
});

test('aircraft usage is displayed', async () => {
  const flightsData: FlightContextData = {
    flights,
    isFlightsLoading: false,
    isFlightsLoadingMore: true,
    toggleActiveFlight: () => false,
    activeFlights: [flights[0]],
    hasMorePages: true,
    loadNextPage: () => false

  };
  const aircraftData: AircraftContextData = {
    aircrafts,
    isAircraftLoading: false,
    selectAircraft: () => false,
    currentAircraft: aircrafts[0],
    isValidRoute: true,
    aircraftUsage: 10.8
  };
  const {unmount} = renderHome(flightsData, aircraftData);

  const element = screen.getByText('10.8%');
  expect(element).toBeInTheDocument();
  unmount();
});
