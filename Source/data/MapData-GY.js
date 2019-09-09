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
	gysites: [],
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

var canonnEd3d_gy = {
	//Define Categories
	systemsData: {
		categories: {
			'Geysers - (GY)': {
				'201': {
					name: 'Water Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'202': {
					name: 'Water Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'203': {
					name: 'Carbon Dioxide Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'204': {
					name: 'Ammonia Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'205': {
					name: 'Methane Ice Geyser',
					color: randomColor().replace('#', '').toString()
				},
				'206': {
					name: 'Nitrogen Ice Geyser',
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
					if (siteData[d].type.type == 'Water Geyser') {
						poiSite['cat'] = [201];
					} else if (siteData[d].type.type == 'Water Ice Geyser') {
						poiSite['cat'] = [202];
					} else if (siteData[d].type.type == 'Carbon Dioxide Ice Geyser') {
						poiSite['cat'] = [203];
					} else if (siteData[d].type.type == 'Ammonia Ice Geyser') {
						poiSite['cat'] = [204];
					} else if (siteData[d].type.type == 'Methane Ice Geyser') {
						poiSite['cat'] = [205];
					} else if (siteData[d].type.type == 'Nitrogen Ice Geyser') {
						poiSite['cat'] = [206];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_gy.systemsData.systems.push(poiSite);
				}
			}
		}
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	init: function() {
		//Sites Data
		var p1 = new Promise(function(resolve, reject) {
			canonnEd3d_gy.formatSites(sites, resolve);
		});

		Promise.all([p1]).then(function() {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_gy.systemsData,
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
