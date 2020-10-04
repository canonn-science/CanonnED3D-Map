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
					color: 'ff0000',
				},
				'01': {
					name: 'Biology',
					color: 'ffb533',
				},
				'02': {
					name: 'Cloud',
					color: 'DAF7A6',
				},
				'03': {
					name: 'Anomaly',
					color: 'FFC300',
				},
				'04': {
					name: 'Thargoid',
					color: 'FF5733',
				},
				'05': {
					name: 'Guardian',
					color: '115eec',
				},
			},
		},
		systems: [],
		"routes": [],
	},

	formatCol: function (data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object


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

			poiSite['cat'] = ["06"];
			if (data[i].english_name == 'Unknown Biology Scan') {
				poiSite['infos'] = '<a href="https://tools.canonn.tech/signals?system=' + data[i].system + '" target="_blank">Unknown Biology Signal</a>'
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
			sSystem = getUrlParameter("startSystem");
			eSystem = getUrlParameter("endSystem");
			jRange = getUrlParameter("jumpRange");
			canonnEd3d_route.parseData('https://us-central1-canonn-api-236217.cloudfunctions.net/full_codex_route?startSystem=' + sSystem + '&endSystem=' + eSystem + '&jumpRange=' + jRange, canonnEd3d_route.formatCol, resolve);
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
