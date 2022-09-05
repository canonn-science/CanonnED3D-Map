const API_ENDPOINT = `https://us-central1-canonn-api-236217.cloudfunctions.net/query/thargoid/hyperdiction`;
const EDSM_ENDPOINT = `https://www.edsm.net/api-v1`;
const API_LIMIT = 1000;

const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});
const edsmapi = axios.create({
    baseURL: EDSM_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

let sites = {
	reports: [
		"Oochorrs UF-J c11-0",
		"Oochorrs CS-F c13-0",
		"Oochorrs BS-F c13-0"
	],
};

const go = async types => {
	const keys = Object.keys(types);
	return (await Promise.all(
		keys.map(type => getSites(type, types[type]))
	)).reduce((acc, res, i) => {
		acc[keys[i]] = res;
		return acc;
	}, {});
};

const getSites = async (type, systems) => {
	let records = [];
	//for (var i = 0; i < systems.length; i++) {
		let keepGoing = true;
		let API_START = 0;
		while (keepGoing) {
			let response = await reqSites(API_START, type/*, systems[i]*/);
			await records.push.apply(records, response.data);
			API_START += API_LIMIT;
			//if (response.data.length < API_LIMIT) {
				keepGoing = false;
			//}
		}
	//}
	return records;
};

const reqSites = async (API_START, type, system) => {
	//start = system.replace(/\s/g, "+")
	let payload = await capi({
		url: `/${type}?_limit=${API_LIMIT}&_start=${API_START}`,
		method: 'get'
	});

	return payload;
};
const getSystemsEDSM = async (systemNames) => {
    if (Array.isArray(systemNames)) {
        systemNames = "systemName[]=" + systemNames.join("&systemName[]=");
    } else {
        systemNames = "systemName=" + systemNames;
    }
    //console.log("EDSM Query: ", systemNames);
    let payload = await edsmapi({
        url: `/systems?showCoordinates=1&${systemNames}`,
        method: 'get'
    });

    return payload;
};

var canonnEd3d_challenge = {
	//Define Categories
	systemsData: {
		categories: {
			'Unidentified Interstellar Anomaly': {
				'100': {
					'name': 'Estimated Position',
					'color': '00FFFF',
				},
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
				"1000": {
					'name': "Sol",
					'color': 'FFFF66'
				},
				"1001": {
					'name': "PMD2009 48",
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
				},
				"1006": {
					'name':"Witch Head Nebula",
					'color': 'FFFF66'
				},
				"1007": {
					'name': "Permit Locked Regions",
					'color': 'FF9999'
				}
			},
			"Hyperdictions": {
				"300": {
					'name': "Hostile",
					'color': 'FF66FF'
				},
				"301": {
					'name': "Waypoint 1",
					'color': 'FFFF66'
				},
				"302": {
					'name': "Waypoint 2",
					'color': 'FFFF66'
				},
				"303": {
					'name': "Waypoint 3",
					'color': 'FFFF66'
				},
			}
		},
		systems: [
			{
				'name': "Sol",
				'infos': "Home sweet home... I sure hope they don't come steal my succulents.",
				'url': "",
				'coords': { x: 0, y: 0, z: 0 },
				'cat': ["1000"]
			},
			{
				'name': "PMD2009 48",
				'infos': 'Tourist Asteroid base',
				'url': "",
				'coords': { x: 594.90625, y:  -431.4375 , z: -1071.78125 }, 
				'cat': ["1001"]
			},
			{
				'name': "NGC 2264 Sector RE-Y c14-0",
				'infos': 'Permit locked system that matched nicely with the origin direction of the Unidentified Interstellar Anomaly upon first sightings. It is assumed that the UIA at least traveled through that system on its path.',
				'url': "",
				'coords': { x: 698, y: -384, z: -1904 }, //eyeballed via galmap, permit locked
				'cat': ["102"]
			},
			{	//waypoint 1
				'name': "Oochorrs UF-J c11-0", //initial center of attention
				'infos': "Initial center of attention. First reports of hyperdictions and 'something' made everyone go look. You will need a good FSD to travel this area (>40ly) and prepare to get hyperdicted by Thargoids! <br /><a href='https://media.discordapp.net/attachments/344094711339941890/1014537363332005929/unknown.png' target='_blank' rel='noopener'><img src='https://media.discordapp.net/attachments/344094711339941890/1014537363332005929/unknown.png?width=1131&height=686' width='280' height='150' /></a><br />The <a href='https://media.discordapp.net/attachments/344094711339941890/1014537363332005929/unknown.png' target='_blank' rel='noopener'>Unidentified Interstellar Anomaly</a> was first observed in this system.<br />(Image provided by CMDR Mallchad)",
				'url': "",
				'coords': { x: 686.125, y: -372.875, z: -1832.375 },
				'cat': ["1003", "1004"]
			},
			{//waypoint 2
				'name': "Oochorrs CS-F c13-0",
				'infos': "After the Unidentified Interstellar Anomaly traveled through Oochorrs UF-J c11-0, a few days after its first discovery, all reports of its new heading suggested it's new destination is this system.",
				'url': "",
				'coords': { x: 658.625, y: -384.21875, z: -1783.53125 },
				'cat': ["1004"]
			},
			{//waypoint 3
				'name': "Oochorrs BS-F c13-0",
				'infos': "Estimated third waypoint after watching the UIA go past Oochorrs CS-F c13-0 and move towards this system.",
				'url': "",
				'coords': { x: 650.46875, y: -382.9375, z: -1777.0625},
				'cat': ["102"]
			},
			{
				'name': "HIP 22460",
				'infos': '<a href="https://canonn.science/codex/fort-asch/" target="_blank" rel="noopener">Project Seraph - Fort Asch</a>, the <a href="https://canonn.science/codex/overlook/" target="_blank" rel="noopener">Overlook</a> and two <a href="https://canonn.science/codex/the-unknown-structure/">Thargoid Imprint Sites</a>',
				'url': "https://canonn.science/codex/fort-asch/",
				'coords': { x: -41.3125, y: -58.96875, z: -354.78125 },
				'cat': ["1002"]
			},
			{
				'name': "HIP 23759",
				'infos': 'Witch Head Science Centre / HIP 23759 Geysers / Witch Head Nebula / Barnacle Sites - Witch Head Nebula',
				'url': "",
				'coords': { x: 359.84375, y: -385.53125, z: -718.375 },
				'cat': ["1006"]
			},
			// permit locked center points
			{
				coords: { x: 508.68359, y: -372.59375, z: -1090.87891 },
				name: "Col 70 Sector",
				'cat': ["1007"]
			},
			{
				coords: { x: 851.16406, y: 83.68359, z: -2005.22070 },
				name: "NGC 2264 Sector",
				'cat': ["1007"]
			},
			{
				coords: { x: 608.46094, y: -404.64453, z: -1194.16992 },
				name: "Horsehead Dark Region",
				'cat': ["1007"]
			},
			{
				coords: { x: 11.76172, y: -508.69531, z: -1684.84180 },
				name: "NGC 1647 Sector",
				'cat': ["1007"]
			},
			{
				coords: { x: 855.44141, y: 84.45312, z: -2025.11328 },
				name: "Cone Sector",
				'cat': ["1007"]
			},
			{
				coords: { x: 878.88281, y: -64.39062, z: -1850.92383 },
				name: "Col 97 Sector",
				'cat': ["1007"]
			},
			{
				coords: { x: 1731.03125, y: -400.21094, z: -1396.76758 },
				name: "M41 Sector",
				'cat': ["1007"]
			},/*
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
				'name': "Oochorrs AM-H c12-0",
				'infos': '',
				'url': "",
				'coords': { x: 735.8125, y: -383.21875, z: -1821.9375 },
				'cat': ["1005"]
			},
			{
				'name': "Oochorrs QJ-E b3-0",
				'infos': '',
				'url': "",
				'coords': { x: -8.5625, y: -267.875, z: -2272.90625 },
				'cat': ["1005"]
			},
			{
				'name': "Oochorrs XL-H c12-0",
				'infos': '',
				'url': "",
				'coords': { x: 621.03125, y: -383.9375, z: -1806.25 },
				'cat': ["1005"]
			},
			{
				'name': "Oochoxt YR-F b16-0",
				'infos': '',
				'url': "",
				'coords': { x: 1340.25, y: -279.34375, z: -2001.1875 },
				'cat': ["1005"]
			},
			{
				'name': "Oochorrs DS-F c13-0",
				'infos': '',
				'url': "",
				'coords': { x: 698.75, y: -361.34375, z: -1782.59375 },
				'cat': ["1005"]
			},
			{
				'name': "Flyooe Eohn VS-M c22-0",
				'infos': '',
				'url': "",
				'coords': { x: 307.46875, y: -661.34375, z: -2644.15625 },
				'cat': ["1005"]
			},
			//measurement crossings
			{
				'name': "First Measurement",
				'infos': 'calculated by Seventh_Circle',
				'url': "",
				'coords': { x: 690.495, y: -377.143, z: -1862.790 },
				'cat': ["1004"]
			},
			{
				'name': "Second Measurement",
				'infos': 'calculated by Seventh_Circle',
				'url': "",
				'coords': { x: 688.305, y: -375.546, z: -1851.103 },
				'cat': ["1004"]
			},
			{
				'name': "Third Measurement",
				'infos': 'calculated by Seventh_Circle',
				'url': "",
				'coords': { x: 680.665, y: -375.239, z: -1822.421 },
				'cat': ["1004"]
			},*/
		],
		"routes": [
			{
				//observed route of the UIA
				cat: ["101"], 'points': [
					{ 's': 'Oochorrs UF-J c11-0', 'label': 'Oochorrs UF-J c11-0' },
					{ 's': 'Oochorrs CS-F c13-0', 'label': 'Oochorrs CS-F c13-0' },
				], 'circle': false
			},/*
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
					{ 's': 'Oochorrs AM-H c12-0', 'label': 'Oochorrs AM-H c12-0' },
					{ 's': 'Oochorrs QJ-E b3-0', 'label': 'Oochorrs QJ-E b3-0' },
				], 'circle': false
			},
			{
				//third measurement, line one
				cat: ["103"], 'points': [
					{ 's': 'Oochorrs XL-H c12-0', 'label': 'Oochorrs XL-H c12-0' },
					{ 's': 'Oochoxt YR-F b16-0', 'label': 'Oochoxt YR-F b16-0' },
				], 'circle': false
			},
			{
				//third measurement, line two
				cat: ["103"], 'points': [
					{ 's': 'Oochorrs DS-F c13-0', 'label': 'Oochorrs DS-F c13-0' },
					{ 's': 'Flyooe Eohn VS-M c22-0', 'label': 'Flyooe Eohn VS-M c22-0' },
				], 'circle': false
			},*/
			//guesstimated direction of travel
			{
				//assumed direction of origin
				cat: ["102"], 'points': [
					{ 's': 'NGC 2264 Sector RE-Y c14-0', 'label': 'NGC 2264 Sector RE-Y c14-0' },
					{ 's': 'Oochorrs UF-J c11-0', 'label': 'Oochorrs UF-J c11-0' },
				], 'circle': false
			},
			{
				//assumed current route
				cat: ["102"], 'points': [
					{ 's': 'Oochorrs CS-F c13-0', 'label': 'Oochorrs CS-F c13-0' },
					{ 's': 'Oochorrs BS-F c13-0', 'label': 'Oochorrs BS-F c13-0' },
				], 'circle': false
			},
		]
	},
	formatHDs: async function (data, resolvePromise) {
		hypers = await go(data)
		if (hypers.reports == undefined || hypers.reports.length < 1) {
			console.log("didnt get hyperdiction reports", hypers)
			resolvePromise()
			return;
		}
		//console.log("get hyperdiction reports", hypers)
		//first create a unique list of systems involved in hyperdictions
		var hds = {};
		for (var d = 0; d < hypers.reports.length; d++) {
			let hyperData = hypers.reports[d];
		
			var systemName = hyperData.start.system

			if (sites.reports.indexOf(hyperData.start.system) == -1
			&& sites.reports.indexOf(hyperData.destination.system) == -1) { continue }

			if (Object.keys(hds).includes(systemName)) continue;
			hds[systemName] = hyperData
		}
		
		//then iterate that list without duplicates
		for (let systemName in hds) {
			var poi = hds[systemName].start;
			var other = hds[systemName].destination;
			//console.log("throwing hyper away", poi, hyperData)
			//ignoring hypers that are not connected to our waypoints
			if (poi == undefined) { continue }
			var poiSite = {};
			poiSite['name'] = poi.system;
			poiSite['coords'] = {
				x: parseFloat(poi.x),
				y: parseFloat(poi.y),
				z: parseFloat(poi.z),
			}
				
			poiSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + poi.system + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + poi.system + '" target="_blank" rel="noopener">Signals</a>';

			//Check Site Type and match categories
			poiSite['cat'] = ["30"+(1+sites.reports.indexOf(other.system))];

			if (hds[systemName].hostile != undefined
			&& hds[systemName].hostile != null
			&& hds[systemName].hostile != "N")
			{ poiSite['cat'].push("300") }
			
			//console.log("adding poi with data:", poiSite, hds[systemName])
			// We can then push the site to the object that stores all systems
			canonnEd3d_challenge.systemsData.systems.push(poiSite);
		}
		resolvePromise();
	},

/*
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
	*/
	formatMeasurements: async function (data, resolvePromise) {
		//console.log(data);
		var measystems = {};
		for (var i = 0; i < data.length; i++) {
			if (data[i]["Current System"]
			&& data[i]["Current System"].replace(/\s/g, '').length > 1
			&& data[i]["Targetted System"]
			&& data[i]["Targetted System"].replace(/\s/g, '').length > 1) {
				var route = {};
				route['points'] = [
					{ 's': data[i]["Current System"], 'label': data[i]["Current System"] },
					{ 's': data[i]["Targetted System"], 'label': data[i]["Targetted System"] }
				]
				route['cat'] = ["103"];
				route['circle'] = false;
				canonnEd3d_challenge.systemsData.routes.push(route);
				if (!Object.keys(measystems).includes(data[i]["Current System"]))
					measystems[data[i]["Current System"]] = false;
				if (!Object.keys(measystems).includes(data[i]["Targetted System"]))
					measystems[data[i]["Targetted System"]] = false;
			}
		}
		let response = await getSystemsEDSM(Object.keys(measystems));

		if (response.data.length <= 0)
		{
			console.log("EDSM debug", response);
		}
		for (const index in response.data) {
			let system = response.data[index];
			if (!system.name || !system.coords) continue
			measystems[system.name] = system
		}
		for (let systemName in measystems) {
			if (!measystems[systemName].name || !measystems[systemName].coords) continue;
			var poiSite = {};
			poiSite['name'] = measystems[systemName].name;			
			poiSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + poiSite['name'] + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + poiSite['name'] + '" target="_blank" rel="noopener">Signals</a>';
			poiSite['url'] = "https://canonn-science.github.io/canonn-signals/?system=" + poiSite['name']
			poiSite['coords'] = {
				x: parseFloat(measystems[systemName].coords.x),
				y: parseFloat(measystems[systemName].coords.y),
				z: parseFloat(measystems[systemName].coords.z),
			};
			//console.log(measystems[systemName])
			poiSite['cat'] = ["103"];
			// We can then push the site to the object that stores all systems
			canonnEd3d_challenge.systemsData.systems.push(poiSite);
		}
		resolvePromise();
	},
	parseCSVData: function (uri, cb, resolve) {
		Papa.parse(uri, {
			download: true,
			header: true,
			complete: function (results) {
				return cb(results.data, resolve);
			},
		});
	},
	createSphere: function(data) {
		//console.log("making sphere: ", data)
		var geometry = new THREE.SphereGeometry(data.radius, 40, 20);
		var sphere = new THREE.Mesh(geometry, Ed3d.material.permit_zone);
		//idk why but the z coordinate is twisted for this
		sphere.position.set(data.coords[0], data.coords[1], -data.coords[2]);
		sphere.name = data.name;
		sphere.clickable = false;
		scene.add(sphere);
	},
	finishMap: function(v3_uia) {
		return function() {
			if (v3_uia != undefined) {
				var sprite = new THREE.Sprite(Ed3d.material.spiral);
				//console.log("trying stargoid sprite: ", v3_uia)
				sprite.position.set(v3_uia.x, v3_uia.y, -v3_uia.z);
				sprite.scale.set(50, 50, 1);
				scene.add(sprite); // this centers the glow at the mesh
			}
			var pls = [
			  {
				radius: 514.0,
				coords: [508.68359, -372.59375, -1090.87891],
				name: "Col 70 Sector"
			  },
			  {
				radius: 510.0,
				coords: [851.16406, 83.68359, -2005.22070],
				name: "NGC 2264 Sector"
			  },
			  {
				radius: 200.0,
				coords: [608.46094, -404.64453, -1194.16992],
				name: "Horsehead Dark Region"
			  },
			  {
				radius: 205.0,
				coords: [11.76172, -508.69531, -1684.84180],
				name: "NGC 1647 Sector"
			  },
			  {
				radius: 100.0,
				coords: [855.44141, 84.45312, -2025.11328],
				name: "Cone Sector"
			  },
			  {
				radius: 250.0,
				coords: [878.88281, -64.39062, -1850.92383],
				name: "Col 97 Sector"
			  },
			  {
				radius: 350.0,
				coords: [1731.03125, -400.21094, -1396.76758],
				name: "M41 Sector"
			  }
			]
			
			for (var i = 0; i < pls.length; i++) {
				canonnEd3d_challenge.createSphere(pls[i])
			}
	  
			document.getElementById("loading").style.display = "none";
		}
	},
	init: function () {/*
		var p1 = new Promise(function (resolve, reject) {
			//canonnEd3d_challenge.parseCSVData('data/csvCache/adamastor.csv', canonnEd3d_challenge.formatAdamastor, resolve);
		});
*/
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_challenge.parseCSVData('data/csvCache/UIA Vector Survey (Responses) - Responses.csv', canonnEd3d_challenge.formatMeasurements, resolve);
		});
		var p3 = new Promise(function (resolve, reject) {
			canonnEd3d_challenge.formatHDs(sites, resolve);
		});

		Promise.all([p3]).then(function () {
		
			const start = new THREE.Vector3(658.625, -384.21875, -1783.53125)
			const end = new THREE.Vector3(650.46875, -382.9375, -1777.0625)
			const starttime = new Date("2022-09-05T05:09:12Z").getTime()
			const endtime = new Date("2022-09-05T20:18:00Z").getTime()
			const nowtime = new Date().getTime()
			const timediff = endtime-starttime || 1
			const nowdiff = nowtime-starttime
			const percent = nowdiff/timediff
			const vecdiff = end.sub(start)
			const uia = start.addScaledVector(vecdiff, percent)

			console.log("current estimated position of the UIA: ", uia)
			if (uia.x && uia.y && uia.z) {
				var uia_poi = {
					'name': "Unidentified Interstellar Anomaly",
					'infos': "This position is an <strong>estimate</strong> of the UIA's current position. It is assuming travel at constant speed along the red line.",
					'url': "",
					'coords': { x: uia.x, y: uia.y, z: uia.z },
					'cat': ["100"]
				}
				//canonnEd3d_challenge.systemsData.systems.push(uia_poi)
			}

			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_challenge.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: false,
				playerPos: [650.46875, -382.9375, -1777.0625],
				cameraPos: [-100, 0, -1899],
				systemColor: '#FF9D00',
				finished: canonnEd3d_challenge.finishMap(uia)
			});
		});
	},
};
