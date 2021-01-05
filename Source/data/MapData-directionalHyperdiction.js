
colours = [
	["#F65314", "Red"],
	["#7CBB00", "Green"],
	["#00A1F1", "Blue"],
	["#FFBB00", "Yellow"],
	["#00FFFF", "Cyan"],
	["#8D38C9", "Violet"],
	["#FAEBD7", "AntiqueWhite"],
	["#46C7C7", "Jellyfish"],
	["#F0FFFF", "Azure"],
	["#7F5A58", "Puce"],
	["#81D8D0", "Tiffany"],
	["#387C44", "Pine"],
	["#4863A0", "Steel"],
	["#333333", "Grey"]
];

var canonnEd3d_direHypers = {
	//Define Categories
	systemsData: {
		categories: {
 			"Reference Systems": {
				"Merope": { name: "Merope", color: colours[0][0].replace('#', '') },
				"Sol": { name: "Sol", color: colours[1][0].replace('#', '') },
				"Witchhead": { name: "Witch Head Sector IR-W c1-9", color: colours[2][0].replace('#', '') }
			},
			"Jumping From Bubble": {
				"from_Merope": { name: "Merope", color: colours[0][0].replace('#', '') },
				"from_Sol": { name: "Sol", color: colours[1][0].replace('#', '') },
				"from_Witchhead": { name: "Witch Head Sector IR-W c1-9", color: colours[2][0].replace('#', '') }
			},
			"Jumping To Bubble": {
				"to_Merope": { name: "Merope", color: colours[0][0].replace('#', '') },
				"to_Sol": { name: "Sol", color: colours[1][0].replace('#', '') },
				"to_Witchhead": { name: "Witch Head Sector IR-W c1-9", color: colours[2][0].replace('#', '') }
			},
			"Hyperdiction Line": {
				"hd_Merope": { name: "Merope", color: colours[0][0].replace('#', '') },
				"hd_Sol": { name: "Sol", color: colours[1][0].replace('#', '') },
				"hd_Witchhead": { name: "Witch Head Sector IR-W c1-9", color: colours[2][0].replace('#', '') }
			},
		},
		systems: [],
		routes: []
	},

	addSystem: function (system, fromtoCat) {
		for (var i = 0; i < canonnEd3d_direHypers.systemsData.systems.length; i++) {
			if (canonnEd3d_direHypers.systemsData.systems[i].name.toUpperCase() === system.name.toUpperCase()) {
				if (fromtoCat != undefined) {
					canonnEd3d_direHypers.systemsData.systems[i].cat.push(fromtoCat);
				}
				return;
			}
		}
		canonnEd3d_direHypers.addPOI(system.name, system.coords.x, system.coords.y, system.coords.z, system.cat);
	},
	
	addPOI: (name, x, y, z, category) => {
        //add the site
        let poiSite = {};
        poiSite['name'] = name.toUpperCase();
        //console.log(category);
        //todo Check Site Type and match categories
        poiSite['cat'] = [category];
        poiSite['coords'] = {
            x: parseFloat(x),
            y: parseFloat(y),
            z: parseFloat(z),
        };

        canonnEd3d_direHypers.systemsData.systems.push(poiSite);
    },

    addRoute: (originSystem, targetSystem, category) => {
        var route = {};
        //todo 
        route['cat'] = [category];
        route['points'] = [
            { 's': originSystem.name.toUpperCase(), 'label': originSystem.name },
            { 's': targetSystem.name.toUpperCase(), 'label': targetSystem.name },
        ];
        route['circle'] = false;

        // We can then push the site to the object that stores all systems
        canonnEd3d_direHypers.systemsData.routes.push(route);
	},

	formatHypers: function (data) {

		merope = { name: "Merope", cat: ["Merope"], coords: { x: -78.59375, y: -149.625, z: -340.53125 } };
		witchhead = { name: "Witch Head Sector IR-W c1-9", cat: ["Witchhead"], coords: { x: 355.3125, y: -425.96875, z: -723.03125 } };
		sol = { name: "Sol", cat: ["Sol"], coords: { x: 0, y: 0, z: 0 } };
		canonnEd3d_direHypers.systemsData.systems.push(merope);
		canonnEd3d_direHypers.systemsData.systems.push(sol);
		canonnEd3d_direHypers.systemsData.systems.push(witchhead);

		/* TimeStamp,GUID,CMDR,From,FromX,FromY,FromZ,,To,ToX,ToY,ToZ,, */
		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			var fromSite = {
				name: data[i].From,
				coords: {x: parseFloat(data[i].FromX), y: parseFloat(data[i].FromY), z: parseFloat(data[i].FromZ) },
			};
			var toSite = {
				name: data[i].To,
				coords: {x: parseFloat(data[i].ToX), y: parseFloat(data[i].ToY), z: parseFloat(data[i].ToZ) },
			};
			
			fromSite['cat'] = ['from_'+canonnEd3d_direHypers.getAddCatByDist(fromSite, false)];
			let toCategory = canonnEd3d_direHypers.getAddCatByDist(toSite, true);
			toSite['cat'] = ['to_'+toCategory];

			//console.log(toCategory);

			// We can then push the site to the object that stores all systems
			canonnEd3d_direHypers.addSystem(fromSite);
			canonnEd3d_direHypers.addSystem(toSite, toCategory);
			canonnEd3d_direHypers.addRoute(fromSite, toSite, 'hd_'+toCategory);
		}

	},

	getAddCatByDist: function (poiSite, isTarget) {
		dmerope = Math.sqrt(Math.pow(poiSite.coords.x - merope.coords.x, 2) + Math.pow(poiSite.coords.y - merope.coords.y, 2) + Math.pow(poiSite.coords.z - merope.coords.z, 2));
		dsol = Math.sqrt(Math.pow(poiSite.coords.x - sol.coords.x, 2) + Math.pow(poiSite.coords.y - sol.coords.y, 2) + Math.pow(poiSite.coords.z - sol.coords.z, 2));
		dwitchhead = Math.sqrt(Math.pow(poiSite.coords.x - witchhead.coords.x, 2) + Math.pow(poiSite.coords.y - witchhead.coords.y, 2) + Math.pow(poiSite.coords.z - witchhead.coords.z, 2));

		//subcategories by distance to point of reference
		if (dmerope < dsol & dmerope < dwitchhead) {
			subname = "Merope";
		}
		if (dsol < dmerope & dsol < dwitchhead) {
			subname = "Sol";
		}

		if (dwitchhead < dmerope & dwitchhead < dsol) {
			subname = "Witchhead";
		}

/* 		if (!canonnEd3d_direHypers.systemsData.subcategories[subname]) {
			canonnEd3d_direHypers.systemsData.subcategories[subname] = {};

			//taken from https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors and modified
			//use: c as input color in rgb-hex #rrggbb, a as percentage between 0 and 1. it will simply multiply the rgb values with 0-1 relatively, thus lightens or darkens the color
			var adjc = (c, a) => c.replace(/\w\w/g, m => Math.min(255, parseInt(Math.max(0, parseInt(m, 16) * parseFloat(a)))).toString(16).padStart(2,"0"));

			//adjusting reference system category color, starting bright, getting darker. (assumes years appear in decreasing order)
			//categories length grows per iteration starting at 2, so 1/length decreases the amount of dampening by diverging to 1
			let amount = 0.33+1/Object.keys(canonnEd3d_direHypers.systemsData.categories).length;
			next_colour = adjc(canonnEd3d_direHypers.systemsData.categories["Reference Systems"][subname].color, amount);
			//console.log(categories["Reference Systems"][subname].color, amount, next_colour)
			
			let category = isTarget ? "Jumping To" : "Jumping From";
			canonnEd3d_direHypers.systemsData.categories[category][(isTarget?"to_":"from_")+subname] = { name: subname, color: next_colour };
		} */
		return subname;
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

				document.getElementById("loading").style.display = "none";
				resolvePromise();
			},
		});
	},

	init: function () {
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_direHypers.parseCSVData('data/csvCache/Hyperdictions (Responses) - 3DMap.csv', canonnEd3d_direHypers.formatHypers, resolve);
		});

		Promise.all([p1]).then(function () {
			console.log(canonnEd3d_direHypers.systemsData)
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_direHypers.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: true,
				showGalaxyInfos: true,
				//setting camera to Merope and zoom out
				playerPos: [-78.59375, -149.625, -340.53125],
				cameraPos: [-78.59375 - 1000, -149.625, -340.53125 - 1000],
				systemColor: '#FF9D00',
			});
		});
	},
};
