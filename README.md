# SELCO SevaConnect

SELCO SevaConnect is a rural solar service and field operations platform designed for decentralized solar maintenance, technician dispatch, and community energy access. The project simulates a real operational flow for solar issue reporting, SLA tracking, QR-based asset management, and training pipelines for women technicians.

## Live Demo

- GitHub Pages: https://prajwalmr6969-stack.github.io/selco-seva-connect
- GitHub Repository: https://github.com/prajwalmr6969-stack/selco-seva-connect

## Features

- Solar fault reporting workflow with issue categorization and urgency tracking
- Ticket lifecycle management and dispatch tracking
- Technician dashboard for assignment and resolution workflows
- Coordinator dashboard for cluster-level service visibility
- Women technician program and application pipeline
- QR lookup for solar asset health and maintenance history
- Responsive UI built for rural service operations

## Tech Stack

- React 18
- Vite 5
- React Router DOM
- Tailwind CSS
- Express.js
- GitHub Pages deployment

## Local Development

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Start the backend API:

```bash
npm run server
```

Start both together:

```bash
npm run dev:full
```

This starts:
- Frontend on port 5173
- API on port 3001 by default

## Production Build

```bash
npm run build
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

For automatic deployment, set the repository's Pages source to **GitHub Actions**. Every push to `main` then builds and publishes the `dist` folder using `.github/workflows/deploy.yml`.

## Environment Setup

Copy the sample env file:

```bash
cp .env.example .env
```

Example values:

```env
PORT=3001
NODE_ENV=development
CLIENT_ORIGIN=*
```

## API Endpoints

- `GET /api/health`
- `GET /api/dashboard`
- `GET /api/impact`
- `GET /api/meta`

## Project Notes

This version is structured to support a real backend upgrade path while keeping the frontend deployable as a static GitHub Pages demo. It is suitable for further expansion into a production full-stack rollout with a database, authentication, and real dispatch APIs.

## License

MIT
