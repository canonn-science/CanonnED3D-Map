ED3D JSON formats and configuration

This document describes the JSON formats accepted by the ED3D map (no code changes).

Summary
- The map accepts two main data shapes:
  1) Full object: an object with optional `categories`, `systems`, `routes`, `heatmap`, `position`, etc.
  2) Simple array: an array of system objects (each item is a system). The loader detects `data.systems` vs an array.
- Many MapData-* files provide `systemsData` objects: feed those as `json` to `Ed3d.init({ json: systemsData })`.

Top-level keys (supported)
- `categories` (optional): grouping used to create HUD filters and colors.
- `systems` or (array form) top-level array: list of systems/POIs.
- `routes` (optional): named route definitions.
- `heatmap` (optional): heatmap values array.
- `position` (optional): initial player start position.

1) Full format (object)
Structure:
{
  "categories": { <groupName>: { <categoryId>: { "name": "...", "color": "RRGGBB" }, ... }, ... },
  "systems": [ <System>, <System>, ... ],
  "routes": { <routeId>: <Route>, ... },
  "heatmap": [ <HeatValue>, ... ],
  "position": { "x": <num>, "y": <num>, "z": <num> }
}

Notes on `categories`:
- `categories` is an object keyed by a group/title (e.g. "Sites", "Guardian").
- Each group contains entries keyed by category id (string or number). Each category entry is an object with at least `name` and optionally `color`.
- `color` is a hex string WITHOUT `#` in many MapData files (e.g. "ff9933"). Both forms are accepted by the code if you normalize before use.

Example categories fragment:
{
  "Sites": {
    "201": { "name": "(AP) Amphora Plants", "color": "eb9834" },
    "202": { "name": "(BM) Bark Mounds", "color": "eb7434" }
  }
}

2) System object
Each system in `systems` (or each element of the simple array) must include:
- `name` (string) — required
- `coords` (object) — required: `{ "x": number, "y": number, "z": number }`
Optional fields commonly supported:
- `cat`: array of category ids (e.g. `[201]` or `["201"]`) — used to color and place system into HUD filters
- `infos`: HTML string shown in the details panel
- `url`: link used for the object
- `type`: integer (spectral type index; used by some maps)

Example system:
{
  "name": "Sol",
  "coords": { "x": 0, "y": 0, "z": 0 },
  "cat": [22],
  "infos": "Some HTML info"
}

3) Routes
Routes are provided as objects in `routes` keyed by route id. Each route has:
- `points`: array of points. Each point is either `{ "s": "systemName" }` (reference to an already defined system) or `{ "coords": {"x":n,"y":n,"z":n}, "s": "optionalName" }` to define inline coordinates.
- optional `cat`: array of category ids to style the route
- optional `circle`: boolean — controls whether start/end circle markers are created (default true)
- optional `hideLast`: boolean — prevents drawing the last circle marker

Example route:
{
  "points": [ { "s": "Sol" }, { "s": "Alpha Centauri" }, { "coords": { "x":10, "y":20, "z":30 } } ],
  "cat": ["01"],
  "circle": true
}

The route code will collect coordinates for points whose systems appear in the systems list (or use provided coords). If a referenced system is missing you'll see a console "Missing point" message.

4) Heatmap
Heatmap input is an array of objects. The rendering code expects at least:
- `x` (number)
- `z` (number)
- `count` (number) — the intensity used to pick colors
Optional:
- `y`: array [minY, maxY] used by some debug/cube rendering; not required for the particle heat effect.

Example heatmap value:
{ "x": 1234, "z": -5678, "count": 42, "y": [100, 200] }

5) Alternative simple array
You may pass the systems array directly instead of a full object. The loader detects `data.systems` vs an array. Example:
[
  { "name": "Sol", "coords": {"x":0,"y":0,"z":0} },
  { "name": "Alpha", "coords": {"x":100,"y":200,"z":300}, "cat": [201] }
]

6) `position` (start camera/player)
If provided at top level as `position: { x, y, z }` the map may use it to center the initial camera and player position.

7) Ed3d init options (map configuration passed to `Ed3d.init({...})`)
The code merges passed options onto internal defaults. Typical options used in the Source MapData files:
- `container` (string): id of DOM element which will hold the map (required by init call)
- `json` (object|array): the already-prepared data object (systemsData) — preferred when supplying data in memory
- `jsonPath` (string): URL/path to a JSON file to load
- `jsonContainer` (string): selector/id whose inner HTML contains JSON to parse
- `withFullscreenToggle` (bool)
- `withHudPanel` (bool) — whether to create the HUD
- `hudMultipleSelect` (bool) — allow multi-select of categories
- `effectScaleSystem` (array) — scaling used for system effects
- `startAnim` (bool) — whether initial camera animation plays
- `showGalaxyInfos` (bool)
- `cameraPos` (array) — optional camera position vector [x,y,z]
- `systemColor` (string) — default color for systems without category
- `finished` (function) — callback invoked after launchMap finishes loading

Example init call (as used in MapData files):
Ed3d.init({
  container: 'edmap',
  json: canonnEd3d_biology.systemsData,
  withFullscreenToggle: false,
  withHudPanel: true,
  hudMultipleSelect: true,
  effectScaleSystem: [20, 500],
  startAnim: false,
  showGalaxyInfos: true,
  cameraPos: [25, 14100, -12900],
  systemColor: '#FF9D00'
});

8) Notes, tips and observed variations
- `categories` structures vary across MapData files: sometimes groups are used to group several category ids under a group title (e.g. "Guardian": { "201": {...}, "301": {...} }). The HUD code expects `categories` to be an object whose values are objects mapping category ids to objects containing `name` and optional `color`.
- Colors in many MapData files are stored without the leading `#`. The HUD code calls `Ed3d.addCustomMaterial(idCat, val.color)` which expects a hex string; to be safe provide `color` either as `"ffcc00"` or `"#ffcc00"` consistently.
- Systems must include coordinates; the loader ignores entries without `coords`.
- Routes may either reference system names (`s`) or provide coords inline (useful when route points aren't in `systems`).

9) Minimal example (full object)
{
  "categories": {
    "Sites": {
      "201": { "name": "Amphora Plants", "color": "ff0000" }
    }
  },
  "systems": [
    { "name": "Sol", "coords": { "x": 0, "y": 0, "z": 0 }, "cat": [201], "infos": "Home" }
  ],
  "routes": {
    "0": { "points": [ { "s": "Sol" }, { "coords": { "x": 1000, "y": 0, "z": 1000 } } ], "cat": [201] }
  },
  "heatmap": [ { "x": 0, "z": 0, "count": 5 } ],
  "position": { "x": 0, "y": 0, "z": 0 }
}

10) Where to look in the code (useful references)
- Map loader and defaults: Source/js/ed3dmap.js
- JSON schemas (reference): Source/schemas/ed3d-full.json and Source/schemas/ed3d-simple.json
- System creation: Source/js/components/system.class.js
- Routes: Source/js/components/route.class.js
- Heatmap: Source/js/components/heat.class.js
- HUD / filters: Source/js/components/hud.class.js

If you'd like, I can:
- produce one or two canonical example JSON files (minimal and full) based on this doc,
- or generate a small JSON validator (node script) that checks a JSON file against the expected fields without changing any app code.

