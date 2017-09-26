// Pulls the JSON data from csv-to-json.js and api-to-json.js and outputs them for ED3D

//Define Categories
var systemsData = {
	"categories": {
		"Points of Interest": {
			"100": {
				"name": "System",
				"color": "F7F7F7"
			},
			"101": {
				"name": "MegaShips",
				"color": "F7F7F7"
			}
		},
		"Barnacles": {
			"200": {
				"name": "Barnacle",
				"color": "F7F7F7"
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
				"color": "F7F7F7"
			}
		},
		"Guardian Ruins": {
			"400": {
				"name": "Alpha",
				"color": "F7F7F7"
			},
			"401": {
				"name": "Beta",
				"color": "F7F7F7"
			},
			"402": {
				"name": "Gamma",
				"color": "F7F7F7"
			}
		},
		"Thargoid Structures": {
			"500": {
				"name": "Active",
				"color": "F7F7F7"
			},
			"501": {
				"name": "Inactive",
				"color": "F7F7F7"
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
		bnSite["name"] = data[1];

		//Ripe or Dead Status not enabled yet, pending CSV fixes
		bnSite["cat"] = [200];
		bnSite["coords"] = {
			"x": coords[0],
			"y": coords[1],
			"z": coords[2]
		};

		// We can then push the site to the object that stores all systems
		systemsData["systems"].push(bnSite);

	}

}

function formatBT(data) {
	//Here you format BT JSON to ED3D acceptable object

	// this is assuming data is an array []
	for (var i = 0; i < data.length; i++) {
		var btSite = {};
		btSite["name"] = data[1];
		btSite["cat"] = [300];
		btSite["coords"] = {
			"x": coords[0],
			"y": coords[1],
			"z": coords[2]
		};

		// We can then push the site to the object that stores all systems
		systemsData["systems"].push(btSite);

	}

}

function formatTS(data) {
	//Here you format TS JSON to ED3D acceptable object

	// this is assuming data is an array []
	for (var i = 0; i < data.length; i++) {
		var tsSite = {};
		tsSite["name"] = data[1];

		//Check if Site is Active or Inactive, set Category to match
		if (data[8].toLowerCase() == "y") {
			tsSite["cat"] = [500];
		} else {
			tsSite["cat"] = [501];
		}
		tsSite["coords"] = {
			"x": coords[0],
			"y": coords[1],
			"z": coords[2]
		};

		// We can then push the site to the object that stores all systems
		systemsData["systems"].push(tsSite);

	}

}

function parseData(url, callBack, resolvePromise) {
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
}

var p1 = new Promise(function (resolve, reject) {
		parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTCGOwaRT8ESad9j0GAQ7tMMNj8ObxipFW8fop3eaZ-HoCVo_k9dQsHVvs1oFvARrY5SC6o4uDAWKQA/pub?gid=0&single=true&output=csv", formatBN, resolve);
	});

var p2 = new Promise(function (resolve, reject) {
		parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vRdEQQByWyU8MlzfJw9SzEsaM9c_zDV_RJ49Fiox842EEELrUHpMPexLYhjqNB8SOzB564jJ_oLdBx2/pub?gid=0&single=true&output=csv", formatBT, resolve);
	});

var p3 = new Promise(function (resolve, reject) {
		parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vR4-rhi1p4BU7AlOSj7_78Kvk5Ox6vb39vzzlWU3yI-dqlaLxk-CFLWvAFKc-J7WhomFiQ_u0P7Stxz/pub?gid=0&single=true&output=csv", formatTS, resolve);
	});


Promise.all([p1,p2,p3]).then({
    Ed3d.init({
        container   : 'edmap',
        jsonPath    : systemData,
        withHudPanel : true,
        hudMultipleSelect : true,
        effectScaleSystem : [50,10000],
        startAnim: false,
        showGalaxyInfos: true,
        cameraPos: [25,14100,-12900],
        systemColor: '#FF9D00'
    })
});
