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
];

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.href);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, '    '));
};


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
		//Here you format POI & Gnosis JSON to ED3D acceptable object

		categories = {}
		categories["Reference Systems"] = {
			"Merope": { name: "Merope", color: colours[0][0].replace('#', '') },
			"Sol": { name: "Sol", color: colours[1][0].replace('#', '') },
			"Witch Head Sector IR-W c1-9": { name: "Witch Head Sector IR-W c1-9", color: colours[2][0].replace('#', '') },
		}
		subcategories = {}


		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			var poiSite = {};

			category = "Hyperdiction Year"
			subcategory = data[i].year

			if (!categories[category]) {
				categories[category] = {}
			}

			if (!subcategories[subcategory]) {
				subcategories[subcategory] = {}
				colourkey = Object.keys(subcategories).length
				categories[category][subcategory] = { name: subcategory, color: colours[colourkey + 2][0].replace('#', '') }
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

		merope = { name: "Merope", cat: ["Merope"], coords: { x: -78.59375, y: -149.625, z: -340.53125 } }
		witchhead = { name: "Witch Head Sector IR-W c1-9", cat: ["Witch Head Sector IR-W c1-9"], coords: { x: 355.3125, y: -425.96875, z: -723.03125 } }
		sol = { name: "Sol", cat: ["Sol"], coords: { x: 0, y: 0, z: 0 } }
		canonnEd3d_route.systemsData.systems.push(merope);
		canonnEd3d_route.systemsData.systems.push(sol);
		canonnEd3d_route.systemsData.systems.push(witchhead);

		document.getElementById("loading").style.display = "none";
		canonnEd3d_route.systemsData.categories = categories
	},



	parseData: function (url, callBack, resolvePromise) {
		let fetchDataFromApi = async (url, resolvePromise) => {
			let response = await fetch(url);
			let result = await response.json();
			canonnEd3d_route.formatCol(result)
			resolvePromise();
			return result;
		}
		fetchDataFromApi(url, resolvePromise)

		//console.log(data)

	},

	init: function () {
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_route.parseData('https://us-central1-canonn-api-236217.cloudfunctions.net/get_hd_data', canonnEd3d_route.formatCol, resolve);

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
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00',
			});
		});
	},
};
