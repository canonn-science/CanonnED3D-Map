const colours = [
	["#FF0000", "Red"], ["#3090C7", "Blue"], ["#7E587E", "Viola"], ["#E78A61", "Tangerine"], ["#FAEBD7", "AntiqueWhite"], ["#46C7C7", "Jellyfish"], ["#F0FFFF", "Azure"], ["#7F5A58", "Puce"],
	["#81D8D0", "Tiffany"], ["#387C44", "Pine"], ["#4863A0", "Steel"], ["#D462FF", "Heliotrope"], ["#D16587", "Pale"], ["#B1FB17", "Green"], ["#E67451", "Sunrise"], ["#6CBB3C", "Green"],
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


const API_ENDPOINT = 'https://us-central1-canonn-api-236217.cloudfunctions.net/query/codex'
const API_LIMIT = 1000;
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
let urlParams = {
	cmdr: "",
}
function signalLink(system, name) {
	return '<a href="https://canonn-science.github.io/canonn-signals/?system=' + system + '" target="_blank" rel="noopener">' + name + '</a><br/>'
}
function edsmLink(system) {
	return `<a href="https://www.edsm.net/en/system?systemName=${system}" target="_blank" rel="noopener">EDSM</a><br/>`
}

const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Access-Control-Max-Age': 86400,
	},
});

const go = async types => {
	const keys = Object.keys(types);
	return (await Promise.all(
		keys.map(type => getSites(type))
	)).reduce((acc, res, i) => {
		acc[keys[i]] = res;
		return acc;
	}, {});
};

const getSites = async type => {
	let records = [];
	let keepGoing = true;
	let API_START = 0;
	const COUNT_T = 4;
	while (keepGoing) {
		let p = [];
		for (let i = 0; i < COUNT_T; i++)
			p.push(reqSites(API_START + i * API_LIMIT, type))

		let count = 0;
		let responses = await Promise.all(p)
		responses.map((response) => {
			Object.assign(records, response.data)
			for (let system in response.data) {
				if (response.data[system].codex) count += response.data[system].codex.length
			}
		})

		API_START += API_LIMIT * COUNT_T;
		if (count < API_LIMIT * COUNT_T) {
			keepGoing = false;
			return records;
		}
	}
};

function sortObj(obj) {
	return Object.keys(obj).sort().reduce(function (result, key) {
		result[key] = (/boolean|number|string/).test(typeof obj[key]) || !obj[key] ? obj[key] : sortObj(obj[key]);
		return result;
	}, {});
}

const reqSites = async (API_START, type) => {
	//console.log("reqSites type: ", type)
	if (type.indexOf('?') < 0) type += '?'
	else type += '&'
	let payload = await capi({
		url: `${type}limit=${API_LIMIT}&offset=${API_START}`,
		method: 'get'
	});
	console.log(payload)
	return payload;
};

const buildDropdownFilter = async (site_type_data) => {

	let hierarchy_data = site_type_data.data;
	//console.log("hierarchy_data: ", hierarchy_data)

	for (let p in urlParams) {
		let v = getURLParameter(p)
		if (v) urlParams[p] = v;
	}
	//main select for hud_category
	let hudmenu = $(`<select name="hud_category" id="select_hud_category" class="filter_dropdown"><option value="">-- Science --</option>`).detach()
	let submenu = $(`<select name="sub_class" id="select_sub_class" class="filter_dropdown"><option value="">-- Class --</option>`).detach()
	let namemenu = $(`<select name="english_name" id="select_english_name" class="filter_dropdown"><option value="">-- Name --</option>`).detach()

	sortObj(hierarchy_data)

	for (let hud_category in hierarchy_data) {
		if (urlParams.hud_category && urlParams.hud_category != hud_category) continue

		//build select for sub_class
		let sub_found = false;
		for (let sub_class in hierarchy_data[hud_category]) {
			if (urlParams.sub_class && urlParams.sub_class != sub_class) continue

			//build select for english_name
			let name_found = false;
			let last_english_short = "";
			for (let english_name in hierarchy_data[hud_category][sub_class]) {
				if (urlParams.english_name && english_name.indexOf(urlParams.english_name) < 0) continue

				if (urlParams.platform
					&& hierarchy_data[hud_category][sub_class][english_name].platform != urlParams.platform)
					continue

				english_short = english_name.split(' - ')[0]
				if (english_short == last_english_short) continue
				last_english_short = english_short

				nameitem = $(`<option value="${english_short}">${english_short}</option>`)
				namemenu.append(nameitem)
				name_found = true;
			}
			//hide sub_class if sublevel urlParams.english_name was set and not found
			if (name_found) {
				subitem = $(`<option value="${sub_class}">${sub_class}</option>`)
				submenu.append(subitem)
				sub_found = true;
			} else {
				//console.log("no name found for sub_class: ", sub_class)
			}
		}
		//hide hud_category option if sublevel urlParams.sub_class or english_name was set and not found
		if (sub_found) {
			let huditem = $(`<option value="${hud_category}">${hud_category}</option>`);
			hudmenu.append(huditem)
		} else {
			//console.log("no sub_class (with name) found for hud_category: ", hud_category)
		}
	}
	let filters_form = $(`<form id="filters_form" action="" method="get">`).detach()
	//separate bio/geo links in nav.html
	filters_form.append(hudmenu)
	filters_form.append(submenu)
	let checked = ""
	if (urlParams['platform'] == "odyssey")
		checked = ` checked="checked"`
	filters_form.append(`<span class="checkbox"><label for="filters_check_legacy">Odyssey only<input type="checkbox" id="filters_check_legacy" name="platform" value="odyssey"${checked}><span class="fakebox"></span></label></span>`)
	filters_form.append(namemenu)
	//reflect selected choice in dropdowns
	for (let p in urlParams) {
		if (p == "platform") continue
		if (urlParams[p]) $(`#select_${p} option[value='${urlParams[p]}']`, filters_form).attr('selected', 'selected')
	}

	//changing a dropdown will refresh page with new parameters
	$('select', filters_form).on('change', () => { filters_form.submit() })
	$('.checkbox input', filters_form).on('change', () => { filters_form.submit() })

	$('#filters').prepend(filters_form);
	$('#filters h2').css('cursor', 'pointer').on('click', toggleFilterHeader)
}

