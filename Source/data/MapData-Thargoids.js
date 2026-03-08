// Thargoids Combo Map — Thargoid Barnacles + Thargoid Structures + Non-Human Signal Sources

const recenterViewport_thargoids = (center, distance) => {
	Ed3d.playerPos = [center.x, center.y, center.z];
	Ed3d.cameraPos = [
		center.x + (Math.floor((Math.random() * 100) + 1) - 50),
		center.y + distance,
		center.z - distance
	];
	Action.moveInitalPosition();
};

recenterSearch = function () {
	var term = $('#search input').val();
	if (!term.trim()) return;

	var foundSystem = {};
	for (var key in canonnEd3d_thargoids.systemsData.systems) {
		var system = canonnEd3d_thargoids.systemsData.systems[key];
		if (system.name.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
			foundSystem = system;
			break;
		}
	}
	if (!(Object.keys(foundSystem).length === 0)) {
		recenterViewport_thargoids(foundSystem.coords, 100);
		$('#search input:focus-visible').css("outline-color", "darkgreen");
	} else {
		$('#search input:focus-visible').css("outline-color", "red");
	}
};

var canonnEd3d_thargoids = {

	systemsData: {
		categories: {
			"Thargoid Barnacles - (TB)": {
				"201": { name: "Common Thargoid Barnacle", color: randomColor().replace('#', '').toString() },
				"202": { name: "Large Thargoid Barnacle",  color: randomColor().replace('#', '').toString() },
				"203": { name: "Barnacle Barbs",           color: randomColor().replace('#', '').toString() },
				"204": { name: "Barnacle Matrix",          color: randomColor().replace('#', '').toString() },
				"205": { name: "Mega Barnacles",           color: randomColor().replace('#', '').toString() }
			},
			"Thargoid Structures - (TS)": {
				"300": { name: "0 Inactive", color: "A63333" },
				"301": { name: "1 Inactive", color: "E63333" },
				"302": { name: "2 Inactive", color: "FF6B6B" },
				"303": { name: "3 Active",   color: "FFA500" },
				"304": { name: "4 Active",   color: "FFFF00" },
				"305": { name: "5 Active",   color: "90EE90" },
				"306": { name: "6 Active",   color: "00FF00" }
			},
			"Non-Human Signal Sources": {
				"401": { name: "Threat 1", color: "90EE90" },
				"402": { name: "Threat 2", color: "ADFF2F" },
				"403": { name: "Threat 3", color: "FFFF00" },
				"404": { name: "Threat 4", color: "FFD700" },
				"405": { name: "Threat 5", color: "FFA500" },
				"406": { name: "Threat 6", color: "FF6347" },
				"407": { name: "Threat 7", color: "FF4500" },
				"408": { name: "Threat 8", color: "FF0000" },
				"409": { name: "Threat 9", color: "8B0000" }
			}
		},
		systems: []
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
			canonnEd3d_thargoids.systemsData.systems.push({
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
			var catId = 300;
			try {
				var sub = s["New Type/Sub"] || s["New Type / Sub"] || s.newTypeSub;
				if (sub) {
					var m = String(sub).trim().match(/^\s*(\d)/);
					if (m) {
						var num = parseInt(m[1]);
						if (!isNaN(num) && num >= 0 && num <= 6) catId = 300 + num;
					}
				}
			} catch (e) {}
			var info = 'Thargoid Structure';
			if (s.Planet) info += '<br>' + s.Planet;
			if (s.Leviathons) info += '<br>Leviathans: ' + s.Leviathons;
			if (s["New Type/Sub"]) info += '<br>Type: ' + s["New Type/Sub"];
			var x = parseFloat(s.x), y = parseFloat(s.y), z = parseFloat(s.z);
			if (isNaN(x) || isNaN(y) || isNaN(z)) continue;
			canonnEd3d_thargoids.systemsData.systems.push({
				name: s.System,
				coords: { x: x, y: y, z: z },
				infos: info + '<br>',
				cat: [catId],
			});
		}
	},

	streamNHSS: async function () {
		const NHSS_BASE = 'https://us-central1-canonn-api-236217.cloudfunctions.net/query/thargoid/nhss/systems';
		const limit = 2000;
		var offset = 0;
		var keepGoing = true;
		while (keepGoing) {
			try {
				var response = await fetch(NHSS_BASE + '?limit=' + limit + '&offset=' + offset);
				var data = await response.json();
				var pageSystems = [];
				for (var i = 0; i < data.length; i++) {
					var s = data[i];
					var coords = { x: parseFloat(s.x), y: parseFloat(s.y), z: parseFloat(s.z) };
					for (var t = 1; t <= 9; t++) {
						if (s['threat_' + t] > 0) {
							pageSystems.push({
								name: s.systemName,
								coords: coords,
								infos: 'Threat ' + t + ': ' + s['threat_' + t] + '<br>',
								cat: [400 + t]
							});
						}
					}
				}
				if (pageSystems.length > 0) {
					Ed3d.addBatch({
						systems: pageSystems,
						categories: canonnEd3d_thargoids.systemsData.categories
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
		$('#search').css('display', 'block');
		$('#search input').val('System').on('input', recenterSearch);
		canonnEd3d_thargoids.streamNHSS();
	},

	init: function () {
		var barnacles = [
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100101.csv', name: 'Common Thargoid Barnacle', cat: 201 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100102.csv', name: 'Large Thargoid Barnacle',  cat: 202 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100103.csv', name: 'Thargoid Barnacle Barbs',  cat: 203 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100104.csv', name: 'Thargoid Barnacle Matrix', cat: 204 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100105.csv', name: 'Thargoid Mega Barnacles',  cat: 205 },
		];

		var fetches = [
			fetch('data/surface_sites.json').then(function (r) { return r.json(); }).catch(function () { return []; }),
		];
		barnacles.forEach(function (b) {
			fetches.push(fetch(b.url).then(function (r) { return r.text(); }));
		});

		Promise.all(fetches).then(function (results) {
			canonnEd3d_thargoids.formatThargoidStructures(results[0]);
			for (var i = 0; i < barnacles.length; i++) {
				canonnEd3d_thargoids.formatBarnacles(results[1 + i], barnacles[i].name, barnacles[i].cat);
			}
			document.getElementById("loading").style.display = "none";
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_thargoids.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: true,
				playerPos: [-78.59375, -149.625, -340.53125],
				cameraPos: [-78.59375 - 500, -149.625, -340.53125 - 1000],
				systemColor: '#FF9D00',
				finished: canonnEd3d_thargoids.finishMap
			});
		});
	},
};
