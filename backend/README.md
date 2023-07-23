# NestJS App

## Description

Digi Home backend API

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Version

Node 18.16.0

## Installation

1. Clone the repository:
   ` git clone https://github.com/Nguyenkhanh98/digihome.git`
2. Navigate to the project directory:
   ` cd backend`
3. Install dependencies:
   ` yarn install`
4. Migration:
   ` yarn migration:run`

## Usage

1. Start the application in development mode:
   `yarn start:dev`
2. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to see the app.

3. Or using docker-compose

```
   docker-compose up --build
```

## Project Structure

The project follows a standard NestJS project structure with directories organized for controllers, services, modules, and other components.

- `src`: Contains the main source code of the NestJS application.
- `controllers`: Contains the API controllers that handle incoming requests.
- `services`: Contains the business logic and interacts with data sources.
- `modules`: Contains the application modules that encapsulate related functionality.
- `middlewares`: Contains custom middleware functions.
- `dto`: Contains Data Transfer Objects used for validation and data transformation.
- `entities`: Contains the TypeORM entities for database interactions.
- `config`: Contains configuration files, such as environment variables.
- `main.ts`: The entry point of the application.

## Technologies Used

- [NestJS](https://nestjs.com/): A powerful Node.js framework for building server-side applications.
- [TypeScript](https://www.typescriptlang.org/): A superset of JavaScript that adds static typing to the language.
- [TypeORM](https://typeorm.io/): An Object-Relational Mapping library for database interactions.
- [Swagger](https://swagger.io/): Used for automatic API documentation.

## Features

## API Documentation

The API endpoints are automatically documented using Swagger. Once the application is running in development mode, you can access the API documentation at [http://localhost:3000/api](http://localhost:3000/docs).
