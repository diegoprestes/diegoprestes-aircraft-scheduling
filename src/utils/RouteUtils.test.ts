import { validateRoute, calculateRouteUsage } from './RouteUtils';

import routeIsValid from '../mock/tests/routeIsValid.json';
import routeInvalidFlightTimes from '../mock/tests/routeInvalidFlightTimes.json';
import routeAircraftTeleporting from '../mock/tests/routeAircraftTeleporting.json';
import aircraftPercentageUsage from '../mock/tests/aircraftPercentageUsage.json';

test('route is valid', () => {
  const isValid = validateRoute(routeIsValid);

  expect(isValid).toBe(true);
});

test('route has invalid flight times', () => {
  const isValid = validateRoute(routeInvalidFlightTimes);

  expect(isValid).toBe(false);
});

test('route has aircraft teleporting', () => {
  const isValid = validateRoute(routeAircraftTeleporting);

  expect(isValid).toBe(false);
});

test('aircraft percentage of use during day', () => {
  const routeUsage = calculateRouteUsage(aircraftPercentageUsage);

  expect(routeUsage).toBe(30.2);
});
