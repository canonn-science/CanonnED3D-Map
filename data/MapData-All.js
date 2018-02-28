var canonnEd3d_all = {

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
			"Barnacles - (BN)": {
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
			"Brain Trees - (BT)": {
				"300": {
					"name": "Brain Tree",
					"color": "41e5f4"
				}
			},
			"Guardian Ruins - (GR)": {
				"400": {
					"name": "Alpha",
					"color": "f44141"
				},
				"401": {
					"name": "Beta",
					"color": "f4b241"
				},
				"402": {
					"name": "Gamma",
					"color": "f441d0"
				},
				"403": {
					"name": "Structure",
					"color": "3380ff"
				}
			},
			"Thargoid Structures - (TS)": {
				"500": {
					"name": "Active",
					"color": "4152f4"
				},
				"501": {
					"name": "Inactive",
					"color": "9d41f4"
				}
			},
			"Hyperdictions": {
				"800": {
					"name": "Start System",
					"color": "0040ff"
				},
				"801": {
					"name": "End System",
					"color": "ff0040"
				},
				"802": {
					"name": "Route",
					"color": "f2f2f2"
				},
			},			
			"Unidentified Signal Source - (USS)": {
				"700": {
					"name": "Non-Human Signal Source",
					"color": "cc3333"
				},
				"701": {
					"name": "Distress Call",
					"color": "cc8033"
				},
				"702": {
					"name": "Degraded Emissions",
					"color": "cccc33"
				},				
				"703": {
					"name": "Weapons Fire",
					"color": "cc5933"
				},								
				"704": {
					"name": "Encoded Emissions",
					"color": "a6cc33"
				},												
				"705": {
					"name": "Combat Aftermath",
					"color": "cca633"
				},																
				"706": {
					"name": "Mission Target",
					"color": "33cccc"
				},																				
				"707": {
					"name": "High Grade Emissions",
					"color": "80cc33"
				},																								
				"708": {
					"name": "Convoy Dispersal Pattern",
					"color": "3380cc"
				},	
				"709": {
					"name": "Ceremonial Comms",
					"color": "5933cc"
				},																																
				"710": {
					"name": "Trading Beacon",
					"color": "a633cc"
				},																																				
				"711": {
					"name": "Unknown",
					"color": "cc3380"
				}																																			
				
			},			
			"Error Sites": {
				"600": {
					"name": "Invalid Data Information",
					"color": "150187"
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

	formatHD: function (data) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].From && data[i].From.replace(" ", "").length > 1) {
				
				var hdFrom = {}
				hdFrom["name"] = data[i].From;

				//Ripe or Dead Status not enabled yet, pending CSV fixes
				hdFrom["cat"] = [800];
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
				hdTo["cat"] = [801];
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
				hdRoute["cat"]=[802]
				hdRoute["circle"]=false
				
				canonnEd3d_all.systemsData.routes.push(hdRoute);
			}

		}

	},					
	
	formatTI: function (data) {
		//Here you format BN JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].System && data[i].System.replace(" ", "").length > 1) {
				var tiSite = {};
				tiSite["name"] = data[i].System;
		

				switch(data[i].USSType) {
				case '$USS_Type_NonHuman;':
					tiSite["cat"] = [700];
					break;
				case '$USS_Type_DistressSignal;':
					tiSite["cat"] = [701];
					break;
				case '$USS_Type_Salvage;':
					tiSite["cat"] = [702];
					break;
				case '$USS_Type_WeaponsFire;':
					tiSite["cat"] = [703];
					break;					
				case '$USS_Type_ValuableSalvage;':
					tiSite["cat"] = [704];
					break;					
				case '$USS_Type_Aftermath;':
					tiSite["cat"] = [705];
					break;
				case '$USS_Type_MissionTarget;':
					tiSite["cat"] = [706];
					break;					
				case '$USS_Type_VeryValuableSalvage;':
					tiSite["cat"] = [707];
					break;					
				case '$USS_Type_Convoy;':
					tiSite["cat"] = [708];
					break;										
				case '$USS_Type_Ceremonial;':
					tiSite["cat"] = [709];
					break;					
				case '$USS_Type_TradingBeacon;':
					tiSite["cat"] = [710];
					break;										
				default:
					tiSite["cat"] = [711];
				} 			
				
				
				tiSite["coords"] = {
					"x": parseFloat(data[i].x),
					"y": parseFloat(data[i].y),
					"z": parseFloat(data[i].z)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_all.systemsData.systems.push(tiSite);
			}

		}

	},	
	
	// Lets get data from CSV Files
	formatBN: function (data) {
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
				canonnEd3d_all.systemsData.systems.push(bnSite);
			}

		}

	},

	formatBT: function (data) {

		//Here you format BT JSON to ED3D acceptable object

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

	formatTS: function (data) {
		//Here you format TS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var tsSite = {};
				tsSite["name"] = data[i].system;

				//Check if Site is Active or Inactive, set Category to match
				if (data[i].active.toString().toLowerCase() == "y") {
					tsSite["cat"] = [500];
				} else {
					tsSite["cat"] = [501];
				}
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

	formatGR: function (data) {
		//Here you format GR JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var grSite = {};
				grSite["name"] = data[i].system;

				//Check Site Type and match categories
				if (data[i].type.toString() == "Alpha") {
					grSite["cat"] = [400];
				} else if (data[i].type.toString() == "Beta") {
					grSite["cat"] = [401];
				} else if (data[i].type.toString() == "Gamma") {
					grSite["cat"] = [402];
				} else if (data[i].type.toString() == "Structure") {
					grSite["cat"] = [403];
				} else {
					grSite["cat"] = [600];
				}
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
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTOVMrkFFKR4lrOzZGD84EPsJ0Tbm8yrVa9kh0AhAEdSqehf8prdskB6Jh_0LmAdsgdEjxEyP3OjpGv/pub?gid=290263950&single=true&output=csv", canonnEd3d_all.formatBN, resolve);
			});

		var p2 = new Promise(function (resolve, reject) {
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vRQSCeBTOT-UW6fw5SkQJMrsIcWsjg4aqa0kE024qbPJz0bK3JAafhlUK3eTnpoLoWIVTzzB6I_VsKg/pub?gid=290263950&single=true&output=csv", canonnEd3d_all.formatBT, resolve);
			});

		var p3 = new Promise(function (resolve, reject) {
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vR4-rhi1p4BU7AlOSj7_78Kvk5Ox6vb39vzzlWU3yI-dqlaLxk-CFLWvAFKc-J7WhomFiQ_u0P7Stxz/pub?gid=0&single=true&output=csv", canonnEd3d_all.formatTS, resolve);
			});

		var p4 = new Promise(function (resolve, reject) {
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTSvkdtHr0SbM4dYOCsDalp1hRilWt2I5Hz1l2OIgbfR8Hs-lOCat_ZUyhyBnuv9R9rXz9vnhaYif2-/pub?gid=0&single=true&output=csv", canonnEd3d_all.formatGR, resolve);
			});
			
		var p5 = new Promise(function (resolve, reject) {
				canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vROqL6zifWWxcwlZ0R6iLvrMrUdfJijnMoZee-SrN0NVPqhTdH3Zdx6E7RxP1wH2xgwfrhwfVWUHnKU/pub?gid=954889761&single=true&output=csv", canonnEd3d_all.formatTI, resolve);
			});			

		var p6 = new Promise(function (resolve, reject) {			
			canonnEd3d_all.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vSEVt8eYMJgd5vXfCMiExWc23D1G5G0DCEfs5A6N3AQGupAp1KslajioBZgB0IGiMd7MR_Ur3RPsv39/pub?gid=1013174415&single=true&output=csv", canonnEd3d_all.formatHD, resolve);	
		});						
		
		Promise.all([p1, p2, p3, p4, p5, p6]).then(function () {
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
