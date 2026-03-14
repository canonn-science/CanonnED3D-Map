const API_ENDPOINT = `https://api.canonn.tech`;
const API_LIMIT = 1000;

function signalLink(system, name) {
	return '<a href="https://canonn-science.github.io/canonn-signals/?system=' + system + '"  target="_blank">' + name + '</a></br>'
}


const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

let sites = {
	apsites: [],
};

const streamSitesForType = async (type, formatCallback) => {
	let API_START = 0;
	let keepGoing = true;
	while (keepGoing) {
		let response = await reqSites(API_START, type);
		if (response.data && response.data.length > 0) {
			await formatCallback(response.data);
		}
		API_START += API_LIMIT;
		if (response.data.length < API_LIMIT) {
			keepGoing = false;
		}
		// Yield to allow rendering between batches
		await new Promise(resolve => setTimeout(resolve, 0));
	}
};

const streamAllSites = async (types, formatCallback) => {
	const keys = Object.keys(types);
	for (let key of keys) {
		await streamSitesForType(key, formatCallback);
	}
};

const reqSites = async (API_START, type) => {

	let payload = await capi({
		url: `/${type}?_limit=${API_LIMIT}&_start=${API_START}`,
		method: 'get'
	});

	return payload;
};

var canonnEd3d_ap = {
	//Define Categories
	systemsData: {
		categories: {
			'Amphora Plants - (AP)': {
				'200': {
					name: 'Amphora Plant',
					color: randomColor().replace('#', '').toString(),
				},
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
		// Process a single batch of sites and add to the systems array
		let formattedBatch = [];
		
		for (var d = 0; d < siteDataBatch.length; d++) {
			if (siteDataBatch[d].system.systemName && siteDataBatch[d].system.systemName.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = siteDataBatch[d].system.systemName;
				poiSite["infos"] = signalLink(siteDataBatch[d].system.systemName, siteDataBatch[d].type.type)

				//Check Site Type and match categories
				if (siteDataBatch[d].type.type == 'Amphora Plant') {
					poiSite['cat'] = [200];
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
		
		// Stream this batch to the map immediately - do NOT pass categories as it causes visibility issues
		if (formattedBatch.length > 0) {
			Ed3d.addBatch({
				systems: formattedBatch
			});
		}
	},

	init: function () {
		// Initialize the map immediately with empty data
		Ed3d.init({
			container: 'edmap',
			json: canonnEd3d_ap.systemsData,
			withFullscreenToggle: false,
			withHudPanel: true,
			hudMultipleSelect: true,
			effectScaleSystem: [20, 500],
			startAnim: false,
			showGalaxyInfos: true,
			cameraPos: [25, 14100, -12900],
			systemColor: '#FF9D00',
		});
		
		// Start streaming data immediately after map init
		document.getElementById("loading").style.display = "none";
		streamAllSites(sites, canonnEd3d_ap.formatSitesStream.bind(canonnEd3d_ap));
	},
};

