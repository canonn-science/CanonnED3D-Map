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
	tbsites: [],
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

var canonnEd3d_tb = {
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
					if (siteData[d].subtype.type == 'Mega') {
						poiSite['cat'] = [201];
					} else if (siteData[d].subtype.type == 'Alpha') {
						poiSite['cat'] = [202];
					} else if (siteData[d].subtype.type == 'Beta') {
						poiSite['cat'] = [203];
					} else if (siteData[d].subtype.type == 'Gamma') {
						poiSite['cat'] = [204];
					} else if (siteData[d].subtype.type == 'Delta') {
						poiSite['cat'] = [205];
					} else if (siteData[d].subtype.type == 'Epsilon') {
						poiSite['cat'] = [206];
					} else if (siteData[d].subtype.type == 'Zeta') {
						poiSite['cat'] = [207];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_tb.systemsData.systems.push(poiSite);
				}
			}
		}
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	init: function () {
		//Sites Data
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_tb.formatSites(sites, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_tb.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: true,
				showGalaxyInfos: true,
				playerPos: [-78.59375, -149.625, -340.53125],
				cameraPos: [-78.59375 - 1000, -149.625, -340.53125 - 1000],
				systemColor: '#FF9D00',
			});
		});
	},
};
