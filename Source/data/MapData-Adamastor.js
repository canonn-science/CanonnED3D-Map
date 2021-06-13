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
			'Adamastor Challenge': {
				/*'10': {
					name: 'Varati',
					color: 'f5a142',
				},
				'20': {
					name: 'Waypoint',
					color: '42f557',
				},*/

				'30': {
					name: 'Adamastor Initial Route',
					color: 'FF6666',
				},
				'40': {
					name: 'Adamastor Diversion Route',
					color: '66ff66',
				},
				'60': {
					name: 'Intersection of Routes',
					color: '666666',
				},
				'70': {
					name: 'Line Through Waypoints ',
					color: '666666',
				},
				'80': {
					name: "Adamastor's Return Journey",
					color: '446644',
				},
			},
			'Hesperus Challenge': {
				'100': {
					name: 'Hesperus & Dredger',
					color: 'FF6666',
				},
				'200': {
					name: '17 LPs',
					color: '6666FF',
				},
				'300': {
					name: 'Triangulation LPs',
					color: '66FF66',
				}
			},
			"Guardian Beacons - (GB)": {
				"201": {
					name: "Beacon",
					color: '66FFFF'
				}
			},
		},
		systems: [],
		"routes": [
			{
				cat: ["30"], 'points': [

					{ 's': 'HIP 33386', 'label': 'HIP 33386' },
					{ 's': 'HIP 39748', 'label': 'HIP 39748' },
					{ 's': 'Chukchan', 'label': 'Chukchan' },

				], 'circle': false
			},
			{
				cat: ["70"], 'points': [
					{ 's': 'Extention1', 'label': 'Extention1' },
					{ 's': 'HIP 33386', 'label': 'HIP 33386' },
					{ 's': 'HIP 39748', 'label': 'HIP 39748' },
					{ 's': 'Extention2', 'label': 'Extention2' },
				], 'circle': false
			},
			{
				cat: ["40"], 'points': [
					{ 's': 'HIP 33386', 'label': 'HIP 33386' },
					{ 's': 'Synuefe XE-Y c17-7', 'label': 'Synuefe XE-Y c17-7' },
					{ 's': 'Musca Dark Region PJ-P B6-1', 'label': 'Musca Dark Region PJ-P B6-1' },
					{ 's': 'HIP 69200', 'label': 'HIP 69200' },
				], 'circle': false
			},
			{
				cat: ["80"], 'points': [
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
				cat: ["60"], 'points': [
					{ 's': 'Chukchan', 'label': 'Chukchan' },
					{ 's': 'Route Intersection', 'label': 'Route Intersection' },
					{ 's': 'HIP 69200', 'label': 'HIP 69200' },
				], 'circle': false
			},
			{
				cat: ["200"], 'points': [
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
						poiSite['infos'] = siteData[i].infos + '<br/><a href="https://www.edsm.net/en/system?systemName=' + siteData[i].system.systemName + '">EDSM</a><br/><a href="https://tools.canonn.tech/Signals/?system=' + siteData[i].system.systemName + '">Signals</a>';
					} else {
						poiSite['infos'] = '<a href="https://canonn.science/codex/guardian-beacons/">Guardian Beacon</a><br/><a href="https://canonn.science/wp-content/uploads/2018/08/Guardian-Beacon.png" target="_new"><img src="https://canonn.science/wp-content/uploads/2018/08/Guardian-Beacon.png" /></a><a href="https://www.edsm.net/en/system?systemName=' + siteData[i].system.systemName + '">EDSM</a><br/><a href="https://tools.canonn.tech/Signals/?system=' + siteData[i].system.systemName + '">Signals</a>';
					}

					//Check Site Type and match categories
					if (siteTypes[i] == 'gbsites') {
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
					poiSite['infos'] = data[i].infos + '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i].name + '">EDSM</a><br/><a href="https://tools.canonn.tech/Signals/?system=' + data[i].name + '">Signals</a>';
				} else {
					poiSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i].name + '">EDSM</a><br/><a href="https://tools.canonn.tech/Signals/?system=' + data[i].name + '">Signals</a>';
				}
				//Check Site Type and match categories

				var component = data[i].name.split(' ');
				if (poiSite['name'] == 'Varati') {
					poiSite['details'] == 'Start and Finish';
					poiSite['cat'] = [10];

				} else {
					poiSite['cat'] = [20];
				}

				poiSite['url'] = "https://tools.canonn.tech/Signals/?system=" + poiSite['name']
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
					poiSite['infos'] = data[i].infos + '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i].name + '">EDSM</a><br/><a href="https://tools.canonn.tech/Signals/?system=' + data[i].name + '">Signals</a>';
				} else {
					poiSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i].name + '">EDSM</a><br/><a href="https://tools.canonn.tech/Signals/?system=' + data[i].name + '">Signals</a>';
				}
				poiSite['url'] = "https://tools.canonn.tech/Signals/?system=" + poiSite['name']
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
