import { Flight } from "../contexts/FlightContext";
import { hourInSeconds } from "./DateUtils";

const turnaroundTime = hourInSeconds(0.33); // 20 minutes

export const validateRoute = (route: Flight[]) => {
  let previousArrivalTime: number = 0;
  let previousDestination: string = '';

  for (let i = 0; i < route.length; i++) {
    let flight = route[i];

    if (i > 0) {
      if (flight.departuretime < previousArrivalTime + turnaroundTime || flight.origin !== previousDestination) {
        return false;
      }
    }

    previousArrivalTime = flight.arrivaltime;
    previousDestination = flight.destination;
  }

  return true;
}

export const calculateRouteUsage = (route: Flight[]) => {
  const oneDay = hourInSeconds(24);

  let flightTime = 0;
  route.forEach(flight => {
    flightTime += (flight.arrivaltime - flight.departuretime) + turnaroundTime;
  });

  return Number((flightTime * 100 / oneDay).toFixed(1));
}
