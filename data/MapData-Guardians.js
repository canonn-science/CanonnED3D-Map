const recenterViewport = (center, distance) => {
	//-- Set new camera & target position
	Ed3d.playerPos = [center.x, center.y, center.z];
	Ed3d.cameraPos = [
		center.x + (Math.floor((Math.random() * 100) + 1) - 50), //-- Add a small rotation effect
		center.y + distance,
		center.z - distance
	];

	Action.moveInitalPosition();
}

recenterSearch = function () {
	var term = $('#search input').val();
	if (!term.trim()) return;

	var foundSystem = {};
	for (key in canonnEd3d_guardians.systemsData.systems) {
		let system = canonnEd3d_guardians.systemsData.systems[key];
		if (system.name.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
			foundSystem = system;
			break;
		}
	}
	if (!(Object.keys(foundSystem).length === 0)) {
		recenterViewport(foundSystem.coords, 100);

		//console.log("addtext", "system_hover", systemname, 0, 4, 0, 3, threeObj);
		/* how do we get threeObj? they dont have names. would like to show the mouseover text after search recenter
				HUD.addText(-1, foundSystem.name,
					0, 4, 0, 3//, foundSystem.coords, true
				); 
		//*/

		$('#search input:focus-visible').css("outline-color", "darkgreen")
	} else {
		$('#search input:focus-visible').css("outline-color", "red")
	}
}

