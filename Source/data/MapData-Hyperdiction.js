
colours = [
	["#F65314", "Red"],
	["#7CBB00", "Green"],
	["#00A1F1", "Blue"],
	["#FFBB00", "Yellow"]/*,
	["#00FFFF", "Cyan"],
	["#8D38C9", "Violet"],
	["#FAEBD7", "AntiqueWhite"],
	["#46C7C7", "Jellyfish"],
	["#F0FFFF", "Azure"],
	["#7F5A58", "Puce"],
	["#81D8D0", "Tiffany"],
	["#387C44", "Pine"],
	["#4863A0", "Steel"],
	["#333333", "Grey"] */
];


async function getSites() {
	const url = 'https://storage.googleapis.com/canonn-downloads/dumpr/hyperdictions.json';
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Error fetching cloud data: ${response.status}`);
		}
		const data = await response.json();

		return data;
	} catch (error) {
		console.error('Error fetching cloud data:', error);
		return null; // Or handle the error differently if needed
	}
}

function fetchUrl(yUrl, callback) {
	return fetch(yUrl)
		.then(response => response.json())
		.then(function (response) {
			//alert(JSON.stringify(response.query));
			//console.log(response)
			callback(response);
			return { response };
		})
		.catch(function (error) {
			console.log(error);
		});
}

var canonnEd3d_route = {
	//Define Categories
	systemsData: {
		categories: {},
		systems: [],
	},

	formatCol: function (data) {



		merope = { name: "Merope", cat: ["Merope"], coords: { x: -78.59375, y: -149.625, z: -340.53125 } }
		witchhead = { name: "Witch Head Sector IR-W c1-9", cat: ["Witchhead"], coords: { x: 355.3125, y: -425.96875, z: -723.03125 } }
		sol = { name: "Sol", cat: ["Sol"], coords: { x: 0, y: 0, z: 0 } }
		coalsack = { name: "Musca Dark Region PJ-P b6-1", cat: ["Coalsack"], coords: { x: 432.625, y: 2.53125, z: 288.6875 } }

		categories = {}
		categories["Reference Systems"] = {
			"Merope": { name: "Merope", color: colours[0][0].replace('#', '') },
			"Sol": { name: "Sol", color: colours[1][0].replace('#', '') },
			"Witchhead": { name: "Witch Head Sector IR-W c1-9", color: colours[2][0].replace('#', '') },
			"Coalsack": { name: "Musca Dark Region PJ-P b6-1", color: colours[3][0].replace('#', '') },
		}
		subcategories = {}


		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			var poiSite = {};

			poiSite['coords'] = {
				x: parseFloat(data[i].x),
				y: parseFloat(data[i].y),
				z: parseFloat(data[i].z),
			};

			dmerope = Math.sqrt(Math.pow(poiSite.coords.x - merope.coords.x, 2) + Math.pow(poiSite.coords.y - merope.coords.y, 2) + Math.pow(poiSite.coords.z - merope.coords.z, 2))
			dsol = Math.sqrt(Math.pow(poiSite.coords.x - sol.coords.x, 2) + Math.pow(poiSite.coords.y - sol.coords.y, 2) + Math.pow(poiSite.coords.z - sol.coords.z, 2))
			dwitchhead = Math.sqrt(Math.pow(poiSite.coords.x - witchhead.coords.x, 2) + Math.pow(poiSite.coords.y - witchhead.coords.y, 2) + Math.pow(poiSite.coords.z - witchhead.coords.z, 2))
			dcoalsack = Math.sqrt(Math.pow(poiSite.coords.x - coalsack.coords.x, 2) + Math.pow(poiSite.coords.y - coalsack.coords.y, 2) + Math.pow(poiSite.coords.z - coalsack.coords.z, 2))

			//years as categories
			category = data[i].year
			if (!categories[category]) {
				categories[category] = {}
			}

			//subcategories by distance to point of reference
			if (dmerope < dsol & dmerope < dwitchhead) {
				subcategory = 'Merope ' + data[i].year
				subname = "Merope"
			}
			if (dsol < dmerope & dsol < dwitchhead) {
				subcategory = 'Sol ' + data[i].year
				subname = "Sol"
			}

			if (dwitchhead < dmerope & dwitchhead < dsol) {
				subcategory = 'Witchhead ' + data[i].year
				subname = "Witchhead"
			}

			if (dcoalsack < dmerope & dcoalsack < dsol) {
				subcategory = 'Coalsack ' + data[i].year
				subname = "Coalsack"
			}

			// Check if subcategory is defined
			if (typeof subcategory === 'undefined') {
				// Skip to the next iteration
				console.log("cant work out sub category")
				console.log(poiSite)
				break;
			}

			if (!subcategories.hasOwnProperty(subcategory)) {
				subcategories[subcategory] = {}

				//taken from https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors and modified
				//use: c as input color in rgb-hex #rrggbb, a as percentage between 0 and 1. it will simply multiply the rgb values with 0-1 relatively, thus lightens or darkens the color
				var adjc = (c, a) => c.replace(/\w\w/g, m => Math.min(255, parseInt(Math.max(0, parseInt(m, 16) * parseFloat(a)))).toString(16).padStart(2, "0"))

				//adjusting reference system category color, starting bright, getting darker. (assumes years appear in decreasing order)
				//categories length grows per iteration starting at 2, so 1/length decreases the amount of dampening by diverging to 1
				let amount = 1 / Object.keys(categories).length
				next_colour = adjc(categories["Reference Systems"][subname].color, amount)
				//console.log(categories["Reference Systems"][subname].color, amount, next_colour)
				categories[category][subcategory] = { name: subname, color: next_colour }
			}

			poiSite['name'] = data[i].system;

			//Check Site Type and match categories

			poiSite['cat'] = [subcategory];

			poiSite['coords'] = {
				x: parseFloat(data[i].x),
				y: parseFloat(data[i].y),
				z: parseFloat(data[i].z),
			};

			// We can then push the site to the object that stores all systems
			canonnEd3d_route.systemsData.systems.push(poiSite);

		}

		canonnEd3d_route.systemsData.systems.push(merope);
		canonnEd3d_route.systemsData.systems.push(sol);
		canonnEd3d_route.systemsData.systems.push(witchhead);
		canonnEd3d_route.systemsData.systems.push(coalsack);

		canonnEd3d_route.systemsData.categories = categories
	},

	fetchHyperdictionData: async function (resolvePromise) {
		canonnEd3d_route.hyperdictionData = await getSites();
		canonnEd3d_route.formatCol(canonnEd3d_route.hyperdictionData)
		resolvePromise();
		document.getElementById("loading").style.display = "none";
	},

	init: function () {
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_route.fetchHyperdictionData(resolve);
		});

		Promise.all([p1]).then(function () {
			console.log(canonnEd3d_route.systemsData)
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_route.systemsData,
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
