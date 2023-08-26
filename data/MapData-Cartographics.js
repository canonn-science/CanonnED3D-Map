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
	gensites: [],
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

var canonnEd3d_cartographics = {

	//Define Categories
	systemsData: {
		categories: {
			"Generation Ships - (GEN)": {
				"201": {
					name: "Generation Ship",
					color: randomColor().replace('#', '').toString()
				}
			},
			'Permit Locked Regions': {
				'1070': {
					name: 'Col 70 Sector',
					color: '442299',
				},
				'1097': {
					name: 'Col 97 Sector',
					color: '4444dd',
				},
				'1121': {
					name: 'Col 121 Sector',
					color: '11aabb',
				},
				'2000': {
					name: 'Cone Sector',
					color: '22ccaa',
				},
				'3000': {
					name: 'Horsehead Dark Sector',
					color: 'a6cc33',
				},
				'4000': {
					name: 'M41',
					color: '69d025',
				},
				'6647': {
					name: 'NGC 1647',
					color: 'aacc22',
				},
				'7264': {
					name: 'NGC 2264',
					color: 'd0c310',
				},
				'7286': {
					name: 'NGC 2286',
					color: 'ccbb33',
				},
				'8603': {
					name: 'NGC 3603',
					color: 'ff9933',
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

	// Lets get data from CSV Files

	formatSites: async function (data, resolvePromise) {
		sites = await go(data);

		let siteTypes = Object.keys(data);

		for (var i = 0; i < siteTypes.length; i++) {
			for (var d = 0; d < sites[siteTypes[i]].length; d++) {
				let siteData = sites[siteTypes[i]];
				if (siteData[d].system.systemName && siteData[d].system.systemName.replace(' ', '').length > 1) {
					var poiSite = {};
					poiSite['name'] = siteData[d].system.systemName + ' - ' + siteData[d].shipName;

					//Check Site Type and match categories
					if (siteTypes[i] == 'gensites') {
						poiSite['cat'] = [201];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_cartographics.systemsData.systems.push(poiSite);
				}
			}
		}
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	formatCol: function (data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].name && data[i].name.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = data[i].name;

				//Check Site Type and match categories

				var component = data[i].name.split(' ');
				if (component[0] == 'Col') {
					poiSite['cat'] = [1000 + parseInt(component[1])];
				}
				if (component[0] == 'Cone') {
					poiSite['cat'] = [2000];
				}
				if (component[0] == 'Horsehead') {
					poiSite['cat'] = [3000];
				}
				if (component[0] == 'M41') {
					poiSite['cat'] = [4000];
				}
				if (component[0] == 'NGC') {
					poiSite['cat'] = [5000 + parseInt(component[1])];
				}

				poiSite['coords'] = {
					x: parseFloat(data[i].pos_x),
					y: parseFloat(data[i].pos_y),
					z: parseFloat(data[i].pos_z),
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_cartographics.systemsData.systems.push(poiSite);
			}
		}
	},

	parseCSVData: function (url, callBack, resolvePromise) {
		Papa.parse(url, {
			download: true,
			header: true,
			complete: function (results) {
				callBack(results.data);

				// after we called the callback
				// (which is synchronous, so we know it's safe here)
				// we can resolve the promise

				resolvePromise();
			},
		});
	},

	init: function () {
		//Sites Data
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_cartographics.formatSites(sites, resolve);
		});

		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_cartographics.parseCSVData('data/csvCache/col70.csv', canonnEd3d_cartographics.formatCol, resolve);
		});


		Promise.all([p1, p2]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_cartographics.systemsData,
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