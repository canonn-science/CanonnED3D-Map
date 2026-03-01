# CanonnED3D Map — Data Sources

This document maps each navigation menu option to its underlying data source(s).

---

## API Endpoints Reference

| Short Name | Base URL |
|---|---|
| **Canonn API** | `https://api.canonn.tech` |
| **Canonn Cloud Functions** | `https://us-central1-canonn-api-236217.cloudfunctions.net` |
| **Canonn Google Storage** | `https://storage.googleapis.com/canonn-downloads` |
| **EliteBGS API** | `https://elitebgs.app/api/ebgs/v5` |
| **DCOH Watch API** | `https://dcoh.watch/api/v1` |
| **EDSM API** | `https://www.edsm.net/api-v1` |
| **Canonn Signals** | `https://canonn-science.github.io/canonn-signals` |
| **Local CSV Cache** | `Source/data/csvCache/` |

---

## Guardians

### Brain Trees
- **Page:** `codex.html?hud_category=Biology&sub_class=Brain%20Tree`
- **MapData:** `MapData-BT.js`, `MapData-Codex.js`
- **Data Sources:**
  - Canonn API → `/btsites` (paginated, limit 1000)
  - Canonn Cloud Functions → `/query/codex` (Odyssey Codex entries)

### Guardian Beacons
- **Page:** `codex.html?hud_category=Guardian&english_name=Guardian%20Beacon`
- **MapData:** `MapData-GB.js`, `MapData-Codex.js`
- **Data Sources:**
  - Canonn API → `/gbsites`
  - Canonn Cloud Functions → `/query/codex`

### Guardian Ruins
- **Page:** `gr-data.html`
- **MapData:** `MapData-GR.js`
- **Data Sources:**
  - Canonn API → `/grsites`
  - Canonn Cloud Functions → `/query/get_gr_data`

### Guardians Combo Map
- **Page:** `guardians-combo.html`
- **MapData:** `MapData-Guardians.js`
- **Data Sources:**
  - Canonn API → `/gbsites`, `/grsites`
  - Canonn Cloud Functions → `/query/get_gr_data`

### Aliens Combo Map
- **Page:** `aliens-combo.html`
- **MapData:** `MapData-Aliens.js`
- **Data Sources:**
  - Canonn API → `/gbsites`, `/grsites`, `/tbsites`, `/tssites`, `/btsites`
  - Canonn Cloud Functions → `/query/get_gr_data`

---

## Thargoids

### Thargoid Barnacles
- **Page:** `codex.html?hud_category=Thargoid&…Barnacle`
- **MapData:** `MapData-TB.js`, `MapData-Codex.js`
- **Data Sources:**
  - Canonn API → `/tbsites`
  - Canonn Cloud Functions → `/query/codex`

### Thargoid Structures
- **Page:** `ts-data.html`
- **MapData:** `MapData-TS.js`
- **Data Sources:**
  - Canonn API → `/tssites`

### Hyperdictions
- **Page:** `hyperdiction_data.html`
- **MapData:** `MapData-Hyperdiction.js`
- **Data Sources:**
  - Canonn Google Storage → `/dumpr/hyperdictions.json`

### Non-Human Signal Sources (NHSS)
- **Page:** `nhss-data.html`
- **MapData:** `MapData-NHSS.js`
- **Data Sources:**
  - Canonn Cloud Functions → `/query/thargoid/nhss`

### Thargoid Link Messages — 3305 Survey
- **Page:** `ts-msg_3305survey.html`
- **MapData:** `MapData-TSmsg_3305survey.js`
- **Data Sources:**
  - Canonn API → `/tssites` (static survey data)
  - EDSM API → `/api-v1/` (system coordinate lookups)

### Thargoids Combo Map
- **Page:** `thargoids-combo.html`
- **MapData:** `MapData-Thargoids.js`
- **Data Sources:**
  - Canonn API → `/tbsites`, `/tssites`

---

## Cartographics

### Generation Ships
- **Page:** `gen-data.html`
- **MapData:** `MapData-GEN.js`
- **Data Sources:**
  - Canonn API → `/gensites`

### Lagrange Clouds
- **Page:** `cloud_data.html`
- **MapData:** `MapData-Cloud.js`
- **Data Sources:**
  - Canonn Google Storage → `/clouds.json`

### Permit Locked Regions
- **Page:** `permit-data.html`
- **MapData:** `MapData-Permit.js`
- **Data Sources:**
  - Hardcoded static data (no external API)

### Canonn Challenge Route
- **Page:** `canonn-challenge.html`
- **MapData:** `MapData-Challenge.js`
- **Data Sources:**
  - Local CSV Cache → `data/csvCache/expedition.csv`

### Gnosis Route Map
- **Page:** `gnosis_data.html`
- **MapData:** `MapData-Gnosis.js`
- **Data Sources:**
  - Local JSON Cache → `data/csvCache/gnosis.json`

