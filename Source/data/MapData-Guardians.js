const API_ENDPOINT = `https://api.canonn.tech`;
const API_LIMIT = 100;

const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

let sites = {
	btsites: [],
	gbsites: [],
	grsites: [],
	gssites: [],
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

	let gbquery = `query ($limit:Int, $start:Int, $where:JSON){ 
    ${typeQuery} (limit: $limit, start: $start, where: $where){ 
      system{ 
        systemName
        edsmCoordX
        edsmCoordY
        edsmCoordZ
			}
    }
	}`;
	
	let newQuery = null;
	if (type == 'gbsites') {
		newQuery = gbquery;
	} else {
		newQuery = query;
	}

	let payload = await capi({
		url: '/graphql',
		method: 'post',
		data: {
			query: newQuery,
			variables: {
				start: API_START,
				limit: API_LIMIT,
				where,
			},
		},
	});

	return payload;
};

var canonnEd3d_guardians = {

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
				'209': {
					name: 'Unknown BT',
					color: '800000',
				}
			},
			"Guardian Beacons - (GB)": {
				"301": {
					name: "Beacon",
					color: randomColor().replace('#', '').toString()
				}
			},
			"Guardian Ruins - (GR)": {
				"401": {
					name: "Alpha",
					color: randomColor().replace('#', '').toString()
				},
				"402": {
					name: "Beta",
					color: randomColor().replace('#', '').toString()
				},
				"403": {
					name: "Gamma",
					color: randomColor().replace('#', '').toString()
				},
				"404": {
					name: "Unknown GR",
					color: "800000"
				}
			},
			"Guardian Structures - (GS)": {
				"501": {
					name: "Lacrosse",
					color: randomColor().replace('#', '').toString()
				},
				"502": {
					name: "Crossroads",
					color: randomColor().replace('#', '').toString()
				},
				"503": {
					name: "Fistbump",
					color: randomColor().replace('#', '').toString()
				},
				"504": {
					name: "Hammerbot",
					color: randomColor().replace('#', '').toString()
				},
				"505": {
					name: "Bear",
					color: randomColor().replace('#', '').toString()
				},
				"506": {
					name: "Bowl",
					color: randomColor().replace('#', '').toString()
				},
				"507": {
					name: "Turtle",
					color: randomColor().replace('#', '').toString()
				},
				"508": {
					name: "Robolobster",
					color: randomColor().replace('#', '').toString()
				},
				"509": {
					name: "Squid",
					color: randomColor().replace('#', '').toString()
				},
				"510": {
					name: "Stickyhand",
					color: randomColor().replace('#', '').toString()
				},
				"511": {
					name: "Unknown GS",
					color: "800000"
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
					if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Roseum Brain Tree') {
						poiSite['cat'] = [201];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Gypseeum Brain Tree') {
						poiSite['cat'] = [202];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Ostrinum Brain Tree') {
						poiSite['cat'] = [203];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Viride Brain Tree') {
						poiSite['cat'] = [204];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Lividum Brain Tree') {
						poiSite['cat'] = [205];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Aureum Brain Tree') {
						poiSite['cat'] = [206];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Puniceum Brain Tree') {
						poiSite['cat'] = [207];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Lindigoticum Brain Tree') {
						poiSite['cat'] = [208];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [209];
					} else if (siteTypes[i] == 'gbsites') {
						poiSite['cat'] = [301];
					} else if (siteTypes[i] == 'grsites' && siteData[d].type.type == 'Alpha') {
						poiSite['cat'] = [401];
					} else if (siteTypes[i] == 'grsites' && siteData[d].type.type == 'Beta') {
						poiSite['cat'] = [402];
					} else if (siteTypes[i] == 'grsites' && siteData[d].type.type == 'Gamma') {
						poiSite['cat'] = [403];
					} else if (siteTypes[i] == 'grsites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [404];
					} else if (siteTypes[i] == 'gssites' && siteData[d].type.type == 'Lacrosse') {
						poiSite['cat'] = [501];
					} else if (siteTypes[i] == 'gssites' && siteData[d].type.type == 'Crossroads') {
						poiSite['cat'] = [502];
					} else if (siteTypes[i] == 'gssites' && siteData[d].type.type == 'Fistbump') {
						poiSite['cat'] = [503];
					} else if (siteTypes[i] == 'gssites' && siteData[d].type.type == 'Hammerbot') {
						poiSite['cat'] = [504];
					} else if (siteTypes[i] == 'gssites' && siteData[d].type.type == 'Bear') {
						poiSite['cat'] = [505];
					} else if (siteTypes[i] == 'gssites' && siteData[d].type.type == 'Bowl') {
						poiSite['cat'] = [506];
					} else if (siteTypes[i] == 'gssites' && siteData[d].type.type == 'Turtle') {
						poiSite['cat'] = [507];
					} else if (siteTypes[i] == 'gssites' && siteData[d].type.type == 'Robolobster') {
						poiSite['cat'] = [508];
					} else if (siteTypes[i] == 'gssites' && siteData[d].type.type == 'Squid') {
						poiSite['cat'] = [509];
					} else if (siteTypes[i] == 'gssites' && siteData[d].type.type == 'Stickyhand') {
						poiSite['cat'] = [510];
					} else if (siteTypes[i] == 'gssites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [511];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_guardians.systemsData.systems.push(poiSite);
				}
			}
		}
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	init: function () {
		//Sites Data
		var p1 = new Promise(function(resolve, reject) {
			canonnEd3d_guardians.formatSites(sites, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_guardians.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00'
			});
		});
	}
};