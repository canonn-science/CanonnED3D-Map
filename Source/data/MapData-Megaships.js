const MEGASHIPS_DATA_URL = 'https://storage.googleapis.com/canonn-downloads/megaships.json';

var canonnEd3d_megaships = {

	systemsData: {
		categories: {
			'Megaships': {
				'201': {
					name: 'Megaship',
					color: '00BFFF',
				}
			}
		},
		systems: [],
		routes: [],
	},

	init: function () {
		fetch(MEGASHIPS_DATA_URL)
			.then(function (response) { return response.json(); })
			.then(function (data) {
				var ships = data;

				for (var i = 0; i < ships.length; i++) {
					var ship = ships[i];
					var shipName = ship['POI Name'];
					var systemName = ship['System'];
					var body = ship['Body'];
					var displayName = shipName + ' (' + systemName + ')';

					// Add the megaship as a system point
					canonnEd3d_megaships.systemsData.systems.push({
						name: displayName,
						cat: [201],
						coords: {
							x: parseFloat(ship['X']),
							y: parseFloat(ship['Y']),
							z: parseFloat(ship['Z']),
						},
						infos: '<b>' + shipName + '</b><br>System: ' + systemName + '<br>Body: ' + body,
					});
				}

				Ed3d.init({
					container: 'edmap',
					json: canonnEd3d_megaships.systemsData,
					withFullscreenToggle: false,
					withHudPanel: true,
					hudMultipleSelect: true,
					effectScaleSystem: [20, 500],
					startAnim: false,
					showGalaxyInfos: true,
					cameraPos: [0, 250, -500],
					systemColor: '#FF9D00',
				});

				document.getElementById('loading').style.display = 'none';
			})
			.catch(function (err) {
				console.error('Failed to load megaships data:', err);
			});
	}
};
