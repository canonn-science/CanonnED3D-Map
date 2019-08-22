const API_ENDPOINT = `https://api.canonn.tech:2053`;
const API_LIMIT = 750;

const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

let sites = {
	cssites: [],
	fmsites: [],
	gvsites: [],
	gysites: [],
	lssites: [],
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
		let responseKeys = Object.keys(response.data.data);
		await records.push.apply(records, response.data.data[responseKeys[0]]);
		API_START += API_LIMIT;
		if (response.data.data[responseKeys[0]].length < API_LIMIT) {
			keepGoing = false;
			return records;
		}
	}
};

const reqSites = async (API_START, type) => {
	let typeQuery = type;
	let where = {};
	let query = `query ($limit:Int, $start:Int, $where:JSON){ 
    ${typeQuery} (limit: $limit, start: $start, where: $where){ 
      system{ 
        systemName
        edsmCoordX
        edsmCoordY
        edsmCoordZ
      }
    }
  }`;

	let payload = await capi({
		url: '/graphql',
		method: 'post',
		data: {
			query,
			variables: {
				start: API_START,
				limit: API_LIMIT,
				where,
			},
		},
	});

	return payload;
};

var canonnEd3d_geology = {
	//Define Categories
	systemsData: {
		categories: {
			'Crystalline Shards - (CS)': {
				'200': {
					name: 'Crystalline Shards',
					color: '3a185d',
				},
			},
			'Fumaroles - (FM)': {
				'300': {
					name: 'Fumarole',
					color: '3a185d',
				},
			},
			'Gas Vents - (GV)': {
				'400': {
					name: 'Gas Vent',
					color: 'e32bc8',
				},
			},
			'Geysers - (GY)': {
				'500': {
					name: 'Geyser',
					color: '076a48',
				},
			},
			'Lava Spouts - (LS)': {
				'600': {
					name: 'Lava Spout',
					color: 'f86f30',
				},
			},
			'Unknown Type': {
				'2000': {
					name: 'Unknown Site',
					color: 'DC143C',
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
					if (siteTypes[i].toString() == 'cssites') {
						poiSite['cat'] = [200];
					} else if (siteTypes[i].toString() == 'fmsites') {
						poiSite['cat'] = [300];
					} else if (siteTypes[i].toString() == 'gvsites') {
						poiSite['cat'] = [400];
					} else if (siteTypes[i].toString() == 'gysites') {
						poiSite['cat'] = [500];
					} else if (siteTypes[i].toString() == 'lssites') {
						poiSite['cat'] = [600];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_geology.systemsData.systems.push(poiSite);
				}
			}
		}
		resolvePromise();
	},

	init: function() {
		//Sites Data
		var p1 = new Promise(function(resolve, reject) {
			canonnEd3d_geology.formatSites(sites, resolve);
		});

		Promise.all([p1]).then(function() {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_geology.systemsData,
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
