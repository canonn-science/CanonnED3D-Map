var canonnEd3d_bm = {

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
			"Bark Mounds - (BM)": {
				"200": {
					"name": "Bark Mound",
					"color": "cdab7e"
				}
			}
		},
		"systems": []
	},

	formatBM: function (data) {

		var data = data.bmsites;

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.systemName.replace(" ", "").length > 1) {
				var bmSite = {};
				bmSite["name"] = data[i].system.systemName;
				bmSite["cat"] = [200];
				bmSite["coords"] = {
					"x": parseFloat(data[i].system.edsmCoordX),
					"y": parseFloat(data[i].system.edsmCoordY),
					"z": parseFloat(data[i].system.edsmCoordZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_bm.systemsData.systems.push(bmSite);
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
				canonnEd3d_bm.systemsData.systems.push(poiSite);
			}

		}

	},

	parseData: function (url, query, callBack) {

		return fetch(url, {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json',
		  },
		  body: query
		}).then(res => res.json()).then(res => callBack(res.data));
    },

    parseCSVData: function (url, callBack, resolvePromise) {
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

		var bmQuery = `query {
			  bmsites (limit:1000) {
			    system {
			      systemName
			      edsmCoordX
			      edsmCoordY
			      edsmCoordZ
			    }
			    type {
			      type
			    }
			  }
			}`;

		var poiQuery = `query {
			  bmsites (limit:1000) {
			    system {
			      systemName
			      edsmCoordX
			      edsmCoordY
			      edsmCoordZ
			    }
			    type {
			      type
			    }
			  }
			}`;

		//BM Sites
		var p1 = canonnEd3d_bm.parseData("https://api.canonn.tech:2083/graphql", JSON.stringify({query: bmQuery}), canonnEd3d_bm.formatBM);

		//POI & Gnosis
		var p2 = new Promise(function (resolve, reject) {
            canonnEd3d_bm.parseCSVData("data/csvCache/poiDataCache.csv", canonnEd3d_bm.formatPOI, resolve);
		});

		Promise.all([p1 , p2]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_bm.systemsData,
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