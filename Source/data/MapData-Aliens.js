// Aliens Combo Map — Guardian + Thargoid + NHSS data sources

const recenterViewport = (center, distance) => {
	Ed3d.playerPos = [center.x, center.y, center.z];
	Ed3d.cameraPos = [
		center.x + (Math.floor((Math.random() * 100) + 1) - 50),
		center.y + distance,
		center.z - distance
	];
	Action.moveInitalPosition();
}


var canonnEd3d_aliens = {

	systemsData: {
		categories: {
			"Guardians": {
				"401": { name: "Guardian Ruins",      color: "4488FF" },
				"501": { name: "Guardian Structures", color: "0055CC" },
				"601": { name: "Guardian Beacons",   color: "88BBFF" },
				"701": { name: "Brain Trees",         color: "00AAFF" }
			},
			"Thargoids": {
				"801":  { name: "Thargoid Barnacles",        color: "00CC44" },
				"900":  { name: "Thargoid Structures",       color: "008800" },
				"1001": { name: "Non-Human Signal Sources",  color: "44FF88" }
			}
		},
		systems: []
	},

	formatRuins: function (data) {
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			let name = s["System Name"];
			if (!name || !name.trim()) continue;
			let x = parseFloat(String(s["x"]).replace(',', ''));
			let y = parseFloat(s["y"]);
			let z = parseFloat(s["z"]);
			if (isNaN(x) || isNaN(y) || isNaN(z)) continue;
			canonnEd3d_aliens.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: s["Site Type"] + (s["Body Name"] ? ' &mdash; ' + s["Body Name"] : '') + '<br>',
				cat: [401],
			});
		}
	},

	formatStructures: function (data) {
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			let name = s["System Name"];
			if (!name || !name.trim()) continue;
			let x = parseFloat(String(s["x"]).replace(',', ''));
			let y = parseFloat(s["y"]);
			let z = parseFloat(s["z"]);
			if (isNaN(x) || isNaN(y) || isNaN(z)) continue;
			let type = s["Site Type"] || 'Unknown';
			canonnEd3d_aliens.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: 'Ancient Structure (' + type + ')' + (s["Body Name"] ? '<br>' + s["Body Name"] : '') + '<br>',
				cat: [501],
			});
		}
	},

	formatBeacons: function (data) {
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			let name = s["System Name"];
			if (!name || !name.trim()) continue;
			let x = parseFloat(String(s["x"]).replace(',', ''));
			let y = parseFloat(s["y"]);
			let z = parseFloat(s["z"]);
			if (isNaN(x) || isNaN(y) || isNaN(z)) continue;
			let info = 'Guardian Beacon';
			if (s["Body Name"]) info += '<br>' + s["Body Name"];
			if (s["Distance To Arrival"]) info += '<br>' + s["Distance To Arrival"] + ' ls';
			canonnEd3d_aliens.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: info + '<br>',
				cat: [601],
			});
		}
	},

	formatBrainTrees: function (csvText, englishName, cat) {
		var parsed = Papa.parse(csvText.trim(), { skipEmptyLines: true });
		var seen = {};
		for (let i = 0; i < parsed.data.length; i++) {
			let row = parsed.data[i];
			let name = row[0];
			if (!name || !name.trim()) continue;
			if (seen[name]) continue;
			seen[name] = true;
			let x = parseFloat(row[1]);
			let y = parseFloat(row[2]);
			let z = parseFloat(row[3]);
			if (isNaN(x) || isNaN(y) || isNaN(z)) continue;
			canonnEd3d_aliens.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: englishName + '<br>',
				cat: [cat],
			});
		}
	},

	formatBarnacles: function (csvText, englishName, cat) {
		var parsed = Papa.parse(csvText.trim(), { skipEmptyLines: true });
		var seen = {};
		for (var i = 0; i < parsed.data.length; i++) {
			var row = parsed.data[i];
			var name = row[0];
			if (!name || !name.trim()) continue;
			if (seen[name]) continue;
			seen[name] = true;
			var x = parseFloat(row[1]);
			var y = parseFloat(row[2]);
			var z = parseFloat(row[3]);
			if (isNaN(x) || isNaN(y) || isNaN(z)) continue;
			canonnEd3d_aliens.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: englishName + '<br>',
				cat: [cat],
			});
		}
	},

	formatThargoidStructures: function (localSites) {
		for (var i = 0; i < localSites.length; i++) {
			var s = localSites[i];
			if (!s.System || String(s.System).replace(' ', '').length <= 1) continue;
			var info = 'Thargoid Structure';
			if (s.Planet) info += '<br>' + s.Planet;
			if (s.Leviathons) info += '<br>Leviathans: ' + s.Leviathons;
			if (s["New Type/Sub"]) info += '<br>Type: ' + s["New Type/Sub"];
			var x = parseFloat(s.x), y = parseFloat(s.y), z = parseFloat(s.z);
			if (isNaN(x) || isNaN(y) || isNaN(z)) continue;
			canonnEd3d_aliens.systemsData.systems.push({
				name: s.System,
				coords: { x: x, y: y, z: z },
				infos: info + '<br>',
				cat: [900],
			});
		}
	},

	streamNHSS: async function () {
		const NHSS_BASE = 'https://us-central1-canonn-api-236217.cloudfunctions.net/query/thargoid/nhss/systems';
		const limit = 2000;
		let offset = 0;
		let keepGoing = true;
		while (keepGoing) {
			try {
				let response = await fetch(NHSS_BASE + '?limit=' + limit + '&offset=' + offset);
				let data = await response.json();
				let pageSystems = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					let base = {
						name: s.systemName,
						coords: { x: parseFloat(s.x), y: parseFloat(s.y), z: parseFloat(s.z) }
					};
					let maxThreat = 0;
					for (let t = 1; t <= 9; t++) {
						if (s['threat_' + t] > 0) maxThreat = t;
					}
					if (maxThreat > 0) {
						pageSystems.push({
							name: base.name,
							coords: base.coords,
							infos: 'NHSS (max threat ' + maxThreat + ')<br>',
							cat: [1001]
						});
					}
				}
				if (pageSystems.length > 0) {
					Ed3d.addBatch({
						systems: pageSystems,
						categories: canonnEd3d_aliens.systemsData.categories
					});
				}
				offset += limit;
				if (data.length < limit) keepGoing = false;
			} catch (e) {
				console.log('Error streaming NHSS data:', e);
				keepGoing = false;
			}
		}
	},

	finishMap: function () {
		canonnEd3d_aliens.streamNHSS();
	},

	init: function () {
		var brainTrees = [
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100201.csv', name: 'Roseum Brain Tree',       cat: 701 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100202.csv', name: 'Gypseeum Brain Tree',     cat: 701 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100203.csv', name: 'Ostrinum Brain Tree',     cat: 701 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100204.csv', name: 'Viride Brain Tree',       cat: 701 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100205.csv', name: 'Lividum Brain Tree',      cat: 701 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100206.csv', name: 'Aureum Brain Tree',       cat: 701 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100207.csv', name: 'Puniceum Brain Tree',     cat: 701 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100208.csv', name: 'Lindigoticum Brain Tree', cat: 701 },
		];

		var barnacles = [
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100101.csv', name: 'Common Thargoid Barnacle', cat: 801 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100102.csv', name: 'Large Thargoid Barnacle',  cat: 801 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100103.csv', name: 'Thargoid Barnacle Barbs',  cat: 801 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100104.csv', name: 'Thargoid Barnacle Matrix', cat: 801 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100105.csv', name: 'Thargoid Mega Barnacles',  cat: 801 },
		];

		var fetches = [
			fetch('https://storage.googleapis.com/canonn-downloads/guardian_ruins.json').then(function (r) { return r.json(); }),
			fetch('https://storage.googleapis.com/canonn-downloads/guardian_structures.json').then(function (r) { return r.json(); }),
			fetch('https://storage.googleapis.com/canonn-downloads/guardian_beacons.json').then(function (r) { return r.json(); }),
			fetch('data/surface_sites.json').then(function (r) { return r.json(); }).catch(function () { return []; }),
		];
		brainTrees.forEach(function (bt) {
			fetches.push(fetch(bt.url).then(function (r) { return r.text(); }));
		});
		barnacles.forEach(function (b) {
			fetches.push(fetch(b.url).then(function (r) { return r.text(); }));
		});

		Promise.all(fetches).then(function (results) {
			canonnEd3d_aliens.formatRuins(results[0]);
			canonnEd3d_aliens.formatStructures(results[1]);
			canonnEd3d_aliens.formatBeacons(results[2]);
			canonnEd3d_aliens.formatThargoidStructures(results[3]);
			for (var i = 0; i < brainTrees.length; i++) {
				canonnEd3d_aliens.formatBrainTrees(results[4 + i], brainTrees[i].name, brainTrees[i].cat);
			}
			for (var i = 0; i < barnacles.length; i++) {
				canonnEd3d_aliens.formatBarnacles(results[4 + brainTrees.length + i], barnacles[i].name, barnacles[i].cat);
			}
			document.getElementById("loading").style.display = "none";
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_aliens.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 150],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00',
				finished: canonnEd3d_aliens.finishMap
			});
		});
	}
};