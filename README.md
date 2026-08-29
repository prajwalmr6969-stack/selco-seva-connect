# SELCO SevaConnect

A rural solar service platform concept for decentralized solar support, technician dispatch, and community energy infrastructure management.

## Features

- solar fault reporting workflow
- ticket tracking and progress updates
- technician dashboard
- coordinator dispatch views
- women technician program and application flow
- QR-based asset lookup and service history

## Run locally

```bash
npm install
npm run dev
```

## Run frontend + API together

```bash
npm run dev:full
```

This starts:
- Vite frontend on port 5173
- Express API on port 3001

## Production build

```bash
npm run build
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

## API endpoints

- `GET /api/health`
- `GET /api/dashboard`
- `GET /api/impact`

## Tech stack

- React
- Vite
- React Router
- Tailwind CSS
- Express

## License

MIT
