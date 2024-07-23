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
	apsites: [],
	bmsites: [],
	btsites1: [],
	btsites2: [],
	btsites3: [],
	btsites4: [],
	btsites5: [],
	btsites6: [],
	btsites7: [],
	btsites8: [],
	cssites: [],
	fgsites1: [],
	fgsites2: [],
	fgsites3: [],
	fgsites4: [],
	fgsites5: [],
	fgsites6: [],
	fgsites7: [],
	fgsites8: [],
	fmsites1: [],
	fmsites2: [],
	fmsites3: [],
	fmsites4: [],
	fmsites5: [],
	fmsites6: [],
	fmsites7: [],
	fmsites8: [],
	fmsites9: [],
	fmsites10: [],
	fmsites11: [],

	gbsites: [],

	gssites1: [],
	gssites2: [],
	gssites3: [],
	gssites4: [],
	gssites5: [],

	gvsites1: [],
	gvsites2: [],
	gvsites3: [],
	gvsites4: [],

	gysites1: [],
	gysites2: [],
	gysites3: [],
	gysites4: [],
	gysites5: [],
	gysites6: [],

	lssites1: [],
	lssites2: [],

	tbsites1: [],
	tbsites2: [],

	tssites1: [],
	tssites2: [],
	tssites3: [],

	twsites1: [],
	twsites2: [],
	twsites3: [],
	twsites4: [],
	twsites5: [],
	twsites6: [],
	twsites7: [],
	twsites8: [],

};



// Mapping site types to their corresponding URLs
const urls = {
	apsites: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2101400.csv',
	bmsites: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100101.csv',
	btsites1: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100201.csv',
	btsites2: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100202.csv',
	btsites3: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100203.csv',
	btsites4: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100204.csv',
	btsites5: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100205.csv',
	btsites6: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100206.csv',
	btsites7: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100207.csv',
	btsites8: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100208.csv',
	cssites: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2101500.csv',
	fgsites1: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100401.csv',
	fgsites2: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100402.csv',
	fgsites3: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100403.csv',
	fgsites4: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100404.csv',
	fgsites5: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100405.csv',
	fgsites6: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100406.csv',
	fgsites7: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100407.csv',
	fgsites8: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100408.csv',
	fmsites1: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400102.csv',
	fmsites2: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400108.csv',
	fmsites3: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400114.csv',
	fmsites4: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400152.csv',
	fmsites5: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400158.csv',
	fmsites6: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400159.csv',
	fmsites7: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400160.csv',
	fmsites8: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400161.csv',
	fmsites9: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400162.csv',
	fmsites10: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400164.csv',
	fmsites11: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400109.csv',
	gbsites: 'https://storage.googleapis.com/canonn-downloads/dumpr/Guardian/3200800.csv',

	gssites1: 'https://storage.googleapis.com/canonn-downloads/dumpr/Guardian/3200200.csv',
	gssites2: 'https://storage.googleapis.com/canonn-downloads/dumpr/Guardian/3200300.csv',
	gssites3: 'https://storage.googleapis.com/canonn-downloads/dumpr/Guardian/3200400.csv',
	gssites4: 'https://storage.googleapis.com/canonn-downloads/dumpr/Guardian/3200500.csv',
	gssites5: 'https://storage.googleapis.com/canonn-downloads/dumpr/Guardian/3200600.csv',

	gvsites1: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400402.csv',
	gvsites2: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400408.csv',
	gvsites3: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400409.csv',
	gvsites4: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400414.csv',

	gysites1: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400208.csv',
	gysites2: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400258.csv',
	gysites3: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400259.csv',
	gysites4: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400260.csv',
	gysites5: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400261.csv',
	gysites6: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400262.csv',

	lssites1: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400306.csv',
	lssites2: 'https://storage.googleapis.com/canonn-downloads/dumpr/Geology/1400307.csv',

	tbsites1: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100101.csv',
	tbsites2: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/2100102.csv',

	tssites1: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/3101000.csv',
	tssites2: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/3101100.csv',
	tssites3: 'https://storage.googleapis.com/canonn-downloads/dumpr/Thargoid/3101200.csv',
	twsites1: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100501.csv',
	twsites2: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100503.csv',
	twsites3: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100502.csv',
	twsites4: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100505.csv',
	twsites5: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100508.csv',
	twsites6: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100507.csv',
	twsites7: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100506.csv',
	twsites8: 'https://storage.googleapis.com/canonn-downloads/dumpr/Biology/2100504.csv',
	// Add more mappings here as needed
};


// Function to fetch and parse CSV data
async function fetchCSV(url) {
	const response = await fetch(url);
	const data = await response.text();
	return parseCSV(data);
}


// Function to parse CSV data with manual headers
function parseCSV(data) {
	const lines = data.split('\n');
	const headers = ['systemname', 'edsmCoordX', 'edsmCoordY', 'edsmCoordZ']; // Manually defined headers
	const result = [];

	for (let i = 0; i < lines.length; i++) {
		if (lines[i].trim() === '') continue; // Skip empty lines

		const obj = {};
		const currentLine = lines[i].split(',');

		for (let j = 0; j < headers.length; j++) {
			obj[headers[j].trim()] = currentLine[j].trim();
		}

		result.push(obj);
	}

	return result;
}

