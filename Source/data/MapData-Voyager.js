var canonnEd3d_voyager = {

	//Define Categories
	systemsData: {
		categories: {
			'Sol': {
				'10': {
					name: 'Sol',
					color: 'FFD700',
				},
			},
			'Voyager Systems': {
				'0': {
					name: 'Voyager System',
					color: 'FFFFFF',
				},
			},
			'Route Lines': {
				'1': {
					name: 'Present in Galaxy',
					color: '00AAFF',
				},
				'2': {
					name: 'No Longer Present',
					color: '8B0000',
				},
			},
		},
		systems: [],
		routes: [],
	},

	formatCol: function (data) {
		// Add Sol as a special system (not part of Present/Missing categories)
		canonnEd3d_voyager.systemsData.systems.push({
			name: 'Sol',
			cat: ['10'],
			infos: 'The Cradle of Humanity',
			coords: { x: 0, y: 0, z: 0 },
		});

		for (var i = 0; i < data.length; i++) {
			var row = data[i];
			if (!row.systemName || row.systemName.trim() === '') continue;

			// Skip Sol row in the CSV
			if (row.systemName.trim().toLowerCase() === 'sol') continue;

			var name = row.systemName.trim();
			var x = parseFloat(row.x);
			var y = parseFloat(row.y);
			var z = parseFloat(row.z);

			if (isNaN(x) || isNaN(y) || isNaN(z)) continue;

			var isPresent = row.present && row.present.trim().toUpperCase() === 'Y';
			var cat = isPresent ? '1' : '2';

			var info = row.information ? row.information.trim() : '';
			var infoHtml = info ? info + '<br>' : '';
			infoHtml += '<a href="https://canonn-science.github.io/canonn-signals/?system=' + encodeURIComponent(name) + '" target="_blank" rel="noopener">Canonn Signals</a>';

			// Add system marker — white dot, category '0'
			canonnEd3d_voyager.systemsData.systems.push({
				name: name,
				cat: ['0'],
				infos: infoHtml,
				coords: { x: x, y: y, z: z },
			});

			// Add route line from Sol to this system, with a ring at each end
			canonnEd3d_voyager.systemsData.routes.push({
				cat: [cat],
				points: [
					{ s: 'Sol', label: 'Sol' },
					{ s: name, label: name },
				],
				circle: false,
			});
		}
	},

	parseCSVData: function (url, callBack, resolvePromise) {
		Papa.parse(url, {
			download: true,
			header: true,
			complete: function (results) {
				callBack(results.data);
				document.getElementById("loading").style.display = "none";
				resolvePromise();
			},
		});
	},

	init: function () {
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_voyager.parseCSVData('data/csvCache/voyager.csv', canonnEd3d_voyager.formatCol, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_voyager.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: true,
				// Camera centred on Sol but zoomed out to fit all points (~17,000 LY radius)
				playerPos: [0, 0, 0],
				cameraPos: [0, 8000, -20000],
				systemColor: '#FF9D00',
			});
		});
	},
};
