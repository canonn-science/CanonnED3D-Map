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
	cssites: [],
	fmsites: [],
	gvsites: [],
	gysites: [],
	lssites: [],
};

const go = async types => {
	const keys = Object.keys(types);
	return (await Promise.all(
		keys.map(type => getSites(type))
	)).reduce((acc, res, i) => {
		acc[keys[i]] = res;
		return acc;
	}, {});
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

var canonnEd3d_geology = {
	//Define Categories
	systemsData: {
		categories: {
			'Crystalline Shards - (CS)': {
				'201': {
					name: 'Crystalline Shards',
					color: randomColor().replace('#', '').toString()
				},
				'202': {
					name: 'Unknown CS',
					color: '800000',
				}
			},
			'Fumaroles - (FM)': {
				'301': {
					name: 'Sulphur Dioxide Fumarole',
					color: randomColor().replace('#', '').toString()
				},
				'302': {
					name: 'Water Fumarole',
					color: randomColor().replace('#', '').toString()
				},
				'303': {
					name: 'Silicate Vapour Fumarole',
					color: randomColor().replace('#', '').toString()
				},
				'304': {
					name: 'Sulphur Dioxide Ice Fumarole',
					color: randomColor().replace('#', '').toString()
				},
				'305': {
					name: 'Water Ice Fumarole',
					color: randomColor().replace('#', '').toString()
				},
				'306': {
					name: 'Carbon Dioxide Ice Fumarole',
					color: randomColor().replace('#', '').toString()
				},
				'307': {
					name: 'Ammonia Ice Fumarole',
					color: randomColor().replace('#', '').toString()
				},
				'308': {
					name: 'Methane Ice Fumarole',
					color: randomColor().replace('#', '').toString()
				},
				'309': {
					name: 'Nitrogen Ice Fumarole',
					color: randomColor().replace('#', '').toString()
				},
				'310': {
					name: 'Silicate Vapour Ice Fumarole',
					color: randomColor().replace('#', '').toString()
				},
				'311': {
					name: 'Unknown FM',
					color: '800000',
				}
			},
			'Gas Vents - (GV)': {
				'401': {
					name: 'Sulphur Dioxide Gas Vent',
					color: randomColor().replace('#', '').toString()
				},
				'402': {
					name: 'Water Gas Vent',
					color: randomColor().replace('#', '').toString()
				},
				'403': {
					name: 'Carbon Dioxide Gas Vent',
					color: randomColor().replace('#', '').toString()
				},
				'404': {
					name: 'Silicate Vapour Gas Vent',
					color: randomColor().replace('#', '').toString()
				},
				'405': {
					name: 'Unknown GV',
					color: '800000',
				}
			},
			'Geysers - (GY)': {
				'501': {
					name: 'Water Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'502': {
					name: 'Water Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'503': {
					name: 'Carbon Dioxide Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'504': {
					name: 'Ammonia Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'505': {
					name: 'Methane Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'506': {
					name: 'Nitrogen Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'507': {
					name: 'Unknown GY',
					color: '800000',
				}
			},
			'Lava Spouts - (LS)': {
				'601': {
					name: 'Silicate Magma Lava Spout',
					color: randomColor().replace('#', '').toString()
				},
				'602': {
					name: 'Iron Magma Lava Spout',
					color: randomColor().replace('#', '').toString()
				},
				'603': {
					name: 'Unknown LS',
					color: '800000',
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

	formatSites: async function (data, resolvePromise) {
		sites = await go(data);

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
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	init: function () {
		//Sites Data
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_geology.formatSites(sites, resolve);
		});

		Promise.all([p1]).then(function () {
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
