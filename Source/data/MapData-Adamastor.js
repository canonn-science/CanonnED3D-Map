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
			'ACT I: Adamastor': {
				/*'10': {
					name: 'Varati',
					color: 'f5a142',
				},
				'20': {
					name: 'Waypoint',
					color: '42f557',
				},*/

				'101': {
					name: 'Adamastor Initial Route',
					color: 'FF6666',
				},
				'102': {
					name: 'Adamastor Diversion Route',
					color: '66ff66',
				},
				'103': {
					name: 'Intersection of Routes',
					color: '666666',
				},
				'104': {
					name: 'Line Through Waypoints ',
					color: '666666',
				},
				'105': {
					name: "Adamastor's Return Journey",
					color: '446644',
				},
			},
			'ACT II: Hesperus': {
				'201': {
					name: 'Hesperus, Dredger & Survivors',
					color: 'FF6666',
				},
				'202': {
					name: 'Hesperus 17 Beacon Route',
					color: '6666FF',
				},
				'203': {
					name: 'Hesperus Triangulation LPs',
					color: '66FF66',
				},
				'204': {
					name: "Aegis' Alexandria Disappeared",
					color: '66FF66',
				}
			},
			'ACT III: Project Seraph': {
				'301': {
					name: "Hyford's Cache & D-2's LPs",
					color: 'FF6666',
				},
				'302': {
					name: 'Project Seraph Settlements',
					color: '6666FF',
				},
			},
			'ACT IV: (ongoing)': {
				'401': {
					name: "Battles of Cornsar",
					color: 'FF6666',
				},
			},
			"Points of Interest": {
				"2001": {
					name: "Guardian Beacons",
					color: '66FFFF'
				}
			},
		},
		systems: [
			{
				'name': "HIP 16538",
				'infos': '<a href="https://www.elitedangerous.com/news/galnet/aegis-megaship-vanishes-hyperspace" target="_blank" rel="noopener">Galnet: Aegis Megaship Vanishes In Hyperspace</a>',
				'url': "https://www.elitedangerous.com/news/galnet/aegis-megaship-vanishes-hyperspace",
				'coords': { x: -24.625, y: -84.0625, z: -139.34375 },
				'cat': ["204"]
			},
			{
				'name': "HIP 22460",
				'infos': '<a href="https://canonn.science/codex/fort-asch/" target="_blank" rel="noopener">Project Seraph - Fort Asch</a>, the <a href="https://canonn.science/codex/overlook/" target="_blank" rel="noopener">Overlook</a> and two <a href="https://canonn.science/codex/the-unknown-structure/">Thargoid Imprint Sites</a>',
				'url': "https://canonn.science/codex/fort-asch/",
				'coords': { x: -41.3125, y: -58.96875, z: -354.78125 },
				'cat': ["302"]
			},
			{
				'name': "HIP 26176",
				'infos': '<a href="https://canonn.science/codex/oaken-point/" target="_blank" rel="noopener">Project Seraph - Oaken Point</a> and <a href="https://canonn.science/codex/colonia-crash-site/" target="_blank" rel="noopener">D-2´s LP #1</a>',
				'url': "https://canonn.science/codex/oaken-point/",
				'coords': { x: 394.4375, y: -323.53125, z: -1431.84375 },
				'cat': ["302", "301"]
			},
			{
				'name': "Col 69 Sector JI-I c10-4",
				'infos': '<a href="https://canonn.science/codex/colonia-crash-site/" target="_blank" rel="noopener">D-2´s LP #2</a>',
				'url': "https://canonn.science/codex/colonia-crash-site/",
				'coords': { x: 439.40625, y: -237.59375, z: -1208.71875 },
				'cat': ["301"]
			},
			{
				'name': "Wregoe DK-R b4-1",
				'infos': '<a href="https://canonn.science/codex/colonia-crash-site/" target="_blank" rel="noopener">D-2´s LP #3</a>',
				'url': "https://canonn.science/codex/colonia-crash-site/",
				'coords': { x: 171.65625, y: 7.5625, z: -951.1875 },
				'cat': ["301"]
			},
			{
				'name': "Synuefe Gb-O c9-8",
				'infos': '<a href="https://canonn.science/codex/colonia-crash-site/" target="_blank" rel="noopener">D-2´s Permit LP #4</a>',
				'url': "https://canonn.science/codex/colonia-crash-site/",
				'coords': { x: -48.78125, y: -72.21875, z: -656.0625 },
				'cat': ["301"]
			},
			{
				'name': "Colonia",
				'infos': '<a href="https://canonn.science/codex/colonia-crash-site/" target="_blank" rel="noopener">Hyford´s Cache</a>',
				'url': "https://canonn.science/codex/colonia-crash-site/",
				'coords': { x: -9530.5, y: -910.28125, z: 19808.125 },
				'cat': ["301"]
			},
			{
				'name': "Cornsar",
				'infos': '<a href="https://www.elitedangerous.com/news/galnet/thargoid-strike-follows-salvations-prediction" target="_blank" rel="noopener">Galnet: Thargoid Strike Follows Salvation´s Prediction</a>',
				'url': "https://www.elitedangerous.com/news/galnet/thargoid-strike-follows-salvations-prediction",
				'coords': { x: -94.15625, y: -53.5625, z: -15.90625 },
				'cat': ["401"]
			},
		],
		"routes": [
			{
				cat: ["101"], 'points': [

					{ 's': 'HIP 33386', 'label': 'HIP 33386' },
					{ 's': 'HIP 39748', 'label': 'HIP 39748' },
					{ 's': 'Chukchan', 'label': 'Chukchan' },

				], 'circle': false
			},
			{
				cat: ["104"], 'points': [
					{ 's': 'Extention1', 'label': 'Extention1' },
					{ 's': 'HIP 33386', 'label': 'HIP 33386' },
					{ 's': 'HIP 39748', 'label': 'HIP 39748' },
					{ 's': 'Extention2', 'label': 'Extention2' },
				], 'circle': false
			},
			{
				cat: ["102"], 'points': [
					{ 's': 'HIP 33386', 'label': 'HIP 33386' },
					{ 's': 'Synuefe XE-Y c17-7', 'label': 'Synuefe XE-Y c17-7' },
					{ 's': 'Musca Dark Region PJ-P B6-1', 'label': 'Musca Dark Region PJ-P B6-1' },
					{ 's': 'HIP 69200', 'label': 'HIP 69200' },
				], 'circle': false
			},
			{
				cat: ["105"], 'points': [
					{ 's': 'Chukchan', 'label': 'Chukchan' },
					{ 's': 'HIP 69200', 'label': 'HIP 69200' },
				], 'circle': false
			},
			{
				cat: ["50"], 'points': [
					{ 's': 'HIP 39748', 'label': 'HIP 39748' },
					{ 's': 'Chukchan', 'label': 'Chukchan' },
				], 'circle': false
			},
			{
				cat: ["103"], 'points': [
					{ 's': 'Chukchan', 'label': 'Chukchan' },
					{ 's': 'Route Intersection', 'label': 'Route Intersection' },
					{ 's': 'HIP 69200', 'label': 'HIP 69200' },
				], 'circle': false
			},
			{
				cat: ["202"], 'points': [
					{ 's': 'Li Chul', 'label': 'Li Chul' },
					{ 's': 'HIP 44101', 'label': 'HIP 44101' },
					{ 's': 'Col 285 Sector WH-O a22-2', 'label': 'Col 285 Sector WH-O a22-2' },
					{ 's': 'COL 285 Sector NV-N B7-4', 'label': 'COL 285 Sector NV-N B7-4' },
					{ 's': 'Synuefe FM-S B37-4', 'label': 'Synuefe FM-S B37-4' },
					{ 's': 'Synuefe BA-X B34-2', 'label': 'Synuefe BA-X B34-2' },
					{ 's': 'Synuefe JJ-O d7-55', 'label': 'Synuefe JJ-O d7-55' },
					{ 's': 'Synuefe HY-P D6-31', 'label': 'Synuefe HY-P D6-31' },
					{ 's': 'Synuefe MQ-H C12-4', 'label': 'Synuefe MQ-H C12-4' },
					{ 's': 'Synuefe RJ-U B21-0', 'label': 'Synuefe RJ-U B21-0' },
					{ 's': 'Witch head sector OT-Q B5-0', 'label': 'Witch head sector OT-Q B5-0' },
					{ 's': 'Horsehead Sector CB-O b6-0', 'label': 'Horsehead Sector CB-O b6-0' },
					{ 's': 'Flame Sector PI-T b3-0', 'label': 'Flame Sector PI-T b3-0' },
					{ 's': 'NGC 1999 Sector HN-S B4-0', 'label': 'NGC 1999 Sector HN-S B4-0' },
					{ 's': 'NGC 1999 Sector ZU-X b1-0', 'label': 'NGC 1999 Sector ZU-X b1-0' },
					{ 's': 'Trapezium Sector FH-U c3-3', 'label': 'Trapezium Sector FH-U c3-3' },
					{ 's': 'Col 69 Sector VK-E c12-10', 'label': 'Col 69 Sector VK-E c12-10' },
					{ 's': 'Col 69 sector LY-H C10-0', 'label': 'Col 69 sector LY-H C10-0' },
				], 'circle': false
			},
			{
				cat: ["301"], 'points': [
					{ 's': 'HIP 26176', 'label': 'HIP 26176' },
					{ 's': 'Col 69 Sector JI-I c10-4', 'label': 'Col 69 Sector JI-I c10-4' },
					{ 's': 'Wregoe DK-R b4-1', 'label': 'Wregoe DK-R b4-1' },
					{ 's': 'Synuefe Gb-O c9-8', 'label': 'Synuefe Gb-O c9-8' },
					{ 's': 'HIP 22460', 'label': 'HIP 22460' },
				], 'circle': false
			},
		]
	},

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

	init: function () {
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_challenge.parseCSVData('data/csvCache/adamastor.csv', canonnEd3d_challenge.formatAdamastor, resolve);
		});

		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_challenge.parseCSVData('data/csvCache/hesperus.csv', canonnEd3d_challenge.formatHesperus, resolve);
		});

		var p3 = new Promise(function (resolve, reject) {
			canonnEd3d_challenge.formatGSites(sites, resolve);
		});

		Promise.all([p1, p2, p3]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_challenge.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: false,
				playerPos: [92, -69, -386],
				cameraPos: [100, 2000, -699],
				systemColor: '#FF9D00',
			});
		});
	},
};