// Fetch data for each site type
async function fetchData() {
	const data = {};
	for (const siteType in urls) {
		const csvData = await fetchCSV(urls[siteType]);
		data[siteType] = transformData(csvData);
	}
	return data;
}

// Transform parsed CSV data to the required format
function transformData(csvData) {
	return csvData.map(entry => ({
		systemName: entry.systemname,
		coords: {
			x: parseFloat(entry.edsmCoordX),
			y: parseFloat(entry.edsmCoordY),
			z: parseFloat(entry.edsmCoordZ)
		}
	}));
}






var canonnEd3d_all = {

	//Define Categories and Static Data
	systemsData: {
		categories: {
			"Sites": {
				"201": {
					name: "(AP) Amphora Plants",
					color: randomColor().replace('#', '').toString()
				},
				"202": {
					name: "(BM) Bark Mounds",
					color: randomColor().replace('#', '').toString()
				},
				"203": {
					name: "(BT) Brain Trees",
					color: randomColor().replace('#', '').toString()
				},
				"204": {
					name: "(CS) Crystalline Shards",
					color: randomColor().replace('#', '').toString()
				},
				"205": {
					name: "(FG) Fungal Gourds",
					color: randomColor().replace('#', '').toString()
				},
				"206": {
					name: "(FM) Fumaroles",
					color: randomColor().replace('#', '').toString()
				},
				"207": {
					name: "(GEN) Generation Ships",
					color: randomColor().replace('#', '').toString()
				},
				"208": {
					name: "(GB) Guardian Beacons",
					color: randomColor().replace('#', '').toString()
				},
				"209": {
					name: "(G) Guardian Sites",
					color: randomColor().replace('#', '').toString()
				},
				"211": {
					name: "(GV) Gas Vents",
					color: randomColor().replace('#', '').toString()
				},
				"212": {
					name: "(GY) Geysers",
					color: randomColor().replace('#', '').toString()
				},
				"213": {
					name: "(LS) Lava Spouts",
					color: randomColor().replace('#', '').toString()
				},
				"214": {
					name: "(TB) Thargoid Barnacles",
					color: randomColor().replace('#', '').toString()
				},
				"215": {
					name: "(TS) Thargoid Structure",
					color: randomColor().replace('#', '').toString()
				},
				"216": {
					name: "(TW) Tube Worms",
					color: randomColor().replace('#', '').toString()
				}
			},
			'Unknown Type': {
				'2000': {
					name: 'Unknown Site',
					color: '800000',
				},
			},
		},
		systems: []
	},

	formatSites: async function (data, resolvePromise) {
		sites = await fetchData();

		let siteTypes = Object.keys(data);

		for (var i = 0; i < siteTypes.length; i++) {
			for (var d = 0; d < sites[siteTypes[i]].length; d++) {
				let siteData = sites[siteTypes[i]];

				if (siteData[d].systemName && siteData[d].systemName.replace(' ', '').length > 1) {
					var poiSite = {};
					poiSite['name'] = siteData[d].systemName;

					//Check Site Type and match categories
					if (siteTypes[i].startsWith('apsites')) {
						poiSite['cat'] = [201];
					} else if (siteTypes[i].startsWith('bmsites')) {
						poiSite['cat'] = [202];
					} else if (siteTypes[i].startsWith('btsites')) {
						poiSite['cat'] = [203];
					} else if (siteTypes[i].startsWith('cssites')) {
						poiSite['cat'] = [204];
					} else if (siteTypes[i].startsWith('fgsites')) {
						poiSite['cat'] = [205];
					} else if (siteTypes[i].startsWith('fmsites')) {
						poiSite['cat'] = [206];
					} else if (siteTypes[i].startsWith('gensites')) {
						poiSite['cat'] = [207];
					} else if (siteTypes[i].startsWith('gbsites')) {
						poiSite['cat'] = [208];
					} else if (siteTypes[i].startsWith('gssites')) {
						poiSite['cat'] = [209];
					} else if (siteTypes[i].startsWith('gvsites')) {
						poiSite['cat'] = [211];
					} else if (siteTypes[i].startsWith('gysites')) {
						poiSite['cat'] = [212];
					} else if (siteTypes[i].startsWith('lssites')) {
						poiSite['cat'] = [213];
					} else if (siteTypes[i].startsWith('tbsites')) {
						poiSite['cat'] = [214];
					} else if (siteTypes[i].startsWith('tssites')) {
						poiSite['cat'] = [215];
					} else if (siteTypes[i].startsWith('twsites')) {
						poiSite['cat'] = [216];
					} else {
						poiSite['cat'] = [2000];
					}
					poiSite['coords'] = {
						x: parseFloat(siteData[d].coords.x),
						y: parseFloat(siteData[d].coords.y),
						z: parseFloat(siteData[d].coords.z),
					};


					// We can then push the site to the object that stores all systems
					canonnEd3d_all.systemsData.systems.push(poiSite);
				}
			}
		}
		document.getElementById("loading").style.display = "none";
		resolvePromise();
	},

	init: function () {

		//Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_all.formatSites(sites, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_all.systemsData,
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