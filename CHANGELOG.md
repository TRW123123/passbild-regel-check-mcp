# Changelog

## 0.1.0 – 2026-11-12
- Erste Version: Tools `check_passbild_regeln` und `get_passbild_regeln` (nur DE).
- Regeln live geprüft am 12.11.2026 (Bundesdruckerei, Städte Überlingen und Köln, rbb24, tagesschau.de, Deutsche Botschaft Bangkok).
- Streamable-HTTP-JSON-RPC nach dem Muster von car-listing-check (CORS, Rate-Limit, Body-Limit, Notifications).
- Vitest-Tests für Regel-Matrix, Schema und Worker; lokaler Wrangler-Smoke.
- Netlify-Function-Adapter und öffentliche Preview unter https://passbild-regel-check-mcp.netlify.app/mcp (kostenloser Plan).