### Adamastor Route
- **Page:** `route_adamastor.html`
- **MapData:** `MapData-Adamastor.js`
- **Data Sources:**
  - Canonn API → `/gensites` (generation ship data)
  - Local CSV Cache → `data/csvCache/adamastor.csv`, `data/csvCache/hesperus.csv`

### Prison Network
- **Page:** `prison_data.html`
- **MapData:** `MapData-Prisons.js`
- **Data Sources:**
  - Hardcoded static data (no external API)

### Unknown Interstellar Anomaly (UIA)
- **Page:** `route_uia.html`
- **MapData:** `MapData-UIA.js`
- **Data Sources:**
  - Canonn Cloud Functions → `/query`
  - EDSM API → `/api-v1/` (system coordinate lookups)

### Listening Posts
- **Page:** `listening_posts.html`
- **MapData:** `MapData-LP.js`
- **Data Sources:**
  - Canonn API → listening posts collection
  - Local CSV Cache → `data/csvCache/`

### Route Planner
- **Page:** `route_data.html`
- **MapData:** `MapData-Route.js`
- **Data Sources:**
  - Canonn Cloud Functions → `/get_codex_route`
  - Canonn Cloud Functions → `/get_gmp_route`

### Cartographics Combo Map
- **Page:** `cartographics-combo.html`
- **MapData:** `MapData-Cartographics.js`
- **Data Sources:**
  - Canonn API → `/gensites`
  - Local CSV Cache → `data/csvCache/col70.csv`

---

## Canonn Faction

### Canonn — States
- **Page:** `faction_data.html?homeSystem=Varati&faction=Canonn`
- **MapData:** `MapData-Faction.js`
- **Data Sources:**
  - EliteBGS API → `/factions` (faction name/state history)
  - Canonn Cloud Functions → `/query/get_compres` (compression/aggregation)

### Canonn — Resources
- **Page:** `faction_res_data.html?homeSystem=Varati&faction=Canonn`
- **MapData:** `MapData-FactionRes.js`
- **Data Sources:**
  - EliteBGS API → `/factions`
  - Canonn Cloud Functions → `/query/get_compres`

### Canonn Deep Space Research — States
- **Page:** `faction_data.html?homeSystem=Canonnia&faction=Canonn%20Deep%20Space%20Research`
- **MapData:** `MapData-Faction.js` (same file, different query params)
- **Data Sources:**
  - EliteBGS API → `/factions`
  - Canonn Cloud Functions → `/query/get_compres`

### Canonn Deep Space Research — Resources
- **Page:** `faction_res_data.html?homeSystem=Canonnia&faction=Canonn%20Deep%20Space%20Research`
- **MapData:** `MapData-FactionRes.js`
- **Data Sources:**
  - EliteBGS API → `/factions`
  - Canonn Cloud Functions → `/query/get_compres`

### Colonisation Data
- **Page:** `colonisation_data.html`
- **MapData:** `MapData-Colonisation.js`
- **Data Sources:**
  - EliteBGS API → `/factions`
  - Canonn Cloud Functions → `/query/get_compres`

---

## Biology

All Biology pages use `codex.html` with query parameters to filter by category.

### Horizons Biology

| Menu Item | URL Filter | MapData | API / Collection |
|---|---|---|---|
| Amphora Plant | `hud_category=Biology&…Amphora` | `MapData-AP.js` | Canonn API → `/apsites` |
| Anemone | `hud_category=Biology&…Anemone` | `MapData-Codex.js` | Canonn Cloud Functions → `/query/codex` |
| Bark Mounds | `hud_category=Biology&…Bark%20Mound` | `MapData-BM.js` | Canonn API → `/bmsites` |
| Brain Tree | `hud_category=Biology&…Brain%20Tree` | `MapData-BT.js` | Canonn API → `/btsites` |
| Crystalline Shards | `hud_category=Biology&…Shard` | `MapData-CS.js` | Canonn API → `/cssites` + Cloud Functions → `/get_shard_data` |
| Thargoid Barnacles | `hud_category=Biology&…Barnacle` | `MapData-TB.js` | Canonn API → `/tbsites` |
| Tubers | `hud_category=Biology&…Tuber` | `MapData-TW.js` | Canonn API → `/twsites` |

### Odyssey Biology

All Odyssey biology entries use `codex.html` filtered by genus name and are served by:
- **Canonn Cloud Functions → `/query/codex`**

