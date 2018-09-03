var canonnEd3d_geology = {

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
			"Fumaroles - (FM)": {
				"500": {
					"name": "Fumarole",
					"color": "ffc266"
				}
			},
			"Geysers - (GY)": {
				"800": {
					"name": "Geyser",
					"color": "99ccff"
				}
			},
			"Lave Spouts - (LS)": {
				"1000": {
					"name": "Lave Spout",
					"color": "ff4d4d"
				}
			}
		},
		"systems": []
	},

	formatFM: function (data) {

		//Here you format FM JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var fmSite = {};
				fmSite["name"] = data[i].system;
				fmSite["cat"] = [500];
				fmSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_geology.systemsData.systems.push(fmSite);
			}

		}

	},

	formatGY: function (data) {

		//Here you format GY JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var gySite = {};
				gySite["name"] = data[i].system;
				gySite["cat"] = [800];
				gySite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_geology.systemsData.systems.push(gySite);
			}

		}

	},

	formatLS: function (data) {

		//Here you format LS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var lsSite = {};
				lsSite["name"] = data[i].system;
				lsSite["cat"] = [1000];
				lsSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_geology.systemsData.systems.push(lsSite);
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
				canonnEd3d_geology.systemsData.systems.push(poiSite);
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

		//FM Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_geology.parseData("data/csvCache/fmDataCache.csv", canonnEd3d_geology.formatFM, resolve);
		});

		//GY Sites
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_geology.parseData("data/csvCache/gyDataCache.csv", canonnEd3d_geology.formatGY, resolve);
		});

		//LS Sites
		var p3 = new Promise(function (resolve, reject) {
			canonnEd3d_geology.parseData("data/csvCache/lsDataCache.csv", canonnEd3d_geology.formatLS, resolve);
		});

		//POI & Gnosis
		var p4 = new Promise(function (resolve, reject) {
			canonnEd3d_geology.parseData("data/csvCache/poiDataCache.csv", canonnEd3d_geology.formatPOI, resolve);
		});

		Promise.all([p1, p4]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_geology.systemsData,
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