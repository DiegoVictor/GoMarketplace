# GoMarketplace
[![Travis (.org)](https://img.shields.io/travis/DiegoVictor/GoMarketplace?logo=travis&style=flat-square)](https://travis-ci.org/DiegoVictor/GoMarketplace)
[![react-native](https://img.shields.io/badge/react--native-0.62.2-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![styled-components](https://img.shields.io/badge/styled_components-5.1.0-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-6.8.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-24.9.0-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/GoMarketplace?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/GoMarketplace)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/DiegoVictor/GoMarketplace/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>
This app allow everyone to see all products, add it to the cart, increment and decrement the cart's items quantity and to see the cart's total price. All the resources used by this application comes from its fake [API](#api).

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
  * [Configuring](#configuring)
    * [.env](#env)
    * [API](#api)
* [Usage](#usage)
  * [OS](#os)
* [Running the tests](#running-the-tests)
  * [Coverage report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/GoMarketplace/master/screenshots/dashboard.jpg" width="49%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/GoMarketplace/master/screenshots/cart.jpg" width="49%" />

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
Configure your environment variables and remember to start the [API](#api) before to start this app.

### .env
In this file you may configure the API's url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

key|description|default
---|---|---
API_URL|API's url.|`http://localhost:3333`

### API
Start the [fake API](https://github.com/typicode/json-server):
```
$ npx json-server server.json -p 3333
```
Or simply:
```
$ yarn json-server server.json -p 3333
```
In case of any change in the API's port or host remember to update the `.env`'s `API_URL` property too.
> Also, maybe you need run reverse command to the API's port: `adb reverse tcp:3333 tcp:3333`

# Usage
The first build must be through USB connection, so connect your device (or just open your emulator) and run:
```
$ yarn android
```
> For iOS use `ios` instead of `android`

In the next times you can just start the Metro Bundler server:
```
$ yarn start
```
Or:
```
$ npm run start
```
> See for more information in [Running On Device](https://reactnative.dev/docs/running-on-device).

## OS
This app was tested only with Android through USB connection and [Genymotion](https://www.genymotion.com/) (Emulator), is strongly recommended to use the same operational system, but of course you can use an emulator or a real device connected through wifi or USB.

# Running the tests
[Jest](https://jestjs.io/) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.
