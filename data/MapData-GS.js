var canonnEd3d_gs = {

	systemsData: {
		categories: {
			"Guardian Structures - (GS)": {
				"301": { name: "Lacrosse",   color: randomColor().replace('#', '').toString() },
				"302": { name: "Crossroads", color: randomColor().replace('#', '').toString() },
				"303": { name: "Fistbump",   color: randomColor().replace('#', '').toString() },
				"304": { name: "Hammerbot",  color: randomColor().replace('#', '').toString() },
				"305": { name: "Bear",       color: randomColor().replace('#', '').toString() },
				"306": { name: "Bowl",       color: randomColor().replace('#', '').toString() },
				"307": { name: "Turtle",     color: randomColor().replace('#', '').toString() },
				"308": { name: "Robolobster",color: randomColor().replace('#', '').toString() },
				"309": { name: "Squid",      color: randomColor().replace('#', '').toString() },
				"310": { name: "Stickyhand", color: randomColor().replace('#', '').toString() }
			}
		},
		systems: []
	},

	typeMap: {
		'Lacrosse':    301,
		'Crossroads':  302,
		'Fistbump':    303,
		'Hammerbot':   304,
		'Bear':        305,
		'Bowl':        306,
		'Turtle':      307,
		'Robolobster': 308,
		'Squid':       309,
		'Stickyhand':  310
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
			let cat = canonnEd3d_gs.typeMap[type] || 303;
			canonnEd3d_gs.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: 'Ancient Structure (' + type + ')' + (s["Body Name"] ? '<br>' + s["Body Name"] : '') + '<br>',
				cat: [cat],
			});
		}
	},

	init: function () {
		fetch('https://storage.googleapis.com/canonn-downloads/guardian_structures.json')
			.then(function (r) { return r.json(); })
			.then(function (data) {
				canonnEd3d_gs.formatStructures(data);
				document.getElementById("loading").style.display = "none";
				Ed3d.init({
					container: 'edmap',
					json: canonnEd3d_gs.systemsData,
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
