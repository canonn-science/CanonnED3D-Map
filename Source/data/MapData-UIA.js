const API_ENDPOINT = `https://us-central1-canonn-api-236217.cloudfunctions.net/query`;
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
	"thargoid/hyperdiction/reports": [],
	"uia/waypoints": [],
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
					'name':"First Visuals",
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
					'name': "Permit Locked Center",
					'color': 'FF9999'
				}
			},
			"Hyperdictions": {
				"300": {
					'name': "Hostile",
					'color': 'FF66FF'
				},
				"301": {
					'name': "Waypoint Area",
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
			//guesstimated direction of travel
			{
				//assumed direction of origin
				cat: ["102"], 'points': [
					{ 's': 'NGC 2264 Sector RE-Y c14-0', 'label': 'NGC 2264 Sector RE-Y c14-0' },
					{ 's': 'Oochorrs UF-J c11-0', 'label': 'Oochorrs UF-J c11-0' },
				], 'circle': false
			},
		]
	},
	formatHDs: async function (data, resolvePromise) {
		apidata = await go(data)
		var reports = apidata["thargoid/hyperdiction/reports"]
		var wps = apidata["uia/waypoints"]
		if (reports == undefined || reports.length < 1) {
			console.log("didnt get hyperdiction reports", apidata)
			resolvePromise()
			return;
		}
		this.formatWaypoints(wps) //will has to go here, code down the line depends on global sites.wps
		//first create a unique list of systems involved in hyperdictions
		var hds = {};
		for (var d = 0; d < reports.length; d++) {
			let hyperData = reports[d];
		
			var systemName = hyperData.start.system
			if (hyperData.start.nearest.name != "UIA Route"
			|| hyperData.destination.nearest.name != "UIA Route") continue

			if (Object.keys(hds).includes(systemName)) {
				if (hyperData.hostile == "Y") hds[systemName].hostile = "Y"
				continue;
			}
			hds[systemName] = hyperData
		}
		
		//then iterate that list without duplicates
		var maxWPI = 0;
		for (let systemName in hds) {
			var poi = hds[systemName].start;
			var other = hds[systemName].destination;
			//console.log("throwing hyper away", poi, hyperData)
			//ignoring  that are not connected to our waypoints
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
			var waypointIndex = sites.wps.indexOf(other.system)
			if (waypointIndex>maxWPI) maxWPI = waypointIndex
			if (waypointIndex == -1)
			{	//if the target wasnt the waypoint, see if the source was.
				waypointIndex = sites.wps.indexOf(poi.system)
			}
			//if both are not a waypoint we get -1 and end up at 301 "Waypoint Area"
			poiSite['cat'] = ["30"+(2+waypointIndex)];

			if (hds[systemName].hostile == "Y")
			{
				poiSite['cat'].push("300")
			}
			//console.log("adding poi with data:", poiSite, hds[systemName])
			// We can then push the site to the object that stores all systems
			canonnEd3d_challenge.systemsData.systems.push(poiSite);
		}

		for (var i = 0; i <= maxWPI; i++) {
			canonnEd3d_challenge.systemsData.categories["Hyperdictions"]["30"+(2+i)] = {
				'name': "Waypoint "+(i+1),
				'color': 'FFFF66'
			}
		}
		resolvePromise();
	},
	uia: {},
	formatWaypoints: function (data) {
		var dictata = [];
		if (data.length <= 1) {
			console.log("no data for waypoints", data)
			return
		}
		var headers = data[0];
		for (var i = 1; i < data.length; i++) {
			var line = {}
			for (var c = 0; c < headers.length; c++) {
				line[headers[c]] = data[i][c]
			}
			dictata.push(line)
		}
		var data = dictata;
		//WP#	System	X	Y	Z	Distance	Arrival Time	Avg Speed Ly/h	Estimate	Remarks
		var arrivaldate;
		var arrivalcoords;
		var arrivalname;
		var lastarrivaldate;
		var lastcoords;
		var lastname;
		var last_i;
		var route = {
			cat: ["101"],
			circle: false,
			points: []
		}
		var endroute = {
			cat: ["102"],
			circle: false,
			points: []
		}
		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i]["System"] && data[i]["System"].replace(' ', '').length > 1) {

				var poiSite = {};
				poiSite['name'] = data[i]["System"];

				poiSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i]["System"] + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + data[i]["System"] + '" target="_blank" rel="noopener">Signals</a>';
				
				poiSite['url'] = "https://canonn-science.github.io/canonn-signals/?system=" + poiSite['name']
				poiSite['coords'] = {
					x: parseFloat(data[i]["X"]),
					y: parseFloat(data[i]["Y"]),
					z: parseFloat(data[i]["Z"]),
				};

				//Check Site Type and match categories
				poiSite['cat'] = ["102"]
				var at = data[i]["Arrival Time"]
				if (at.indexOf("/") > 0 && at.indexOf(":") > 0) {
					lastarrivaldate = arrivaldate
					lastcoords = arrivalcoords
					lastname = arrivalname
					last_i = i
					arrivalname = poiSite['name']

					poiSite['cat'] = ["1004"]
					if (i == 1) {
						poiSite['cat'].push("1003")
					}
					//compute route and more depending on waypoints
					arrivalcoords = poiSite['coords']
					var dateform = at; //expecting dd/mm/yyyy hh:mm:ss for gsheet reasons
					var ado = {
						day: dateform.split(" ")[0].split("/")[0],
						month: dateform.split(" ")[0].split("/")[1],
						year: dateform.split(" ")[0].split("/")[2],
						hour: dateform.split(" ")[1].split(":")[0],
						minute: dateform.split(" ")[1].split(":")[1],
						second: dateform.split(" ")[1].split(":")[2],
					}
					arrivaldate = [ado.year,ado.month,ado.day].join("-")+"T"+[ado.hour,ado.minute,ado.second].join(":")+"Z"
					arrivaldate = new Date(arrivaldate).getTime()
					route['points'].push({ 's': data[i]["System"], 'label': data[i]["System"] })
					if (!sites.wps) sites.wps = [];
					sites.wps.push(data[i]["System"])
				}
				else {
					if (i == last_i+1){
						endroute['points'].push({ 's': arrivalname, 'label': arrivalname })
					}
					if (i > last_i+1 || i == data.length-1) {
						endroute['points'].push({ 's': poiSite['name'], 'label': poiSite['name'] })
					}
				}
				
				// We can then push the site to the object that stores all systems
				canonnEd3d_challenge.systemsData.systems.push(poiSite);

				
			}
		}
		canonnEd3d_challenge.systemsData.routes.push(route);
		canonnEd3d_challenge.systemsData.routes.push(endroute);
		//calculating UIA current estimated position
		const start = new THREE.Vector3(lastcoords.x, lastcoords.y, lastcoords.z)
		const end = new THREE.Vector3(arrivalcoords.x, arrivalcoords.y, arrivalcoords.z)
		const starttime = new Date(lastarrivaldate).getTime()
		const endtime = new Date(arrivaldate).getTime()
		const nowtime = new Date().getTime()
		const timediff = endtime-starttime || 1
		const nowdiff = nowtime-starttime
		const percent = nowdiff/timediff
		const vecdiff = end.sub(start)
		canonnEd3d_challenge.uia = start.addScaledVector(vecdiff, percent)

		console.log("current estimated position of the UIA: ", canonnEd3d_challenge.uia)
		if (canonnEd3d_challenge.uia.x
		&& canonnEd3d_challenge.uia.y
		&& canonnEd3d_challenge.uia.z) {
			var uia_poi = {
				'name': "Unidentified Interstellar Anomaly",
				'infos': "This position is an <strong>estimate</strong> of the UIA's current position. It is assuming travel at constant speed along the red line.",
				'url': "",
				'coords': {
					x: canonnEd3d_challenge.uia.x,
					y: canonnEd3d_challenge.uia.y,
					z: canonnEd3d_challenge.uia.z
				},
				'cat': ["100"]
			}
			//see finishMap() for the sprite
			canonnEd3d_challenge.systemsData.systems.push(uia_poi)
		}

	},
	formatMeasurements: async function (data, resolvePromise) {
		//console.log(data);
		var measystems = {};
		for (var i = 0; i < data.length; i++) {
			if (data[i]["Permit Lock"]) continue
			if (data[i]["Accuracy"] > 3) continue
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
			poiSite['cat'] = ["1005"];
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
	finishMap: function() {
		if (canonnEd3d_challenge.uia != undefined) {
			var sprite = new THREE.Sprite(Ed3d.material.spiral);
			//console.log("trying stargoid sprite: ", v3_uia)
			sprite.position.set(
				canonnEd3d_challenge.uia.x,
				canonnEd3d_challenge.uia.y,
				-canonnEd3d_challenge.uia.z //for some reason z is inverted
			);
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
	},
	init: function () {
		//var p1 = new Promise(function (resolve, reject) {
		//	canonnEd3d_challenge.parseCSVData('data/csvCache/UIA Vector Survey (Responses) - Waypoints.csv', canonnEd3d_challenge.formatWaypoints, resolve);
		//});
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_challenge.parseCSVData('data/csvCache/UIA Vector Survey (Responses) - Responses.csv', canonnEd3d_challenge.formatMeasurements, resolve);
		});
		var p3 = new Promise(function (resolve, reject) {
			canonnEd3d_challenge.formatHDs(sites, resolve);
		});

		Promise.all([p3]).then(function () {
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
				finished: canonnEd3d_challenge.finishMap
			});
		});
	},
};
