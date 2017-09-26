// Pulls the JSON data from csv-to-json.js and api-to-json.js and outputs them for ED3D

//Define Categories
window.systemsData = {
	"categories": {
		"Points of Interest": {
			"100": {
				"name": "System",
				"color": "F7F7F7"
			},
			"101": {
				"name": "MegaShips",
				"color": "f4f142"
			}
		},
		"Barnacles": {
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
		"Brain Trees": {
			"300": {
				"name": "Brain Tree",
				"color": "41e5f4"
			}
		},
		"Guardian Ruins": {
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
			}
		},
		"Thargoid Structures": {
			"500": {
				"name": "Active",
				"color": "4152f4"
			},
			"501": {
				"name": "Inactive",
				"color": "9d41f4"
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
};

// Lets get data from CSV Files
function formatBN(data) {
	//Here you format BN JSON to ED3D acceptable object

	// this is assuming data is an array []
	for (var i = 0; i < data.length; i++) {
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
		window.systemsData.systems.push(bnSite);

	}

}

function formatBT(data) {
	//Here you format BT JSON to ED3D acceptable object

	// this is assuming data is an array []
	for (var i = 0; i < data.length; i++) {
		var btSite = {};
		btSite["name"] = data[i].system;
		btSite["cat"] = [300];
		btSite["coords"] = {
			"x": parseFloat(data[i].galacticX),
			"y": parseFloat(data[i].galacticY),
			"z": parseFloat(data[i].galacticZ)
		};

		// We can then push the site to the object that stores all systems
		window.systemsData.systems.push(btSite);

	}

}

function formatTS(data) {
	//Here you format TS JSON to ED3D acceptable object

	// this is assuming data is an array []
	for (var i = 0; i < data.length; i++) {
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
		window.systemsData.systems.push(tsSite);

	}

}

/* AdmlAdam's Code
// GR data from Canonn API and format
var stellarInfo = 'https://api.canonn.technology/api/v1/stellar/systems';
var systemList = 'https://api.canonn.technology/api/v1/maps/systemoverview';

var stellarCoords = {}

$.get(stellarInfo).done(function (stellarList) {
	//Get the stellar coords and cache them
	$.each(stellarList, function (index, info) {
		stellarCoords[info.id] = {
			'x': info.edsmCoordX,
			'y': info.edsmCoordY,
			'z': info.edsmCoordZ
		}
	});

	$.get(systemList).done(function (systemList) {
		$.each(systemList, function (index, system) {
			//Create the system info
			var sysId = system.systemId;
			var sysName = system.systemName;

			if (sysName.substr(0, 2) != 'z.') {
				var newSystem = {
					"name": sysName,
					"coords": {
						"x": stellarCoords[sysId].x,
						"y": stellarCoords[sysId].y,
						"z": stellarCoords[sysId].z
					},
					"cat": [
						"100"
					]
				}

				//Add system
				systemsData["systems"].push(newSystem);
			}
		});
	})
	.fail(function (d, textStatus, error) {
		alert("Error fetching Guardian Systems: " + error);
	})
})
*/

function parseData(url, callBack, resolvePromise) {
	Papa.parse(url, {
		download: true,
		header: true,
		complete: function (results) {

			console.log(results); // This is probably your data
			console.log(results.data); // This is probably undefined
			callBack(results.data);

			// after we called the callback
			// (which is synchronous, so we know it's safe here)
			// we can resolve the promise

			resolvePromise();
		}
	});
}

var p1 = new Promise(function (resolve, reject) {
		parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTCGOwaRT8ESad9j0GAQ7tMMNj8ObxipFW8fop3eaZ-HoCVo_k9dQsHVvs1oFvARrY5SC6o4uDAWKQA/pub?gid=290263950&single=true&output=csv", formatBN, resolve);
	});

var p2 = new Promise(function (resolve, reject) {
		parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vRdEQQByWyU8MlzfJw9SzEsaM9c_zDV_RJ49Fiox842EEELrUHpMPexLYhjqNB8SOzB564jJ_oLdBx2/pub?gid=0&single=true&output=csv", formatBT, resolve);
	});

var p3 = new Promise(function (resolve, reject) {
		parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vR4-rhi1p4BU7AlOSj7_78Kvk5Ox6vb39vzzlWU3yI-dqlaLxk-CFLWvAFKc-J7WhomFiQ_u0P7Stxz/pub?gid=0&single=true&output=csv", formatTS, resolve);
	});

Promise.all([p1, p2, p3]).then(function () {
	Ed3d.init({
		container: 'edmap',
		json: window.systemsData,
		withHudPanel: true,
		hudMultipleSelect: true,
		effectScaleSystem: [50, 10000],
		startAnim: false,
		showGalaxyInfos: true,
		cameraPos: [25, 14100, -12900],
		systemColor: '#FF9D00'
	})
});