toggleFilterHeader = (event) => {
	let filters = $(event.target).next('div')
	filters.toggle()
	$('a', filters).trigger('click')
}

const recenterViewport = (center, distance) => {
	//-- Set new camera & target position
	Ed3d.playerPos = [center.x, center.y, center.z];
	Ed3d.cameraPos = [
		center.x + (Math.floor((Math.random() * 100) + 1) - 50), //-- Add a small rotation effect
		center.y + distance,
		center.z - distance
	];

	Action.moveInitalPosition();
}

recenterSearch = function () {
	var term = $('#search input').val();
	if (!term.trim()) return;

	var foundSystem = {};
	for (key in canonnEd3d_codex.systemsData.systems) {
		let system = canonnEd3d_codex.systemsData.systems[key];
		if (system.name.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
			foundSystem = system;
			break;
		}
	}
	if (!(Object.keys(foundSystem).length === 0)) {
		recenterViewport(foundSystem.coords, 100);

		//console.log("addtext", "system_hover", systemname, 0, 4, 0, 3, threeObj);
		/* how do we get threeObj? they dont have names. would like to show the mouseover text after search recenter
				HUD.addText(-1, foundSystem.name,
					0, 4, 0, 3//, foundSystem.coords, true
				); 
		//*/

		$('#search input:focus-visible').css("outline-color", "darkgreen")
	} else {
		$('#search input:focus-visible').css("outline-color", "red")
	}
}

const getCodexMeta = (getHierarchy = true) => {
	//grabbing categories from /ref api
	capi({
		url: "/ref?hierarchy=" + (getHierarchy ? 1 : 0),
		method: 'get'
	})
		.then(buildDropdownFilter, (reason) => {
			console.log("Error getting hierarchical data: ", reason)
		});
}

var canonnEd3d_codex = {
	//Define Categories
	systemsData: {
		categories: {
			/*
			'Unknown Biology Signals': {
				'Signals': {
					name: 'Biology Surface Scan',
					color: colours[0][0].replace('#', ''),
				}
			}//*/
		},
		systems: [
			{
				"name": "Sol",
				"coords": { "x": 0, "y": 0, "z": 0 },
				"infos": "Center of the Universe",
				"cat": []
			}
		]
	},

	formatSites: async function (resolve) {
		//get current url params and pass into API
		let queryParams = {}
		for (let p in urlParams) {
			let v = getURLParameter(p)
			if (p == "english_name") p = "species"
			if (v) queryParams[p] = v
		}
		console.log("queryParamas", queryParams)
		cmdr = getURLParameter("cmdr")
		let query = "cmdr/" + cmdr;
		try {
			if (Object.keys(queryParams).length) query += '?' + $.param(queryParams);
			//console.log("query", query)
		} catch (e) {
			console.log("Error creating queryParams for API: ", e)
		}
		let sites = await getSites(query);
		//let siteTypes = Object.keys(hierarchy_data);
		//console.log("sites", sites)

		let categories = {}
		let subcategories = {}
		for (let system in sites) {
			let poiSite = {
				name: system,
				coords: {
					x: parseFloat(sites[system].coords[0]),
					y: parseFloat(sites[system].coords[1]),
					z: parseFloat(sites[system].coords[2])
				},
				infos: edsmLink(system),
				cat: [],
			}
			let codexFound = false;
			for (let i in sites[system].codex) {
				let codex = sites[system].codex[i]
				//console.log("codex:", codex)

				let category = codex.sub_class
				let subcategory = codex.english_name

				if (queryParams.platform && codex.platform != queryParams.platform) continue
				codexFound = true;
				if (!categories[category]) {
					categories[category] = {}
				}
				if (!subcategories[subcategory]) {
					subcategories[subcategory] = {}
					colourkey = Object.keys(subcategories).length % colours.length
					categories[category][subcategory] = { name: subcategory, color: colours[colourkey][0].replace('#', '') }
				}
				poiSite.cat.push([subcategory]);
				poiSite.infos += signalLink(system, codex.english_name);
			}
			// We can then push the site to the object that stores all systems
			if (codexFound)
				canonnEd3d_codex.systemsData.systems.push(poiSite);
		}

		Object.assign(canonnEd3d_codex.systemsData.categories, categories)
		canonnEd3d_codex.systemsData.categories = sortObj(canonnEd3d_codex.systemsData.categories)
		resolve();
	},

	init: function () {

		var p1 = new Promise(function (resolve, reject) {
			return canonnEd3d_codex.formatSites(resolve);
		});

		Promise.all([p1]).then(function () {
			//console.log("sysdata", canonnEd3d_codex.systemsData)
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_codex.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00'
			});
			getCodexMeta();//adding codex based dropdowns after filter list was built or it will be overwritten
			setTimeout(() => {
				$('#search').css('display', 'block');
				$('#search input').val('System').on('input', recenterSearch);
			}, 1000);
			document.getElementById("loading").style.display = "none";
		});
	},
};
