const API_ENDPOINT = `https://api.canonn.tech`;
const API_LIMIT = 750;

const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

let sites = {
	tbsites: [],
	tssites: [],
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
      subtype {
        type
      }
    }
  }`;

	let tsquery = `query ($limit:Int, $start:Int, $where:JSON){ 
    ${typeQuery} (limit: $limit, start: $start, where: $where){ 
      system{ 
        systemName
        edsmCoordX
        edsmCoordY
        edsmCoordZ
      }
      status {
        status
      }
    }
  }`;

	let newQuery = null;
	if (type == 'tssites') {
		newQuery = tsquery;
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

var canonnEd3d_thargoids = {
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
				},
				'208': {
					name: 'Unknown TB',
					color: '800000',
				}
			},
			'Thargoid Structures - (TS)': {
				'301': {
					name: 'Active',
					color: '008000',
				},
				'302': {
					name: 'Inactive',
					color: '800000',
				},
				'303': {
					name: 'Unknown TS',
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
					if (siteTypes[i] == 'tbsites' && siteData[d].subtype.type == 'Mega') {
						poiSite['cat'] = [201];
					} else if (siteTypes[i] == 'tbsites' && siteData[d].subtype.type == 'Alpha') {
						poiSite['cat'] = [202];
					} else if (siteTypes[i] == 'tbsites' && siteData[d].subtype.type == 'Beta') {
						poiSite['cat'] = [203];
					} else if (siteTypes[i] == 'tbsites' && siteData[d].subtype.type == 'Gamma') {
						poiSite['cat'] = [204];
					} else if (siteTypes[i] == 'tbsites' && siteData[d].subtype.type == 'Delta') {
						poiSite['cat'] = [205];
					} else if (siteTypes[i] == 'tbsites' && siteData[d].subtype.type == 'Epsilon') {
						poiSite['cat'] = [206];
					} else if (siteTypes[i] == 'tbsites' && siteData[d].subtype.type == 'Zeta') {
						poiSite['cat'] = [207];
					} else if (siteTypes[i] == 'tbsites' && siteData[d].subtype.type == 'Unknown') {
						poiSite['cat'] = [208];
					} else if (siteTypes[i] == 'tssites' && siteData[d].status.status == 'Active') {
						poiSite['cat'] = [301];
					} else if (siteTypes[i] == 'tssites' && siteData[d].status.status == 'Inactive') {
						poiSite['cat'] = [302];
					} else if (siteTypes[i] == 'tssites') {
						poiSite['cat'] = [303];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_thargoids.systemsData.systems.push(poiSite);
				}
			}
		}
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	init: function() {
		//Sites Data
		var p1 = new Promise(function(resolve, reject) {
			canonnEd3d_thargoids.formatSites(sites, resolve);
		});

		Promise.all([p1]).then(function() {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_thargoids.systemsData,
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
