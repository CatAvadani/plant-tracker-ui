# Plant Tracker UI

Plant Tracker UI is a polished Next.js frontend for managing a personal plant collection. It connects to a .NET Web API with JWT authentication and API-key-protected plant CRUD endpoints.

## Features

- Public landing page with clear registration and login paths
- Login and registration flows with form validation
- Authenticated dashboard shell with desktop sidebar, mobile navigation, user menu, and logout
- Plant dashboard with collection stats, loading skeletons, empty states, and responsive plant cards
- Add and edit plant form with validation, watering frequency slider, health status control, and notes
- Plant actions for watering, editing, and deleting
- Settings page for profile display and API key generation/copying
- Dark mode-ready styling with Tailwind `dark:` classes

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui and Radix primitives
- Zustand for persisted auth state
- TanStack Query for server state
- React Hook Form and Zod for forms
- Axios for API calls
- Sonner for toast notifications

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Use the URL and port that your .NET API is running on.

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Backend Requirements

The frontend expects the backend to expose:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/apikey/generate`
- `GET /api/plants`
- `GET /api/plants/{id}`
- `POST /api/plants`
- `PUT /api/plants/{id}`
- `DELETE /api/plants/{id}`

Plant API calls send both:

- `Authorization: Bearer {token}`
- `X-Api-Key: {apiKey}`

After logging in, generate an API key from the Settings page before using the plant dashboard.

## Project Structure

```text
app/
  (auth)/login
  (auth)/register
  (dashboard)/dashboard
  (dashboard)/settings
components/
  auth/
  dashboard/
  plants/
  ui/
hooks/
  usePlants.ts
lib/
  api.ts
  authApi.ts
  plantApi.ts
  types.ts
  validators.ts
store/
  authStore.ts
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Verification

Before shipping changes, run:

```bash
npm run lint
npm run build
```
