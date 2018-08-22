var canonnEd3d_gr = {

	//Define Categories
	systemsData: {
		"categories": {
			"POI Systems": {
				"100": {
					"name": "Systems",
					"color": "FF9D00"
				}
			},
			"Guardian Ruins - (GR)": {
				"700": {
					"name": "Alpha",
					"color": "FA8258"
				},
				"701": {
					"name": "Beta",
					"color": "F7D358"
				},
				"702": {
					"name": "Gamma",
					"color": "C8FE2E"
				},
				"703": {
					"name": "Unknown",
					"color": "800000"
				}
			},
			"Guardian Structures - (GS)": {
				"704": {
					"name": "Lacrosse",
					"color": "2EFEC8"
				},
				"705": {
					"name": "Crossroads",
					"color": "0080FF"
				},
				"706": {
					"name": "Fistbump",
					"color": "4000FF"
				},
				"707": {
					"name": "Hammerbot",
					"color": "BF00FF"
				},
				"708": {
					"name": "Bear",
					"color": "FF00FF"
				},
				"709": {
					"name": "Bowl",
					"color": "DF0174"
				},
				"710": {
					"name": "Turtle",
					"color": "0404B4"
				},
				"711": {
					"name": "Unknown",
					"color": "800000"
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

	formatGR: function (data) {
		//Here you format GR JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var grSite = {};
				grSite["name"] = data[i].system;

				//Check Site Type and match categories
				if (data[i].type.toString() == "Alpha") {
					grSite["cat"] = [700];
				} else if (data[i].type.toString() == "Beta") {
					grSite["cat"] = [701];
				} else if (data[i].type.toString() == "Gamma") {
					grSite["cat"] = [702];
				} else {
					grSite["cat"] = [703];
				}
				grSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_gr.systemsData.systems.push(grSite);
			}

		}

	},

	formatGS: function (data) {
		//Here you format GS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var gsSite = {};
				gsSite["name"] = data[i].system;

				//Check Site Type and match categories
				if (data[i].type.toString() == "Lacrosse") {
					gsSite["cat"] = [704];
				} else if (data[i].type.toString() == "Crossroads") {
					gsSite["cat"] = [705];
				} else if (data[i].type.toString() == "Fistbump") {
					gsSite["cat"] = [706];
				} else if (data[i].type.toString() == "Hammerbot") {
					gsSite["cat"] = [707];
				} else if (data[i].type.toString() == "Bear") {
					gsSite["cat"] = [708];
				} else if (data[i].type.toString() == "Bowl") {
					gsSite["cat"] = [709];
				} else if (data[i].type.toString() == "Turtle") {
					gsSite["cat"] = [710];
				} else {
					gsSite["cat"] = [711];
				}
				gsSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_gr.systemsData.systems.push(gsSite);
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
			canonnEd3d_gr.parseData("data/csvCache/grDataCache.csv", canonnEd3d_gr.formatGR, resolve);
		});

		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_gr.parseData("data/csvCache/gsDataCache.csv", canonnEd3d_gr.formatGS, resolve);
		});

		Promise.all([p1, p2]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_gr.systemsData,
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