var canonnEd3d_oi = {

	//Define Categories
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
			"Orbital Installations - (OI)": {
				"1000": {
					"name": "Agricultural Installation",
					"color": "f9964c"
				},
				"1001": {
					"name": "Civilian Installation",
					"color": "ac9dcc"
				},
				"1002": {
					"name": "Comms Installation",
					"color": "09f24a"
				},
				"1003": {
					"name": "Government Installation",
					"color": "4b04af"
				},
				"1004": {
					"name": "Industrial Installation",
					"color": "fbacdd"
				},
				"1005": {
					"name": "Medical Installation",
					"color": "9330e6"
				},
				"1006": {
					"name": "Military Installation",
					"color": "70b8ea"
				},
				"1007": {
					"name": "Scientific Installation",
					"color": "11e8a3"
				},
				"1008": {
					"name": "Security Installation",
					"color": "659664"
				},
				"1009": {
					"name": "Tourist Installation",
					"color": "ff9a87"
				},
				"1010": {
					"name": "Unauthorized Installation",
					"color": "3b1ae4"
				},
				"1011": {
					"name": "Other / None",
					"color": "ff4d4d"
				}
			}
		},
		"systems": []
	},

	formatOI: function (data) {

		//Here you format OI JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var oiSite = {};
				oiSite["name"] = data[i].system;

				//Check Site Type and match categories
				if (data[i].instanceTarget.toString() == "Agricultural Installation") {
					oiSite["cat"] = [1000];
				} else if (data[i].instanceTarget.toString() == "Civilian Installation") {
					oiSite["cat"] = [1001];
				} else if (data[i].instanceTarget.toString() == "Comms Installation") {
					oiSite["cat"] = [1002];
				} else if (data[i].instanceTarget.toString() == "Government Installation") {
					oiSite["cat"] = [1003];
				} else if (data[i].instanceTarget.toString() == "Industrial Installation") {
					oiSite["cat"] = [1004];
				} else if (data[i].instanceTarget.toString() == "Medical Installation") {
					oiSite["cat"] = [1005];
				} else if (data[i].instanceTarget.toString() == "Military Installation") {
					oiSite["cat"] = [1006];
				} else if (data[i].instanceTarget.toString() == "Scientific Installation") {
					oiSite["cat"] = [1007];
				} else if (data[i].instanceTarget.toString() == "Security Installation") {
					oiSite["cat"] = [1008];
				} else if (data[i].instanceTarget.toString() == "Tourist Installation") {
					oiSite["cat"] = [1009];
				} else if (data[i].instanceTarget.toString() == "Unauthorized Installation") {
					oiSite["cat"] = [1010];
				} else {
					oiSite["cat"] = [1011];
				}
				oiSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_oi.systemsData.systems.push(oiSite);
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
				canonnEd3d_oi.systemsData.systems.push(poiSite);
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

		//OI Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_oi.parseData("data/csvCache/oiDataCache.csv", canonnEd3d_oi.formatOI, resolve);
		});

		//POI & Gnosis
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_oi.parseData("data/csvCache/poiDataCache.csv", canonnEd3d_oi.formatPOI, resolve);
		});

		Promise.all([p1, p2]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_oi.systemsData,
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