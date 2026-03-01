const API_ENDPOINT = `https://api.canonn.tech`;
const API_LIMIT = 1000;

const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

let sites = {
	gysites: [],
};

const streamSitesForType = async (type, formatCallback) => {
	let API_START = 0;
	let keepGoing = true;
	while (keepGoing) {
		let response = await reqSites(API_START, type);
		// Call the format callback with this batch
		await formatCallback(response.data);
		API_START += API_LIMIT;
		if (response.data.length < API_LIMIT) {
			keepGoing = false;
		}
		// Yield to event loop after each batch
		await new Promise(resolve => setTimeout(resolve, 0));
	}
};

const streamAllSites = async (callback) => {
	const types = Object.keys(sites);
	for (const type of types) {
		await streamSitesForType(type, callback);
	}
};

const reqSites = async (API_START, type) => {

	let payload = await capi({
		url: `/${type}?_limit=${API_LIMIT}&_start=${API_START}`,
		method: 'get'
	});

	return payload;
};

var canonnEd3d_gy = {
	//Define Categories
	systemsData: {
		categories: {
			'Geysers - (GY)': {
				'201': {
					name: 'Water Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'202': {
					name: 'Water Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'203': {
					name: 'Carbon Dioxide Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'204': {
					name: 'Ammonia Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'205': {
					name: 'Methane Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'206': {
					name: 'Nitrogen Ice Geyser',
					color: randomColor().replace('#', '').toString()
				}
			},
			'Unknown Type': {
				'2000': {
					name: 'Unknown Site',
					color: '800000',
				},
			},
		},
		systems: [],
	},

	formatSitesStream: async function (siteDataBatch) {
		let formattedBatch = [];
		for (var d = 0; d < siteDataBatch.length; d++) {
			if (siteDataBatch[d].system.systemName && siteDataBatch[d].system.systemName.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = siteDataBatch[d].system.systemName;

				//Check Site Type and match categories
				if (siteDataBatch[d].type.type == 'Water Geyser') {
					poiSite['cat'] = [201];
				} else if (siteDataBatch[d].type.type == 'Water Ice Geyser') {
					poiSite['cat'] = [202];
				} else if (siteDataBatch[d].type.type == 'Carbon Dioxide Ice Geyser') {
					poiSite['cat'] = [203];
				} else if (siteDataBatch[d].type.type == 'Ammonia Ice Geyser') {
					poiSite['cat'] = [204];
				} else if (siteDataBatch[d].type.type == 'Methane Ice Geyser') {
					poiSite['cat'] = [205];
				} else if (siteDataBatch[d].type.type == 'Nitrogen Ice Geyser') {
					poiSite['cat'] = [206];
				} else {
					poiSite['cat'] = [2000];
				}
				poiSite['coords'] = {
					x: parseFloat(siteDataBatch[d].system.edsmCoordX),
					y: parseFloat(siteDataBatch[d].system.edsmCoordY),
					z: parseFloat(siteDataBatch[d].system.edsmCoordZ),
				};

				formattedBatch.push(poiSite);
			}
		}
		Ed3d.addBatch({systems: formattedBatch});
	},

	init: function () {
		Ed3d.init({
			container: 'edmap',
			json: canonnEd3d_gy.systemsData,
			withFullscreenToggle: false,
			withHudPanel: true,
			hudMultipleSelect: true,
			effectScaleSystem: [20, 500],
			startAnim: false,
			showGalaxyInfos: true,
			cameraPos: [25, 14100, -12900],
			systemColor: '#FF9D00',
		});
		document.getElementById("loading").style.display = "none";
		streamAllSites(canonnEd3d_gy.formatSitesStream.bind(canonnEd3d_gy));
	},
};
