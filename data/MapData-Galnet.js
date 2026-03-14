// MapData-Galnet.js
// Fetches galnet relay stations from canonn-downloads and plots them on the ED3D map.
// Pin label format: Station Name (SystemName)

var canonnEd3d_galnet = {

	systemsData: {
		categories: {
			'Galnet Relay': {
				'01': {
					name: 'Galnet News Digest',
					color: 'f5a142',
				},
				'02': {
					name: 'All Names',
					color: '42b0f5',
				},
			},
		},
		systems: [],
		routes: [],
	},

	formatData: function (data) {
		for (var i = 0; i < data.length; i++) {
			var row = data[i];

			var pinName = row.Station + ' (' + row.System + ')';
			var isDigest = row.Station.trim() === 'Galnet News Digest';

			var poiSite = {
				name: pinName,
				cat: [isDigest ? '01' : '02'],
				infos: '<b>' + row.Station + '</b><br>'
					+ 'System: ' + row.System + '<br>'
					+ '<br>'
					+ '<a href="https://inara.cz/elite/starsystem/?search='
					+ encodeURIComponent(row.System)
					+ '" target="_blank">Inara</a>',
				coords: {
					x: parseFloat(row.X),
					y: parseFloat(row.Y),
					z: parseFloat(row.Z),
				},
			};

			canonnEd3d_galnet.systemsData.systems.push(poiSite);
		}
	},

	init: function () {
		fetch('https://storage.googleapis.com/canonn-downloads/galnet.json')
			.then(function (response) {
				if (!response.ok) {
					throw new Error('Failed to fetch galnet.json – status ' + response.status);
				}
				return response.json();
			})
			.then(function (data) {
				canonnEd3d_galnet.formatData(data);

				document.getElementById('loading').style.display = 'none';

				Ed3d.init({
					container: 'edmap',
					json: canonnEd3d_galnet.systemsData,
					withFullscreenToggle: false,
					withHudPanel: true,
					hudMultipleSelect: true,
					effectScaleSystem: [20, 500],
					startAnim: true,
					showGalaxyInfos: true,
					systemColor: '#FF9D00',
				});
			})
			.catch(function (err) {
				console.error('galnet: error loading data –', err);
				document.getElementById('loading').style.display = 'none';
			});
	},
};

canonnEd3d_galnet.init();
