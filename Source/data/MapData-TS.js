var canonnEd3d_ts = {
	//Define Categories
	systemsData: {
		categories: {
		},
		systems: [],
	},
	startcoords: [],

	// Format local surface_sites.json entries
	formatLocalSurfaceSites: async function (localSites) {
		let formattedBatch = [];
		for (var i = 0; i < localSites.length; i++) {
			let s = localSites[i];
			if (!s.System || String(s.System).replace(' ', '').length <= 1) continue;
			var poiSite = {};
			poiSite['name'] = s.System;
		// Only use Leviathan Count category (0-6)
		poiSite['cat'] = [];
			// Attach secondary category from "New Type/Sub" leading number (0..6)
			try {
				var sub = s["New Type/Sub"] || s["New Type / Sub"] || s.newTypeSub;
				if (sub) {
					sub = String(sub).trim();
					var m = sub.match(/^\s*(\d)/);
					if (m) {
						var num = parseInt(m[1]);
						if (!isNaN(num) && num >= 0 && num <= 6) poiSite['cat'].push(num);
					}
				}
			} catch (e) { }
			poiSite['coords'] = {
				x: parseFloat(s.x),
				y: parseFloat(s.y),
				z: parseFloat(s.z),
			};
			formattedBatch.push(poiSite);
		}
		// Append to systemsData for initialization
		canonnEd3d_ts.systemsData.systems.push.apply(canonnEd3d_ts.systemsData.systems, formattedBatch);
		document.getElementById("loading").style.display = "none";
	},

	init: function () {
		// Prefer local surface_sites.json when present. Load data then initialize Ed3d (same pattern as GR)
		fetch('data/surface_sites.json').then(function (r) { return r.json(); }).then(function (json) {
			// Create fixed secondary categories 0..6 (based on leading digit of "New Type/Sub")
			// Labels are: 0 Inactive, 1 Inactive, 2 Inactive, 3 Active, 4 Active, 5 Active, 6 Active
			// Colors: Red shades for inactive (0-2), amber to green for active (3-6)
			var categoryColors = {
				'0': 'A63333',  // Dark red
				'1': 'E63333',  // Red
				'2': 'FF6B6B',  // Light red
				'3': 'FFA500',  // Amber
				'4': 'FFFF00',  // Yellow
				'5': '90EE90',  // Light green
				'6': '00FF00'   // Green
			};
			canonnEd3d_ts.systemsData.categories['Leviathan Count'] = {};
			for (var n = 0; n <= 6; n++) {
				var key = String(n);
				var stateName = (n < 3) ? 'Inactive' : 'Active';
				canonnEd3d_ts.systemsData.categories['Leviathan Count'][key] = {
					name: n + ' ' + stateName,
					color: categoryColors[key]
				};
			}

			// Now format and collect systems
			canonnEd3d_ts.formatLocalSurfaceSites(json);
			// initialize after data collected
			document.getElementById("loading").style.display = "none";
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_ts.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: true,
				showGalaxyInfos: true,
				//setting camera to Merope and adjusting
				playerPos: [-78.59375, -149.625, -340.53125],
				cameraPos: [-78.59375 - 500, -149.625, -340.53125 - 500],
				systemColor: '#FF9D00',
			});
		});
	},
};
