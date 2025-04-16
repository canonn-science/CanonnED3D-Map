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
	grsites: [],
	gssites: [],
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

var canonnEd3d_gr = {

	//Define Categories
	systemsData: {
		categories: {
			"Guardian Ruins - (GR)": {
				"201": {
					name: "Alpha",
					color: randomColor().replace('#', '').toString()
				},
				"202": {
					name: "Beta",
					color: randomColor().replace('#', '').toString()
				},
				"203": {
					name: "Gamma",
					color: randomColor().replace('#', '').toString()
				},
				"214": {
					name: "Unknown",
					color: randomColor().replace('#', '').toString()
				}
			},
			"Guardian Structures - (GS)": {
				"204": {
					name: "Lacrosse",
					color: randomColor().replace('#', '').toString()
				},
				"205": {
					name: "Crossroads",
					color: randomColor().replace('#', '').toString()
				},
				"206": {
					name: "Fistbump",
					color: randomColor().replace('#', '').toString()
				},
				"207": {
					name: "Hammerbot",
					color: randomColor().replace('#', '').toString()
				},
				"208": {
					name: "Bear",
					color: randomColor().replace('#', '').toString()
				},
				"209": {
					name: "Bowl",
					color: randomColor().replace('#', '').toString()
				},
				"210": {
					name: "Turtle",
					color: randomColor().replace('#', '').toString()
				},
				"211": {
					name: "Robolobster",
					color: randomColor().replace('#', '').toString()
				},
				"212": {
					name: "Squid",
					color: randomColor().replace('#', '').toString()
				},
				"213": {
					name: "Stickyhand",
					color: randomColor().replace('#', '').toString()
				}
			}
		},
		"systems": []
	},
	siteNames: {},

	formatSites: async function (data, resolvePromise) {
		sites = await go(data);

		let siteTypes = Object.keys(data);

		for (var i = 0; i < siteTypes.length; i++) {
			for (var d = 0; d < sites[siteTypes[i]].length; d++) {
				let siteData = sites[siteTypes[i]];
				if (siteData[d].system.systemName && siteData[d].system.systemName.replace(' ', '').length > 1) {
					var poiSite = {};
					poiSite['name'] = siteData[d].system.systemName;
					canonnEd3d_gr.siteNames[siteData[d].system.systemName] = true

					//Check Site Type and match categories
					if (siteData[d].type.type == 'Alpha') {
						poiSite['infos'] = 'Ancient Ruins (' + siteData[d].type.type + ')<br><img src="https://ruins.canonn.tech/images/maps/' + siteData[d].type.type.toLowerCase() + '-thumbnail.png"><br>'
						poiSite['cat'] = [201];
					} else if (siteData[d].type.type == 'Beta') {
						poiSite['infos'] = 'Ancient Ruins (' + siteData[d].type.type + ')<br><img src="https://ruins.canonn.tech/images/maps/' + siteData[d].type.type.toLowerCase() + '-thumbnail.png"><br>'
						poiSite['cat'] = [202];
					} else if (siteData[d].type.type == 'Gamma') {
						poiSite['infos'] = 'Ancient Ruins (' + siteData[d].type.type + ')<br><img src="https://ruins.canonn.tech/images/maps/' + siteData[d].type.type.toLowerCase() + '-thumbnail.png"><br>'
						poiSite['cat'] = [203];
					} else if (siteData[d].type.type == 'Lacrosse') {
						poiSite['infos'] = 'Ancient Structure (' + siteData[d].type.type + ')<br><img src="/img/' + siteData[d].type.type.toLowerCase() + '_thumbnail.png"><br>'
						poiSite['cat'] = [204];
					} else if (siteData[d].type.type == 'Crossroads') {
						poiSite['infos'] = 'Ancient Structure (' + siteData[d].type.type + ')<br><img src="/img/' + siteData[d].type.type.toLowerCase() + '_thumbnail.png"><br>'
						poiSite['cat'] = [205];
					} else if (siteData[d].type.type == 'Fistbump') {
						poiSite['infos'] = 'Ancient Structure (' + siteData[d].type.type + ')<br><img src="/img/' + siteData[d].type.type.toLowerCase() + '_thumbnail.png"><br>'
						poiSite['cat'] = [206];
					} else if (siteData[d].type.type == 'Hammerbot') {
						poiSite['infos'] = 'Ancient Structure (' + siteData[d].type.type + ')<br><img src="/img/' + siteData[d].type.type.toLowerCase() + '_thumbnail.png"><br>'
						poiSite['cat'] = [207];
					} else if (siteData[d].type.type == 'Bear') {
						poiSite['infos'] = 'Ancient Structure (' + siteData[d].type.type + ')<br><img src="/img/' + siteData[d].type.type.toLowerCase() + '_thumbnail.png"><br>'
						poiSite['cat'] = [208];
					} else if (siteData[d].type.type == 'Bowl') {
						poiSite['infos'] = 'Ancient Structure (' + siteData[d].type.type + ')<br><img src="/img/' + siteData[d].type.type.toLowerCase() + '_thumbnail.png"><br>'
						poiSite['cat'] = [209];
					} else if (siteData[d].type.type == 'Turtle') {
						poiSite['infos'] = 'Ancient Structure (' + siteData[d].type.type + ')<br><img src="/img/' + siteData[d].type.type.toLowerCase() + '_thumbnail.png"><br>'
						poiSite['cat'] = [210];
					} else if (siteData[d].type.type == 'Robolobster') {
						poiSite['infos'] = "Ancient Structure (" + siteData[d].type.type + ")"
						poiSite['cat'] = [211];
					} else if (siteData[d].type.type == 'Squid') {
						poiSite['infos'] = "Ancient Structure (" + siteData[d].type.type + ")"
						poiSite['cat'] = [212];
					} else if (siteData[d].type.type == 'Stickyhand') {
						poiSite['infos'] = "Ancient Structure (" + siteData[d].type.type + ")"
						poiSite['cat'] = [213];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_gr.systemsData.systems.push(poiSite);
				}
			}
		}

		resolvePromise();
	},

	formatUnknown: function (data) {
		console.log(canonnEd3d_gr.siteNames)
		console.log(data)
		data.forEach(function (site) {
			if (!canonnEd3d_gr.siteNames[site.system.toUpperCase()]) {
				console.log("Not found: " + site.system)
				var poiSite = {};
				poiSite['cat'] = [214];
				poiSite['name'] = site.system;
				poiSite["coords"] = { x: parseFloat(site.x), y: parseFloat(site.y), z: parseFloat(site.z) }
				poiSite["infos"] = "Ancient Ruin<br>"
				canonnEd3d_gr.systemsData.systems.push(poiSite);
			}
		});

	},

	gCloudData: [],

	parseData: function (url, resolvePromise) {
		let fetchDataFromApi = async (url, resolvePromise) => {
			let response = await fetch(url, {
				"method": "GET",
				"headers": {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Max-Age': 86400
				}
			});
			let result = await response.json();
			canonnEd3d_gr.gCloudData = result
			resolvePromise();
			console.log("data parsed")
			return result;
		}
		fetchDataFromApi(url, resolvePromise)

		//console.log(data)

	},

	init: function () {
		//Sites Data
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_gr.formatSites(sites, resolve);
		});
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_gr.parseData('https://us-central1-canonn-api-236217.cloudfunctions.net/query/get_gr_data', resolve);
		});
		Promise.all([p1, p2]).then(function () {
			canonnEd3d_gr.formatUnknown(canonnEd3d_gr.gCloudData)
			document.getElementById("loading").style.display = "none";
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_gr.systemsData,
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
