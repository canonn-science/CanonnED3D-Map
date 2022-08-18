const colours = [
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

const API_ENDPOINT = `https://us-central1-canonn-api-236217.cloudfunctions.net/get_codex_route`;
const API_LIMIT = 10000;

const codex = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Access-Control-Max-Age': 86400,
	},
});



const getSites = async (startSystem, endSystem, jumpRange) => {
	let records = [];
	let keepGoing = true;
	let API_START = 0;
	while (keepGoing) {
		let response = await reqSites(API_START, startSystem, endSystem, jumpRange);
		await records.push.apply(records, response.data);
		API_START += API_LIMIT;
		if (response.data.length < API_LIMIT) {
			keepGoing = false;
			return records;
		}
	}
};

const reqSites = async (API_START, startSystem, endSystem, jumpRange) => {

	let payload = await codex({
		url: `?startSystem=${startSystem}&endSystem=${endSystem}&jumpRange=${jumpRange}&limit=${API_LIMIT}&offset=${API_START}`,
		method: 'get'
	});
	console.log("fetching data")
	return payload;
};


function getColour(index) {
	return colours[index][0].replace('#', '');
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
				'11': {
					name: 'Start System',
					color: '72ec11',
				},
				'12': {
					name: 'End System',
					color: 'ec4011',
				},
			},
			'Codex Categories': {
				'00': {
					name: 'Unknown Biology',
					color: "FF0000",
				},
				'01': {
					name: 'Biology',
					color: getColour(2),
				},
				'02': {
					name: 'Cloud',
					color: getColour(3),
				},
				'03': {
					name: 'Anomaly',
					color: getColour(4),
				},
				'04': {
					name: 'Thargoid',
					color: getColour(5),
				},
				'05': {
					name: 'Guardian',
					color: getColour(6),
				},
			},
			/*"minorPOI",
			"planetaryNebula",
			"nebula",
			"blackHole",
			"historicalLocation",
			"stellarRemnant",
			"planetFeatures",
			"regional",
			"pulsar",
			"starCluster",
			"jumponiumRichSystem",
			"surfacePOI",
			"deepSpaceOutpost",
			"mysteryPOI",
			"organicPOI",
			"restrictedSectors",
			"geyserPOI"*/

			'Galactic Mapping': {
				'minorPOI': {
					name: 'Minor POI',
					color: getColour(7),
				},
				'planetaryNebula': {
					name: 'Planetary Nebula',
					color: getColour(8),
				},
				'nebula': {
					name: 'Nebula',
					color: getColour(9),
				},
				'blackHole': {
					name: 'Black Hole',
					color: getColour(10),
				},
				'historicalLocation': {
					name: 'Historical Location',
					color: getColour(11),
				},
				'stellarRemnant': {
					name: 'Stellar Remnant',
					color: getColour(12),
				},
				'planetFeatures': {
					name: 'Planet Features',
					color: getColour(13),
				},
				'regional': {
					name: 'Region',
					color: getColour(14),
				},
				'pulsar': {
					name: 'Pulsar',
					color: getColour(15),
				},
				'starCluster': {
					name: 'Region',
					color: getColour(16),
				},
				'jumponiumRichSystem': {
					name: 'Jumponium Rich',
					color: '00FF00',
				},
				'surfacePOI': {
					name: 'Surface POI',
					color: getColour(18),
				},
				'mysteryPOI': {
					name: 'Mystery POI',
					color: getColour(19),
				},
				'organicPOI': {
					name: 'Organic Poi',
					color: getColour(20),
				},
				'deepSpaceOutpost': {
					name: 'Deep Space Outpost',
					color: getColour(21),
				},
				//"restrictedSectors",
				//"geyserPOI"
				'restrictedSectors': {
					name: 'Restricted Sectors',
					color: getColour(22),
				},
				'geyserPOI': {
					name: 'Volcanic POI',
					color: getColour(23),
				},

			},
		},
		systems: [],
		routes: [],
	},
	codexData: [],
	gmpData: [],

	fetchCodexData: async function (sSystem, eSystem, jRange, resolvePromise) {
		canonnEd3d_route.codexData = await getSites(sSystem, eSystem, jRange);
		resolvePromise();
	},

	parseGmp: function (url, resolvePromise) {
		let fetchDataFromApi = async (url, resolvePromise) => {
			let response = await fetch(url);
			let result = await response.json();
			canonnEd3d_route.gmpData = result
			resolvePromise();
			return result;
		}
		fetchDataFromApi(url, resolvePromise)

		//console.log(data)

	},

	formatCol: function (data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object
		canonnEd3d_route.codexData = data
		startSystem = data[0].startSystem
		endSystem = data[0].endSystem
		//console.log("route")
		//console.log(startSystem.name);
		//console.log(endSystem.name);

		canonnEd3d_route.systemsData.categories['Systems']["11"].name = startSystem.name
		canonnEd3d_route.systemsData.categories['Systems']["12"].name = endSystem.name

		route = {
			'points': [
				{ 's': startSystem.name, 'label': startSystem.name },
				{ 's': endSystem.name, 'label': endSystem.name }], 'circle': true
		}

		//console.log(route)

		var startSite = {};
		var endSite = {};
		startSite['name'] = startSystem.name
		startSite['cat'] = ["11"]
		startSite['infos'] = 'Start of route<br>'
		startSite['coords'] = {
			x: parseFloat(startSystem.x),
			y: parseFloat(startSystem.y),
			z: parseFloat(startSystem.z),
		};
		canonnEd3d_route.systemsData.systems.push(startSite);
		endSite['cat'] = ["12"]
		endSite['name'] = endSystem.name
		endSite['infos'] = 'End of route<br>'
		endSite['coords'] = {
			x: parseFloat(endSystem.x),
			y: parseFloat(endSystem.y),
			z: parseFloat(endSystem.z),
		};
		canonnEd3d_route.systemsData.systems.push(endSite);

		canonnEd3d_route.systemsData.routes.push(route);

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			var poiSite = {};
			poiSite['name'] = data[i].system;
			poiSite['infos'] = data[i].english_name + '<br>'

			//Check Site Type and match categories
			// set a default
			poiSite['cat'] = [data[i].hud_category];

			if (data[i].map_category == 'gmp') {
				//poiSite['infos'] = data[i].type + ': ' + data[i].english_name + '<br>'

				try {
					infoCat = canonnEd3d_route.systemsData.categories["Galactic Mapping"][data[i].hud_category].name
				} catch (e) {
					infoCat = data[i].hud_category
				}
				console.log(data[i].hud_category)
				poiSite['infos'] = '<h2>' + infoCat + ':</h2><br>' + data[i].english_name + '<hr><br>' + data[i].description + '<br>'
			}

			//now override it
			if (data[i].english_name == 'Unknown Biology Scan') {
				poiSite['infos'] = '<a href="https://canonn-science.github.io/canonn-signals/?system=' + data[i].system + '" target="_blank">Unknown Biology Signal</a>'
				poiSite['cat'] = ["00"];
			} else {
				if (data[i].hud_category == 'Biology') {
					poiSite['cat'] = ["01"];
				}
			}
			if (data[i].hud_category == 'Cloud') {
				poiSite['cat'] = ["02"];
			}
			if (data[i].hud_category == 'Anomaly') {
				poiSite['cat'] = ["03"];
			}
			if (data[i].hud_category == 'Thargoid') {
				poiSite['cat'] = ["04"];
			}
			if (data[i].hud_category == 'Guardian') {
				poiSite['cat'] = ["05"];
			}

			poiSite['coords'] = {
				x: parseFloat(data[i].x),
				y: parseFloat(data[i].y),
				z: parseFloat(data[i].z),
			};

			// We can then push the site to the object that stores all systems
			canonnEd3d_route.systemsData.systems.push(poiSite);
			document.getElementById("loading").style.display = "none";
			//	console.log(canonnEd3d_route.systemsData.systems)
		}


	},

	init: function () {
		var p1 = new Promise(function (resolve, reject) {
			sSystem = getUrlParameter("startSystem");
			eSystem = getUrlParameter("endSystem");
			jRange = getUrlParameter("jumpRange");
			canonnEd3d_route.fetchCodexData(sSystem, eSystem, jRange, resolve)

		});

		var p2 = new Promise(function (resolve, reject) {
			sSystem = getUrlParameter("startSystem");
			eSystem = getUrlParameter("endSystem");
			jRange = getUrlParameter("jumpRange");
			canonnEd3d_route.parseGmp('https://us-central1-canonn-api-236217.cloudfunctions.net/get_gmp_route?startSystem=' + sSystem + '&endSystem=' + eSystem + '&jumpRange=' + jRange, resolve)
		});

		Promise.all([p1, p2]).then(function () {
			canonnEd3d_route.formatCol(canonnEd3d_route.codexData)
			canonnEd3d_route.formatCol(canonnEd3d_route.gmpData)
			console.log(canonnEd3d_route.systemsData)
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_route.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00',
			});
		});
	},
};