var canonnEd3d_guardians = {

	systemsData: {
		categories: {
			"Guardian Ruins - (GR)": {
				"401": { name: "Alpha",      color: randomColor().replace('#', '').toString() },
				"402": { name: "Beta",       color: randomColor().replace('#', '').toString() },
				"403": { name: "Gamma",      color: randomColor().replace('#', '').toString() },
				"404": { name: "Unknown GR", color: "800000" }
			},
			"Guardian Structures - (GS)": {
				"501": { name: "Lacrosse",    color: randomColor().replace('#', '').toString() },
				"502": { name: "Crossroads",  color: randomColor().replace('#', '').toString() },
				"503": { name: "Fistbump",    color: randomColor().replace('#', '').toString() },
				"504": { name: "Hammerbot",   color: randomColor().replace('#', '').toString() },
				"505": { name: "Bear",        color: randomColor().replace('#', '').toString() },
				"506": { name: "Bowl",        color: randomColor().replace('#', '').toString() },
				"507": { name: "Turtle",      color: randomColor().replace('#', '').toString() },
				"508": { name: "Robolobster", color: randomColor().replace('#', '').toString() },
				"509": { name: "Squid",       color: randomColor().replace('#', '').toString() },
				"510": { name: "Stickyhand",  color: randomColor().replace('#', '').toString() }
			},
			"Guardian Beacons - (GB)": {
				"601": { name: "Beacon", color: randomColor().replace('#', '').toString() }
			},
			"Brain Trees": {
				"701": { name: "Roseum",       color: randomColor().replace('#', '').toString() },
				"702": { name: "Gypseeum",     color: randomColor().replace('#', '').toString() },
				"703": { name: "Ostrinum",     color: randomColor().replace('#', '').toString() },
				"704": { name: "Viride",       color: randomColor().replace('#', '').toString() },
				"705": { name: "Lividum",      color: randomColor().replace('#', '').toString() },
				"706": { name: "Aureum",       color: randomColor().replace('#', '').toString() },
				"707": { name: "Puniceum",     color: randomColor().replace('#', '').toString() },
				"708": { name: "Lindigoticum", color: randomColor().replace('#', '').toString() }
			}
		},
		systems: []
	},

	gsTypeMap: {
		'Lacrosse':    501,
		'Crossroads':  502,
		'Fistbump':    503,
		'Hammerbot':   504,
		'Bear':        505,
		'Bowl':        506,
		'Turtle':      507,
		'Robolobster': 508,
		'Squid':       509,
		'Stickyhand':  510
	},

	formatRuins: function (data) {
		const typeMap = { 'Alpha': 401, 'Beta': 402, 'Gamma': 403 };
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			let name = s["System Name"];
			if (!name || !name.trim()) continue;
			// Some x values contain a thousands comma (e.g. "1,580.625")
			let x = parseFloat(String(s["x"]).replace(',', ''));
			let y = parseFloat(s["y"]);
			let z = parseFloat(s["z"]);
			if (isNaN(x) || isNaN(y) || isNaN(z)) continue;
			let cat = typeMap[s["Site Type"]] || 404;
			canonnEd3d_guardians.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: s["Site Type"] + (s["Body Name"] ? ' &mdash; ' + s["Body Name"] : '') + '<br>',
				cat: [cat],
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
			let cat = canonnEd3d_guardians.gsTypeMap[type] || 503;
			canonnEd3d_guardians.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: 'Ancient Structure (' + type + ')' + (s["Body Name"] ? '<br>' + s["Body Name"] : '') + '<br>',
				cat: [cat],
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
			canonnEd3d_guardians.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: info + '<br>',
				cat: [601],
			});
		}
	},

	formatBrainTrees: function (csvText, englishName, cat) {
		// CSV columns (no header): system_name, x, y, z, entryid, bodyId, ...
		var parsed = Papa.parse(csvText.trim(), { skipEmptyLines: true });
		var seen = {};
		for (let i = 0; i < parsed.data.length; i++) {
			let row = parsed.data[i];
			let name = row[0];
			if (!name || !name.trim()) continue;
			// deduplicate by system name
			if (seen[name]) continue;
			seen[name] = true;
			let x = parseFloat(row[1]);
			let y = parseFloat(row[2]);
			let z = parseFloat(row[3]);
			if (isNaN(x) || isNaN(y) || isNaN(z)) continue;
			canonnEd3d_guardians.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: englishName + '<br>',
				cat: [cat],
			});
		}
	},

	finishMap: function () {
		$('#search').css('display', 'block');
		$('#search input').val('System').on('input', recenterSearch);
	},

	init: function () {
		var brainTrees = [
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100201.csv', name: 'Roseum Brain Tree',       cat: 701 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100202.csv', name: 'Gypseeum Brain Tree',     cat: 702 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100203.csv', name: 'Ostrinum Brain Tree',     cat: 703 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100204.csv', name: 'Viride Brain Tree',       cat: 704 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100205.csv', name: 'Lividum Brain Tree',      cat: 705 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100206.csv', name: 'Aureum Brain Tree',       cat: 706 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100207.csv', name: 'Puniceum Brain Tree',     cat: 707 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100208.csv', name: 'Lindigoticum Brain Tree', cat: 708 },
		];

		var fetches = [
			fetch('https://storage.googleapis.com/canonn-downloads/guardian_ruins.json').then(function (r) { return r.json(); }),
			fetch('https://storage.googleapis.com/canonn-downloads/guardian_structures.json').then(function (r) { return r.json(); }),
			fetch('https://storage.googleapis.com/canonn-downloads/guardian_beacons.json').then(function (r) { return r.json(); }),
		];
		brainTrees.forEach(function (bt) {
			fetches.push(fetch(bt.url).then(function (r) { return r.text(); }));
		});

		Promise.all(fetches).then(function (results) {
			canonnEd3d_guardians.formatRuins(results[0]);
			canonnEd3d_guardians.formatStructures(results[1]);
			canonnEd3d_guardians.formatBeacons(results[2]);
			for (var i = 0; i < brainTrees.length; i++) {
				canonnEd3d_guardians.formatBrainTrees(results[3 + i], brainTrees[i].name, brainTrees[i].cat);
			}
			document.getElementById("loading").style.display = "none";
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_guardians.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00',
				finished: canonnEd3d_guardians.finishMap
			});
		});
	}
};