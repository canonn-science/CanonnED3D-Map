var canonnEd3d_tb = {

	//Define Categories
	systemsData: {
		"categories": {
			"Points of Interest - POI": {
				"100": {
					"name": "System",
					"color": "F7F7F7"
				},
				"101": {
					"name": "MegaShips",
					"color": "f4f142"
				}
			},
			"Barnacles - (TB)": {
				"200": {
					"name": "Barnacle",
					"color": "44f441"
				}
				// Disabled until output shows status
				/*			"200": {
				"name": "Ripe",
				"color": "F7F7F7"
				},
				"201": {
				"name": "Dead",
				"color": "F7F7F7"
				} */
			},
			"Error Sites": {
				"600": {
					"name": "Invalid Data Information",
					"color": "150187"
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
				"name": "Col 173 Sector LJ-F C12-0 (The Cete)",
				"coords": {
					"x": "1202.125",
					"y": "-213.40625",
					"z": "-165.5625"
				},
				"cat": [
					"101"
				]
			},
		]
	},

	// Lets get data from CSV Files
	formatTB: function (data) {
		//Here you format BN JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var bnSite = {};
				bnSite["name"] = data[i].system;

				//Ripe or Dead Status not enabled yet, pending CSV fixes
				bnSite["cat"] = [200];
				bnSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_tb.systemsData.systems.push(bnSite);
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

	//Barnacles
		var p1 = new Promise(function (resolve, reject) {
				canonnEd3d_tb.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTCGOwaRT8ESad9j0GAQ7tMMNj8ObxipFW8fop3eaZ-HoCVo_k9dQsHVvs1oFvARrY5SC6o4uDAWKQA/pub?gid=290263950&single=true&output=csv", canonnEd3d_tb.formatTB, resolve);
			});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_tb.systemsData,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [50, 10000],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00'
			});
		});
	}
};
