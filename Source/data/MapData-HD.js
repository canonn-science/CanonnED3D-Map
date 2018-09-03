var canonnEd3d_hd = {

	//Define Categories and Static Data
	systemsData: {
		"categories": {
			"POI Systems": {
				"100": {
					"name": "Systems",
					"color": "F56D54"
				},
				"102": {
					"name": "Other",
					"color": "F79F8F"
				}
			},
			"The Gnosis": {
				"101": {
					"name": "Current System",
					"color": "FF9D00"
				}
			},
			"Hyperdictions": {
				"900": {
					"name": "Start System",
					"color": "99ff66"
				},
				"901": {
					"name": "End System",
					"color": "ff3300"
				},
				"902": {
					"name": "Route",
					"color": "f2f2f2"
				}
			}
		},
		"routes": [],
		"systems": []
	},


	formatHD: function (data) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].From && data[i].From.replace(" ", "").length > 1) {

				var hdFrom = {}
				hdFrom["name"] = data[i].From;

				//Ripe or Dead Status not enabled yet, pending CSV fixes
				hdFrom["cat"] = [900];
				hdFrom["coords"] = {
					"x": parseFloat(data[i].FromX),
					"y": parseFloat(data[i].FromY),
					"z": parseFloat(data[i].FromZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_hd.systemsData.systems.push(hdFrom);

				var hdTo = {}
				hdTo["name"] = data[i].To;

				//Ripe or Dead Status not enabled yet, pending CSV fixes
				hdTo["cat"] = [901];
				hdTo["coords"] = {
					"x": parseFloat(data[i].ToX),
					"y": parseFloat(data[i].ToY),
					"z": parseFloat(data[i].ToZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_hd.systemsData.systems.push(hdTo);

				var hdRoute = {};

				hdRoute["title"] = "CMDR " + data[i].CMDR + " " + data[i].From + " to " + data[i].To
				hdRoute["points"] = [{
					"s": data[i].From,
					"label": data[i].From
				}, {
					"s": data[i].To,
					"label": data[i].To
				}]
				hdRoute["cat"] = [902]
				hdRoute["circle"] = false

				canonnEd3d_hd.systemsData.routes.push(hdRoute);
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
				canonnEd3d_hd.systemsData.systems.push(poiSite);
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

		//Hyperdiction Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_hd.parseData("data/csvCache/hdSystemCache.csv", canonnEd3d_hd.formatHD, resolve);
		});

		//POI & Gnosis
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_hd.parseData("data/csvCache/poiDataCache.csv", canonnEd3d_hd.formatPOI, resolve);
		});

		Promise.all([p1, p2]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_hd.systemsData,
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