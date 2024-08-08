
# News Aggregator

This is a React-based news aggregator application powered by Vite. The application fetches news articles from an external API and displays them in a user-friendly interface.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 22 or above)
- npm (version 8 or above)
- Docker (optional, if you wish to run the application in a Docker container)

## Setting Up the Project

### 1. Install Dependencies

Install the project dependencies by running:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root of your project by copying the sample file and updating the variables with your own values:

```bash
cp .env.sample .env
```

Edit the `.env` file with your API key and any other necessary values:

```
VITE_NEWS_API_DOMAIN=https://newsapi.org/v2
VITE_NEWS_API_KEY=your-api-key-here
VITE_DEFAULT_COUNTRY=us
```

### 4. Run the Application

Start the development server by running:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This will create a `dist` directory with the optimized build.

To preview the production build locally:

```bash
npm run serve
```

## Running the Application with Docker

### 1. Build the Docker Image

Build the Docker image for your application by running:

```bash
docker build -t news-aggregator .
```

### 2. Run the Docker Container

Run the Docker container:

```bash
docker run -p 3000:3000 news-aggregator
```

The application will be available at `http://localhost:3000`.

## Linting and Formatting

- To lint the project files:

  ```bash
  npm run lint
  ```

- To fix linting errors:

  ```bash
  npm run lint:fix
  ```

- To format the codebase:

  ```bash
  npm run format
  ```

## Technologies Used

- **React** - A JavaScript library for building user interfaces
- **Vite** - A build tool that provides a fast development environment
- **Redux Toolkit** - A state management tool for managing application state
- **Material-UI (MUI)** - A popular React UI framework
- **Axios** - A promise-based HTTP client for making API requests
- **Docker** - A platform to containerize applications
