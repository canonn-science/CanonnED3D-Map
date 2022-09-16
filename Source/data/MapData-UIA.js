const API_ENDPOINT = `https://us-central1-canonn-api-236217.cloudfunctions.net/query`;
const EDSM_ENDPOINT = `https://www.edsm.net/api-v1`;
const API_LIMIT = 1500;

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
	"uia/waypoints/2": [],
	"uia/waypoints/3": [],
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
			"Points of Interest": {
				"1000": {
					'name': "Populated Systems",
					'color': 'FF9D00'
				},
				"1002": {
					'name': "HIP 22460",
					'color': '66FF66'
				},
				"1007": {
					'name': "Permit Locked Centers",
					'color': 'FF3333'
				}
			},
			'Unidentified Interstellar Anomaly': {
				'100': {
					'name': 'Estimated Direction',
					'color': '004F4F',
				},
				'101': {
					'name': 'Recorded Route',
					'color': '66FF66',
				},
				'102': {
					'name': 'Estimated Route',
					'color': '336600',
				},
				"1003": {
					'name':"First Visuals",
					'color': '66FF66'
				},
			},/*
			"Measurements": {
				'103': {
					'name': 'Measurement Lines',
					'color': '666666',
				},
				"1005": {
					'name':"Measurement Endpoint",
					'color': '999999'
				},
			},*/
			"Hyperdictions": {
				"299": {
					name: "All Hyperdictions",
					color: "999900"
				},
				"300": {
					'name': "Hostile",
					'color': 'FFFF66'
				},
				"301": {
					'name': "Waypoint Area Only",
					'color': 'FFFF66'
				},
			},
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
				'cat': ["1000"]
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
				'cat': ["1000"]
			},
			{
				'name': "42 n Persei",
				'infos': '',
				'url': "",
				'coords': { x: -83.5625, y: -73.40625, z: -244.34375 },
				'cat': ["1000"]
			},
			{
				'name': "Chun Pindit",
				'infos': '',
				'url': "",
				'coords': { x: -11.5625, y: -15.40625, z: -181.09375 },
				'cat': ["1000"]
			},
			{
				'name': "Tekkeitjal",
				'infos': '',
				'url': "",
				'coords': { x: 76.5625, y: 9.34375, z: -183.4375 },
				'cat': ["1000"]
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
			//UIA3 manual input until sheet api
			//Oochost OI-W c4-1	-447.78125	-207.90625	-2110.34375
			//Oochost WU-S C6-0	-436.4375	-186.6875	-2038.1875
			{
				'name': "Oochost OI-W c4-1",
				'coords': { x: -447.78125, y: -207.90625, z: -2110.34375 },
				'cat': ["102"]
			},
			{
				'name': "Oochost WU-S C6-0",
				'coords': { x: -436.4375, y: -186.6875, z: -2038.1875 },
				'cat': ["102"]
			},*/
		],
		routes: [
			/*{
				cat: ["102"],
				circle: false,
				points: [
					{ 's': "Oochost OI-W c4-1", 'label': "Oochost OI-W c4-1" },
					{ 's': "Oochost WU-S C6-0", 'label': "Oochost WU-S C6-0" }
				]
			},*/
		]
	},
	formatHDs: async function (data, resolvePromise) {
		console.log("start sheet api query")
		apidata = await go(data)
		console.log("end sheet api query")
		var reports = apidata["thargoid/hyperdiction/reports"]
		var wps = []
		wps.push(apidata["uia/waypoints"])
		wps.push(apidata["uia/waypoints/2"])
		wps.push(apidata["uia/waypoints/3"])
		if (reports == undefined || reports.length < 1) {
			console.log("didnt get hyperdiction reports", apidata)
			resolvePromise()
			return;
		}
		//this will have to go here, bc code down the line depends on global sites.wps
		sites['wps'] = []
		for (var i = 0; i < wps.length; i++) {
			sites.wps.push(this.formatWaypoints(wps[i]))
		}
		//first create a unique list of systems involved in hyperdictions
		var hds = {};
		for (var d = 0; d < reports.length; d++) {
			let hyperData = reports[d];
		
			var systemName = hyperData.start.system
			var destinationName = hyperData.destination.system
			if ((hyperData.start.nearest.name != "UIA Route"
			|| hyperData.destination.nearest.name != "UIA Route")
			&& (hyperData.start.nearest.name != "UIA Route 2"
			|| hyperData.destination.nearest.name != "UIA Route 2")
			&& (hyperData.start.nearest.name != "UIA Route 3"
			|| hyperData.destination.nearest.name != "UIA Route 3")) {
				//console.log("nearest names:", hyperData.start.nearest, hyperData.destination.nearest)
				continue
			}

			if (Object.keys(hds).includes(systemName+":::"+destinationName)) {
				if (hyperData.hostile == "Y") hds[systemName+":::"+destinationName].hostile = "Y"
				continue;
			}
			hds[systemName+":::"+destinationName] = hyperData
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
			var waypointIndex=-1;
			//Check Site Type and match categories
			for (var i = 0; i < sites.wps.length; i++) {
				waypointIndex = sites.wps[i].indexOf(other.system)
				if (waypointIndex>maxWPI) maxWPI = waypointIndex
				if (waypointIndex == -1)
				{	//if the target wasnt the waypoint, see if the source was.
					waypointIndex = sites.wps[i].indexOf(poi.system)
					if (waypointIndex > -1) break
				} else {
					break
				}
			}
			//console.log("waypointIndex:", waypointIndex)
			//if both are not a waypoint we get -1 and end up at 301 "Waypoint Area"
			poiSite['cat'] = ["30"+(2+waypointIndex)];
			poiSite['cat'].push("299")
			if (hds[systemName].hostile == "Y")
			{
				poiSite['cat'].push("300")
			}
			//console.log("adding poi with data:", poiSite, hds[systemName])
			// We can then push the site to the object that stores all systems
			canonnEd3d_challenge.systemsData.systems.push(poiSite);
			this.addRoute(poiSite.cat, [poiSite.name, other.system])
		}
		//console.log("global waypoints list:", sites.wps)
		for (var i = 0; i <= maxWPI; i++) {
			canonnEd3d_challenge.systemsData.categories["Hyperdictions"]["30"+(2+i)] = {
				'name': "Waypoint "+(i+1),
				'color': '999900'
			}
		}
		resolvePromise();
	},
	addRoute: (cat, systems, circle=false) => {
		var route = {
			cat: cat,
			circle: circle,
			points: []
		}
		for (var i = 0; i < systems.length; i++) {
			route['points'].push({ 's': systems[i], 'label': systems[i] })
		}
		canonnEd3d_challenge.systemsData.routes.push(route);
	},
	uia: [],
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
		var arrivaldate;
		var arrivalcoords;
		var arrivalname;
		var lastarrivaldate;
		var lastcoords;
		var lastname;
		var last_i;
		var wps;
		var startroute = {
			cat: ["102"],
			circle: false,
			points: []
		}
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


		var firstwp;
		var sumX = 0, sumY = 0, sumZ = 0;
		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i]["System"] && data[i]["System"].replace(' ', '').length > 1) {

				var poiSite = {};
				poiSite['name'] = data[i]["System"];

				poiSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i]["System"] + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + data[i]["System"] + '" target="_blank" rel="noopener">Signals</a>';
				
				//poiSite['url'] = "https://canonn-science.github.io/canonn-signals/?system=" + poiSite['name']
				poiSite['coords'] = {
					x: parseFloat(data[i]["X"]),
					y: parseFloat(data[i]["Y"]),
					z: parseFloat(data[i]["Z"]),
				};
				sumX -= poiSite['coords'].x 
				sumY -= poiSite['coords'].y 
				sumZ -= poiSite['coords'].z 

				//Check Site Type and match categories
				poiSite['cat'] = ["102"]
				var at = data[i]["Traversal Time"]
				if (at.indexOf("/") > 0 && at.indexOf(":") > 0) {
					lastarrivaldate = arrivaldate
					lastcoords = arrivalcoords
					lastname = arrivalname
					last_i = i
					arrivalname = poiSite['name']

					poiSite['cat'] = ["101"]
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
					if (route['points'].length < 1) {
						startroute['points'].push({ 's': data[i]["System"], 'label': data[i]["System"] })
					}
					route['points'].push({ 's': data[i]["System"], 'label': data[i]["System"] })
					if (!wps) wps = [];
					wps.push(data[i]["System"])
				}
				else {
					if (i == last_i+1){
						endroute['points'].push({ 's': arrivalname, 'label': arrivalname })
					}
					if (i > last_i+1 || i == data.length-1) {
						endroute['points'].push({ 's': poiSite['name'], 'label': poiSite['name'] })
						//put the midpoint as arrival data for the UIA only to make it work without traversal ETA
						var mp = data[i]["Midpoint Time"]
						if (mp.indexOf("/") > 0 && mp.indexOf(":") > 0) {
							lastarrivaldate = arrivaldate
							lastcoords = arrivalcoords
							var dateform = mp; //expecting dd/mm/yyyy hh:mm:ss for gsheet reasons
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
							arrivalcoords = poiSite['coords']
							//console.log(i, last_i, mp, arrivalcoords, new Date(arrivaldate))
						}
					}
					if (!lastname) {
						startroute['points'].push({ 's': data[i]["System"], 'label': data[i]["System"] })
					}
				}
				
				if (i==0) firstwp = poiSite
				// We can then push the site to the object that stores all systems
				canonnEd3d_challenge.systemsData.systems.push(poiSite);

			}
		}

		canonnEd3d_challenge.systemsData.routes.push(startroute);
		canonnEd3d_challenge.systemsData.routes.push(route);
		canonnEd3d_challenge.systemsData.routes.push(endroute);
		//calculating UIA current estimated position
		if (lastcoords && lastarrivaldate) {
			//console.log(lastcoords, lastarrivaldate, arrivalcoords, arrivaldate)
			const start = new THREE.Vector3(lastcoords.x, lastcoords.y, lastcoords.z)
			const end = new THREE.Vector3(arrivalcoords.x, arrivalcoords.y, arrivalcoords.z)
			const starttime = new Date(lastarrivaldate).getTime()
			const endtime = new Date(arrivaldate).getTime()
			const nowtime = new Date().getTime()
			const timediff = endtime-starttime || 1
			const nowdiff = nowtime-starttime
			const percent = nowdiff/timediff
			const vecdiff = end.sub(start)
			canonnEd3d_challenge.uia.push(start.addScaledVector(vecdiff, percent))
			//console.log("% of the way:", percent, new Date(lastarrivaldate).toString(), new Date(arrivaldate).toString())
			var lastuia = canonnEd3d_challenge.uia.length-1
			console.log("current estimated position of the UIA"+(lastuia+1)+": ", percent, canonnEd3d_challenge.uia[lastuia])
			var uia_poi = {
				'name': "Unidentified Interstellar Anomaly",
				'infos': "This is an <strong>estimate</strong> of this UIA's current position.",
				'url': "",
				'coords': {
					x: canonnEd3d_challenge.uia[lastuia].x,
					y: canonnEd3d_challenge.uia[lastuia].y,
					z: canonnEd3d_challenge.uia[lastuia].z
				},
				'cat': ["100"]
			}
			//see finishMap() for the sprite
			canonnEd3d_challenge.systemsData.systems.push(uia_poi)

			//paint a long line of potential where the UIA is heading at
			var meanX = sumX/data.length
			var meanY = sumY/data.length
			var meanZ = sumZ/data.length
			const v3_mean = new THREE.Vector3(meanX, meanY, meanZ)
			v3_mean.normalize()
			var v3_firstwp = new THREE.Vector3(firstwp.coords.x, firstwp.coords.y, firstwp.coords.z)
			v3_firstwp.addScaledVector(v3_mean, v3_firstwp.length()*1.1)

			//console.log(v3_mean, v3_firstwp)
			var extension = {
				'name': "extended mean direction of UIA#"+(lastuia+1),
				'infos': "Extension system to paint the mean line of UIA#"+(lastuia+1),
				'url': "",
				'coords': { x: v3_firstwp.x, y: v3_firstwp.y, z: v3_firstwp.z },
				'cat': ["100"]
			}
			canonnEd3d_challenge.systemsData.systems.push(extension)
			var meanroute = {
				cat: ["100"],
				circle: false,
				points: [
					{s: firstwp.name, value: firstwp.name},
					{s: extension.name, value: extension.name}
				]
			}
			canonnEd3d_challenge.systemsData.routes.push(meanroute);
		}

		return wps
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
			//poiSite['url'] = "https://canonn-science.github.io/canonn-signals/?system=" + poiSite['name']
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
	createSphere: function(data, color) {
		//console.log("making sphere: ", data)
		var geometry = new THREE.SphereGeometry(data.radius, 40, 20);
		var sphere = new THREE.Mesh(geometry, color);
		//idk why but the z coordinate is twisted for this
		sphere.position.set(data.coords[0], data.coords[1], -data.coords[2]);
		sphere.name = data.name;
		sphere.clickable = false;
		scene.add(sphere);
	},
	finishMap: function() {
		for (var i = 0; i < canonnEd3d_challenge.uia.length; i++) {
			var sprite = new THREE.Sprite(Ed3d.material.spiral);
			//console.log("trying stargoid sprite: ", v3_uia)
			sprite.position.set(
				canonnEd3d_challenge.uia[i].x,
				canonnEd3d_challenge.uia[i].y,
				-canonnEd3d_challenge.uia[i].z //for some reason z is inverted
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
			},
			{
			radius: 459.0,
			coords: [1246.80469, -278.00000, -860.11328],
			name: "Col 121 Sector"
			},
			{
			radius: 100.0,
			coords: [1099.23828, -146.67188, -133.58008],
			name: "Regor Sector"
			}
		]
		for (var i = 0; i < pls.length; i++) {
			canonnEd3d_challenge.createSphere(pls[i], Ed3d.material.permit_zone)
		}

		//permit UNlocked sectors
		var puls = [
			{
				radius: 100.0,
				coords: [726.50391,-365.36328,-1377.93555],
				name: "Barnard's Loop Sector"
			},
			{
				radius: 426.0,
				coords: [1355.99609,-235.59766,-690.91602],
				name: "Col 132 Sector"
			},
			{
				radius: 150.0,
				coords: [942.32812,-198.29688,-365.50586],
				name: "Col 135 Sector"
			},
			{
				radius: 162.0,
				coords: [1186.89453,-181.42578,-548.42188],
				name: "Col 140 Sector"
			},
			{
				radius: 100.0,
				coords: [428.26172,-280.66797,-858.96289],
				name: "Flame Sector"
			},
			{
				radius: 100.0,
				coords: [411.68359,-272.99219,-811.47461],
				name: "Horsehead Sector"
			},
			{
				radius: 117.0,
				coords: [1241.61328,86.52734,-1005.43945],
				name: "M47 Sector"
			},
			{
				radius: 100.0,
				coords: [665.03125,-395.19922,-1400.55469],
				name: "Messier 78 Sector"
			},
			{
				radius: 83.0,
				coords: [178.12891,-512.99609,-1317.47070],
				name: "NGC 1662 Sector"
			},
			{
				radius: 106.0,
				coords: [578.95703,-423.23828,-1084.28711],
				name: "NGC 1981 Sector"
			},
			{
				radius: 100.0,
				coords: [549.36719,-374.51172,-926.56445],
				name: "NGC 1999 Sector"
			},
			{
				radius: 154.0,
				coords: [655.20312,-154.73828,-956.90234],
				name: "NGC 2232 Sector"
			},
			{
				radius: 100.0,
				coords: [596.77344,-311.86719,-1340.37305],
				name: "Orion Dark Region"
			},
			{
				radius: 100.0,
				coords: [616.52344,-446.42578,-1107.67383],
				name: "Orion Sector"
			},
			{
				radius: 100.0,
				coords: [586.15625,-425.38281,-1079.56836],
				name: "Running Man Sector"
			},
			{
				radius: 100.0,
				coords: [577.89844,-452.66406,-819.22266],
				name: "Spirograph Sector"
			},
			{
				radius: 182.0,
				coords: [594.46875,-431.80859,-1072.44922],
				name: "Trapezium Sector"
			},
			{
				radius: 100.0,
				coords: [991.18750,-121.87109,-51.94531],
				name: "Vela Dark Region"
			},
			{
				radius: 300.0,
				coords: [366.92969,-299.39453,-1359.90039],
				name: "Col 69 Sector"
			},
			{
				radius: 100.0,
				coords: [369.41406,-401.57812,-715.72852],
				name: "Witch Head Sector"
			}
		]
		var blackmaterial = new THREE.MeshBasicMaterial({
			color: 0x030303,
			transparent: true,
			opacity: 0.3
		})
		for (var i = 0; i < puls.length; i++) {
			canonnEd3d_challenge.createSphere(puls[i], blackmaterial)
		}
		
	
		document.getElementById("loading").style.display = "none";
	},
	init: function () {
		//var p1 = new Promise(function (resolve, reject) {
		//	canonnEd3d_challenge.parseCSVData('data/csvCache/UIA Vector Survey (Responses) - Waypoints.csv', canonnEd3d_challenge.formatWaypoints, resolve);
		//});
		//var p2 = new Promise(function (resolve, reject) {
		//	canonnEd3d_challenge.parseCSVData('data/csvCache/UIA Vector Survey (Responses) - Responses.csv', canonnEd3d_challenge.formatMeasurements, resolve);
		//});
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
				playerPos: [-776, -83, 	 -2388],
				cameraPos: [-776, -83+1000, -2388-1500],
				systemColor: '#FF9D00',
				finished: canonnEd3d_challenge.finishMap
			});
		});
	},
};
