[![Build Status](https://travis-ci.org/hisptz/idashboard.svg?branch=2.1)](https://travis-ci.org/hisptz/idashboard) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![dependencies Status](https://david-dm.org/hisptz/idashboard/status.svg)](https://david-dm.org/hisptz/idashboard)
[![devDependencies Status](https://david-dm.org/hisptz/idashboard/dev-status.svg)](https://david-dm.org/hisptz/idashboard?type=dev)

# Interactive dashboard 2.1

Interactive dashboard App for DHIS2 with simple design and improved performance

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4

## Setup

Run `npm run setup` to install all required dependencies for the app

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.

This command will require proxy-config.json file available in the root of your source code, usually this file has this format

```
{
  "/api": {
    "target": "https://play.dhis2.org/2.29/",
    "target1": "http://localhost:8081",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  },
  "/": {
    "target": "https://play.dhis2.org/2.29/",
    "target1": "http://localhost:8081",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  }
}

```
We have provided `proxy-config.example.json` file as an example, make a copy and rename to `proxy-config.json`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/`, this will included a zip file ready for deploying to any DHIS2 instance.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
