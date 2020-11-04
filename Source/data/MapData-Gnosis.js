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


function get_date(system) {
	var startDate = dateFns.startOfDay(Date.UTC(2020, 8, 17, 0, 0, 0));
	console.log("startDate: " + startDate)

	var dates = {
		"Varati": dateFns.addWeeks(startDate, 0),
		"HIP 17862": dateFns.addWeeks(startDate, 1),
		"Pleiades Sector PN-T b3-0": dateFns.addWeeks(startDate, 2),
		"Synuefe PR-L b40-1": dateFns.addWeeks(startDate, 3),
		"HIP 18120": dateFns.addWeeks(startDate, 4),
		"IC 2391 Sector CQ-Y c16": dateFns.addWeeks(startDate, 5),
		"Kappa-1 Volantis": dateFns.addWeeks(startDate, 6),
		"Epsilon Indi": dateFns.addWeeks(startDate, 7)
	}

	var d = dates[system]

	const dayINeed = 4; // for Thursday


	const today = dateFns.startOfDay(new Date())


	//const today = dateFns.startOfDay(new Date())
	//console.log("today: " + dateFns.format(today, 'MMMM DD, YYYY'))
	const todayDay = dateFns.getISODay(today);


	var currentjump = dateFns.setISODay(today, dayINeed)
	// if we haven't yet passed the day of the week that I need:
	if (todayDay <= dayINeed) {
		// then just give me this week's instance of that day
		currentjump = dateFns.setISODay(dateFns.subWeeks(today, 1), dayINeed);
	}

	var weekstoadd = dateFns.differenceInWeeks(d, currentjump) % 8;
	if (weekstoadd < 0) {
		weekstoadd = 8 + weekstoadd
	}
	//weekstoadd %= 8


	var newdate = dateFns.addWeeks(currentjump, weekstoadd)

	console.log(system + " weeks-to-add: " + weekstoadd + '  ' + newdate)

	begindate = dateFns.startOfDay(Date.UTC(dateFns.getYear(newdate) + 1286, dateFns.getMonth(newdate), dateFns.getDate(newdate), 0, 0, 0));
	var enddate = dateFns.addWeeks(begindate, 1)
	//return newdate.format('YYYY-MM-DD')

	retval = dateFns.format(newdate, 'MMMM DD, YYYY') + ' - ' + dateFns.format(enddate, 'MMMM DD, YYYY')
	console.log("Gettings dates for " + system + "  " + retval)

	currentLocation = (dateFns.differenceInDays(newdate, currentjump) == 0)
	console.log(newdate + ' vs ' + currentjump)



	return { startdate: begindate, enddate: enddate, currentLocation: currentLocation }
}




function getDistance(a, b) {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2))
}


function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.href);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, '    '));
};


