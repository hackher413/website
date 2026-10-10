# Hack(H)er413 website

Next.js site for [Hack(H)er413](https://hackher413.com): marketing pages plus the Applications MVP (auth, DB, apply/organizer flows).

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
| `npm run email:test -- you@email.com` | Resend smoke test via `sendEmail()` |
| `npm run email:test -- --preview confirmation` | Dump shared-chrome HTML (no Resend) |
| `npm run email:test -- --preview accepted --out /tmp/accepted.html` | Acceptance email + embedded Hive Admit |
| `npm run email:hive-admit` | Write Hive Admit ticket PNG to `/tmp/hive-admit.png` |
| `npm run email:test -- --template accepted you@email.com` | Send a decision/confirm template |

## Environment & Preview deploys

See **[docs/env.md](docs/env.md)** for local `.env.local`, Vercel Development / Preview / Production wiring (Neon, Clerk, Resend), and the Preview verification checklist.

## Platform helpers

- **Auth** (`src/lib/auth.ts`): `requireUser()`, `requireOrganizer()` (Clerk session wiring in `src/proxy.ts`)
- **Email** (`src/lib/email.ts`): `sendEmail({ to, subject, html })` via Resend
- **Email templates** (`src/lib/emails/`): shared chrome + confirmation / accepted / denied; acceptance includes Hive Admit ticket (`/api/emails/hive-admit`)
