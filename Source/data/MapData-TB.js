var canonnEd3d_tb = {
	//Define Categories
	systemsData: {
		categories: {
			'Thargoid Barnacles - (TB)': {
				'201': { name: 'Common Thargoid Barnacle', color: randomColor().replace('#', '').toString() },
				'202': { name: 'Large Thargoid Barnacle', color: randomColor().replace('#', '').toString() },
				'203': { name: 'Barnacle Barbs', color: randomColor().replace('#', '').toString() },
				'204': { name: 'Barnacle Matrix', color: randomColor().replace('#', '').toString() },
				'205': { name: 'Mega Barnacles', color: randomColor().replace('#', '').toString() },
			},
		},
		systems: [],
	},

	formatBarnacles: function (csvText, englishName, cat) {
		// CSV columns (no header): system_name, x, y, z, entryid, bodyId, ...
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
			canonnEd3d_tb.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: englishName + '<br>',
				cat: [cat],
			});
		}
	},

	init: function () {
		var barnacles = [
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100101.csv', name: 'Common Thargoid Barnacle', cat: 201 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100102.csv', name: 'Large Thargoid Barnacle', cat: 202 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100103.csv', name: 'Thargoid Barnacle Barbs', cat: 203 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100104.csv', name: 'Thargoid Barnacle Matrix', cat: 204 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100105.csv', name: 'Thargoid Mega Barnacles', cat: 205 },
		];

		Promise.all(barnacles.map(function (b) {
			return fetch(b.url).then(function (r) { return r.text(); });
		})).then(function (results) {
			for (var i = 0; i < barnacles.length; i++) {
				canonnEd3d_tb.formatBarnacles(results[i], barnacles[i].name, barnacles[i].cat);
			}
			document.getElementById("loading").style.display = "none";
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_tb.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: true,
				playerPos: [-78.59375, -149.625, -340.53125],
				cameraPos: [-78.59375 - 1000, -149.625, -340.53125 - 1000],
				systemColor: '#FF9D00',
			});
		});
	},
};
