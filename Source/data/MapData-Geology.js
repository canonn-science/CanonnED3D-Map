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
			type {
				type
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
				'201': {
					name: 'Crystalline Shards',
					color: '3a185d',
				},
				'202': {
					name: 'Unknown CS',
					color: 'DC143C',
				}
			},
			'Fumaroles - (FM)': {
				'301': {
					name: 'Sulphur Dioxide Fumarole',
					color: 'ff66cc',
				},
				'302': {
					name: 'Water Fumarole',
					color: 'ff66cc',
				},
				'303': {
					name: 'Silicate Vapour Fumarole',
					color: 'ff66cc',
				},
				'304': {
					name: 'Sulphur Dioxide Ice Fumarole',
					color: 'ff66cc',
				},
				'305': {
					name: 'Water Ice Fumarole',
					color: 'ff66cc',
				},
				'306': {
					name: 'Carbon Dioxide Ice Fumarole',
					color: 'ff66cc',
				},
				'307': {
					name: 'Ammonia Ice Fumarole',
					color: 'ff66cc',
				},
				'308': {
					name: 'Methane Ice Fumarole',
					color: 'ff66cc',
				},
				'309': {
					name: 'Nitrogen Ice Fumarole',
					color: 'ff66cc',
				},
				'310': {
					name: 'Silicate Vapour Ice Fumarole',
					color: 'ff66cc',
				},
				'311': {
					name: 'Unknown FM',
					color: 'DC143C',
				}
			},
			'Gas Vents - (GV)': {
				'401': {
					name: 'Sulphur Dioxide Gas Vent',
					color: 'ff66cc',
				},
				'402': {
					name: 'Water Gas Vent',
					color: 'ff66cc',
				},
				'403': {
					name: 'Carbon Dioxide Gas Vent',
					color: 'ff66cc',
				},
				'404': {
					name: 'Silicate Vapour Gas Vent',
					color: 'ff66cc',
				},
				'405': {
					name: 'Unknown GV',
					color: 'DC143C',
				}
			},
			'Geysers - (GY)': {
				'501': {
					name: 'Water Geyser',
					color: 'ff66cc',
				},
				'502': {
					name: 'Water Ice Geyser',
					color: 'ff66cc',
				},
				'503': {
					name: 'Carbon Dioxide Ice Geyser',
					color: 'ff66cc',
				},
				'504': {
					name: 'Ammonia Ice Geyser',
					color: 'ff66cc',
				},
				'505': {
					name: 'Methane Ice Geyser',
					color: 'ff66cc',
				},
				'506': {
					name: 'Nitrogen Ice Geyser',
					color: 'ff66cc',
				},
				'507': {
					name: 'Unknown GY',
					color: 'DC143C',
				}
			},
			'Lava Spouts - (LS)': {
				'601': {
					name: 'Silicate Magma Lava Spout',
					color: 'ff66cc',
				},
				'602': {
					name: 'Iron Magma Lava Spout',
					color: 'ff66cc',
				},
				'603': {
					name: 'Unknown LS',
					color: 'DC143C',
				}
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
					if (siteTypes[i] == 'cssites' && siteData[d].type.type == 'Crystalline Shards') {
						poiSite['cat'] = [201];
					} else if (siteTypes[i] == 'cssites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [202];
					} else if (siteTypes[i] == 'fmsites' && siteData[d].type.type == 'Sulphur Dioxide Fumarole') {
						poiSite['cat'] = [301];
					} else if (siteTypes[i] == 'fmsites' && siteData[d].type.type == 'Water Fumarole') {
						poiSite['cat'] = [302];
					} else if (siteTypes[i] == 'fmsites' && siteData[d].type.type == 'Silicate Vapour Fumarole') {
						poiSite['cat'] = [303];
					} else if (siteTypes[i] == 'fmsites' && siteData[d].type.type == 'Sulphur Dioxide Ice Fumarole') {
						poiSite['cat'] = [304];
					} else if (siteTypes[i] == 'fmsites' && siteData[d].type.type == 'Water Ice Fumarole') {
						poiSite['cat'] = [305];
					} else if (siteTypes[i] == 'fmsites' && siteData[d].type.type == 'Carbon Dioxide Ice Fumarole') {
						poiSite['cat'] = [306];
					} else if (siteTypes[i] == 'fmsites' && siteData[d].type.type == 'Ammonia Ice Fumarole') {
						poiSite['cat'] = [307];
					} else if (siteTypes[i] == 'fmsites' && siteData[d].type.type == 'Methane Ice Fumarole') {
						poiSite['cat'] = [308];
					} else if (siteTypes[i] == 'fmsites' && siteData[d].type.type == 'Nitrogen Ice Fumarole') {
						poiSite['cat'] = [309];
					} else if (siteTypes[i] == 'fmsites' && siteData[d].type.type == 'Silicate Vapour Ice Fumarole') {
						poiSite['cat'] = [310];
					} else if (siteTypes[i] == 'fmsites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [311];
					} else if (siteTypes[i] == 'gvsites' && siteData[d].type.type == 'Sulphur Dioxide Gas Vent') {
						poiSite['cat'] = [401];
					} else if (siteTypes[i] == 'gvsites' && siteData[d].type.type == 'Water Gas Vent') {
						poiSite['cat'] = [402];
					} else if (siteTypes[i] == 'gvsites' && siteData[d].type.type == 'Carbon Dioxide Gas Vent') {
						poiSite['cat'] = [403];
					} else if (siteTypes[i] == 'gvsites' && siteData[d].type.type == 'Silicate Vapour Gas Vent') {
						poiSite['cat'] = [404];
					} else if (siteTypes[i] == 'gvsites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [405];
					} else if (siteTypes[i] == 'gysites' && siteData[d].type.type == 'Water Geyser') {
						poiSite['cat'] = [501];
					} else if (siteTypes[i] == 'gysites' && siteData[d].type.type == 'Water Ice Geyser') {
						poiSite['cat'] = [502];
					} else if (siteTypes[i] == 'gysites' && siteData[d].type.type == 'Carbon Dioxide Ice Geyser') {
						poiSite['cat'] = [503];
					} else if (siteTypes[i] == 'gysites' && siteData[d].type.type == 'Ammonia Ice Geyser') {
						poiSite['cat'] = [504];
					} else if (siteTypes[i] == 'gysites' && siteData[d].type.type == 'Methane Ice Geyser') {
						poiSite['cat'] = [505];
					} else if (siteTypes[i] == 'gysites' && siteData[d].type.type == 'Nitrogen Ice Geyser') {
						poiSite['cat'] = [506];
					} else if (siteTypes[i] == 'gysites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [507];
					} else if (siteTypes[i] == 'lssites' && siteData[d].type.type == 'Silicate Magma Lava Spout') {
						poiSite['cat'] = [601];
					} else if (siteTypes[i] == 'lssites' && siteData[d].type.type == 'Iron Magma Lava Spout') {
						poiSite['cat'] = [602];
					} else if (siteTypes[i] == 'lssites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [603];
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
