# Aircraft Scheduling

Tool for creating a schedule of flights for aircrafts.
Open [https://diegoprestes-aircraft-scheduling.vercel.app/](https://diegoprestes-aircraft-scheduling.vercel.app/) to access the tool.

The idea is to get a list of aircraft, choose one and the prepare a route for the next for it.

The user will click in the flights and them the list in the middle will be created showing the route in the order of the flights by time. Above the list will be displayed the percentage of usage of that aircraft in the day and if the route is valid or not.

In the bottom of the page there is a timeline from 0h to 24h where for each added flight will be included the information of the amount of time used for the flight plus the turnaround time after the flight.

Regarding the route validation, what is being considered here is that one flight can only start after the previous one has already finished and the turnaround time passed as well. Another validation that is done is regarding the airports, the next flight can only happen if it starts from an airport that was the arrival airport of the previous flight.

The idea of adding the validation of a route in the screen is to allow the user to play by adding and removing any flight to the route, without having any blocks in terms of selecting a flight.

## Requirements
- Node 14+
- Yarn

## Install
To install the dependencies run in the project directory:
```
yarn
```

## Run in development mode
To start the project in dev mode run in the project directory:
```
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Tests
To launch the test runner run:
```
yarn test
```

## Build
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
```
yarn build
```

## Browser and Devices Supported
The app was tested in the following browsers/devices:
Browsers:
- Chrome v88 (Windows and MacOS)
- Firefox v86 (MacOS)
- Edge v88 (Windows)
- Safari v14 (MacOS)

Mobile:
- iPhone X (iOS14)
- iPad Air (iOS14)
- Moto G7+ (Android 10)

## What's next
There are some features that were ignored for now, or because there were no need for what was requested, or to keep it simple and don't spend too much time during the test, but it can be implemented in the future.
- Styles were used with plain CSS, but considering the project might increase I would think of using `Sass` or `styled-components`.
- The test had only one page so there was no need to include any routing for now.
- Would be interesting to include a i18n library for multi-language like `react-i18next`.
- As we do some API calls we can have a better error handling maybe showing a modal or something similar to inform about errors, instead of only give logs.
- The wireframe was only desktop, I tried to adapt it for mobile, and I feel it was not the best experience for the user, this could certainly be improved as well in the future.
