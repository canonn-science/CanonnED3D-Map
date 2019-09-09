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
	apsites: [],
	bmsites: [],
	btsites: [],
	fgsites: [],
	tbsites: [],
	twsites: [],
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

var canonnEd3d_biology = {
	//Define Categories
	systemsData: {
		categories: {
			'Amphora Plants - (AP)': {
				'201': {
					name: 'Amphora Plant',
					color: randomColor().replace('#', '').toString()
				},
				'202': {
					name: 'Unknown AP',
					color: '800000',
				}
			},
			'Bark Mounds - (BM)': {
				'301': {
					name: 'Bark Mound',
					color: randomColor().replace('#', '').toString()
				},
				'302': {
					name: 'Unknown BM',
					color: '800000',
				}
			},
			'Brain Trees - (BT)': {
				'401': {
					name: 'Roseum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'402': {
					name: 'Gypseeum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'403': {
					name: 'Ostrinum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'404': {
					name: 'Viride Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'405': {
					name: 'Lividum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'406': {
					name: 'Aureum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'407': {
					name: 'Puniceum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'408': {
					name: 'Lindigoticum Brain Tree',
					color: randomColor().replace('#', '').toString()
				},
				'409': {
					name: 'Unknown BT',
					color: '800000',
				}
			},
			'Fungal Gourds - (FG)': {
				'501': {
					name: 'Luteolum Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'502': {
					name: 'Croceum Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'503': {
					name: 'Puniceum Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'504': {
					name: 'Roseum Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'505': {
					name: 'Blatteum Bioluminescent Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'506': {
					name: 'Rubeum Bioluminescent Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'507': {
					name: 'Prasinum Bioluminescent Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'508': {
					name: 'Roseum Bioluminescent Anemone',
					color: randomColor().replace('#', '').toString()
				},
				'509': {
					name: 'Unknown FG',
					color: '800000',
				}
			},
			'Thargoid Barnacles - (TB)': {
				'601': {
					name: 'Common Thargoid Barnacle',
					color: randomColor().replace('#', '').toString()
				},
				'602': {
					name: 'Large Thargoid Barnacle',
					color: randomColor().replace('#', '').toString()
				},
				'603': {
					name: 'Unknown TB',
					color: '800000',
				}
			},
			'Tube Worms - (TW)': {
				'701': {
					name: 'Roseum Sinuous Tubers',
					color: randomColor().replace('#', '').toString()
				},
				'702': {
					name: 'Unknown TW',
					color: '800000',
				}
			},
			'Unknown Type': {
				'2000': {
					name: 'Unknown Site',
					color: '800000',
				}
			}
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
					if (siteTypes[i] == 'apsites' && siteData[d].type.type == 'Amphora Plant') {
						poiSite['cat'] = [201];
					} else if (siteTypes[i] == 'apsites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [202];
					} else if (siteTypes[i] == 'bmsites' && siteData[d].type.type == 'Bark Mound') {
						poiSite['cat'] = [301];
					} else if (siteTypes[i] == 'bmsites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [302];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Roseum Brain Tree') {
						poiSite['cat'] = [401];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Gypseeum Brain Tree') {
						poiSite['cat'] = [402];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Ostrinum Brain Tree') {
						poiSite['cat'] = [403];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Viride Brain Tree') {
						poiSite['cat'] = [404];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Lividum Brain Tree') {
						poiSite['cat'] = [405];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Aureum Brain Tree') {
						poiSite['cat'] = [406];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Puniceum Brain Tree') {
						poiSite['cat'] = [407];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Lindigoticum Brain Tree') {
						poiSite['cat'] = [408];
					} else if (siteTypes[i] == 'btsites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [409];
					} else if (siteTypes[i] == 'fgsites' && siteData[d].type.type == 'Luteolum Anemone') {
						poiSite['cat'] = [501];
					} else if (siteTypes[i] == 'fgsites' && siteData[d].type.type == 'Croceum Anemone') {
						poiSite['cat'] = [502];
					} else if (siteTypes[i] == 'fgsites' && siteData[d].type.type == 'Puniceum Anemone') {
						poiSite['cat'] = [503];
					} else if (siteTypes[i] == 'fgsites' && siteData[d].type.type == 'Roseum Anemone') {
						poiSite['cat'] = [504];
					} else if (siteTypes[i] == 'fgsites' && siteData[d].type.type == 'Blatteum Bioluminescent Anemone') {
						poiSite['cat'] = [505];
					} else if (siteTypes[i] == 'fgsites' && siteData[d].type.type == 'Rubeum Bioluminescent Anemone') {
						poiSite['cat'] = [506];
					} else if (siteTypes[i] == 'fgsites' && siteData[d].type.type == 'Prasinum Bioluminescent Anemone') {
						poiSite['cat'] = [507];
					} else if (siteTypes[i] == 'fgsites' && siteData[d].type.type == 'Roseum Bioluminescent Anemone') {
						poiSite['cat'] = [508];
					} else if (siteTypes[i] == 'fgsites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [509];
					} else if (siteTypes[i] == 'tbsites' && siteData[d].type.type == 'Common Thargoid Barnacle') {
						poiSite['cat'] = [601];
					} else if (siteTypes[i] == 'tbsites' && siteData[d].type.type == 'Large Thargoid Barnacle') {
						poiSite['cat'] = [602];
					} else if (siteTypes[i] == 'tbsites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [603];
					} else if (siteTypes[i] == 'twsites' && siteData[d].type.type == 'Roseum Sinuous Tubers') {
						poiSite['cat'] = [701];
					} else if (siteTypes[i] == 'twsites' && siteData[d].type.type == 'Unknown') {
						poiSite['cat'] = [702];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_biology.systemsData.systems.push(poiSite);
				}
			}
		}
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	init: function() {
		//Sites Data
		var p1 = new Promise(function(resolve, reject) {
			canonnEd3d_biology.formatSites(sites, resolve);
		});

		Promise.all([p1]).then(function() {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_biology.systemsData,
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
