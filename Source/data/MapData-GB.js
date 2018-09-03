var canonnEd3d_gb = {

	//Define Categories
	systemsData: {
		"categories": {
			"POI Systems": {
				"100": {
					"name": "Systems",
					"color": "FF9D00"
				}
			},
			"Guardian Beacons - (GB)": {
				"715": {
					"name": "Beacon",
					"color": "58FA82"
				}
			}
		},
		"systems": [{
			"name": "Sol",
			"coords": {
				"x": "0",
				"y": "0",
				"z": "0"
			},
			"cat": [
				"100"
			]
		}, {
			"name": "Gamma Velorum",
			"coords": {
				"x": "1099.21875",
				"y": "-146.6875",
				"z": "-133.59375"
			},
			"cat": [
				"100"
			]
		}, {
			"name": "Merope",
			"coords": {
				"x": "-78.59375",
				"y": "-149.625",
				"z": "-340.53125"
			},
			"cat": [
				"100"
			]
		}, {
			"name": "HIP 22460",
			"coords": {
				"x": "-41.3125",
				"y": "-58.96875",
				"z": "-354.78125"
			},
			"cat": [
				"100"
			]
		}, {
			"name": "Colonia",
			"coords": {
				"x": "-9530.5",
				"y": "-910.28125",
				"z": "19808.125"
			},
			"cat": [
				"100"
			]
		}, {
			"name": "Canonnia",
			"coords": {
				"x": "-9522.9375",
				"y": "-894.0625",
				"z": "19791.875"
			},
			"cat": [
				"100"
			]
		}]
	},

	// Lets get data from CSV Files

	formatGB: function (data) {
		//Here you format GB JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var gbSite = {};
				gbSite["name"] = data[i].system;
				gbSite["cat"] = [715];
				gbSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_gb.systemsData.systems.push(gbSite);
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

		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_gb.parseData("data/csvCache/gbDataCache.csv", canonnEd3d_gb.formatGB, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_gb.systemsData,
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