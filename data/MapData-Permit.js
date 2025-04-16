var canonnEd3d_permit = {
	//Define Categories
	systemsData: {
		categories: {
			'Permit Locked Regions': {
				'1070': {
					name: 'Col 70 Sector',
					color: '442299',
				},
				'1097': {
					name: 'Col 97 Sector',
					color: '4444dd',
				},
				'1121': {
					name: 'Col 121 Sector',
					color: '11aabb',
				},
				'2000': {
					name: 'Cone Sector',
					color: '22ccaa',
				},
				'3000': {
					name: 'Horsehead Dark Sector',
					color: 'a6cc33',
				},
				'4000': {
					name: 'M41',
					color: '69d025',
				},
				'6647': {
					name: 'NGC 1647',
					color: 'aacc22',
				},
				'7264': {
					name: 'NGC 2264',
					color: 'd0c310',
				},
				'7286': {
					name: 'NGC 2286',
					color: 'ccbb33',
				},
				'8603': {
					name: 'NGC 3603',
					color: 'ff9933',
				},
			},
		},
		systems: [],
	},

	formatCol: function (data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].name && data[i].name.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = data[i].name;

				//Check Site Type and match categories

				var component = data[i].name.split(' ');
				if (component[0] == 'Col') {
					poiSite['cat'] = [1000 + parseInt(component[1])];
				}
				if (component[0] == 'Cone') {
					poiSite['cat'] = [2000];
				}
				if (component[0] == 'Horsehead') {
					poiSite['cat'] = [3000];
				}
				if (component[0] == 'M41') {
					poiSite['cat'] = [4000];
				}
				if (component[0] == 'NGC') {
					poiSite['cat'] = [5000 + parseInt(component[1])];
				}

				poiSite['coords'] = {
					x: parseFloat(data[i].pos_x),
					y: parseFloat(data[i].pos_y),
					z: parseFloat(data[i].pos_z),
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_permit.systemsData.systems.push(poiSite);
			}
		}
	},

	parseCSVData: function (url, callBack, resolvePromise) {
		Papa.parse(url, {
			download: true,
			header: true,
			complete: function (results) {
				callBack(results.data);

				// after we called the callback
				// (which is synchronous, so we know it's safe here)
				// we can resolve the promise

				document.getElementById("loading").style.display = "none";
				resolvePromise();
			},
		});
	},

	init: function () {
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_permit.parseCSVData('data/csvCache/col70.csv', canonnEd3d_permit.formatCol, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_permit.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: true,
				showGalaxyInfos: true,
				playerPos: [687.0625, -362.53125, -697.0625],
				cameraPos: [687.0625, -362.53125, -697.0625 - 3000],
				systemColor: '#FF9D00',
			});
		});
	},
};
