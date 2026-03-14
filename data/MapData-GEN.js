const GEN_DATA_URL = 'https://storage.googleapis.com/canonn-downloads/generationships.json';

var canonnEd3d_gen = {

	systemsData: {
		categories: {
			'Sol': {
				'100': {
					name: 'Sol',
					color: 'FFD700',
				}
			},
			'Generation Ships': {
				'201': {
					name: 'Generation Ship',
					color: 'FF6600',
				}
			}
		},
		systems: [],
		routes: [],
	},

	init: function () {
		fetch(GEN_DATA_URL)
			.then(function (response) { return response.json(); })
			.then(function (data) {
				var ships = data;

				// Add Sol as the common origin
				canonnEd3d_gen.systemsData.systems.push({
					name: 'Sol',
					cat: [100],
					coords: { x: 0, y: 0, z: 0 },
					infos: 'Sol &mdash; Origin of the Generation Ships',
				});

				for (var i = 0; i < ships.length; i++) {
					var ship = ships[i];
					var shipName = ship['POI Name'];
					var systemName = ship['System'];
					var body = ship['Body'];
					var displayName = shipName + ' (' + systemName + ')';

					// Add the generation ship as a system point
					canonnEd3d_gen.systemsData.systems.push({
						name: displayName,
						cat: [201],
						coords: {
							x: parseFloat(ship['X']),
							y: parseFloat(ship['Y']),
							z: parseFloat(ship['Z']),
						},
						infos: '<b>' + shipName + '</b><br>System: ' + systemName + '<br>Body: ' + body,
					});

					// Add a route from Sol to this generation ship
					canonnEd3d_gen.systemsData.routes.push({
						points: [
							{ s: 'Sol', label: 'Sol' },
							{ s: displayName, label: shipName },
						],
						circle: false,
					});
				}

				Ed3d.init({
					container: 'edmap',
					json: canonnEd3d_gen.systemsData,
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
				console.error('Failed to load generationships data:', err);
			});
	}
};