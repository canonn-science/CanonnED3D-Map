var canonnEd3d_all = {

	//Define Categories
	systemsData: {
		"categories": {
			"Points of Interest - POI": {
				"100": {
					"name": "Systems - POI",
					"color": "F7F7F7"
				}
			},
			"Bark Mounds - (BM)": {
				"200": {
					"name": "Systems - BM",
					"color": "aca558"
				}
			},
			"Brain Trees - (BT)": {
				"300": {
					"name": "Systems - BT",
					"color": "be6e40"
				}
			},
			"Fungal Gourds - (FG)": {
				"400": {
					"name": "Systems - FG",
					"color": "ff845b"
				}
			},
			"Fumaroles - (FM)": {
				"500": {
					"name": "Systems - FM",
					"color": "674e27"
				}
			},
			"Generation Ships - (GEN)": {
				"600": {
					"name": "Systems - GEN",
					"color": "ffb400"
				}
			},
			"Guardian Ruins - (GR)": {
				"700": {
					"name": "Systems - GR",
					"color": "a95e00"
				}
			},
			"Geysers - (GY)": {
				"800": {
					"name": "Systems - GY",
					"color": "5b84ff"
				}
			},
			"Hyperdictions": {
				"900": {
					"name": "Start System",
					"color": "0040ff"
				},
				"901": {
					"name": "End System",
					"color": "ff0040"
				},
				"902": {
					"name": "Route",
					"color": "f2f2f2"
				}
			},
			"Lave Spouts - (LS)": {
				"1000": {
					"name": "Systems - LS",
					"color": "b32735"
				}
			},
			"Megaships - (MS)": {
				"1100": {
					"name": "Systems - MS",
					"color": "fae705"
				}
			},
			"Thargoid Barnacles - (TB)": {
				"1200": {
					"name": "Systems - TB",
					"color": "00ff00"
				}
			},
			"Thargoid Structures - (TS)": {
				"1300": {
					"name": "Systems - TS",
					"color": "17ff7b"
				}
			},			
			"Unidentified Signal Source - (USS)": {
				"1400": {
					"name": "Systems - USS",
					"color": "a7db26"
				}
			}
		},
		"routes": [],
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
			}
		]
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

	formatGR: function (data) {

		//Format GR JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var grSite = {};
				grSite["name"] = data[i].system;
				grSite["cat"] = [700];
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
				
				hdRoute["title"]="CMDR "+data[i].CMDR+" "+data[i].From+" to "+data[i].To 
				hdRoute["points"] = [{"s": data[i].From,"label": data[i].From},{"s": data[i].To,"label": data[i].To}]
				hdRoute["cat"]=[902]
				hdRoute["circle"]=false
				
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

	formatUSS: function (data) {

		//Format USS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var ussSite = {};
				ussSite["name"] = data[i].system;
				ussSite["cat"] = [1400];
				ussSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(ussSite);
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
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8QvI-CQYlDWcfyXonkisu9yUnlPNPQHgHt1_o3n0NjsFMNlRWy9EgVqFTZm8LTOWXgXp2c70GMGsr/pub?gid=0&single=true&output=csv", canonnEd3d_all.formatBM, resolve);
			});

		//BT Sites
		var p2 = new Promise(function (resolve, reject) {
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vR_8aPljkn5ZNMUXccsySkQCDFKZlhr6WD_R3eu61fpIW-LXf4airdgzzOqgjFUkTO20SX7l7JXjYFP/pub?gid=0&single=true&output=csv", canonnEd3d_all.formatBT, resolve);
			});

		//FG Sites
		var p3 = new Promise(function (resolve, reject) {
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vSvvfHhzfAeDiBuQoDrnmUgeh57XjeRXWJcVe-48BW0ugulqUMDrN7AoOtY96Suk7uQHv2tcZ_ek0ty/pub?gid=1615049300&single=true&output=csv", canonnEd3d_all.formatFG, resolve);
			});

		//FM Sites
		var p4 = new Promise(function (resolve, reject) {
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vSlszRWQ2eTUxzzM2AxsCOnQ2Rg7C8zBx_YJGUR1BdpK-wwXv9DpeueiWEQPJTVF9AI5J3LExucx5Lh/pub?gid=827706542&single=true&output=csv", canonnEd3d_all.formatFM, resolve);
			});

		//GEN Ships
		var p5 = new Promise(function (resolve, reject) {
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vRmBzKonapgMMWeT-zc26w8xCNFvK_5l1F3fwF0_af7awhL0MNUGOKnIq4FSoEXe8TtD5HeZd4OuAUu/pub?gid=1451709127&single=true&output=csv", canonnEd3d_all.formatGEN, resolve);
			});

		//GR Sites
		var p6 = new Promise(function (resolve, reject) {			
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTYml1O4Qt2bDn9hnFJe1SeN0atyahK6dWBftGvW1YJ8b6JHBUF5WvL015_fmZF6oGkqVOGzl3mJqVI/pub?gid=756384248&single=true&output=csv", canonnEd3d_all.formatGR, resolve);	
			});

		//GY Sites
		var p7 = new Promise(function (resolve, reject) {			
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vR70NkI6yp_9jwC_6FseydVBs22MrX3aWONiy4xvfx8EHz8pmI4mo1s25at8ihs3GrXRbEdoQDepy1m/pub?gid=962735107&single=true&output=csv", canonnEd3d_all.formatGY, resolve);	
			});

		//Hyperdiction Sites
		var p8 = new Promise(function (resolve, reject) {			
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vSEVt8eYMJgd5vXfCMiExWc23D1G5G0DCEfs5A6N3AQGupAp1KslajioBZgB0IGiMd7MR_Ur3RPsv39/pub?gid=1013174415&single=true&output=csv", canonnEd3d_all.formatHD, resolve);	
			});

		//LS Sites
		var p9 = new Promise(function (resolve, reject) {			
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vQhAk6nZswglFQVpNpPfUwJNS0ifkN4sOLHsQeCmIrMiQM01N6tPEyvKqcHUnD-IRSO7a9bTCwa4tR6/pub?gid=220546017&single=true&output=csv", canonnEd3d_all.formatLS, resolve);	
			});

		//MS Sites
		var p10 = new Promise(function (resolve, reject) {			
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vRSTnVpcJPN1yn5bcCrI3vYocYUVX08jcfsEUbbY3-u9G_uBqfGlllMu6gSa5LGt4sEO_fh3G5H2G0r/pub?gid=1120806489&single=true&output=csv", canonnEd3d_all.formatMS, resolve);	
			});

		//TB Sites
		var p11 = new Promise(function (resolve, reject) {			
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTyFAaquLIKghHUiN-FJaku3yzGw6f_lMFQHUPqLVoCfRE8gtlWb88mMpLhoTXjLhmot0m8w9Ol5cPs/pub?gid=1613553729&single=true&output=csv", canonnEd3d_all.formatTB, resolve);	
			});

		//TS Sites
		var p12 = new Promise(function (resolve, reject) {			
			canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vSYvun070NwUTxemgq05M5jSrFdbJXDd3unpohkt9WhlGjHfY67odla933_HWT1xe8X5-Ebq73gz61e/pub?gid=926585382&single=true&output=csv", canonnEd3d_all.formatTS, resolve);	
		});

		//USS Sites
		var p13 = new Promise(function (resolve, reject) {			
			canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vQM1TtPi_18DZ0hIJ2dW44F0BpW6_igwfXYbTuZS3IQZUIjmZLY5ElZFuWpLES7iBQNDsVs8vwXwJ1n/pub?gid=1735934279&single=true&output=csv", canonnEd3d_all.formatUSS, resolve);	
		});
		
		Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_all.systemsData,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [28, 10000],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00'
			});
		});
	}
};
