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
	gbsites: [],
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

var canonnEd3d_challenge = {
	//Define Categories
	systemsData: {
		categories: {
			'Unidentified Interstellar Anomaly': {
				'101': {
					'name': 'Recorded Route',
					'color': '66FF66',
				},
				'102': {
					'name': 'Estimated Route',
					'color': 'FF6666',
				},
				'103': {
					'name': 'Measurement Lines',
					'color': '666666',
				}
			},
			"Points of Interest": {
				"1001": {
					'name': "Sol",
					'color': 'FFFF66'
				},
				"1002": {
					'name': "HIP 22460",
					'color': '66FF66'
				},
				"1003": {
					'name':"Oochorrs UF-J c11-0",
					'color': '66FF66'
				},
				"1004": {
					'name':"UIA Route Point",
					'color': 'CCCC66'
				},
				"1005": {
					'name':"Measurement Endpoint",
					'color': '999999'
				}
			},
		},
		systems: [
			{
				'name': "Sol",
				'infos': '',
				'url': "",
				'coords': { x: 0, y: 0, z: 0 },
				'cat': ["1001"]
			},
			{
				'name': "NGC 2264 Sector RE-Y c14-0",
				'infos': '',
				'url': "",
				'coords': { x: 698, y: -384, z: -1904 }, //eyeballed via galmap, permit locked
				'cat': ["102"]
			},
			{
				'name': "Oochorrs UF-J c11-0", //initial center of attention
				'infos': '',
				'url': "",
				'coords': { x: 686.125, y: -372.875, z: -1832.375 },
				'cat': ["1003", "1004"]
			},
			{
				'name': "Oochorrs CS-F c13-0",
				'infos': '',
				'url': "",
				'coords': { x: 658.625, y: -384.21875, z: -1783.53125 },
				'cat': ["1004"]
			},
			{
				'name': "HIP 22460",
				'infos': '<a href="https://canonn.science/codex/fort-asch/" target="_blank" rel="noopener">Project Seraph - Fort Asch</a>, the <a href="https://canonn.science/codex/overlook/" target="_blank" rel="noopener">Overlook</a> and two <a href="https://canonn.science/codex/the-unknown-structure/">Thargoid Imprint Sites</a>',
				'url': "https://canonn.science/codex/fort-asch/",
				'coords': { x: -41.3125, y: -58.96875, z: -354.78125 },
				'cat': ["1002"]
			},
			//measurement line endpoints
			{
				'name': "Oochorrs GH-T d4-0",
				'infos': '',
				'url': "",
				'coords': { x: 615.21875, y: -370.6875, z: -1944.625 },
				'cat': ["1005"]
			},
			{
				'name': "Oochorrs PY-G d11-5",
				'infos': '',
				'url': "",
				'coords': { x: 1152.09375, y: -416.96875, z: -1358.84375 },
				'cat': ["1005"]
			},
			{
				'name': "Oochorrs UP-K c10-0",
				'infos': '',
				'url': "",
				'coords': { x: 666.5, y: -441.1875, z: -1899.5625 },
				'cat': ["1005"]
			},
			{
				'name': "Outotz UY-I d9-7",
				'infos': '',
				'url': "",
				'coords': { x: 941.5625, y: 288.65625, z: -1482.1875 },
				'cat': ["1005"]
			},
			{
				'name': "Oochorrs WP-K c10-0",
				'infos': '',
				'url': "",
				'coords': { x: 739.65625, y: -460.28125, z: -1902.875 },
				'cat': ["1005"]
			},
			{
				'name': "Outotz KB-G b39-0",
				'infos': '',
				'url': "",
				'coords': { x: 341.53125, y: 201.4375, z: -1501.9375 },
				'cat': ["1005"]
			},
			{
				'name': "Oochorrs AM-H C12-0",
				'infos': '',
				'url': "",
				'coords': { x: 735.8125, y: -383.21875, z: -1821.9375 },
				'cat': ["1005"]
			},
			{
				'name': "Oochorrs QJ-E B3-0",
				'infos': '',
				'url': "",
				'coords': { x: -8.5625, y: -267.875, z: -2272.90625 },
				'cat': ["1005"]
			},
			//measurement crossings
			{
				'name': "First Measurement",
				'infos': '',
				'url': "",
				'coords': { x: 690.495, y: -377.143, z: -1862.790 },
				'cat': ["1004"]
			},
			{
				'name': "Second Measurement",
				'infos': '',
				'url': "",
				'coords': { x: 688.305, y: -375.546, z: -1851.103 },
				'cat': ["1004"]
			},
		],
		"routes": [
			{
				//observed route of the UIA
				cat: ["101"], 'points': [
					{ 's': 'First Measurement', 'label': 'First Measurement' },
					{ 's': 'Second Measurement', 'label': 'Second Measurement' },
					{ 's': 'Oochorrs UF-J c11-0', 'label': 'Oochorrs UF-J c11-0' },
					{ 's': 'Oochorrs CS-F c13-0', 'label': 'Oochorrs CS-F c13-0' },

				], 'circle': false
			},
			{
				//first measurement, line one
				cat: ["103"], 'points': [
					{ 's': 'Oochorrs GH-T d4-0', 'label': 'Oochorrs GH-T d4-0' },
					{ 's': 'Oochorrs PY-G d11-5', 'label': 'Oochorrs PY-G d11-5' },
				], 'circle': false
			},
			{
				//first measurement, line two
				cat: ["103"], 'points': [
					{ 's': 'Oochorrs UP-K c10-0', 'label': 'Oochorrs UP-K c10-0' },
					{ 's': 'Outotz UY-I d9-7', 'label': 'Outotz UY-I d9-7' },
				], 'circle': false
			},
			{
				//second measurement, line one
				cat: ["103"], 'points': [
					{ 's': 'Oochorrs WP-K c10-0', 'label': 'Oochorrs WP-K c10-0' },
					{ 's': 'Outotz KB-G b39-0', 'label': 'Outotz KB-G b39-0' },
				], 'circle': false
			},
			{
				//second measurement, line two
				cat: ["103"], 'points': [
					{ 's': 'Oochorrs AM-H C12-0', 'label': 'Oochorrs AM-H C12-0' },
					{ 's': 'Oochorrs QJ-E B3-0', 'label': 'Oochorrs QJ-E B3-0' },
				], 'circle': false
			},
			//guesstimated direction of travel
			{
				//second measurement, line two
				cat: ["102"], 'points': [
					{ 's': 'NGC 2264 Sector RE-Y c14-0', 'label': 'NGC 2264 Sector RE-Y c14-0' },
					{ 's': 'First Measurement', 'label': 'First Measurement' },
				], 'circle': false
			},
		]
	},
/*
	formatGSites: async function (data, resolvePromise) {
		sites = await go(data);

		let siteTypes = Object.keys(data);

		for (var i = 0; i < siteTypes.length; i++) {
			for (var d = 0; d < sites[siteTypes[i]].length; d++) {
				let siteData = sites[siteTypes[i]];
				if (siteData[d].system.systemName && siteData[d].system.systemName.replace(' ', '').length > 1) {
					var poiSite = {};
					poiSite['name'] = siteData[d].system.systemName;
					if (siteData[i].infos) {
						poiSite['infos'] = siteData[i].infos + '<br/><a href="https://www.edsm.net/en/system?systemName=' + siteData[i].system.systemName + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + siteData[i].system.systemName + '" target="_blank" rel="noopener">Signals</a>';
					} else {
						poiSite['infos'] = '<a href="https://canonn.science/codex/guardian-beacons/" target="_blank" rel="noopener">Guardian Beacon</a><br/><a href="https://canonn.science/wp-content/uploads/2018/08/Guardian-Beacon.png" target="_blank" rel="noopener"><img src="https://canonn.science/wp-content/uploads/2018/08/Guardian-Beacon.png" /></a><a href="https://www.edsm.net/en/system?systemName=' + siteData[i].system.systemName + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + siteData[i].system.systemName + '" target="_blank" rel="noopener">Signals</a>';
					}

					//Check Site Type and match categories
					if (siteTypes[i] == 'gbsites') {
						poiSite['cat'] = [2001];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].system.edsmCoordX),
						y: parseFloat(siteData[d].system.edsmCoordY),
						z: parseFloat(siteData[d].system.edsmCoordZ),
					};

					// We can then push the site to the object that stores all systems
					canonnEd3d_challenge.systemsData.systems.push(poiSite);
				}
			}
		}
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	formatAdamastor: function (data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].name && data[i].name.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = data[i].name;
				if (data[i].infos) {
					poiSite['infos'] = data[i].infos + '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i].name + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + data[i].name + '" target="_blank" rel="noopener">Signals</a>';
				} else {
					poiSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i].name + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + data[i].name + '" target="_blank" rel="noopener">Signals</a>';
				}
				//Check Site Type and match categories

				var component = data[i].name.split(' ');
				if (poiSite['name'] == 'Varati') {
					poiSite['details'] == 'Start and Finish';
					poiSite['cat'] = [10];

				} else {
					poiSite['cat'] = [20];
				}

				poiSite['url'] = "https://canonn-science.github.io/canonn-signals/?system=" + poiSite['name']
				poiSite['coords'] = {
					x: parseFloat(data[i].pos_x),
					y: parseFloat(data[i].pos_y),
					z: parseFloat(data[i].pos_z),
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_challenge.systemsData.systems.push(poiSite);
			}
		}
	},
	formatHesperus: function (data) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].name && data[i].name.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = data[i].name;
				if (data[i].infos) {
					poiSite['infos'] = data[i].infos + '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i].name + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + data[i].name + '" target="_blank" rel="noopener">Signals</a>';
				} else {
					poiSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i].name + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + data[i].name + '" target="_blank" rel="noopener">Signals</a>';
				}
				poiSite['url'] = "https://canonn-science.github.io/canonn-signals/?system=" + poiSite['name']
				poiSite['coords'] = {
					x: parseFloat(data[i].pos_x),
					y: parseFloat(data[i].pos_y),
					z: parseFloat(data[i].pos_z),
				};
				poiSite['cat'] = [data[i].category];
				// We can then push the site to the object that stores all systems
				canonnEd3d_challenge.systemsData.systems.push(poiSite);
			}
		}
	},
	*/
	parseCSVData: function (url, callBack, resolvePromise) {
		Papa.parse(url, {
			download: true,
			header: true,
			complete: function (results) {
				callBack(results.data);

				// after we called the callback
				// (which is synchronous, so we know it's safe here)
				// we can resolve the promise

				document.getElementById("loading").style.display = "none";
				resolvePromise();
			},
		});
	},

	init: function () {/*
		var p1 = new Promise(function (resolve, reject) {
			//canonnEd3d_challenge.parseCSVData('data/csvCache/adamastor.csv', canonnEd3d_challenge.formatAdamastor, resolve);
		});

		var p2 = new Promise(function (resolve, reject) {
			//canonnEd3d_challenge.parseCSVData('data/csvCache/hesperus.csv', canonnEd3d_challenge.formatHesperus, resolve);
		});

		var p3 = new Promise(function (resolve, reject) {
			canonnEd3d_challenge.formatGSites(sites, resolve);
		});

		Promise.all([p3]).then(function () {*/
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_challenge.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: false,
				playerPos: [686, -372, -1832],
				cameraPos: [100, 0, -1299],
				systemColor: '#FF9D00',
			});
			
			document.getElementById("loading").style.display = "none";
		//});
	},
};
