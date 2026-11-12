# Passbild-Regel-Check (MCP-Server)

Remote-MCP-Server, der für Deutschland beantwortet: Darf ich mein Foto für Personalausweis, Reisepass, Führerschein, Bewerbung oder Visum selbst machen? Mit Begründung, nächsten Schritten, Geltungsdatum und Quellen.

- Registry-Name: `de.profilfoto-ki/passbild-regel-check`
- Website: https://www.profilfoto-ki.de
- Entwickler: Profilfoto-KI (Safak Tepecik)
- Lizenz: MIT
- Transport: Streamable HTTP, JSON-RPC 2.0 auf `POST /mcp`; `GET /health`; Protokollversionen 2025-03-26, 2025-06-18, 2025-11-25

## Status

**Öffentliche Preview (kostenlos, Netlify Function, gleicher Code):** `https://passbild-regel-check-mcp.netlify.app/mcp` – am 12.11.2026 per curl geprüft (health, initialize, tools/list, tools/call positiv und negativ). Adapter: `netlify/functions/mcp.ts`.

Version 0.1.0, gebaut und getestet am 12.11.2026, Regeln Stand 12.11.2026. Nur Deutschland (`land`: `DE`); andere Länder werden mit einer klaren Fehlermeldung abgelehnt. Lokal mit `wrangler dev` geprüft. **Noch kein Production-Deploy**; die URL in `server.json` (`https://passbild-mcp.profilfoto-ki.de/mcp`) ist ein Vorschlag. Der bestehende Server auf mcp.profilfoto-ki.de bleibt unverändert.

## Wichtig: kein amtliches Passbild

Ein selbst erstelltes, bearbeitetes oder KI-generiertes Porträt ist kein amtliches Passbild und kann für Personalausweis und Reisepass nicht verwendet werden. Jede Tool-Antwort sagt das im Feld `kein_amtliches_passbild`.

## Tools

| Tool | Zweck |
|---|---|
| `check_passbild_regeln` | Eingabe `zweck` (`ausweis`, `reisepass`, `fuehrerschein`, `bewerbung`, `visum`), optional `land` (Vorgabe `DE`). Ausgabe: `selbstfoto_erlaubt` (ja/nein/bedingt), `begruendung`, `was_zu_tun_ist`, `geltungsdatum`, `wichtige_unterscheidung`, `kein_amtliches_passbild`, `quellen`, `stand`. |
| `get_passbild_regeln` | Die ganze Regel-Tabelle als strukturierte Daten mit Quellen und Stand-Datum. |

## Regel-Matrix (Stand 12.11.2026)

| Zweck | Selbstfoto | Kern |
|---|---|---|
| Personalausweis | nein | Seit 01.05.2025 nur digitale Lichtbilder aus der Behörde (z. B. PointID, 6 €) oder von registrierten Fotodienstleistern per Cloud. Selbstgemachte Fotos, Fotokabinen, Foto-Apps nicht mehr erlaubt. Übergang für Papierbilder in Ausnahmefällen bis 31.07.2025. |
| Reisepass | nein | wie Personalausweis |
| Führerschein | bedingt | Nicht von der Digitalpflicht betroffen; Papierbilder weiter möglich. Ob ein Selbstfoto angenommen wird, entscheidet die Fahrerlaubnisbehörde nach ihren Fotoanforderungen. |
| Bewerbung | ja | Keine amtliche Fotovorgabe; Papier-Passbilder weiter nutzbar (rbb24). |
| Visum | bedingt | Visa nicht auf der Liste der Digitalpflicht; die Auslandsvertretung legt Anforderungen fest (Beispiel Bangkok: biometrisch, max. 6 Monate alt, keine Bearbeitung/Filter). |

## Quellen (live geprüft am 12.11.2026)

- Bundesdruckerei: https://www.bundesdruckerei.de/de/newsroom/news/aktuelles-pointid-aufnahmesysteme-fuer-biometrische-lichtbilder-bereit
- Bundesdruckerei-FAQ Digitales Lichtbild (Stand 22.10.2024, v1.7): https://daten.verwaltungsportal.de/dateien/news/1/0/3/9/0/5/1/FAQ_Digitales_Lichtbild.pdf
- Stadt Überlingen (14.04.2025): https://www.ueberlingen.de/digitale-lichtbilder-ab-1-mai-2025
- Stadt Köln (29.04.2025): https://www.stadt-koeln.de/politik-und-verwaltung/presse/mitteilungen/27532/index.html
- rbb24 (22.04.2025): https://www.rbb24.de/panorama/beitrag/2025/04/passbilder-digital-behoerden-berlin-brandenburg.html
- tagesschau.de (22.04.2025): https://www.tagesschau.de/inland/innenpolitik/personalausweis-reisepass-passbild-fotos-digital-buergeramt-faeser-100.html
- Deutsche Botschaft Bangkok (30.01.2026): https://bangkok.diplo.de/th-de/service/05-visa-und-einreise/2754314-2754314
- Fotografensuche: https://alfo-passbild.com/fotograf-in-der-naehe/

## Scope und keine Rechtsberatung

Gibt hinterlegte, datierte Regeln wieder. Prüft kein Foto, ruft keine Website ab, scrapt nichts, speichert nichts. Keine Rechtsberatung; maßgeblich ist die zuständige Behörde. Geloggt werden nur Tool-Name, Erfolg und Dauer.

## Lokal starten und testen

```bash
npm install
npm run typecheck
npm test
npm run secret-scan
npm run dev            # wrangler dev auf http://127.0.0.1:8792, ohne Cloudflare-Login
bash scripts/smoke.sh  # zweites Terminal: health, initialize, tools/list, tools/call positiv und negativ
```

## Production (offen)

Braucht einen gültigen Cloudflare-Login auf der Box und Safaks OK für eine neue Subdomain. Danach `npx wrangler deploy`, Custom Domain, `scripts/smoke.sh https://…`, dann Registry-Eintrag.
