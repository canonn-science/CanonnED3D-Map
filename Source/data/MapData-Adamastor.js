var canonnEd3d_challenge = {
	//Define Categories
	systemsData: {
		categories: {
			'Challenge': {
				/*'10': {
					name: 'Varati',
					color: 'f5a142',
				},
				'20': {
					name: 'Waypoint',
					color: '42f557',
				},*/

				'30': {
					name: 'Adamastor Initial Route',
					color: 'FF6666',
				},
				'40': {
					name: 'Adamastor Diversion Route',
					color: '66ff66',
				},
				'60': {
					name: 'Intersection',
					color: '666666',
				},
				'70': {
					name: 'Route Through Waypoints ',
					color: '666666',
				},
				'80': {
					name: 'Return Journey',
					color: '446644',
				},
			},
		},
		systems: [],
		"routes": [
			{
				cat: ["30"], 'points': [

					{ 's': 'HIP 33386', 'label': 'HIP 33386' },
					{ 's': 'HIP 39748', 'label': 'HIP 39748' },
					{ 's': 'Chukchan', 'label': 'Chukchan' },

				], 'circle': false
			},
			{
				cat: ["70"], 'points': [
					{ 's': 'Extention1', 'label': 'Extention1' },
					{ 's': 'HIP 33386', 'label': 'HIP 33386' },
					{ 's': 'HIP 39748', 'label': 'HIP 39748' },
					{ 's': 'Extention2', 'label': 'Extention2' },
				], 'circle': false
			},
			{
				cat: ["40"], 'points': [
					{ 's': 'HIP 33386', 'label': 'HIP 33386' },
					{ 's': 'Synuefe XE-Y c17-7', 'label': 'Synuefe XE-Y c17-7' },
					{ 's': 'Musca Dark Region PJ-P B6-1', 'label': 'Musca Dark Region PJ-P B6-1' },
					{ 's': 'HIP 69200', 'label': 'HIP 69200' },
				], 'circle': false
			},
			{
				cat: ["80"], 'points': [
					{ 's': 'Chukchan', 'label': 'Chukchan' },
					{ 's': 'HIP 69200', 'label': 'HIP 69200' },
				], 'circle': false
			},
			{
				cat: ["50"], 'points': [
					{ 's': 'HIP 39748', 'label': 'HIP 39748' },
					{ 's': 'Chukchan', 'label': 'Chukchan' },
				], 'circle': false
			},
			{
				cat: ["60"], 'points': [

					{ 's': 'Chukchan', 'label': 'Chukchan' },
					{ 's': 'Route Intersection', 'label': 'Route Intersection' },
					{ 's': 'HIP 69200', 'label': 'HIP 69200' },
				], 'circle': false
			},
		]
	},

	formatChallenge: function (data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].name && data[i].name.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = data[i].name;
				poiSite['infos'] = data[i].infos + '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i].name + '">EDSM</a><br/><a href="https://tools.canonn.tech/Signals/?system=' + data[i].name + '">Signals</a>';
				//Check Site Type and match categories

				var component = data[i].name.split(' ');
				if (poiSite['name'] == 'Varati') {
					poiSite['details'] == 'Start and Finish';
					poiSite['cat'] = [10];

				} else {
					poiSite['cat'] = [20];
				}

				poiSite['url'] = "https://tools.canonn.tech/Signals/?system=" + poiSite['name']
				poiSite['coords'] = {
					x: parseFloat(data[i].pos_x),
					y: parseFloat(data[i].pos_y),
					z: parseFloat(data[i].pos_z),
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_challenge.systemsData.systems.push(poiSite);
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
			canonnEd3d_challenge.parseCSVData('data/csvCache/adamastor.csv', canonnEd3d_challenge.formatChallenge, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_challenge.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: true,
				playerPos: [142, 56, 40],
				cameraPos: [218, 1000, -279],
				systemColor: '#FF9D00',
			});
		});
	},
};
