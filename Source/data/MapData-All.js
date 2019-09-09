const API_ENDPOINT = `https://api.canonn.tech`;
const API_LIMIT = 750;

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
	cssites: [],
	fgsites: [],
	fmsites: [],
	gbsites: [],
	gensites: [],
	grsites: [],
	gssites: [],
	gvsites: [],
	gysites: [],
	lssites: [],
	tbsites: [],
	tssites: [],
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

var canonnEd3d_all = {

	//Define Categories and Static Data
	systemsData: {
		categories: {
			"Sites": {
				"201": {
					name: "Amphora Plants (AP)",
					color: randomColor().replace('#', '').toString()
				},
				"202": {
					name: "Bark Mounds (BM)",
					color: randomColor().replace('#', '').toString()
				},
				"203": {
					name: "Brain Trees (BT)",
					color: randomColor().replace('#', '').toString()
				},
				"204": {
					name: "Crystalline Shards (CS)",
					color: randomColor().replace('#', '').toString()
				},
				"205": {
					name: "Fungal Gourds (FG)",
					color: randomColor().replace('#', '').toString()
				},
				"206": {
					name: "Fumaroles (FM)",
					color: randomColor().replace('#', '').toString()
				},
				"207": {
					name: "Generation Ships (GEN)",
					color: randomColor().replace('#', '').toString()
				},
				"208": {
					name: "Guardian Beacons (GB)",
					color: randomColor().replace('#', '').toString()
				},
				"209": {
					name: "Guardian Ruins (GR)",
					color: randomColor().replace('#', '').toString()
				},
				"210": {
					name: "Guardian Structures (GS)",
					color: randomColor().replace('#', '').toString()
				},
				"211": {
					name: "Gas Vents (GV)",
					color: randomColor().replace('#', '').toString()
				},
				"212": {
					name: "Geysers (GY)",
					color: randomColor().replace('#', '').toString()
				},
				"213": {
					name: "Lava Spouts (LS)",
					color: randomColor().replace('#', '').toString()
				},
				"214": {
					name: "Thargoid Barnacles (TB)",
					color: randomColor().replace('#', '').toString()
				},
				"215": {
					name: "Thargoid Structures (TS)",
					color: randomColor().replace('#', '').toString()
				},
				"216": {
					name: "Tube Worms (TW)",
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
					if (siteTypes[i] == 'apsites') {
						poiSite['cat'] = [201];
					} else if (siteTypes[i] == 'bmsites') {
						poiSite['cat'] = [202];
					} else if (siteTypes[i] == 'btsites') {
						poiSite['cat'] = [203];
					} else if (siteTypes[i] == 'cssites') {
						poiSite['cat'] = [204];
					} else if (siteTypes[i] == 'fgsites') {
						poiSite['cat'] = [205];
					} else if (siteTypes[i] == 'fmsites') {
						poiSite['cat'] = [206];
					} else if (siteTypes[i] == 'gensites') {
						poiSite['cat'] = [207];
					} else if (siteTypes[i] == 'gbsites') {
						poiSite['cat'] = [208];
					} else if (siteTypes[i] == 'grsites') {
						poiSite['cat'] = [209];
					} else if (siteTypes[i] == 'gssites') {
						poiSite['cat'] = [210];
					} else if (siteTypes[i] == 'gvsites') {
						poiSite['cat'] = [211];
					} else if (siteTypes[i] == 'gysites') {
						poiSite['cat'] = [212];
					} else if (siteTypes[i] == 'lssites') {
						poiSite['cat'] = [213];
					} else if (siteTypes[i] == 'tbsites') {
						poiSite['cat'] = [214];
					} else if (siteTypes[i] == 'tssites') {
						poiSite['cat'] = [215];
					} else if (siteTypes[i] == 'twsites') {
						poiSite['cat'] = [216];
					} else {
						poiSite['cat'] = [2000];
					}

					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_all.systemsData.systems.push(poiSite);
				}
			}
		}
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	init: function () {

		//Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_all.formatSites(sites, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_all.systemsData,
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