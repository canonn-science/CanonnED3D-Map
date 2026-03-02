var canonnEd3d_gb = {

	//Define Categories
	systemsData: {
		categories: {
			"Guardian Beacons - (GB)": {
				"201": {
					name: "Beacon",
					color: randomColor().replace('#', '').toString()
				}
			}
		},
		systems: []
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
			if (s["Body Sub Type"]) info += ' (' + s["Body Sub Type"] + ')';
			if (s["Distance To Arrival"]) info += '<br>' + s["Distance To Arrival"] + ' ls';
			if (s["Guardian Structure System"]) info += '<br>Structure: ' + s["Guardian Structure System"];
			canonnEd3d_gb.systemsData.systems.push({
				name: name,
				coords: { x: x, y: y, z: z },
				infos: info + '<br>',
				cat: [201],
			});
		}
	},

	init: function () {
		fetch('https://storage.googleapis.com/canonn-downloads/guardian_beacons.json')
			.then(function (r) { return r.json(); })
			.then(function (data) {
				canonnEd3d_gb.formatBeacons(data);
				document.getElementById("loading").style.display = "none";
				Ed3d.init({
					container: 'edmap',
					json: canonnEd3d_gb.systemsData,
					withFullscreenToggle: false,
					withHudPanel: true,
					hudMultipleSelect: true,
					effectScaleSystem: [20, 500],
					startAnim: false,
					showGalaxyInfos: true,
					playerPos: [682, -102, -104],
					cameraPos: [382, -102, -204],
					systemColor: '#FF9D00',
				});
			});
	},
};