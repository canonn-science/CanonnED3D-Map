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
	tbsites: [],
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

var canonnEd3d_tb = {
	//Define Categories
	systemsData: {
		categories: {
			'Thargoid Barnacles - (TB)': {
				'201': {
					name: 'Mega',
					color: randomColor().replace('#', '').toString()
				},
				'202': {
					name: 'Alpha',
					color: randomColor().replace('#', '').toString()
				},
				'203': {
					name: 'Beta',
					color: randomColor().replace('#', '').toString()
				},
				'204': {
					name: 'Gamma',
					color: randomColor().replace('#', '').toString()
				},
				'205': {
					name: 'Delta',
					color: randomColor().replace('#', '').toString()
				},
				'206': {
					name: 'Epsilon',
					color: randomColor().replace('#', '').toString()
				},
				'207': {
					name: 'Zeta',
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
				if (siteDataBatch[d].subtype.type == 'Mega') {
					poiSite['cat'] = [201];
				} else if (siteDataBatch[d].subtype.type == 'Alpha') {
					poiSite['cat'] = [202];
				} else if (siteDataBatch[d].subtype.type == 'Beta') {
					poiSite['cat'] = [203];
				} else if (siteDataBatch[d].subtype.type == 'Gamma') {
					poiSite['cat'] = [204];
				} else if (siteDataBatch[d].subtype.type == 'Delta') {
					poiSite['cat'] = [205];
				} else if (siteDataBatch[d].subtype.type == 'Epsilon') {
					poiSite['cat'] = [206];
				} else if (siteDataBatch[d].subtype.type == 'Zeta') {
					poiSite['cat'] = [207];
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
			json: canonnEd3d_tb.systemsData,
			withFullscreenToggle: false,
			withHudPanel: true,
			hudMultipleSelect: true,
			effectScaleSystem: [20, 500],
			startAnim: true,
			showGalaxyInfos: true,
			playerPos: [-78.59375, -149.625, -340.53125],
			cameraPos: [-78.59375 - 1000, -149.625, -340.53125 - 1000],
			systemColor: '#FF9D00',
		});
		document.getElementById("loading").style.display = "none";
		streamAllSites(canonnEd3d_tb.formatSitesStream.bind(canonnEd3d_tb));
	},
};
