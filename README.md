# Hack(H)er413 website

Next.js site for [Hack(H)er413](https://hackher413.com) — marketing pages plus the Applications MVP (auth, DB, apply/organizer flows).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill secrets from the vault
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local Next.js |
| `npm run build` / `start` | Production build |
| `npm run lint` | ESLint |
| `npm run db:generate` | Drizzle: schema → SQL migration |
| `npm run db:migrate` | Apply migrations to Neon |
| `npm run db:studio` | Drizzle Studio |

## Environment & Preview deploys

See **[docs/env.md](docs/env.md)** for local `.env.local`, Vercel Development / Preview / Production wiring (Neon, Clerk, Resend), and the Preview verification checklist.

## Auth helpers

Server-side gates for other feature slices:

- `requireUser()` — signed-in Clerk user (else redirect to sign-in)
- `requireOrganizer()` — `publicMetadata.role` is `organizer` or `admin` (else 403)

Defined in `src/lib/auth.ts`. Clerk session wiring lives in `src/proxy.ts` (Next.js 16 proxy).
