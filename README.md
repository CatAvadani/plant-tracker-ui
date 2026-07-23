# Leaf Care UI

Leaf Care UI is a polished Next.js frontend for managing a personal plant collection. It connects to a .NET Web API with JWT authentication for plant CRUD, image upload, care logs, profile updates, and AI plant analysis.

The Android app is the primary maintained Leaf Care client. Privacy and account-deletion information must remain consistent across this web client, Android, the .NET API, Mastra, and Google Play.

## Features

- Public landing page with clear registration and login paths
- Login and registration flows with form validation
- Authenticated dashboard shell with desktop sidebar, mobile navigation, user menu, and logout
- Plant dashboard with collection stats, loading skeletons, empty states, and responsive plant cards
- Add and edit plant form with validation, watering frequency slider, health status control, and notes
- Plant actions for watering, editing, and deleting
- Plant image upload and card image display
- Settings page for editing display name while keeping email read-only
- Dark mode-ready styling with Tailwind `dark:` classes
- Legacy privacy and deletion routes that redirect to the canonical Leaf Care webpages

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

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Use the URL and port that your .NET API is running on. Restart the development server after changing `.env.local`.

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Backend Requirements

The frontend expects the backend to expose:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `PATCH /api/users/me`
- `GET /api/plants`
- `GET /api/plants/{id}`
- `POST /api/plants`
- `POST /api/plants/image`
- `PUT /api/plants/{id}`
- `DELETE /api/plants/{id}`

Authenticated API calls send this header internally:

- `Authorization: Bearer {token}`

Profile updates use `PATCH /api/users/me` with `displayName`; email is read-only in the UI.

The production backend also exposes password recovery and `DELETE /api/users/me` for password-confirmed permanent account deletion. The current web settings screen links users to the canonical external deletion instructions rather than implementing the Android confirmation flow.

Watering a plant is implemented as `PUT /api/plants/{id}` with `lastWatered` updated to today.

Image upload uses `POST /api/plants/image` with multipart form data and expects `{ "imageUrl": "..." }`. The backend needs Cloudinary credentials configured with `Cloudinary:CloudName`, `Cloudinary:ApiKey`, and `Cloudinary:ApiSecret` or matching `CLOUDINARY_*` environment variables.

## Privacy and Account Deletion

The canonical production pages are:

```text
https://catalinaavadani.com/leafcare/privacy/
https://catalinaavadani.com/leafcare/delete-account/
```

The local `/privacy` and `/delete-account` routes redirect to those pages. Update the Android policy, canonical website pages, Play Console Data Safety declarations, and redirect targets together whenever Leaf Care's providers or data practices change.

`LEAF_CARE_SERVICE_KEY`, OpenAI credentials, Cloudinary credentials, database credentials, and Azure Communication Services credentials belong only on server services. They must never be added to `NEXT_PUBLIC_*` variables or browser code.

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
