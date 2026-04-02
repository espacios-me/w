# Guild BotSpace agent payloads

This folder contains the BotSpace → Guild lead import payload pack for the assigned agent routes.

## Endpoint

`POST https://app.guild-realestate.com/backend/api/webhook/lead-import-webhook`

## Headers

- `x-api-key: YOUR_EXTERNAL_LEAD_IMPORT_API_KEY`
- `Content-Type: application/json`

## Included agents

- `8` → Liz Gapunuan
- `15` → Umar Mirza
- `20` → Michael Keogh
- `21` → unknown in current export
- `23` → Tang Jie
- `25` → Khari King
- `29` → Ahmed Dahir
- `30` → Benjamin Abudiore
- `31` → Dave Chaggar
- `36` → Tamer Shabana
- `37` → Nareen Alharbi

See `botspace-guild-agent-payloads.json` for the ready-to-use payload bodies.
