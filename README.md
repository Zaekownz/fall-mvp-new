
# Fal Site MVP (Updated)

## Quick Start
```bash
pnpm i
cp .env.example .env
pnpm prisma:migrate   # requires a Postgres DATABASE_URL
pnpm dev
```

Routes:
- `/` landing
- `/pricing` credit demo
- `/uploads/new` 3 photos + 2 questions
- `/api/fal` create/list with daily limit + ETA
- `/admin/fal/pending` admin comment UI
