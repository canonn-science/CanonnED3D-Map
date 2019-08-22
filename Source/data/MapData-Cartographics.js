const API_ENDPOINT = `https://api.canonn.tech:2053`;
const API_LIMIT = 1000;

const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

let sites = {
	apsites: [],
	bmsites: [],
	btsites: [],
	fgsites: [],
	tbsites: [],
	twsites: [],
};

const go = async types => {
	let typeKeys = Object.keys(types);
	// loop through types to get all the data
	for (i = 0; i < typeKeys.length; i++) {
		sites[typeKeys[i]] = await getSites(typeKeys[i]);
	}

	return sites;
};

const getSites = async type => {
	let records = [];
	let keepGoing = true;
	let API_START = 0;
	while (keepGoing) {
		let response = await reqSites(API_START, type);
		let responseKeys = Object.keys(response.data.data);
		await records.push.apply(records, response.data.data[responseKeys[0]]);
		API_START += API_LIMIT;
		if (response.data.data[responseKeys[0]].length < API_LIMIT) {
			keepGoing = false;
			return records;
		}
	}
};

const reqSites = async (API_START, type) => {
	let typeQuery = type;
	let where = {};
	let query = `query ($limit:Int, $start:Int, $where:JSON){ 
    ${typeQuery} (limit: $limit, start: $start, where: $where){ 
      system{ 
        systemName
        edsmCoordX
        edsmCoordY
        edsmCoordZ
      } 
      siteID
      type {
        type
      }
    }
  }`;

	let payload = await capi({
		url: '/graphql',
		method: 'post',
		data: {
			query,
			variables: {
				start: API_START,
				limit: API_LIMIT,
				where,
			},
		},
	});

	return payload;
};

var canonnEd3d_cartographics = {

	//Define Categories
	systemsData: {
		"categories": {
			"Generation Ships - (GEN)": {
				"600": {
					"name": "Generation Ship",
					"color": "cc00cc"
				}
			}
		},
		"systems": []
	},

	formatGEN: function (data) {

		//Here you format GEN JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var genSite = {};
				genSite["name"] = data[i].nameSystem;
				genSite["cat"] = [600];
				genSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_cartographics.systemsData.systems.push(genSite);
			}

		}

	},

	formatMS: function (data) {

		//Format MS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var msSite = {};
				msSite["name"] = data[i].system;
				msSite["cat"] = [1100];
				msSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_cartographics.systemsData.systems.push(msSite);
			}

		}

	},

	formatOI: function (data) {

		//Here you format OI JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var oiSite = {};
				oiSite["name"] = data[i].system;
				oiSite["cat"] = [1001];
				oiSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_cartographics.systemsData.systems.push(oiSite);
			}

		}

	},

	formatUSS: function (data) {

		//Here you format USS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var ussSite = {};
				ussSite["name"] = data[i].system;

				//Check Site Type and match categories
				if (data[i].type.toString() == "Non-Human Signal Source") {
					ussSite["cat"] = [1400];
				} else if (data[i].type.toString() == "Distress Call") {
					ussSite["cat"] = [1401];
				} else if (data[i].type.toString() == "Degraded Emissions") {
					ussSite["cat"] = [1402];
				} else if (data[i].type.toString() == "Weapons Fire") {
					ussSite["cat"] = [1403];
				} else if (data[i].type.toString() == "Encoded Emissions") {
					ussSite["cat"] = [1404];
				} else if (data[i].type.toString() == "Combat Aftermath") {
					ussSite["cat"] = [1405];
				} else if (data[i].type.toString() == "Mission Target") {
					ussSite["cat"] = [1406];
				} else if (data[i].type.toString() == "High Grade Emissions") {
					ussSite["cat"] = [1407];
				} else if (data[i].type.toString() == "Convoy Dispersal Pattern") {
					ussSite["cat"] = [1408];
				} else if (data[i].type.toString() == "Ceremonial Comms") {
					ussSite["cat"] = [1409];
				} else if (data[i].type.toString() == "Trading Beacon") {
					ussSite["cat"] = [1140];
				} else {
					ussSite["cat"] = [1419];
				}
				ussSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_cartographics.systemsData.systems.push(ussSite);
			}

		}

	},

	formatPOI: function (data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var poiSite = {};
				poiSite["name"] = data[i].system;

				//Check Site Type and match categories
				if (data[i].type.toString() == "gnosis") {
					poiSite["cat"] = [101];
				} else if (data[i].type.toString() == "POI") {
					poiSite["cat"] = [100];
				} else {
					poiSite["cat"] = [102];
				}
				poiSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_cartographics.systemsData.systems.push(poiSite);
			}

		}

	},

	parseData: function (url, callBack, resolvePromise) {
		Papa.parse(url, {
			download: true,
			header: true,
			complete: function (results) {

				callBack(results.data);

				// after we called the callback
				// (which is synchronous, so we know it's safe here)
				// we can resolve the promise

				resolvePromise();
			}
		});
	},

	init: function () {

		//GEN Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_cartographics.parseData("data/csvCache/genDataCache.csv", canonnEd3d_cartographics.formatGEN, resolve);
		});

		//MS Sites
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_cartographics.parseData("data/csvCache/msDataCache.csv", canonnEd3d_cartographics.formatMS, resolve);
		});

		//OI Sites
		var p3 = new Promise(function (resolve, reject) {
			canonnEd3d_cartographics.parseData("data/csvCache/oiDataCache.csv", canonnEd3d_cartographics.formatOI, resolve);
		});

		//USS Sites
		var p4 = new Promise(function (resolve, reject) {
			canonnEd3d_cartographics.parseData("data/csvCache/ussDataCache.csv", canonnEd3d_cartographics.formatUSS, resolve);
		});

		//POI & Gnosis
		var p5 = new Promise(function (resolve, reject) {
			canonnEd3d_cartographics.parseData("data/csvCache/poiDataCache.csv", canonnEd3d_cartographics.formatPOI, resolve);
		});

		Promise.all([p1, p2, p3, p4, p5]).then(function () {
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