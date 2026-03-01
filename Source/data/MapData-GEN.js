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
	gensites: [],
};

const streamSitesForType = async (type, formatCallback) => {
	let API_START = 0;
	let keepGoing = true;
	while (keepGoing) {
		let response = await reqSites(API_START, type);
		// Call the format callback with this batch and the type
		await formatCallback(response.data, type);
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

var canonnEd3d_gen = {

	//Define Categories
	systemsData: {
		categories: {
			"Generation Ships - (GEN)": {
				"201": {
					name: "Generation Ship",
					color: randomColor().replace('#', '').toString()
				}
			},
			'Unknown Type': {
				'2000': {
					name: 'Unknown Site',
					color: '800000',
				}
			}
		},
		systems: []
	},

	// Lets get data from CSV Files

	formatSitesStream: async function (siteDataBatch, siteType) {
		let formattedBatch = [];
		for (var d = 0; d < siteDataBatch.length; d++) {
			if (siteDataBatch[d].system.systemName && siteDataBatch[d].system.systemName.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = siteDataBatch[d].system.systemName + ' - ' + siteDataBatch[d].shipName;

				//Check Site Type and match categories
				if (siteType == 'gensites') {
					poiSite['cat'] = [201];
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
			json: canonnEd3d_gen.systemsData,
			withFullscreenToggle: false,
			withHudPanel: true,
			hudMultipleSelect: true,
			effectScaleSystem: [20, 500],
			startAnim: false,
			showGalaxyInfos: true,
			cameraPos: [25, 14100, -12900],
			systemColor: '#FF9D00'
		});
		document.getElementById("loading").style.display = "none";
		streamAllSites(canonnEd3d_gen.formatSitesStream.bind(canonnEd3d_gen));
	}
};