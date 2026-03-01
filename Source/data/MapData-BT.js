const API_ENDPOINT = `https://api.canonn.tech`;
const API_LIMIT = 1000;

function signalLink(system, name) {
	return '<a href="https://canonn-science.github.io/canonn-signals/?system=' + system + '"  target="_blank">' + name + '</a></br>'
}


const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		"Accept": 'application/json',
	},
});

let sites = {
	btsites: [],
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

var canonnEd3d_bt = {
	//Define Categories
	systemsData: {
		categories: {
			'Brain Trees - (BT)': {
				'201': {
					name: 'Roseum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'202': {
					name: 'Gypseeum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'203': {
					name: 'Ostrinum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'204': {
					name: 'Viride Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'205': {
					name: 'Lividum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'206': {
					name: 'Aureum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'207': {
					name: 'Puniceum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'208': {
					name: 'Lindigoticum Brain Tree',
					color: randomColor().replace('#', '').toString()
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

				//Check Site Type and match categories
				if (siteDataBatch[d].type.type == 'Roseum Brain Tree') {
					poiSite['cat'] = [201];
				} else if (siteDataBatch[d].type.type == 'Gypseeum Brain Tree') {
					poiSite['cat'] = [202];
				} else if (siteDataBatch[d].type.type == 'Ostrinum Brain Tree') {
					poiSite['cat'] = [203];
				} else if (siteDataBatch[d].type.type == 'Viride Brain Tree') {
					poiSite['cat'] = [204];
				} else if (siteDataBatch[d].type.type == 'Lividum Brain Tree') {
					poiSite['cat'] = [205];
				} else if (siteDataBatch[d].type.type == 'Aureum Brain Tree') {
					poiSite['cat'] = [206];
				} else if (siteDataBatch[d].type.type == 'Puniceum Brain Tree') {
					poiSite['cat'] = [207];
				} else if (siteDataBatch[d].type.type == 'Lindigoticum Brain Tree') {
					poiSite['cat'] = [208];
				} else {
					poiSite['cat'] = [2000];
				}
				poiSite['infos'] = signalLink(siteDataBatch[d].system.systemName, siteDataBatch[d].type.type)
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
			json: canonnEd3d_bt.systemsData,
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
		streamAllSites(sites, canonnEd3d_bt.formatSitesStream.bind(canonnEd3d_bt));
	},
};
