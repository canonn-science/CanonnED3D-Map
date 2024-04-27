//https://learnui.design/tools/data-color-picker.html#divergent
const colours = [
	['003f5c'], ['2f4b7c'], ['665191'], ['a05195'], ['d45087'], ['f95d6a'], ['ff7c43'], ['ffa600'],
	['4b9973'], ['75aa7c'], ['9abb8a'], ['bdcd9b'], ['dddeb0'], ['fcf1c8'], ['f4d7a6'], ['efbd88'], ['eaa16f'], ['e5835e'], ['de6254'],
	['00876c'], ['439981'], ['6aaa96'], ['8cbcac'], ['aecdc2'], ['cfdfd9'], ['f1f1f1'], ['f1d4d4'], ['f0b8b8'], ['ec9c9d'], ['e67f83'], ['de6069'], ['d43d51'],
	["daf7a6", "Greenish"], ["ffc370", "Dark Orange"], ["C70039", "Dark Red"],
	["FF0000", "Red"], ["3090C7", "Blue"], ["7E587E", "Viola"], ["E78A61", "Tangerine"], ["#FAEBD7", "AntiqueWhite"], ["46C7C7", "Jellyfish"], ["F0FFFF", "Azure"], ["7F5A58", "Puce"],
	["#81D8D0", "Tiffany"], ["#387C44", "Pine"], ["#4863A0", "Steel"], ["#D462FF", "Heliotrope"], ["D16587", "Pale"], ["B1FB17", "Green"], ["E67451", "Sunrise"], ["6CBB3C", "Green"],
	["#85BB65", "Dollar"], ["#6D7B8D", "Light"], ["#4AA02C", "Spring"], ["#646D7E", "Mist"], ["#C88141", "Tiger"], ["#F9966B", "Light"], ["#E42217", "Lava"], ["#FFF8DC", "Cornsilk"],
	["#8EEBEC", "Blue"], ["#C2DFFF", "Sea"], ["#954535", "Chestnut"], ["#B041FF", "Purple"], ["#000080", "Navy"], ["#E3319D", "Dimorphotheca"], ["#437C17", "Seaweed"], ["#8D38C9", "Violet"],
	["#6CC417", "Alien"], ["#B5EAAA", "Green"], ["#8467D7", "Medium"], ["#50EBEC", "Celeste"], ["#EAC117", "Golden"], ["#FFFF00", "Yellow"], ["#1569C7", "Blue"], ["#E238EC", "Crimson"],
	["#0041C2", "Blueberry"], ["#CC6600", "Sedona"], ["#7D0541", "Plum"], ["#98AFC7", "Blue"], ["#EDC9AF", "Desert"], ["#79BAEC", "Denim"], ["#E0FFFF", "Light"], ["#EE9A4D", "Sandy"],
	["#357EC7", "Windows"], ["#C24641", "Cherry"], ["#786D5F", "Sandstone"], ["#6AFB92", "Dragon"], ["#98FF98", "Mint"], ["#5FFB17", "Emerald"], ["#E38AAE", "Cadillac"], ["#7BCCB5", "Blue"],
	["#E3E4FA", "Lavender"], ["#FCDFFF", "Cotton"], ["#3B9C9C", "Dark"], ["#B5A642", "Brass"], ["#CA226B", "Medium"], ["#FAAFBA", "Light"], ["#7E3517", "Blood"], ["#3BB9FF", "Deep"],
	["#B7CEEC", "Blue"], ["#728FCE", "Light"], ["#C48189", "Pink"], ["#F62217", "Ruby"], ["#FFE87C", "Sun"], ["#95B9C7", "Baby"], ["#C38EC7", "Purple"], ["#438D80", "Sea"],
	["#59E817", "Nebula"], ["#EBDDE2", "Lavender"], ["#4B0082", "Indigo"], ["#AF9B60", "Bullet"], ["#616D7E", "Jet"], ["#C12267", "Burnt"], ["#8AFB17", "Chartreuse"], ["#B38481", "Rosy"],
	["#CCFB5D", "Tea"], ["#F88158", "Basket"], ["#00FF00", "Green"], ["#2B547E", "Blue"], ["#0000A0", "Earth"], ["#D4A017", "Orange"], ["#151B54", "Midnight"], ["#E8ADAA", "Rose"],
	["#C6DEFF", "Powder"], ["#48CCCD", "Medium"], ["#CFECEC", "Pale"], ["#7D1B7E", "Dark"], ["#E56717", "Papaya"], ["#6495ED", "Cornflower"], ["#FDD7E4", "Pig"], ["#7F525D", "Dull"],
	["#7FE817", "Hummingbird"], ["#C85A17", "Chocolate"], ["#667C26", "Fern"], ["#9E7BFF", "Purple"], ["#FBB917", "Saffron"], ["#E77471", "Light"], ["#254117", "Dark"], ["#EDDA74", "Goldenrod"],
	["#F433FF", "Bright"], ["#E9AB17", "Bee"], ["#ECC5C0", "Rose"], ["#2B60DE", "Royal"], ["#C48793", "Lipstick"], ["#F9A7B0", "Flamingo"], ["#FF2400", "Scarlet"], ["#737CA1", "Slate"],
	["#57FEFF", "Blue"], ["#38ACEC", "Butterfly"], ["#43C6DB", "Turquoise"], ["#BCC6CC", "Metallic"], ["#C04000", "Mahogany"], ["#EBF4FA", "Water"], ["#4E9258", "Forest"],
	["#E41B17", "Love"], ["#DEB887", "BurlyWood"], ["#FFE5B4", "Peach"], ["#BDEDFF", "Robin"], ["#347C17", "Shamrock"], ["#461B7E", "Purple"], ["#566D7E", "Marble"], ["#FBF6D9", "Blonde"],
	["#78866B", "Camouflage"], ["#F535AA", "Neon"], ["#C2B280", "Sand"], ["#8A4117", "Sienna"], ["#E55B3C", "Shocking"], ["#C6AEC7", "Wisteria"], ["#347235", "Medium"], ["#FFFFCC", "Cream"],
	["#ADA96E", "Khaki"], ["#F2BB66", "Macaroni"], ["#4E387E", "Purple"], ["#B2C248", "Avocado"], ["#E45E9D", "Pink"], ["#F88017", "Dark"], ["#5EFB6E", "Jade"], ["#FBB117", "Beer"],
	["#C7A317", "Cookie"], ["#89C35C", "Green"], ["#827B60", "Army"], ["#FBBBB9", "Misty"], ["#F0F8FF", "AliceBlue"], ["#87F717", "Lawn"], ["#7F38EC", "Lovely"], ["#FF00FF", "Magenta"],
	["#C68E17", "Caramel"], ["#3EA055", "Clover"], ["#6698FF", "Sky"], ["#C11B17", "Chilli"], ["#D2B9D3", "Thistle"], ["#E66C2C", "Halloween"], ["#E799A3", "Pink"], ["#A0CFEC", "Jeans"],
	["#FDEEF4", "Pearl"], ["#5CB3FF", "Crystal"], ["#B4CFEC", "Pastel"], ["#2B3856", "Dark"], ["#F6358A", "Violet"], ["#FFA62F", "Cantaloupe"], ["#F62817", "Fire"], ["#4E8975", "Sea"],
	["#9AFEFF", "Electric"], ["#157DEC", "Blue"], ["#6F4E37", "Coffee"], ["#9CB071", "Iguana"], ["#52D017", "Yellow"], ["#87AFC7", "Columbia"], ["#C3FDB8", "Light"], ["#7A5DC7", "Purple"],
	["#E7A1B0", "Pink"], ["#57E964", "Stoplight"], ["#008080", "Teal"], ["#BCE954", "Slime"], ["#368BC1", "Glacial"], ["#5E7D7E", "Grayish"], ["#659EC7", "Blue"], ["#306754", "Medium"],
	["#FFEBCD", "BlanchedAlmond"], ["#F660AB", "Hot"], ["#347C2C", "Jungle"], ["#E4287C", "Pink"], ["#990012", "Red"], ["#B87333", "Copper"], ["#348781", "Medium"], ["#614051", "Eggplant"],
	["#FFFFC2", "Parchment"], ["#307D7E", "Greenish"], ["#64E986", "Algae"], ["#15317E", "Lapis"], ["#0020C2", "Cobalt"], ["#FFF8C6", "Lemon"], ["#306EFF", "Blue"], ["#C25A7C", "Tulip"],
	["#8E35EF", "Purple"], ["#82CAFF", "Day"], ["#657383", "Slate"], ["#C5908E", "Khaki"], ["#CD7F32", "Bronze"], ["#FFDB58", "Mustard"], ["#00FFFF", "Cyan"], ["#827839", "Moccasin"],
	["#E6A9EC", "Blush"], ["#AFDCEC", "Coral"], ["#B93B8F", "Plum"], ["#77BFC7", "Blue"], ["#6AA121", "Green"], ["#E0B0FF", "Mauve"], ["#92C7C7", "Cyan"], ["#9F000F", "Cranberry"],
	["#F9B7FF", "Blossom"], ["#FFF5EE", "SeaShell"], ["#DC381F", "Grapefruit"], ["#F7E7CE", "Champagne"], ["#842DCE", "Dark"], ["#C12283", "Dark"], ["#348017", "Medium"], ["#56A5EC", "Iceberg"],
	["#151B8D", "Denim"], ["#736AFF", "Light"], ["#99C68E", "Frog"], ["#1F45FC", "Blue"], ["#4C787E", "Beetle"], ["#C19A6B", "Camel"], ["#2554C7", "Sapphire"],
	["#FAAFBE", "Pink"], ["#A1C935", "Salad"], ["#C45AEC", "Tyrian"], ["#C34A2C", "Chestnut"], ["#ADDFFF", "Light"], ["#F778A1", "Carnation"], ["#9DC209", "Pistachio"],
	["#6A287E", "Purple"], ["#C58917", "Cinnamon"], ["#7E354D", "Velvet"], ["#893BFF", "Aztech"], ["#8C001A", "Burgundy"], ["#54C571", "Zombie"],
	["#C8B560", "Fall"], ["#7FFFD4", "Aquamarine"], ["#810541", "Maroon"], ["#7F4E52", "Rosy"], ["#3EA99F", "Light"], ["#CCFFFF", "Light"], ["#4EE2EC", "Blue"], ["#571B7E", "Purple"],
	["#493D26", "Mocha"], ["#E55451", "Valentine"], ["#E9CFEC", "Periwinkle"], ["#82CAFA", "Light"], ["#F70D1A", "Ferrari"], ["#617C58", "Hazel"], ["#6C2DC7", "Purple"], ["#FFD801", "Rubber"],
	["#7F5217", "Red"], ["#FF8040", "Mango"], ["#483C32", "Taupe"], ["#C35817", "Red"], ["#E18B6B", "Dark"], ["#583759", "Plum"], ["#342D7E", "Blue"], ["#AF7817", "Dark"], ["#7D0552", "Plum"],
	["#FFF380", "Corn"], ["#F87431", "Construction"], ["#806517", "Oak"], ["#43BFC7", "Macaw"], ["#848b79", "Sage"], ["#F75D59", "Bean"], ["#B048B5", "Medium"], ["#78C7C7", "Northern"],
	["#488AC7", "Silk"], ["#FF7F50", "Coral"], ["#6960EC", "Blue"], ["#5E5A80", "Grape"], ["#F52887", "Deep"], ["#966F33", "Wood"], ["#800517", "Firebrick"], ["#E2A76F", "Brown"],
	["#C9BE62", "Ginger"], ["#FC6C85", "Watermelon"], ["#EDE275", "Harvest"], ["#E8A317", "School"], ["#F3E5AB", "Vanilla"], ["#FDD017", "Bright"], ["#728C00", "Venom"], ["#FFDFDD", "Pink"],
	["#C25283", "Bashful"], ["#8BB381", "Dark"], ["#93FFE8", "Light"], ["#7DFDFE", "Tron"], ["#A74AC7", "Purple"], ["#7E3817", "Sangria"], ["#F87217", "Pumpkin"], ["#9172EC", "Crocus"],
	["#F5F5DC", "Beige"], ["#41A317", "Lime"], ["#C47451", "Orange"], ["#C12869", "Rogue"], ["#4CC552", "Kelly"], ["#C8A2C8", "Lilac"], ["#4CC417", "Green"], ["#FFCBA4", "Deep"],
	["#7F462C", "Sepia"], ["#C36241", "Rust"], ["#E56E94", "Blush"], ["#1589FF", "Dodger"], ["#835C3B", "Brown"], ["#A23BEC", "Jasmine"], ["#2B65EC", "Ocean"], ["#ECE5B6", "Tan"]
];

