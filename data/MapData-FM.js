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
	fmsites: [],
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

var canonnEd3d_fm = {
	//Define Categories
	systemsData: {
		categories: {
			'Fumaroles - (FM)': {
				'201': {
					name: 'Sulphur Dioxide Fumarole',
					color: 'FF0000',
				},
				'202': {
					name: 'Water Fumarole',
					color: 'B22222',
				},
				'203': {
					name: 'Silicate Vapour Fumarole',
					color: 'FF7F50',
				},
				'204': {
					name: 'Sulphur Dioxide Ice Fumarole',
					color: 'FFFF00',
				},
				'205': {
					name: 'Water Ice Fumarole',
					color: '00FF00',
				},
				'206': {
					name: 'Carbon Dioxide Ice Fumarole',
					color: '0000FF',
				},
				'207': {
					name: 'Ammonia Ice Fumarole',
					color: 'EE82EE',
				},
				'208': {
					name: 'Methane Ice Fumarole',
					color: 'FF00FF',
				},
				'209': {
					name: 'Nitrogen Ice Fumarole',
					color: '800080',
				},
				'210': {
					name: 'Silicate Vapour Ice Fumarole',
					color: 'A52A2A',
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
					if (siteData[d].type.type == 'Sulphur Dioxide Fumarole') {
						poiSite['cat'] = [201];
					} else if (siteData[d].type.type == 'Water Fumarole') {
						poiSite['cat'] = [202];
					} else if (siteData[d].type.type == 'Silicate Vapour Fumarole') {
						poiSite['cat'] = [203];
					} else if (siteData[d].type.type == 'Sulphur Dioxide Ice Fumarole') {
						poiSite['cat'] = [204];
					} else if (siteData[d].type.type == 'Water Ice Fumarole') {
						poiSite['cat'] = [205];
					} else if (siteData[d].type.type == 'Carbon Dioxide Ice Fumarole') {
						poiSite['cat'] = [206];
					} else if (siteData[d].type.type == 'Ammonia Ice Fumarole') {
						poiSite['cat'] = [207];
					} else if (siteData[d].type.type == 'Methane Ice Fumarole') {
						poiSite['cat'] = [208];
					} else if (siteData[d].type.type == 'Nitrogen Ice Fumarole') {
						poiSite['cat'] = [209];
					} else if (siteData[d].type.type == 'Silicate Vapour Ice Fumarole') {
						poiSite['cat'] = [210];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_fm.systemsData.systems.push(poiSite);
				}
			}
		}
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	init: function () {
		//Sites Data
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_fm.formatSites(sites, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_fm.systemsData,
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
