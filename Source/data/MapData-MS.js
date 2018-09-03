var canonnEd3d_ms = {

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
			"Megaships - (MS)": {
				"1100": {
					"name": "Megaship",
					"color": "5d9a76"
				},
				"1101": {
					"name": "Aquarius Class Tanker",
					"color": "936d57"
				},
				"1102": {
					"name": "Banner Class Bulk Cargo Ship",
					"color": "4b9eec"
				},
				"1103": {
					"name": "Bellmarsh Class Prison Ship",
					"color": "66148b"
				},
				"1104": {
					"name": "Bowman Class Science Vessel",
					"color": "90cf37"
				},
				"1105": {
					"name": "Demeter Class Agricultural Vessel",
					"color": "cdd90a"
				},
				"1106": {
					"name": "Dionysus Class Agricultural Vessel",
					"color": "d73278"
				},
				"1107": {
					"name": "Gordon Class Bulk Cargo Ship",
					"color": "177afc"
				},
				"1108": {
					"name": "Henry Class Bulk Cargo Ship",
					"color": "c6a3d5"
				},
				"1109": {
					"name": "Hercules Class Bulk Cargo Ship",
					"color": "312fbf"
				},
				"1110": {
					"name": "Hogan Class Bulk Cargo Ship",
					"color": "90d5aa"
				},
				"1111": {
					"name": "Lowell Class Science Vessel",
					"color": "442299"
				},
				"1112": {
					"name": "Naphtha Class Tanker",
					"color": "4444dd"
				},
				"1113": {
					"name": "Riker Class Prison Ship",
					"color": "22ccaa"
				},
				"1114": {
					"name": "Sagan Class Tourist Ship",
					"color": "69d025"
				},
				"1115": {
					"name": "Samson Class Bulk Cargo Ship",
					"color": "aacc22"
				},
				"1116": {
					"name": "Sanchez Class Science Vessel",
					"color": "ccbb33"
				},
				"1117": {
					"name": "Survey Vessel",
					"color": "ff9933"
				},
				"1118": {
					"name": "Thomas Class Bulk Cargo Ship",
					"color": "ff6644"
				},
				"1119": {
					"name": "Unknown",
					"color": "f80c12"
				}
			}
		},
		"systems": []
	},

	formatMS: function (data) {

		//Here you format MS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var msSite = {};
				msSite["name"] = data[i].nameSystem;

				//Check Site Type and match categories
				if (data[i].type.toString() == "Megaship") {
					msSite["cat"] = [1100];
				} else if (data[i].type.toString() == "Aquarius Class Tanker") {
					msSite["cat"] = [1101];
				} else if (data[i].type.toString() == "Banner Class Bulk Cargo Ship") {
					msSite["cat"] = [1102];
				} else if (data[i].type.toString() == "Bellmarsh Class Prison Ship") {
					msSite["cat"] = [1103];
				} else if (data[i].type.toString() == "Bowman Class Science Vessel") {
					msSite["cat"] = [1104];
				} else if (data[i].type.toString() == "Demeter Class Agricultural Vessel") {
					msSite["cat"] = [1105];
				} else if (data[i].type.toString() == "Dionysus Class Agricultural Vessel") {
					msSite["cat"] = [1106];
				} else if (data[i].type.toString() == "Gordon Class Bulk Cargo Ship") {
					msSite["cat"] = [1107];
				} else if (data[i].type.toString() == "Henry Class Bulk Cargo Ship") {
					msSite["cat"] = [1108];
				} else if (data[i].type.toString() == "Hercules Class Bulk Cargo Ship") {
					msSite["cat"] = [1109];
				} else if (data[i].type.toString() == "Hogan Class Bulk Cargo Ship") {
					msSite["cat"] = [1110];
				} else if (data[i].type.toString() == "Lowell Class Science Vessel") {
					msSite["cat"] = [1111];
				} else if (data[i].type.toString() == "Naphtha Class Tanker") {
					msSite["cat"] = [1112];
				} else if (data[i].type.toString() == "Riker Class Prison Ship") {
					msSite["cat"] = [1113];
				} else if (data[i].type.toString() == "Sagan Class Tourist Ship") {
					msSite["cat"] = [1114];
				} else if (data[i].type.toString() == "Samson Class Bulk Cargo Ship") {
					msSite["cat"] = [1115];
				} else if (data[i].type.toString() == "Sanchez Class Science Vessel") {
					msSite["cat"] = [1116];
				} else if (data[i].type.toString() == "Survey Vessel") {
					msSite["cat"] = [1117];
				} else if (data[i].type.toString() == "Thomas Class Bulk Cargo Ship") {
					msSite["cat"] = [1118];
				} else {
					msSite["cat"] = [1119];
				}
				msSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_ms.systemsData.systems.push(msSite);
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
				canonnEd3d_ms.systemsData.systems.push(poiSite);
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

		//MS Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_ms.parseData("data/csvCache/msDataCache.csv", canonnEd3d_ms.formatMS, resolve);
		});

		//POI & Gnosis
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_ms.parseData("data/csvCache/poiDataCache.csv", canonnEd3d_ms.formatPOI, resolve);
		});

		Promise.all([p1, p2]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_ms.systemsData,
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