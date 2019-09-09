const API_ENDPOINT = `https://api.canonn.tech`;
const API_LIMIT = 1000;

const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

let sites = {
	fgsites: [],
};

const go = async types => {
	let typeKeys = Object.keys(types);
	// loop through types to get all the data
	for (i = 0; i < typeKeys.length; i++) {
		sites[typeKeys[i]] = await getSites(typeKeys[i]);
	}

	return sites;
};

const getSites = async type => {
	let records = [];
	let keepGoing = true;
	let API_START = 0;
	while (keepGoing) {
		let response = await reqSites(API_START, type);
		await records.push.apply(records, response.data);
		API_START += API_LIMIT;
		if (response.data.length < API_LIMIT) {
			keepGoing = false;
			return records;
		}
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

	formatSites: async function(data, resolvePromise) {
		await go(data);

		let siteTypes = Object.keys(data);

		for (var i = 0; i < siteTypes.length; i++) {
			for (var d = 0; d < sites[siteTypes[i]].length; d++) {
				let siteData = sites[siteTypes[i]];
				if (siteData[d].system.systemName && siteData[d].system.systemName.replace(' ', '').length > 1) {
					var poiSite = {};
					poiSite['name'] = siteData[d].system.systemName;

					//Check Site Type and match categories
					if (siteData[d].type.type == 'Luteolum Anemone') {
						poiSite['cat'] = [201];
					} else if (siteData[d].type.type == 'Croceum Anemone') {
						poiSite['cat'] = [202];
					} else if (siteData[d].type.type == 'Puniceum Anemone') {
						poiSite['cat'] = [203];
					} else if (siteData[d].type.type == 'Roseum Anemone') {
						poiSite['cat'] = [204];
					} else if (siteData[d].type.type == 'Blatteum Bioluminescent Anemone') {
						poiSite['cat'] = [205];
					} else if (siteData[d].type.type == 'Rubeum Bioluminescent Anemone') {
						poiSite['cat'] = [206];
					} else if (siteData[d].type.type == 'Prasinum Bioluminescent Anemone') {
						poiSite['cat'] = [207];
					} else if (siteData[d].type.type == 'Roseum Bioluminescent Anemone') {
						poiSite['cat'] = [208];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_fg.systemsData.systems.push(poiSite);
				}
			}
		}
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	init: function() {
		//Sites Data
		var p1 = new Promise(function(resolve, reject) {
			canonnEd3d_fg.formatSites(sites, resolve);
		});

		Promise.all([p1]).then(function() {
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
		});
	},
};
