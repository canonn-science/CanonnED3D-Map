var canonnEd3d_all = {

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
			},
			"Sites": {
				"200": {
					"name": "Bark Mounds (BM)",
					"color": "cdab7e"
				},
				"300": {
					"name": "Brain Trees (BT)",
					"color": "ff66cc"
				},
				"400": {
					"name": "Fungal Gourds (FG)",
					"color": "936c39"
				},
				"500": {
					"name": "Fumaroles (FM)",
					"color": "ffc266"
				},
				"700": {
					"name": "Guardian Beacons (GB)",
					"color": "ffff00"
				},
				"701": {
					"name": "Guardian Ruins (GR)",
					"color": "ffff00"
				},
				"702": {
					"name": "Guardian Structures (GS)",
					"color": "FF9D90"
				},
				"800": {
					"name": "Geysers (GY)",
					"color": "99ccff"
				},
				"1000": {
					"name": "Lava Spouts (LS)",
					"color": "ff4d4d"
				},
				"1001": {
					"name": "Orbital Installations (OI)",
					"color": "ff764d"
				},
				"1200": {
					"name": "Thargoid Barnacles (TB)",
					"color": "009933"
				},
				"1300": {
					"name": "Thargoid Structures (TS)",
					"color": "17ff7b"
				},
				"1400": {
					"name": "Non-Human Signal Sources (NHSS)",
					"color": "442299"
				}
			},
			"Megaships": {
				"600": {
					"name": "Generation Ships (GEN)",
					"color": "cc00cc"
				},
				"1100": {
					"name": "Megaships (MS)",
					"color": "ffb3ff"
				}
			}
		},
		"routes": [],
		"systems": []
	},

	formatBM: function (data) {

		//Format BM JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var bmSite = {};
				bmSite["name"] = data[i].system;
				bmSite["cat"] = [200];
				bmSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(bmSite);
			}

		}

	},

	formatBT: function (data) {

		//Format BT JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var btSite = {};
				btSite["name"] = data[i].system;
				btSite["cat"] = [300];
				btSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(btSite);
			}

		}

	},

	formatFG: function (data) {

		//Format FG JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var fgSite = {};
				fgSite["name"] = data[i].system;
				fgSite["cat"] = [400];
				fgSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(fgSite);
			}

		}

	},

	formatFM: function (data) {

		//Format FM JSON to ED3D acceptable object

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
				canonnEd3d_all.systemsData.systems.push(fmSite);
			}

		}

	},

	formatGEN: function (data) {

		//Format FM JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var genSite = {};
				genSite["name"] = data[i].system;
				genSite["cat"] = [600];
				genSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(genSite);
			}

		}

	},

	formatGB: function (data) {

		//Format GB JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var gbSite = {};
				gbSite["name"] = data[i].system;
				gbSite["cat"] = [700];
				gbSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(gbSite);
			}

		}

	},

	formatGR: function (data) {

		//Format GR JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var grSite = {};
				grSite["name"] = data[i].system;
				grSite["cat"] = [701];
				grSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(grSite);
			}

		}

	},

	formatGS: function (data) {

		//Format GS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var gsSite = {};
				gsSite["name"] = data[i].system;
				gsSite["cat"] = [702];
				gsSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(gsSite);
			}

		}

	},

	formatGY: function (data) {

		//Format GY JSON to ED3D acceptable object

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
				canonnEd3d_all.systemsData.systems.push(gySite);
			}

		}

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
				canonnEd3d_all.systemsData.systems.push(hdFrom);

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
				canonnEd3d_all.systemsData.systems.push(hdTo);

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

				canonnEd3d_all.systemsData.routes.push(hdRoute);
			}

		}

	},

	formatLS: function (data) {

		//Format LS JSON to ED3D acceptable object

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
				canonnEd3d_all.systemsData.systems.push(lsSite);
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
				canonnEd3d_all.systemsData.systems.push(oiSite);
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
				canonnEd3d_all.systemsData.systems.push(msSite);
			}

		}

	},

	formatNHSS: function (data) {

		//Here you format NHSS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var nhssSite = {};
				nhssSite["name"] = data[i].system;
				nhssSite["cat"] = [1400];
				nhssSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(nhssSite);
			}

		}

	},

	formatTB: function (data) {

		//Format TB JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var tbSite = {};
				tbSite["name"] = data[i].system;
				tbSite["cat"] = [1200];
				tbSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(tbSite);
			}

		}

	},

	formatTS: function (data) {

		//Format TS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var tsSite = {};
				tsSite["name"] = data[i].system;
				tsSite["cat"] = [1300];
				tsSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(tsSite);
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
				canonnEd3d_all.systemsData.systems.push(poiSite);
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

		//BM Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/bmSystemCache.csv", canonnEd3d_all.formatBM, resolve);
		});

		//BT Sites
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/btSystemCache.csv", canonnEd3d_all.formatBT, resolve);
		});

		//FG Sites
		var p3 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/fgSystemCache.csv", canonnEd3d_all.formatFG, resolve);
		});

		//FM Sites
		var p4 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/fmSystemCache.csv", canonnEd3d_all.formatFM, resolve);
		});

		//GEN Ships
		var p5 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/genSystemCache.csv", canonnEd3d_all.formatGEN, resolve);
		});

		//GB Sites
		var p6 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/gbSystemCache.csv", canonnEd3d_all.formatGB, resolve);
		});

		//GR Sites
		var p7 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/grSystemCache.csv", canonnEd3d_all.formatGR, resolve);
		});

		//GR Sites
		var p8 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/gsSystemCache.csv", canonnEd3d_all.formatGS, resolve);
		});

		//GY Sites
		var p9 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/gySystemCache.csv", canonnEd3d_all.formatGY, resolve);
		});

		//Hyperdiction Sites
		var p10 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/hdSystemCache.csv", canonnEd3d_all.formatHD, resolve);
		});

		//LS Sites
		var p11 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/lsSystemCache.csv", canonnEd3d_all.formatLS, resolve);
		});

		//OI Sites
		var p12 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/oiSystemCache.csv", canonnEd3d_all.formatOI, resolve);
		});

		//MS Sites
		var p13 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/msSystemCache.csv", canonnEd3d_all.formatMS, resolve);
		});

		//TB Sites
		var p14 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/tbSystemCache.csv", canonnEd3d_all.formatTB, resolve);
		});

		//TS Sites
		var p15 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/tsSystemCache.csv", canonnEd3d_all.formatTS, resolve);
		});

		//NHSS Sites
		var p16 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/nhssDataCache.csv", canonnEd3d_all.formatNHSS, resolve);
		});

		//POI & Gnosis
		var p17 = new Promise(function (resolve, reject) {
			canonnEd3d_all.parseData("data/csvCache/poiDataCache.csv", canonnEd3d_all.formatPOI, resolve);
		});

		Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_all.systemsData,
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