function getColour(index) {
	return colours[index][0].replace('#', '');
}

const capitalise = (s) => {
	if (typeof s !== 'string') return ''

	return s.charAt(0).toUpperCase() + s.slice(1)
}

function getDistance(a, b) {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2))
}

function isClose(a, systems, dist) {
	retval = false
	Object.keys(systems).forEach(function (system) {
		if (getDistance(a, systems[system]) <= dist) {
			retval = true
		}
	});
	return retval
}

function pickState(states) {
	skipexpansion = (getUrlParameter("keepExpansion") == 0);
	keepexpansion = (!skipexpansion)

	var seq = 0
	function rank() {
		retval = seq
		seq++
		return retval
	}

	const statemap = {
		//Conflict States
		'civilwar': { rank: rank(), name: "Civil War" },
		'war': { rank: rank(), name: "war" },
		'election': { rank: rank(), name: "Election" },
		//Influence Penalty
		'terrorism': { rank: rank(), name: "Terrorist Attack" },
		'retreat': { rank: rank(), name: "Retreat" },
		//Warning States
		'lockdown': { rank: rank(), name: "Lockdown" },
		'civilunrest': { rank: rank(), name: "Civil Unrest" },
		'bust': { rank: rank(), name: "Bust" },

		//Rollplaying States
		'pirateattack': { rank: rank(), name: "Pirate Attack" },
		'infrastructurefailure': { rank: rank(), name: "Infrastructure Failure" },
		'outbreak': { rank: rank(), name: "Outbreak" },
		'famine': { rank: rank(), name: "Famine" },
		'drought': { rank: rank(), name: "Drought" },
		'blight': { rank: rank(), name: "Blight" },

		//missed off figure it fits here
		'naturaldisaster': { rank: rank(), name: "Natural Disaster" },

		//Profitable State
		'publicholiday': { rank: rank(), name: "Public Holiday" },
		'investment': { rank: rank(), name: "Investment" },
		'boom': { rank: rank(), name: "Boom" },

		//We don't know what this is
		'colonisation': { rank: rank(), name: "colonisation" },
		'revolution': { rank: rank(), name: "None" },
		'coldwar': { rank: rank(), name: "coldwar" },
		'technologicalleap': { rank: rank(), name: "technologicalleap" },
		'tradewar': { rank: rank(), name: "tradewar" },
		'historicevent': { rank: rank(), name: "historicevent" },
		'expansion': { rank: rank(), name: "Expansion" },

		// No interest
		'civilliberty': { rank: rank(), name: "civilliberty" },
		'none': { rank: rank(), name: "None" },
	}

	state = { rank: rank(), name: "None" }

	states.forEach(function (a) {
		if (a.state != 'expansion' | keepexpansion) {
			//if (a.state != 'expansion') {
			if (statemap[a.state].rank < state.rank) {
				state = statemap[a.state]
			}
		}
	})
	return state.name
}

