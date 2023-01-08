# Frontend part for Rock, Scissors, Paper online game.

[![deploy](https://github.com/malafeev01/rsp-frontend/actions/workflows/main.yml/badge.svg)](https://github.com/malafeev01/rsp-frontend/actions/workflows/main.yml)

Project stack:
 - [React](https://github.com/facebook/create-react-app) with TypeScript.
 - Standard React tools for testing(it's Jest under the hood).
 - Prettier for code style.

## Available commands

In the project directory, you can run:

### `npm start` or `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run prod`

Runs the app in the production mode.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run format`

Launches the prettier formatter for all the project files

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run build-dev`

Build development version of the app

### What is difference between development and production verions ?
There is only one difference between these two version - different addresses on WebSocket server.

