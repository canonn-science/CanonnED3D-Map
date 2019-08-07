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
			"Permit Locked Regions": {
				"1070": {
					"name": "Col 70 Sector",
					"color": "442299"
				},
                "1097": {
					"name": "Col 97 Sector",
					"color": "4444dd"
				},
                "1121": {
					"name": "Col 121 Sector",
					"color": "11aabb"
				},
                "2000": {
					"name": "Cone Sector",
					"color": "22ccaa"
				},
                "3000": {
					"name": "Horsehead Dark Sector",
					"color": "a6cc33"
				},
                "4000": {
					"name": "M41",
					"color": "69d025"
				},
                "6647": {
					"name": "NGC 1647",
					"color": "aacc22"
				},
                "7264": {
					"name": "NGC 2264",
					"color": "d0c310"
				},
                "7286": {
					"name": "NGC 2286",
					"color": "ccbb33"
				},
                "8603": {
					"name": "NGC 3603",
					"color": "ff9933"
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

	formatCol: function (data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].name && data[i].name.replace(" ", "").length > 1) {
				var poiSite = {};
				poiSite["name"] = data[i].name;

				//Check Site Type and match categories
				
                var component=data[i].name.split(" ")
                if ( component[0] == "Col" ) {
                    poiSite["cat"] = [1000+parseInt(component[1])];
                }
                if ( component[0] == "Cone" ) {
                    poiSite["cat"] = [2000]
                }    
                if ( component[0] == "Horsehead" ) {
                    poiSite["cat"] = [3000]
                }    
                if ( component[0] == "M41" ) {
                    poiSite["cat"] = [4000]
                }
                if ( component[0] == "NGC" ) {
                    poiSite["cat"] = [5000+parseInt(component[1])];
                }
				
				
				poiSite["coords"] = {
					"x": parseFloat(data[i].pos_x),
					"y": parseFloat(data[i].pos_y),
					"z": parseFloat(data[i].pos_z)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_bm.systemsData.systems.push(poiSite);
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
		//var p1 = canonnEd3d_bm.parseData("https://api.canonn.tech:2083/graphql", JSON.stringify({query: bmQuery}), canonnEd3d_bm.formatBM);

		//POI & Gnosis
		var p2 = new Promise(function (resolve, reject) {
            canonnEd3d_bm.parseCSVData("data/csvCache/poiDataCache.csv", canonnEd3d_bm.formatPOI, resolve);
		});
        
        var p1 = new Promise(function (resolve, reject) {
            canonnEd3d_bm.parseCSVData("data/csvCache/col70.csv", canonnEd3d_bm.formatCol, resolve);
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