function getState(f) {

	state = "None"
	if (f.active_states.length > 0) {
		state = pickState(f.active_states)
	}
	if (state == "None" & f.pending_states.length > 0) {
		f.pending_states.forEach(function (a) {
			newstate = pickState(f.pending_states)
			if (newstate == "None") {
				state = newstate
			} else {
				state = 'Pending ' + newstate
			}
		})
	}

	return state
}

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.href);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, '    '));
};

function renderConflicts(conflicts) {
	if (conflicts.length == 0) {
		return ""
	}
	retval = '<div  style="color: red; "><b>Conflicts:</b></div>'
	conflicts.forEach(function (conflict) {
		s = '&nbsp;' + capitalise(conflict.status) + ' ' + capitalise(conflict.type.replace("civil", "civil ")) + '<br>'
		s = s + "&nbsp;&nbsp;" + conflict.faction1.name + '<br>&nbsp;&nbsp;vs<br>&nbsp;&nbsp;' + conflict.faction2.name + '<br>'
	})
	return retval + s
}

function renderSystem(f) {
	controller = "Controlled by:<br>&nbsp;" + f.system_details.controlling_minor_faction_cased + "<br>"
	influence = "Influence: " + Math.round(parseFloat(f.influence) * 100, 1) + "%<br>"
	state = "System State: " + capitalise(f.state.replace("civil", "civil ")) + '<br>'
	pending = ""
	if (f.pending_states.length > 0) {
		pending = "<b>Pending States:</b><br>"
		f.pending_states.forEach(function (s) {
			pending = pending + "&nbsp;" + capitalise(s.state.replace("civil", "civil ")) + '<br>'
		})
	}
	active_states = ""
	if (f.active_states.length > 0) {
		active_states = "<b>Active States:</b><br>"
		f.active_states.forEach(function (s) {
			active_states = active_states + "&nbsp;" + capitalise(s.state.replace("civil", "civil ")) + '<br>'
		})
	}
	factions = "<b>Factions:</b><br>"
	f.system_details.factions.forEach(function (f) {
		factions = factions + '&nbsp;' + f.name + '<br>'
	})
	conflicts = renderConflicts(f.system_details.conflicts)
	return controller + influence + state + active_states + pending + factions + conflicts
}

