// MapData-multifaction.js
// Displays systems for multiple factions from the Spansh factions.json.gz dump.
// URL parameter: factions=Faction One,Faction Two,...

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.href);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Distinct colour pairs [controlled, present] per faction slot
const factionColorPairs = [
	['FF2400', 'FF9D80'], // Red / Salmon
	['1569C7', '7EC8E3'], // Blue / Sky
	['4AA02C', 'A8EB6A'], // Green / Lime
	['C68B17', 'FFDB58'], // Brown / Mustard
	['7D1B7E', 'E580E5'], // Purple / Light Purple
	['1B8A8E', '5EEDED'], // Teal / Pale Teal
	['E56717', 'F9A870'], // Orange / Peach
	['6A287E', 'C88ADB'], // Violet / Lavender
	['CC6600', 'F0A050'], // Dark Orange / Light Orange
	['006400', '90EE90'], // Dark Green / Light Green
	['8B0000', 'FA8072'], // Dark Red / Salmon
	['00008B', '6495ED'], // Dark Blue / Cornflower
];

var canonnEd3d_multifaction = {

	systemsData: {
		categories: {},
		systems: [],
		routes: [],
	},

	/**
	 * Fetch a .json.gz URL and return the parsed JSON using the browser
	 * DecompressionStream API (supported in Chrome 80+, Firefox 113+, Edge 80+).
	 */
	fetchGzJson: async function (url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Failed to fetch ' + url + ' – status ' + response.status);
		}

		const ds = new DecompressionStream('gzip');
		const decompressedStream = response.body.pipeThrough(ds);
		const reader = decompressedStream.getReader();

		const chunks = [];
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			chunks.push(value);
		}

		// Concatenate all chunks into a single Uint8Array
		const totalLength = chunks.reduce(function (acc, chunk) { return acc + chunk.length; }, 0);
		const combined = new Uint8Array(totalLength);
		let offset = 0;
		chunks.forEach(function (chunk) {
			combined.set(chunk, offset);
			offset += chunk.length;
		});

		return JSON.parse(new TextDecoder().decode(combined));
	},

	init: async function () {
		const factionsParam = getUrlParameter('factions');

		if (!factionsParam) {
			console.warn('multifaction: no "factions" URL parameter supplied.');
			document.getElementById('loading').style.display = 'none';
			return;
		}

		// Build a lookup map of lower-case name -> original requested name
		const requestedNames = factionsParam.split(',').map(function (s) { return s.trim(); });
		const requestedLower = {};
		requestedNames.forEach(function (n) { requestedLower[n.toLowerCase()] = n; });

		try {
			// The Spansh dump is a JSON array of faction objects
			const allFactions = await canonnEd3d_multifaction.fetchGzJson(
				'https://downloads.spansh.co.uk/factions.json.gz'
			);

			// Filter to only the requested factions (case-insensitive)
			const matched = allFactions.filter(function (f) {
				return requestedLower.hasOwnProperty(f.name.toLowerCase());
			});

			if (matched.length === 0) {
				console.warn('multifaction: none of the requested factions were found in the dump.');
				document.getElementById('loading').style.display = 'none';
				return;
			}

			// Build categories and systems per faction
			matched.forEach(function (faction, idx) {
				const colors = factionColorPairs[idx % factionColorPairs.length];
				const controlledColor = colors[0];
				const presentColor = colors[1];

				// Category keys must be unique strings used as 'cat' values on systems
				const controlledKey = 'f' + idx + 'c';
				const presentKey    = 'f' + idx + 'p';

				// Create a group named after the faction with two sub-categories
				canonnEd3d_multifaction.systemsData.categories[faction.name] = {};
				canonnEd3d_multifaction.systemsData.categories[faction.name][controlledKey] = {
					name: 'Controlled',
					color: controlledColor,
				};
				canonnEd3d_multifaction.systemsData.categories[faction.name][presentKey] = {
					name: 'Present',
					color: presentColor,
				};

				// Deduplicate systems by systemId64, preferring isControllingFaction=true
				var systemMap = {};
				faction.systems.forEach(function (sys) {
					var key = String(sys.systemId64);
					if (!systemMap[key] || sys.isControllingFaction) {
						systemMap[key] = sys;
					}
				});

				Object.values(systemMap).forEach(function (sys) {
					var isControlled = sys.isControllingFaction === true;
					var poiSite = {
						name: sys.systemName,
						cat: [isControlled ? controlledKey : presentKey],
						infos: '<b>' + faction.name + '</b><br>'
							+ 'Status: ' + (isControlled ? 'Controlling' : 'Present') + '<br>'
							+ (faction.allegiance ? 'Allegiance: ' + faction.allegiance + '<br>' : '')
							+ (faction.government  ? 'Government: '  + faction.government  + '<br>' : '')
							+ '<br>'
							+ '<a href="https://inara.cz/elite/starsystem/?search='
							+ encodeURIComponent(sys.systemName)
							+ '" target="_blank">Inara</a>',
						coords: {
							x: sys.coords.x,
							y: sys.coords.y,
							z: sys.coords.z,
						},
					};
					canonnEd3d_multifaction.systemsData.systems.push(poiSite);
				});
			});

			document.getElementById('loading').style.display = 'none';

			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_multifaction.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: true,
				showGalaxyInfos: true,
				systemColor: '#FF9D00',
			});

		} catch (err) {
			console.error('multifaction: error loading data –', err);
			document.getElementById('loading').style.display = 'none';
		}
	},
};

canonnEd3d_multifaction.init();
