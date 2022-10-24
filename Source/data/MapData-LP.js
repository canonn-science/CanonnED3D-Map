const API_ENDPOINT = `https://api.canonn.tech`;
const API_LIMIT = 1000;

const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

let sites = {
	gbsites: [],
};

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
	while (keepGoing) {
		let response = await reqSites(API_START, type);
		await records.push.apply(records, response.data);
		API_START += API_LIMIT;
		if (response.data.length < API_LIMIT) {
			keepGoing = false;
			return records;
		}
	}
};

const reqSites = async (API_START, type) => {

	let payload = await capi({
		url: `/${type}?_limit=${API_LIMIT}&_start=${API_START}`,
		method: 'get'
	});

	return payload;
};

var canonnEd3d_challenge = {
	//Define Categories
	systemsData: {
		categories: {
			'Listening Post': {
				'10': {
					name: 'Hint',
					color: 'f5a142',
				},
				'20': {
					name: 'Discovery',
					color: '42f557',
				},
			},
		},
		systems: [
			/*{
				'name': "HIP 16538",
				'infos': '<a href="https://www.elitedangerous.com/news/galnet/aegis-megaship-vanishes-hyperspace" target="_blank" rel="noopener">Galnet: Aegis Megaship Vanishes In Hyperspace</a>',
				'url': "https://www.elitedangerous.com/news/galnet/aegis-megaship-vanishes-hyperspace",
				'coords': { x: -24.625, y: -84.0625, z: -139.34375 },
				'cat': ["204"]
			},*/
		],
		"routes": [
			/*{
				cat: ["101"], 'points': [

					{ 's': 'HIP 33386', 'label': 'HIP 33386' },
					{ 's': 'HIP 39748', 'label': 'HIP 39748' },
					{ 's': 'Chukchan', 'label': 'Chukchan' },

				], 'circle': false
			},*/
		]
	},

	formatLPs: function (data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			var row = data[i]
			canonnEd3d_challenge.addPOI(row, "System", "link0", 10)
			canonnEd3d_challenge.addPOI(row, "Points to system", "target", 20)

			//the hint route is linking all hints
			var hintroute = {
				cat: ["10"], 'points': [
					{ 's': row["System"], 'label': row["System"] },
				], 'circle': false
			}

			//each hint system has its own link to the target
			var targetroute = {
				cat: ["20"], 'points': [
					{ 's': row["System"], 'label': row["System"] },
					{ 's': row["Points to system"], 'label': row["Points to system"] }
				], 'circle': false
			}
			canonnEd3d_challenge.systemsData.routes.push(targetroute);

			if (row["Linked system 1"]) {
				canonnEd3d_challenge.addPOI(row, "Linked system 1", "link1", 10)
				//the hint route is linking all hints
				hintroute.points.push({ 's': row["Linked system 1"], 'label': row["Linked system 1"] })
				//each hint system has its own link to the target
				targetroute = {
					cat: ["20"], 'points': [
						{ 's': row["Linked system 1"], 'label': row["Linked system 1"] },
						{ 's': row["Points to system"], 'label': row["Points to system"] }
					], 'circle': false
				}
				canonnEd3d_challenge.systemsData.routes.push(targetroute);
			}

			if (row["Linked system 2"]) {
				canonnEd3d_challenge.addPOI(row, "Linked system 2", "link2", 10)
				//the hint route is linking all hints
				hintroute.points.push({ 's': row["Linked system 2"], 'label': row["Linked system 2"] })
				//each hint system has its own link to the target
				targetroute = {
					cat: ["20"], 'points': [
						{ 's': row["Linked system 2"], 'label': row["Linked system 2"] },
						{ 's': row["Points to system"], 'label': row["Points to system"] }
					], 'circle': false
				}
				canonnEd3d_challenge.systemsData.routes.push(targetroute);
			}
			
			//the hint route is linking all hints
			canonnEd3d_challenge.systemsData.routes.push(hintroute);
		}
	},
	systemMasterList: {},
	addPOI: (row, SystemCol, CoordCol, category) => {
		if (row[SystemCol] && row[SystemCol].replace(' ', '').length > 1) {
			var poiSite = {};
			poiSite['name'] = row[SystemCol];
			if (canonnEd3d_challenge.systemMasterList[row[SystemCol]]) poiSite['infos'] = "<br/><br/>"
			else {
				poiSite['infos'] = '<a href="https://www.edsm.net/en/system?systemName=' + row[SystemCol] + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + row[SystemCol] + '" target="_blank" rel="noopener">Signals</a><br/><br/>';
				canonnEd3d_challenge.systemMasterList[row[SystemCol]] = true
			}

			if (row["Canonn"]) poiSite["infos"] += '<a href="'+row["Canonn"]+'" target="_blank" rel="noopener">'
			if (row["Related discovery"]) poiSite["infos"] += row["Related discovery"]
			if (row["Canonn"]) poiSite["infos"] += '</a>'
			if (row["Notes"]) poiSite["infos"] += '<br/>'+row["Notes"]
			if (row["Other"]) poiSite["infos"] += '<br/><br/><a href="'+row["Other"]+'" target="_blank" rel="noopener">'+row["Other"]+'</a>'
			
			//Check Site Type and match categories
			poiSite['cat'] = [category];
			poiSite['url'] = "https://canonn-science.github.io/canonn-signals/?system=" + poiSite['name']
			poiSite['coords'] = {
				x: parseFloat(row[CoordCol+"_X"]),
				y: parseFloat(row[CoordCol+"_Y"]),
				z: parseFloat(row[CoordCol+"_Z"]),
			};

			// We can then push the site to the object that stores all systems
			canonnEd3d_challenge.systemsData.systems.push(poiSite);
		}
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
			canonnEd3d_challenge.parseCSVData('data/csvCache/Listening_Posts.csv', canonnEd3d_challenge.formatLPs, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_challenge.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: false,
				playerPos: [92, -69, -386],
				cameraPos: [100, 2000, -699],
				systemColor: '#FF9D00',
			});
		});
	},
};