function parseStates(s) {
	states = {}
	c = 1
	Object.keys(s).forEach(function (key) {
		states[key] = {
			name: key,
			color: getColour(c)
		}
		c += 1
	});
	return states
}

var canonnEd3d_route = {
	//Define Categories

	systemsData: {
		categories: {
			'Systems': {
				'00': {
					name: 'Sol',
					color: "ff0000",
				},
				'04': {
					name: 'Populated',
					color: "202020",
				},
			},
		},
		systems: [],
		routes: [],
	},
	factionData: [],
	factionInfo: [],
	camerapos: { x: 0, y: 0, z: 0 },


	fetchCodexData: async function (sSystem, eSystem, jRange, resolvePromise) {
		canonnEd3d_route.codexData = await getSites(sSystem, eSystem, jRange);
		resolvePromise();
	},

	parseFaction: function (url, resolvePromise) {
		let fetchDataFromApi = async (url, resolvePromise) => {
			let response = await fetch(url);
			let result = await response.json();
			canonnEd3d_route.factionData = result
			resolvePromise();
			return result;
		}
		fetchDataFromApi(url, resolvePromise)

		//console.log(data)
	},

	stationData: [],
	parseStations: function (url, resolvePromise) {
		let fetchDataFromApi = async (url, resolvePromise) => {
			let response = await fetch(url);
			let result = await response.json();
			canonnEd3d_route.stationData = result
			resolvePromise();
			return result;
		}
		fetchDataFromApi(url, resolvePromise)

		//console.log(data)
	},
	parseInfo: function (url, resolvePromise) {
		let fetchDataFromApi = async (url, resolvePromise) => {
			let response = await fetch(url);
			let result = await response.json();
			canonnEd3d_route.factionInfo = result
			resolvePromise();
			return result;
		}
		fetchDataFromApi(url, resolvePromise)

		//console.log(data)
	},
	systemLookup: {},
	formatCol: function (factionData, homeSystem) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object
		faction = getUrlParameter("faction");
		showRoute = getUrlParameter("showRoute");
		var states = {}

		data = factionData.docs[0].faction_presence
		solSite = {}
		solSite['cat'] = ['00'];
		solSite['name'] = 'Sol';
		solSite['infos'] = 'Cradle of Mankind<br>'
		solSite['coords'] = {
			x: 0,
			y: 0,
			z: 0,
		};
		canonnEd3d_route.systemsData.systems.push(solSite);

		fiData = {}


		canonnEd3d_route.factionInfo.forEach(function (fi) {

			if (!fiData[fi.system]) {

				fiData[fi.system] = []
			}

			fiData[fi.system].push(fi.interesting)
		});

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {

			route = {
				cat: ['02'],
				'points': [
					{ 's': homeSystem, 'label': homeSystem },
					{ 's': data[i].system_name, 'label': data[i].system_name }], 'circle': false
			}



			sa = getState(data[i])

			states[sa] = sa


			var poiSite = {};
			poiSite['name'] = data[i].system_name;


			poiSite['infos'] = renderSystem(data[i])

			poiSite['cat'] = ["44"]
			if (fiData[data[i].system_name]) {
				infoText = "<br>Sites<br>"
				var hasres = false
				var hires = false
				var compnav = false

				fiData[data[i].system_name].forEach(function (interesting) {
					infoText += "&nbsp;" + interesting + "<br>"
					hires = (interesting == 'Resource Extraction Site [High]')
					hazres = (interesting == 'Resource Extraction Site [Hazardous]')
					compnav = (interesting == 'Compromised Nav Beacon')
				});
				poiSite['infos'] += infoText
				//these override each other

				hazres && (poiSite['cat'] = ["11"])
				hires && (poiSite['cat'] = ["22"])
				compnav && (poiSite['cat'] = ["33"])
			}


			poiSite['coords'] = {
				x: parseFloat(data[i].system_details.x),
				y: parseFloat(data[i].system_details.y),
				z: parseFloat(data[i].system_details.z),
			};

			canonnEd3d_route.systemLookup[data[i].system_name] = poiSite.coords
			canonnEd3d_route.systemLookup[data[i].system_name]["exists"] = true

			//Check Site Type and match categories
			// set a default
			if (data[i].system_name == homeSystem) {
				homeSite = {}
				homeSite['cat'] = ['01'];
				homeSite['name'] = homeSystem;
				homeSite['infos'] = 'Home System<br>'
				homeSite['coords'] = {
					x: parseFloat(data[i].system_details.x),
					y: parseFloat(data[i].system_details.y),
					z: parseFloat(data[i].system_details.z),
				};
				canonnEd3d_route.camerapos.x = parseFloat(data[i].system_details.x)
				canonnEd3d_route.camerapos.y = parseFloat(data[i].system_details.y)
				canonnEd3d_route.camerapos.z = parseFloat(data[i].system_details.z)

				canonnEd3d_route.systemsData.categories["Systems"]['01'] = { name: homeSystem, color: 'd97f20' }
				canonnEd3d_route.systemsData.systems.push(homeSite);
			}

			//if (data[i].system_details.controlling_minor_faction.toUpperCase() == faction.toUpperCase()) {
			//	poiSite['cat'] = ['02'];
			//} else {
			//	poiSite['cat'] = ['03'];
			//}


			//poiSite['cat'] = [getState(data[i])]


			// We can then push the site to the object that stores all systems
			canonnEd3d_route.systemsData.systems.push(poiSite);

			if (showRoute == '1') {
				canonnEd3d_route.systemsData.categories['Route'] = {
					'02': {
						name: 'Route',
						color: "303030",
					},
				}
				canonnEd3d_route.systemsData.routes.push(route);
			}
			//	console.log(canonnEd3d_route.systemsData.systems)
		}

		canonnEd3d_route.systemsData.categories["Resources"] = {
			"11": { name: "Hazardous Resource", color: getColour(7) },
			"22": { name: "High Resource", color: getColour(5) },
			"33": { name: "Compromised Nav Beacon", color: getColour(3) },
			"44": { name: "No Resources of Note", color: getColour(1) },
		}

	},
	formatStations: function (systems) {
		highlights = []
		hl = getUrlParameter("Highlight");
		if (hl) {
			canonnEd3d_route.systemsData.categories["Systems"]["05"] = { name: "Target Systems", color: "00ff00" }
			hl.split(",").forEach(function (s) {
				highlights[s] = true
			})
		}



		systems.forEach(function (system) {

			poiSite = []
			if (highlights[system.name]) {
				poiSite['cat'] = ['05'];
			} else {
				poiSite['cat'] = ['04'];
			} poiSite['name'] = system.name
			stations = system.stations.split(',')

			infoText = "<div>Stations</div>"

			stations.forEach(function (station) {
				infoText += "&nbsp;" + station + "<br>"
			});



			poiSite['infos'] = infoText
			poiSite['coords'] = {
				x: parseFloat(system.pos_x),
				y: parseFloat(system.pos_y),
				z: parseFloat(system.pos_z),
			};

			a = poiSite['coords']
			siteExists = (canonnEd3d_route.systemLookup[system.name])

			pushit = (isClose(a, canonnEd3d_route.systemLookup, 20))
			pushit = (pushit & !siteExists)
			pushit = (pushit | highlights[system.name])

			if (pushit) {
				canonnEd3d_route.systemsData.systems.push(poiSite);
			}



		});
	},

	init: function () {

		var p1 = new Promise(function (resolve, reject) {

			faction = getUrlParameter("faction");
			canonnEd3d_route.parseFaction('https://elitebgs.app/api/ebgs/v5/factions?name=' + faction + '&systemDetails=true', resolve)
		});

		var p2 = new Promise(function (resolve, reject) {
			faction = getUrlParameter("faction");
			canonnEd3d_route.parseStations('data/json_stations.json', resolve)
			//console.log("getting station data")
		});


		Promise.all([p1, p2]).then(function () {

			var p3 = new Promise(function (resolve, reject) {
				var arr = []

				data = canonnEd3d_route.factionData.docs[0].faction_presence
				data.forEach(function (x) {
					arr.push(x.system_name)
					//console.log(x)
				});
				faction_systems = arr.join(",")
				//console.log(faction_systems)
				canonnEd3d_route.parseInfo('https://us-central1-canonn-api-236217.cloudfunctions.net/query/get_compres?systems=' + faction_systems, resolve)
			});

			Promise.all([p3]).then(function () {

				homeSystem = getUrlParameter("homeSystem");
				canonnEd3d_route.formatCol(canonnEd3d_route.factionData, homeSystem)
				canonnEd3d_route.formatStations(canonnEd3d_route.stationData)


				//console.log(canonnEd3d_route.camerapos)

				document.getElementById("loading").style.display = "none";
				Ed3d.init({
					container: 'edmap',
					json: canonnEd3d_route.systemsData,
					withFullscreenToggle: false,
					withHudPanel: true,
					hudMultipleSelect: true,
					effectScaleSystem: [20, 500],
					startAnim: true,
					showGalaxyInfos: true,
					//cameraPos: [canonnEd3d_route.camerapos.x, canonnEd3d_route.camerapos.y, canonnEd3d_route.camerapos.z],
					cameraPos: [canonnEd3d_route.camerapos.x - 100, canonnEd3d_route.camerapos.y, canonnEd3d_route.camerapos.z - 100],
					playerPos: [canonnEd3d_route.camerapos.x, canonnEd3d_route.camerapos.y, canonnEd3d_route.camerapos.z],
					systemColor: '#FF9D00',
				});
			});

		});
	},
};
