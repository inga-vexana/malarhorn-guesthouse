# Malarhorn Guesthouse

Next.js website for Malarhorn Guesthouse in Drangsnes, Iceland. The app includes bilingual content, accommodation and guest information pages, a contact form, and a Bookvisit availability search endpoint.

## Requirements

- Node.js 20 or newer
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Live Bookvisit availability requires an API key. Create a local `.env.local` file:

```bash
BOOKVISIT_API_KEY=your_api_key_here
BOOKVISIT_CHANNEL_ID=5780d487-02bc-4988-8121-30c65f421168
```

`BOOKVISIT_CHANNEL_ID` is optional. If it is not set, the app uses the Malarhorn channel ID already configured in `app/api/bookvisit/search/route.ts`.

When `BOOKVISIT_API_KEY` is missing, the booking search still builds a Bookvisit checkout URL, but it does not show live room availability.

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Builds the production app.

```bash
npm start
```

Runs the production build on `127.0.0.1:3000`.

```bash
npm run lint
```

Runs the Next.js lint command.

## Project Structure

- `app/page.tsx` - main client-side website, page navigation, booking panel, and content sections.
- `app/api/bookvisit/search/route.ts` - server route for Bookvisit availability lookup.
- `app/globals.css` - global styles.
- `app/layout.tsx` - root layout and metadata.
- `malarhorn-home.png` and `malarhorn-mobile.png` - reference screenshots.

## Deployment

The project is suitable for Vercel or any host that supports Next.js App Router.

Before deploying, configure these environment variables in the hosting platform:

- `BOOKVISIT_API_KEY`
- `BOOKVISIT_CHANNEL_ID` if overriding the default channel ID

Then build with:

```bash
npm run build
```
