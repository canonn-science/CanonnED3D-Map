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
	btsites: [],
	gbsites: [],
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
const recenterViewport = (center, distance) => {
	//-- Set new camera & target position
	Ed3d.playerPos = [center.x, center.y, center.z];
	Ed3d.cameraPos = [
		center.x + (Math.floor((Math.random() * 100) + 1) - 50), //-- Add a small rotation effect
		center.y + distance,
		center.z - distance
	];

	Action.moveInitalPosition();
}

recenterSearch = function () {
	var term = $('#search input').val();
	if (!term.trim()) return;

	var foundSystem = {};
	for (key in canonnEd3d_guardians.systemsData.systems) {
		let system = canonnEd3d_guardians.systemsData.systems[key];
		if (system.name.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
			foundSystem = system;
			break;
		}
	}
	if (!(Object.keys(foundSystem).length === 0)) {
		recenterViewport(foundSystem.coords, 100);

		//console.log("addtext", "system_hover", systemname, 0, 4, 0, 3, threeObj);
		/* how do we get threeObj? they dont have names. would like to show the mouseover text after search recenter
				HUD.addText(-1, foundSystem.name,
					0, 4, 0, 3//, foundSystem.coords, true
				); 
		//*/

		$('#search input:focus-visible').css("outline-color", "darkgreen")
	} else {
		$('#search input:focus-visible').css("outline-color", "red")
	}
}

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
	siteNames: {},
	formatUnknown: function (data) {
		console.log(canonnEd3d_guardians.siteNames)
		console.log(data)
		data.forEach(function (site) {
			if (!canonnEd3d_guardians.siteNames[site.system.toUpperCase()]) {
				console.log("Not found: " + site.system)
				var poiSite = {};
				poiSite['cat'] = [404];
				poiSite['name'] = site.system;
				poiSite["coords"] = { x: parseFloat(site.x), y: parseFloat(site.y), z: parseFloat(site.z) }
				poiSite["infos"] = "Ancient Ruin<br>"
				canonnEd3d_guardians.systemsData.systems.push(poiSite);
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
			canonnEd3d_guardians.gCloudData = result
			resolvePromise();
			console.log("data parsed")
			return result;
		}
		fetchDataFromApi(url, resolvePromise)

		//console.log(data)

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

		resolvePromise();
	},

	finishMap: function () {
		$('#search').css('display', 'block');
		$('#search input').val('System').on('input', recenterSearch);
	},
	init: function () {
		//Sites Data
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_guardians.formatSites(sites, resolve);
		});
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_guardians.parseData('https://us-central1-canonn-api-236217.cloudfunctions.net/query/get_gr_data', resolve);
		});
		Promise.all([p1, p2]).then(function () {
			canonnEd3d_guardians.formatUnknown(canonnEd3d_guardians.gCloudData)
			document.getElementById("loading").style.display = "none";
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
				systemColor: '#FF9D00',
				finished: canonnEd3d_guardians.finishMap
			});
		});
	}
};