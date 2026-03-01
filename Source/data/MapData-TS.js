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
	tssites: [],
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

var canonnEd3d_ts = {
	//Define Categories
	systemsData: {
		categories: {
			'Thargoid Structures - (TS)': {
				'201': {
					name: 'Active',
					color: '008000',
				},
				'202': {
					name: 'Inactive',
					color: '800000',
				}
			}
		},
		systems: [],
	},
	startcoords: [],
	formatSitesStream: async function (siteDataBatch) {
		let formattedBatch = [];
		for (var d = 0; d < siteDataBatch.length; d++) {
			if (siteDataBatch[d].system.systemName && siteDataBatch[d].system.systemName.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = siteDataBatch[d].system.systemName;

				//Check Site Type and match categories
				if (siteDataBatch[d].status.status == 'Active') {
					poiSite['cat'] = [201];
				} else {
					poiSite['cat'] = [202];
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
		document.getElementById("loading").style.display = "none";
		streamAllSites(canonnEd3d_ts.formatSitesStream.bind(canonnEd3d_ts));
	},
};
