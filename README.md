# TaskManagement

This project is a task management application built with Angular. It allows users to create, update, and manage tasks. Each task has a name, description, and status. The application uses Angular for the frontend, TypeScript as the primary programming language, and npm for package management.

During development, backend requests are proxied via a configuration file named `proxy.conf.json`. This allows the frontend application to make requests to the backend server without running into CORS (Cross-Origin Resource Sharing) issues. Any requests that start with `/api` in the application will be redirected to the target specified in `proxy.conf.json`.
## Languages and Tools Used

- TypeScript
- Angular
- npm

## Getting Started

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install all the dependencies.
4. Run `ng serve` for a development server. Navigate to `http://localhost:4300/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


