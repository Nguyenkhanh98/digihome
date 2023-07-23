# Project Name

## Description

Digihome react-app

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

```
   git clone https://github.com/Nguyenkhanh98/digihome.git

```

2. Navigate to the project directory:

```
   cd main-app

```

3. Install dependencies:

```
   yarn install:all

```

## Usage

please check blueprint/example/js/eventBus for targetOrigin is react app domain

And config VITE_DESIGN_BOARD_URL in env for react_app for targetOrigin is bluperint app

1. Start the application:

```
   yarn start:all

```

2. Open your web browser and visit [http://localhost:5173](http://localhost:5173) to see the app.
   And visit [http://localhost:3003](http://localhost:3003) to see the blueprin app

3. Or using docker-compose

From root of 'FRONTEND'

```
   docker-compose up --build

```

## Project Structure

The project follows a standard NestJS project structure with directories organized for controllers, services, modules, and other components.

- `src`: Contains the main source code of the NestJS application.
- `component`: View
- `container`: Biz logic
- `operations`: Operation (command, query)
- `caches`: Cache CQR (read, write)
- `services`: Include internal and external services.
- `hooks`: Custom hook
- `routes`: Router of application
- `configs`: Contains configuration files, such as environment variables.

## Features

## Technologies Used
