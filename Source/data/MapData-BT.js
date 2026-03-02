function signalLink(system, name) {
	return '<a href="https://canonn-science.github.io/canonn-signals/?system=' + system + '" target="_blank">' + name + '</a><br>'
}

var canonnEd3d_bt = {
	//Define Categories
	systemsData: {
		categories: {
			'Brain Trees - (BT)': {
				'201': { name: 'Roseum Brain Tree',       color: randomColor().replace('#', '').toString() },
				'202': { name: 'Gypseeum Brain Tree',     color: randomColor().replace('#', '').toString() },
				'203': { name: 'Ostrinum Brain Tree',     color: randomColor().replace('#', '').toString() },
				'204': { name: 'Viride Brain Tree',       color: randomColor().replace('#', '').toString() },
				'205': { name: 'Lividum Brain Tree',      color: randomColor().replace('#', '').toString() },
				'206': { name: 'Aureum Brain Tree',       color: randomColor().replace('#', '').toString() },
				'207': { name: 'Puniceum Brain Tree',     color: randomColor().replace('#', '').toString() },
				'208': { name: 'Lindigoticum Brain Tree', color: randomColor().replace('#', '').toString() },
			},
		},
		systems: [],
	},

	formatBrainTrees: function (csvText, englishName, cat) {
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
			canonnEd3d_bt.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: signalLink(name, englishName),
				cat: [cat],
			});
		}
	},

	init: function () {
		var brainTrees = [
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100201.csv', name: 'Roseum Brain Tree',       cat: 201 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100202.csv', name: 'Gypseeum Brain Tree',     cat: 202 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100203.csv', name: 'Ostrinum Brain Tree',     cat: 203 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100204.csv', name: 'Viride Brain Tree',       cat: 204 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100205.csv', name: 'Lividum Brain Tree',      cat: 205 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100206.csv', name: 'Aureum Brain Tree',       cat: 206 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100207.csv', name: 'Puniceum Brain Tree',     cat: 207 },
			{ url: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100208.csv', name: 'Lindigoticum Brain Tree', cat: 208 },
		];

		Promise.all(brainTrees.map(function (bt) {
			return fetch(bt.url).then(function (r) { return r.text(); });
		})).then(function (results) {
			for (var i = 0; i < brainTrees.length; i++) {
				canonnEd3d_bt.formatBrainTrees(results[i], brainTrees[i].name, brainTrees[i].cat);
			}
			document.getElementById("loading").style.display = "none";
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_bt.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00',
			});
		});
	},
};
