# Galactica

Galactica is a Next.js prototype for a data lake workbench. Its interface presents a data pipeline organized around the medallion architecture: data sources, Bronze ingestion, Silver transformations, Gold analytics, dashboards, and AI-assisted analysis.

> **Prototype status:** This repository is primarily a UI demo. Google sign-in and saving a user profile to Firestore are wired to Firebase. The AI actions call Gemini through Genkit, but use sample data embedded in the server actions. Most data-source connections, ingestion, transformations, tests, datasets, and dashboards are illustrative UI only; they do not connect to external systems or persist pipeline data.

## What’s included

- **Pipeline workbench:** Data Source, Ingestion (Bronze), Mapping, Testing, Silver, Gold, Dashboard, and ML & AI views.
- **Firebase sign-in:** Google popup authentication and a user profile document at `/users/{uid}` in Firestore.
- **Genkit AI examples:** Gemini-powered Silver data summarization and Gold data Q&A, using sample data in `src/app/actions.ts`.
- **Firestore rules:** `firestore.rules` restricts user profile access to the signed-in owner.

### Current limitations

- Connector statuses and connection forms are client-side demo state. Entered credentials are not used to establish connections.
- The ingestion button, transformation editor, and test controls do not process or store data.
- Silver, Gold, and dashboard examples are hard-coded sample content.
- The Gold Q&A tool is a placeholder, not a Firestore, BigQuery, or retrieval integration.
- There is no Cloud Functions, Storage-trigger, data catalog, or BI-tool integration in this repository yet.

## Requirements

- Node.js **18.18 or newer** (Node.js 20 LTS recommended)
- npm
- A Firebase project for Google sign-in and Firestore
- A Gemini API key to use the AI actions

## Installation

```bash
git clone https://github.com/roime81/galactica.git
cd galactica
npm ci
```

### Configure Firebase

The Firebase client configuration is in `src/firebase/config.ts`. For local development, replace its values with the Firebase web app configuration for your project. The configuration is used as a fallback when Firebase App Hosting does not provide Firebase initialization automatically.

In the Firebase console:

1. Enable **Google** under **Authentication → Sign-in method**.
2. Create a **Cloud Firestore** database.
3. Publish the rules in `firestore.rules` (Firebase console → **Firestore Database → Rules**). These rules currently cover only `/users/{uid}` profile documents; they do not grant access to data lake collections.
4. Add the app’s deployed hostname under **Authentication → Settings → Authorized domains** before using Google sign-in in production. `localhost` is typically already authorized for local development.

The Firebase web app configuration is client-side configuration, not a place for server credentials. Never put service-account keys or other private credentials in client code.

### Configure Gemini

Create a Gemini API key and put it in a local `.env` file at the project root:

```dotenv
GEMINI_API_KEY=your_gemini_api_key
```

The `.env*` pattern is ignored by Git. Keep this key private, and configure it as a server-side secret/environment variable in your deployment provider. Do not prefix it with `NEXT_PUBLIC_`.

The app can start without this key, but the AI summary and Q&A actions will fail until it is configured.

## Run locally

Start the Next.js application:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002).

To run the Genkit developer UI and load the AI flows, open a second terminal and run:

```bash
npm run genkit:dev
```

The Genkit CLI prints the URL for its developer UI (typically `http://localhost:4000`). For automatic flow reloads while editing, use `npm run genkit:watch` instead. These commands are useful for developing and inspecting flows; the app’s server actions invoke the flows directly.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Next.js in development mode on port `9002`. |
| `npm run build` | Create the production build. |
| `npm start` | Serve the production build (run `npm run build` first; defaults to port `3000`). |
| `npm run lint` | Run the configured Next.js lint command. |
| `npm run typecheck` | Run TypeScript without emitting files. |
| `npm run genkit:dev` | Start the Genkit developer UI and load AI flows. |
| `npm run genkit:watch` | Start Genkit with flow-file watching enabled. |

There is currently no automated test script in `package.json`. The Next.js configuration skips type and lint failures during production builds, so run `npm run typecheck` and `npm run lint` explicitly when validating changes.

## Production and deployment

For any Node.js-compatible Next.js host, use:

```bash
npm ci
npm run build
npm start
```

Configure the Gemini key as a server-side secret and make sure the Firebase client configuration points to the intended Firebase project. `apphosting.yaml` contains a Firebase App Hosting runtime setting (`maxInstances: 1`); to use Firebase App Hosting, create/configure an App Hosting backend for this repository in the Firebase console and provide the required runtime configuration there.

Before deploying, publish the Firestore rules, enable Google as an Authentication provider, and authorize the production hostname in Firebase Authentication. Review and replace the demo data and simulated controls before relying on the application for real data workflows.

## Project layout

```text
src/
  ai/                 Genkit setup and AI flows
  app/                Next.js routes and server actions
  components/         Pipeline screens and UI components
  firebase/           Firebase client setup, auth, and Firestore helpers
  hooks/              React hooks
docs/                 Design blueprint and backend schema notes
firestore.rules       Firestore user-profile access rules
apphosting.yaml       Firebase App Hosting runtime configuration
```