var canonnEd3d_route = {
	//Define Categories
	systemsData: {
		categories: {
			'Systems': {
				'00': { name: 'Varati', color: getColour(1), },
				'01': { name: 'HIP 17862', color: getColour(2), },
				'02': { name: 'Pleiades Sector PN-T b3-0', color: getColour(3), },
				'03': { name: 'Synuefe PR-L b40-1', color: getColour(4), },
				'04': { name: 'HIP 18120', color: getColour(5), },
				'05': { name: 'IC 2391 Sector CQ-Y c16', color: getColour(6), },
				'06': { name: 'Kappa-1 Volantis', color: getColour(7), },
				'07': { name: 'Epsilon Indi', color: getColour(8), },
				'10': { name: 'Cone Sector FN-J b9-0', color: getColour(12), },
				'99': { name: 'Other System', color: getColour(11), },
			},
			"Routes": {
				"08": { name: 'Historic Route', color: getColour(9), },
				"09": { name: 'Science Tour', color: "ff0000", },
			}
		},
		systems: [],
		routes: [],
	},

	camerapos: { x: 0, y: 0, z: 0 },

	routeData: [],
	parseData: function (url, resolvePromise) {
		let fetchDataFromApi = async (url, resolvePromise) => {
			let response = await fetch(url);
			let result = await response.json();
			canonnEd3d_route.routeData = result
			resolvePromise();
			return result;
		}
		fetchDataFromApi(url, resolvePromise)

		//console.log(data)
	},
	systemLookup: {},
	formatRoute: function (data) {
		// this is assuming data is an array []
		for (var i = 0; i < data.length - 1; i++) {

			start = data[i]
			end = data[i + 1]
			if (start.Route == "exploration") {
				cat = ["08"]
			} else {
				cat = ["09"]
			}

			route = {
				cat: cat,
				'points': [
					{ 's': start.System, 'label': start.System },
					{ 's': end.System, 'label': end.System }], 'circle': false
			}

			canonnEd3d_route.systemsData.routes.push(route);

			//	console.log(canonnEd3d_route.systemsData.systems)
		}
		route = {
			cat: ["09"],
			'points': [
				{ 's': 'Epsilon Indi', 'label': 'Epsilon Indi' },
				{ 's': 'Varati', 'label': 'Varati' }], 'circle': false
		}

		canonnEd3d_route.systemsData.routes.push(route);

	},
	formatSystems: function (systems) {

		systems.forEach(function (system) {
			poiSite = []

			if (system.Route == "final") {
				di = get_date(system.System)
				info = dateFns.format(di.startdate, 'MMMM DD, YYYY') + ' - ' + dateFns.format(di.enddate, 'MMMM DD, YYYY')
				if (di.currentLocation) {
					poiSite['infos'] = 'Gnosis Current Location<br></br>'
				} else {
					poiSite['infos'] = info + '<br></br>'
				}
			} else {
				poiSite['infos'] = system["Dates Visited"] + '<br></br>'
			}

			switch (system.System) {
				case 'Varati':
					cat = ["00"]
					break;
				case 'HIP 17862':
					cat = ["01"]
					break;
				case 'Pleiades Sector PN-T b3-0':
					cat = ["02"]
					break;
				case 'Synuefe PR-L b40-1':
					cat = ["03"]
					break;
				case 'HIP 18120':
					cat = ["04"]
					break;
				case 'IC 2391 Sector CQ-Y c16':
					cat = ["05"]
					break;
				case 'Kappa-1 Volantis':
					cat = ["06"]
					break;
				case 'Epsilon Indi':
					cat = ["99"]
					break;
				case 'Epsilon Indi':
					cat = ["99"]
					break;
				default:
				// code block
			}



			poiSite['cat'] = cat;
			poiSite['name'] = system.System
			poiSite['coords'] = {
				x: parseFloat(system.x),
				y: parseFloat(system.y),
				z: parseFloat(system.z),
			};
			canonnEd3d_route.systemsData.systems.push(poiSite);
		});


		poiSite['cat'] = ["10"];
		poiSite['name'] = "Cone Sector FN-J b9-0"
		poiSite['infos'] = 'The Gnosis was attacked by Thargoids and the jump aborted'
		poiSite['coords'] = {
			x: parseFloat(818.25),
			y: parseFloat(99.59375),
			z: parseFloat(-1944.375),
		};
		canonnEd3d_route.systemsData.systems.push(poiSite);
	},

	init: function () {


		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_route.parseData('data/csvCache/gnosis.json', resolve)
			console.log("getting gnosis data")
		});


		Promise.all([p1]).then(function () {

			canonnEd3d_route.formatRoute(canonnEd3d_route.routeData)
			canonnEd3d_route.formatSystems(canonnEd3d_route.routeData)



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
				cameraPos: [canonnEd3d_route.camerapos.x, canonnEd3d_route.camerapos.y + 1200, canonnEd3d_route.camerapos.z],
				playerPos: [canonnEd3d_route.camerapos.x, canonnEd3d_route.camerapos.y, canonnEd3d_route.camerapos.z],
				systemColor: '#FF9D00',
			});

		});
	},
};
