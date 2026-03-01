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
	fgsites: [],
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

var canonnEd3d_fg = {
	//Define Categories
	systemsData: {
		categories: {
			'Fungal Gourds - (FG)': {
				'201': {
					name: 'Luteolum Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'202': {
					name: 'Croceum Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'203': {
					name: 'Puniceum Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'204': {
					name: 'Roseum Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'205': {
					name: 'Blatteum Bioluminescent Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'206': {
					name: 'Rubeum Bioluminescent Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'207': {
					name: 'Prasinum Bioluminescent Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'208': {
					name: 'Roseum Bioluminescent Anemone',
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
		let formattedBatch = [];
		for (var d = 0; d < siteDataBatch.length; d++) {
			if (siteDataBatch[d].system.systemName && siteDataBatch[d].system.systemName.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = siteDataBatch[d].system.systemName;

				//Check Site Type and match categories
				if (siteDataBatch[d].type.type == 'Luteolum Anemone') {
					poiSite['cat'] = [201];
				} else if (siteDataBatch[d].type.type == 'Croceum Anemone') {
					poiSite['cat'] = [202];
				} else if (siteDataBatch[d].type.type == 'Puniceum Anemone') {
					poiSite['cat'] = [203];
				} else if (siteDataBatch[d].type.type == 'Roseum Anemone') {
					poiSite['cat'] = [204];
				} else if (siteDataBatch[d].type.type == 'Blatteum Bioluminescent Anemone') {
					poiSite['cat'] = [205];
				} else if (siteDataBatch[d].type.type == 'Rubeum Bioluminescent Anemone') {
					poiSite['cat'] = [206];
				} else if (siteDataBatch[d].type.type == 'Prasinum Bioluminescent Anemone') {
					poiSite['cat'] = [207];
				} else if (siteDataBatch[d].type.type == 'Roseum Bioluminescent Anemone') {
					poiSite['cat'] = [208];
				} else {
					poiSite['cat'] = [2000];
				}
				poiSite['coords'] = {
					x: parseFloat(siteDataBatch[d].system.edsmCoordX),
					y: parseFloat(siteDataBatch[d].system.edsmCoordY),
					z: parseFloat(siteDataBatch[d].system.edsmCoordZ),
				};
				poiSite["infos"] = signalLink(siteDataBatch[d].system.systemName, siteDataBatch[d].type.type)
				formattedBatch.push(poiSite);
			}
		}
		Ed3d.addBatch({systems: formattedBatch});
	},

	init: function () {
		Ed3d.init({
			container: 'edmap',
			json: canonnEd3d_fg.systemsData,
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
		streamAllSites(canonnEd3d_fg.formatSitesStream.bind(canonnEd3d_fg));
	},,
};