| Genus | URL Filter |
|---|---|
| Aleoids | `sub_class=Aleoida` |
| Bacterial | `sub_class=Bacterium` |
| Cactoid | `sub_class=Cactoida` |
| Clypeus | `sub_class=Clypeus` |
| Conchas | `sub_class=Concha` |
| Electricae | `sub_class=Electricae` |
| Fonticulus | `sub_class=Fonticulua` |
| Fumerolas | `sub_class=Fumerola` |
| Fungoids | `sub_class=Fungoida` |
| Osseus | `sub_class=Osseus` |
| Recepta | `sub_class=Recepta` |
| Shrubs | `sub_class=Frutexa` |
| Stratum | `sub_class=Stratum` |
| Tubus | `sub_class=Tubus` |
| Tussocks | `sub_class=Tussock` |

### Biology Combo Map
- **Page:** `biology-combo.html`
- **MapData:** `MapData-Biology.js`
- **Data Sources:**
  - Canonn API → `/apsites`, `/bmsites`, `/btsites`, `/fgsites`, `/twsites`
  - Canonn Cloud Functions → `/unknown_biosignals` (unscanned/unidentified biosignals)

---

## Geology

### Individual Geology Pages

| Menu Item | Page | MapData | API / Collection |
|---|---|---|---|
| Crystalline Shards | `cs-data.html` | `MapData-CS.js` | Canonn API → `/cssites` + Cloud Functions → `/get_shard_data` |
| Fumaroles | `fm-data.html` | `MapData-FM.js` | Canonn API → `/fmsites` |
| Gas Vents | `gv-data.html` | `MapData-GV.js` | Canonn API → `/gvsites` |
| Geysers | `gy-data.html` | `MapData-GY.js` | Canonn API → `/gysites` |
| Lava Spouts | `ls-data.html` | `MapData-LS.js` | Canonn API → `/lssites` |

### Geology Combo Map
- **Page:** `geology-combo.html`
- **MapData:** `MapData-Geology.js`
- **Data Sources:**
  - Canonn API → `/cssites`, `/fmsites`, `/gvsites`, `/gysites`, `/lssites`

---

## DCOH (Deep Core Operations Handbook)

- **Page:** `dcoh.html`
- **MapData:** `MapData-DCOH.js`
- **Data Sources:**
  - DCOH Watch API → `/api/v1/overwatch/systems`

---

## Fleet Carriers

- **Page:** `carrier_data.html`
- **MapData:** `MapData-Carriers.js`
- **Data Sources:**
  - Canonn Cloud Functions → `/query/fleetCarriers`

---

## Commander Map

- **Page:** `cmdr.html`
- **MapData:** `MapData-Cmdr.js`
- **Data Sources:**
  - Canonn Cloud Functions → `/query/codex` (commander-submitted codex entries)

---

## Codex Explorer

- **Page:** `codex.html`
- **MapData:** `MapData-Codex.js`
- **Data Sources:**
  - Canonn Cloud Functions → `/query/codex`
  - Accepts URL query parameters: `hud_category`, `sub_class`, `english_name`, `body`, `entryid`

---

## Bulk / All-Data Maps

Some combo pages use bulk CSV dumps from Google Cloud Storage instead of the live REST API. These are pre-generated exports refreshed periodically.

- **MapData:** `MapData-All.js`
- **Base URL:** `https://storage.googleapis.com/canonn-downloads/dumpr/`

### Category Codes Used in CSV Dumps

| Category | Code(s) | Type |
|---|---|---|
| Amphora Plant | `2101400` | Biology |
| Bark Mounds | `2100101` | Biology |
| Brain Tree | `2100201`–`2100208` | Biology |
| Crystalline Shards | `2101500` | Biology |
| Fungoids (FG) | `2100401`–`2100408` | Biology |
| Tubers/Wire (TW) | `2100501`–`2100508` | Biology |
| Fumaroles | `1400102`–`1400164` | Geology |
| Gas Vents | `1400402`–`1400414` | Geology |
| Geysers | `1400208`–`1400262` | Geology |
| Lava Spouts | `1400306`–`1400307` | Geology |
| Guardian Beacons | `3200800` | Guardian |
| Guardian Structures | `3200200`–`3200600` | Guardian |
| Thargoid Barnacles | `2100101`–`2100102` | Thargoid |
| Thargoid Structures | `3101000`–`3101200` | Thargoid |

---

## Tools (External Links)

| Tool | URL |
|---|---|
| System Signals | `https://canonn-science.github.io/canonn-signals/index.html` |
| Thargoid Link Decoder | `https://tools.canonn.tech/linkdecoder` |

---

## Notes

- Most Canonn API (`api.canonn.tech`) requests are paginated with `_limit=1000&_start=N`, iterating until fewer than 1000 records are returned.
- The Canonn Cloud Functions (`us-central1-canonn-api-236217.cloudfunctions.net`) serve as a middleware/aggregation layer, often combining data from multiple internal sources.
- Google Storage CSV dumps are used as a performance optimisation for bulk combo maps to avoid thousands of individual API requests.
- The `MapData-Codex.js` / `codex.html` page is reused across many menu entries by varying query parameters (`hud_category`, `sub_class`, `english_name`).
