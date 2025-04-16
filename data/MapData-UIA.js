const API_ENDPOINT = `https://us-central1-canonn-api-236217.cloudfunctions.net/query`;
const EDSM_ENDPOINT = `https://www.edsm.net/api-v1`;
const API_LIMIT = 1000;

const numberOfUIAs = 9;
const predictionFactor = 2;


const capi = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});
const edsmapi = axios.create({
    baseURL: EDSM_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

let sites = {
	//"thargoid/hyperdiction/reports": [],
};
for (var i=1; i<=numberOfUIAs; i++) {
	sites["uia/waypoints/"+i] = []
}

const go = async types => {
	const keys = Object.keys(types);
	return (await Promise.all(
		keys.map(type => getSites(type, types[type]))
	)).reduce((acc, res, i) => {
		acc[keys[i]] = res;
		return acc;
	}, {});
};

const getSites = async (type, systems) => {
	let records = [];
	//for (var i = 0; i < systems.length; i++) {
		let keepGoing = true;
		let API_START = 0;
		while (keepGoing) {
			let response = await reqSites(API_START, type/*, systems[i]*/);
			await records.push.apply(records, response.data);
			API_START += API_LIMIT;
			//if (response.data.length < API_LIMIT) {
				keepGoing = false;
			//}
		}
	//}
	return records;
};

const reqSites = async (API_START, type, system) => {
	//start = system.replace(/\s/g, "+")
	let payload = await capi({
		url: `/${type}?_limit=${API_LIMIT}&_start=${API_START}`,
		method: 'get'
	});

	return payload;
};
const getSystemsEDSM = async (systemNames) => {
    if (Array.isArray(systemNames)) {
        systemNames = "systemName[]=" + systemNames.join("&systemName[]=");
    } else {
        systemNames = "systemName=" + systemNames;
    }
    //console.log("EDSM Query: ", systemNames);
    let payload = await edsmapi({
        url: `/systems?showCoordinates=1&${systemNames}`,
        method: 'get'
    });

    return payload;
};

const gsheetToZuluTimestamp = (gsheetFormat) => {
	var dateform = gsheetFormat; //expecting dd/mm/yyyy hh:mm:ss for gsheet reasons
	var ado = {
		day: dateform.split(" ")[0].split("/")[0],
		month: dateform.split(" ")[0].split("/")[1],
		year: dateform.split(" ")[0].split("/")[2],
		hour: dateform.split(" ")[1].split(":")[0],
		minute: dateform.split(" ")[1].split(":")[1],
		second: dateform.split(" ")[1].split(":")[2],
	}
	zulutimestamp = [ado.year,ado.month,ado.day].join("-")+"T"+[ado.hour,ado.minute,ado.second].join(":")+"Z"
	return zulutimestamp
}

var canonnEd3d_challenge = {
	//Define Categories
	systemsData: {
		categories: {
			"Points of Interest": {
				"1000": {
					'name': "Populated Systems",
					'color': 'FF9D00'
				},
				"1002": {
					'name': "Thargoid Systems",
					'color': '66FF66'
				},
				"1007": {
					'name': "Permit Locked Centers",
					'color': 'FF3333'
				},
				"1008": {
					'name': "Permit Unlocked Centers",
					'color': '393939'
				}
			},
			'Unidentified Interstellar Anomaly': {
				'100': {
					'name': 'Estimated Direction',
					'color': '004F4F',
				},
				'103': {
					'name': 'Lost Section',
					'color': '4F0000',
				},
				'101': {
					'name': 'Recorded Route',
					'color': '66FF66',
				},
				'102': {
					'name': 'Estimated Route',
					'color': '334400',
				},
			},/*
			"Measurements": {
				'1003': {
					'name': 'Measurement Lines',
					'color': '666666',
				},
				"1005": {
					'name':"Measurement Endpoint",
					'color': '999999'
				},
			},*/
			"Hyperdictions": {
				"299": {
					name: "All Hyperdictions",
					color: "999900"
				},
				"300": {
					'name': "Hostile",
					'color': '660000'
				},
				//"301": {
				//	'name': "Waypoint Area Only",
				//	'color': 'FFFF66'
				//},
			},
		},
		systems: [
			{
				'name': "Col 70 Sector FY-N c21-3",
				'infos': "",
				'url': "",
				'coords': { x:  687.06250, y: -362.53125, z: -697.06250 },
				'cat': ["1002"]
			},
			{
				'name': "Robigo",
				'infos': "",
				'url': "",
				'coords': { x:  -303.40625, y: 7.3125, z: -314.15625 },
				'cat': ["1000"]
			},
			{
				'name': "Sol",
				'infos': "Federation Home System (and origin of humans but psshh don't tell the aliens).",
				'url': "",
				'coords': { x: 0, y: 0, z: 0 },
				'cat': ["1000"]
			},
			{
				'name': "Achenar",
				'infos': "Imperial Home System",
				'url': "",
				'coords': { x: 67.5, y: -119.46875, z: 24.84375 },
				'cat': ["1000"]
			},
			{
				'name': "Alioth",
				'infos': "Alliance Home System",
				'url': "",
				'coords': { x: -33.65625, y: 72.46875, z: -20.65625 },
				'cat': ["1000"]
			},
			{
				'name': "PMD2009 48",
				'infos': 'Tourist Asteroid base',
				'url': "",
				'coords': { x: 594.90625, y:  -431.4375 , z: -1071.78125 }, 
				'cat': ["1000"]
			},
			{
				'name': "HIP 22460",
				'infos': '<a href="https://canonn.science/codex/fort-asch/" target="_blank" rel="noopener">Project Seraph - Fort Asch</a>, the <a href="https://canonn.science/codex/overlook/" target="_blank" rel="noopener">Overlook</a> and two <a href="https://canonn.science/codex/the-unknown-structure/">Thargoid Imprint Sites</a>',
				'url': "https://canonn.science/codex/fort-asch/",
				'coords': { x: -41.3125, y: -58.96875, z: -354.78125 },
				'cat': ["1002"]
			},
			{
				'name': "HIP 23759",
				'infos': 'Witch Head Science Centre / HIP 23759 Geysers / Witch Head Nebula / Barnacle Sites - Witch Head Nebula',
				'url': "",
				'coords': { x: 359.84375, y: -385.53125, z: -718.375 },
				'cat': ["1000"]
			},
			{
				'name': "42 n Persei",
				'infos': '',
				'url': "",
				'coords': { x: -83.5625, y: -73.40625, z: -244.34375 },
				'cat': ["1000"]
			},
			{
				'name': "Chun Pindit",
				'infos': '',
				'url': "",
				'coords': { x: -11.5625, y: -15.40625, z: -181.09375 },
				'cat': ["1000"]
			},
			{
				'name': "Tekkeitjal",
				'infos': '',
				'url': "",
				'coords': { x: 76.5625, y: 9.34375, z: -183.4375 },
				'cat': ["1000"]
			},
			{
				'name': "Varati",
				'infos': 'Canonn Faction Home System',
				'url': "",
				'coords': { x: -178.65625, y: 77.125, z: -87.125 },
				'cat': ["1000"]
			},
			//permit locked systems of special interest
			{
				'name': "Witch's Reach",
				'infos': '',
				'url': "",
				'coords': { x: 28, y: -16.09375, z: 7.90625 },
				'cat': ["1007"]
			},
			{
				'name': "Alpha Hydri",
				'infos': '',
				'url': "",
				'coords': { x: 40, y: -58.03125, z: 13.75 },
				'cat': ["1007"]
			},
			{
				'name': "Bellica",
				'infos': '',
				'url': "",
				'coords': { x: -19.53125, y: -6.1875, z: -89.75 },
				'cat': ["1007"]
			},
			{
				'name': "Hyades Sector YO-Q b5-1",
				'infos': '',
				'url': "",
				'coords': { x: 100.90625, y: -81.21875, z: -162.9375 },
				'cat': ["1007"]
			},
			//UIA3 manual input until sheet api
			//Oochost BI-U c19-0	-317.40625 / -176.90625 / -1475.40625
			//Oochost CW-M b40-0	-406.84375 / -175.8125 / -1478.875
			//24/09/22 07:59:24
			/*
			{
				'name': "Oochost BI-U c19-0",
				'coords': { x: -317.40625, y: -176.90625, z: -1475.40625 },
				'cat': ["1005"]
			},
			{
				'name': "Oochost CW-M b40-0",
				'coords': { x: -406.84375, y: -175.8125, z: -1478.875 },
				'cat': ["1005"]
			},
			{
				'name': "Oochost LC-L b41-0",
				'coords': { x: -306.40625, y: -183.8125, z: -1448.90625 },
				'cat': ["1005"]
			},
			{
				'name': "Oochost IM-M a89-0",
				'coords': { x: -460.71875, y: -39.09375, z: -1394.6875 },
				'cat': ["1005"]
			},
			*//*
			{
				'name': "Oochost SB-M c24-0",
				'coords': { x:  -219.8125, y: -61.75, z: -1299.3125 },
				'cat': ["1005"]
			},
			{
				'name': "Oochost SB-M c24-2",
				'coords': { x: -220.5625, y: -59.34375, z: -1304 },
				'cat': ["1005"]
			},
			{
				'name': "Oochost OJ-W b49-0",
				'coords': { x: -222.34375, y: -64.21875, z: -1281.0625 },
				'cat': ["1005"]
			},
			{
				'name': "Oochost QE-W b49-0",
				'coords': { x: -210.5, y: -68.15625, z: -1265.46875 },
				'cat': ["1005"]
			},
			{
				'name': "Oochost DP-N a61-1",
				'coords': { x: -333.4375, y: -31.0625, z: -1694.5 },
				'cat': ["1005"]
			},
			{
				'name': "Outopps HC-V b16-0",
				'coords': { x: -403.21875, y: 56.78125, z: -1980.5625 },
				'cat': ["1005"]
			},
			{
				'name': "Synuefai UH-R b10-0",
				'coords': { x: -103, y: -177, z: -842.71875 },
				'cat': ["1005"]
			},
			{
				'name': "Oochoss DY-E b1-0",
				'coords': { x: -1751.125, y: -593.09375, z: -2311.59375 },
				'cat': ["1005"]
			},
			{
				'name': "Outopps CF-G c24-1",
				'coords': { x: -190.15625, y: -10.53125, z: -1281.15625 },
				'cat': ["1005"]
			},
			{
				'name': "Oochost BC-R b52-0",
				'coords': { x:  -200.90625, y: -61.75, z: -1223.3125 },
				'cat': ["1005"]
			},
			{
				'name': "Col 69 Sector RY-R d4-13",
				'coords': { x: 441.71875, y: -303.90625, z: -1243.375 },
				'cat': ["1005"]
			},
			{
				'name': "Synuefe QH-U c19-21",
				'coords': { x: 495.53125, y: -147.28125, z: -224.59375 },
				'cat': ["1005"]
			},
			{
				'name': "Col 69 Sector LD-I c10-0",
				'coords': { x: 419.15625, y: -303.4375, z: -1219.9375 },
				'cat': ["1005"]
			},
			{
				'name': "Col 132 Sector NO-Q d5-41",
				'coords': { x: 997.09375, y: -139.125, z: -607.5625 },
				'cat': ["1005"]
			},
			{
				'name': "HD 15360",
				'coords': { x: -1000.9375, y: -1338.4375, z: -1769.59375 },
				'cat': ["1005"]
			},
			{
				'name': "Outopps QC-H b51-0",
				'coords': { x: -223.34375, y: -24.84375, z: -1239.6875 },
				'cat': ["1005"]
			},
			{
				'name': "Oochost PP-L b55-0",
				'coords': { x: -191.21875, y: -79.1875, z: -1159.0625 },
				'cat': ["1005"]
			},
			{
				'name': "Oochost BO-I c26-1",
				'coords': { x: -172.625, y: -58.90625, z: -1197.4375 },
				'cat': ["1005"]
			},
			{
				'name': "Slegi QZ-Z b58-0",
				'coords': { x: -1703.9375, y: -560.1875, z: -2364.34375 },
				'cat': ["1005"]
			},
			{
				'name': "Oochoss UU-G d10-0",
				'coords': { x: -2293.5, y: -1211.15625, z: -1451.15625 },
				'cat': ["1005"]
			},
			{
				'name': "Col 69 Sector QB-G b26-0",
				'coords': { x: 418.59375 , y: -244.09375, z: -1103.125 },
				'cat': ["1005"]
			},
			{
				'name': "Oochost LO-O b53-0",
				'coords': { x: -239.84375, y: -141.25, z: -1204.4375 },
				'cat': ["1005"]
			},
			{
				'name': "Col 69 Sector RU-E c12-0",
				'coords': { x: 436.15625, y: -252.90625, z: -1109 },
				'cat': ["1005"]
			},
			{
				'name': "Oochorrs WX-F d12-10",
				'coords': { x: -44.59375, y: -35.09375, z: -1244.0625 },
				'cat': ["1005"]
			},*/
		],

		routes: [
			/*{
				cat: ["103"],
				circle: false,
				points: [
					{ 's': "Oochost BI-U c19-0", 'label': "Oochost BI-U c19-0" },
					{ 's': "Oochost CW-M b40-0", 'label': "Oochost CW-M b40-0" }
				]
			},
			{
				cat: ["103"],
				circle: false,
				points: [
					{ 's': "Oochost LC-L b41-0", 'label': "Oochost LC-L b41-0" },
					{ 's': "Oochost IM-M a89-0", 'label': "Oochost IM-M a89-0" }
				]
			},
			*/
			/*
				29/09 maintenance, uia3
				Oochost SB-M c24-0 -> Oochost OJ-W b49-0 at 11:56utc
				Oochost QE-W b49-0 to Oochost DP-N a61-1 at 11:30utc 
				Oochost QE-W b49-0 to Outopps HC-V b16-0 at 13:13utc
				Oochost SB-M c24-2 to Synuefai UH-R b10-0 at 13:25utc
				30/09
				Oochost BC-R b52-0 to Outopps CF-G c24-1 at 08:00utc
				Oochost ZN-I a105-0 -> Oochost PP-L b55-0 at 14:42:00
				Outopps QC-H b51-0 -> Oochost BO-I c26-1 at 14:55:00
			*//*
			{//UIA3 measures
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Oochost SB-M c24-0", 'label': "Oochost SB-M c24-0" },
					{ 's': "Oochost OJ-W b49-0", 'label': "Oochost OJ-W b49-0" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Oochost QE-W b49-0", 'label': "Oochost QE-W b49-0" },
					{ 's': "Oochost DP-N a61-1", 'label': "Oochost DP-N a61-1" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Oochost QE-W b49-0", 'label': "Oochost QE-W b49-0" },
					{ 's': "Outopps HC-V b16-0", 'label': "Outopps HC-V b16-0" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Oochost SB-M c24-2", 'label': "Oochost SB-M c24-2" },
					{ 's': "Synuefai UH-R b10-0", 'label': "Synuefai UH-R b10-0" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Outopps CF-G c24-1", 'label': "Outopps CF-G c24-1" },
					{ 's': "Oochost BC-R b52-0", 'label': "Oochost BC-R b52-0" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Oochost ZN-I a105-0", 'label': "Oochost ZN-I a105-0" },
					{ 's': "Oochost PP-L b55-0", 'label': "Oochost PP-L b55-0" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Outopps QC-H b51-0", 'label': "Outopps QC-H b51-0" },
					{ 's': "Oochost BO-I c26-1", 'label': "Oochost BO-I c26-1" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Oochost LO-O b53-0", 'label': "Oochost LO-O b53-0" },
					{ 's': "Oochost XM-L c24-1", 'label': "Oochost XM-L c24-1" }
				]
			},*/
			
			/*
				29/09 maintenance, uia2
				UIA#2 Oochoss LL-D c1 to Oochoss DY-E b1-0 @ 20:45:29

				30/09
				Oochoss DY-E b1-0 to HD 15360 at 12:00
				Slegi QZ-Z b58-0  to Oochoss UU-G d10-0 at 15:44
			*//*
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Oochoss LL-D c1", 'label': "Oochoss LL-D c1" },
					{ 's': "Oochoss DY-E b1-0", 'label': "Oochoss DY-E b1-0" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "HD 15360", 'label': "HD 15360" },
					{ 's': "Oochoss DY-E b1-0", 'label': "Oochoss DY-E b1-0" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Slegi QZ-Z b58-0", 'label': "Slegi QZ-Z b58-0" },
					{ 's': "Oochoss UU-G d10-0", 'label': "Oochoss UU-G d10-0" }
				]
			},*/
			/*
				29/09 maintenance, uia1
				UIA1 (Joe) Survey:  Col 69 Sector RY-R d4-13 to Synuefe QH-U c19-21 at 19:50:47 UTC.
				UIA1 (Joe) Survey:  Col 69 Sector LD-I c10-0 to Col 132 Sector NO-Q d5-41 at 20:09:08 UTC
				30/09
				UIA#1 Currently between Col 69 Sector XP-O d6-28 and Col 69 Sector QB-G b26-0 at 15:30
				UIA1 (Joe) Survey:  Col 69 Sector RU-E c12-0 to Oochorrs WX-F d12-10 at 20:09:08 UTC.
			*//*
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Col 69 Sector RY-R d4-13", 'label': "Col 69 Sector RY-R d4-13" },
					{ 's': "Synuefe QH-U c19-21", 'label': "Synuefe QH-U c19-21" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Col 69 Sector LD-I c10-0", 'label': "Col 69 Sector LD-I c10-0" },
					{ 's': "Col 132 Sector NO-Q d5-41", 'label': "Col 132 Sector NO-Q d5-41" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Col 69 Sector XP-O d6-28", 'label': "Col 69 Sector XP-O d6-28" },
					{ 's': "Col 69 Sector QB-G b26-0", 'label': "Col 69 Sector QB-G b26-0" }
				]
			},
			{
				cat: ["1003"],
				circle: false,
				points: [
					{ 's': "Col 69 Sector RU-E c12-0", 'label': "Col 69 Sector RU-E c12-0" },
					{ 's': "Oochorrs WX-F d12-10", 'label': "Oochorrs WX-F d12-10" }
				]
			},*/
		],
		

		//permit UNlocked sectors
		puls: [
			{
				radius: 100.0,
				coords: [726.50391,-365.36328,-1377.93555],
				name: "Barnard's Loop Sector"
			},
			{
				radius: 426.0,
				coords: [1355.99609,-235.59766,-690.91602],
				name: "Col 132 Sector"
			},
			{
				radius: 150.0,
				coords: [942.32812,-198.29688,-365.50586],
				name: "Col 135 Sector"
			},
			{
				radius: 162.0,
				coords: [1186.89453,-181.42578,-548.42188],
				name: "Col 140 Sector"
			},
			{
				radius: 100.0,
				coords: [428.26172,-280.66797,-858.96289],
				name: "Flame Sector"
			},
			{
				radius: 100.0,
				coords: [411.68359,-272.99219,-811.47461],
				name: "Horsehead Sector"
			},
			{
				radius: 117.0,
				coords: [1241.61328,86.52734,-1005.43945],
				name: "M47 Sector"
			},
			{
				radius: 100.0,
				coords: [665.03125,-395.19922,-1400.55469],
				name: "Messier 78 Sector"
			},
			{
				radius: 83.0,
				coords: [178.12891,-512.99609,-1317.47070],
				name: "NGC 1662 Sector"
			},
			{
				radius: 106.0,
				coords: [578.95703,-423.23828,-1084.28711],
				name: "NGC 1981 Sector"
			},
			{
				radius: 100.0,
				coords: [549.36719,-374.51172,-926.56445],
				name: "NGC 1999 Sector"
			},
			{
				radius: 154.0,
				coords: [655.20312,-154.73828,-956.90234],
				name: "NGC 2232 Sector"
			},
			{
				radius: 100.0,
				coords: [596.77344,-311.86719,-1340.37305],
				name: "Orion Dark Region"
			},
			{
				radius: 100.0,
				coords: [616.52344,-446.42578,-1107.67383],
				name: "Orion Sector"
			},
			{
				radius: 100.0,
				coords: [586.15625,-425.38281,-1079.56836],
				name: "Running Man Sector"
			},
			{
				radius: 100.0,
				coords: [577.89844,-452.66406,-819.22266],
				name: "Spirograph Sector"
			},
			{
				radius: 182.0,
				coords: [594.46875,-431.80859,-1072.44922],
				name: "Trapezium Sector"
			},
			{
				radius: 100.0,
				coords: [991.18750,-121.87109,-51.94531],
				name: "Vela Dark Region"
			},
			{
				radius: 300.0,
				coords: [366.92969,-299.39453,-1359.90039],
				name: "Col 69 Sector"
			},
			{
				radius: 100.0,
				coords: [369.41406,-401.57812,-715.72852],
				name: "Witch Head Sector"
			}
		],
		pls: [
			{
			radius: 514.0,
			coords: [508.68359, -372.59375, -1090.87891],
			name: "Col 70 Sector"
			},
			{
			radius: 510.0,
			coords: [851.16406, 83.68359, -2005.22070],
			name: "NGC 2264 Sector"
			},
			{
			radius: 200.0,
			coords: [608.46094, -404.64453, -1194.16992],
			name: "Horsehead Dark Region"
			},
			{
			radius: 205.0,
			coords: [11.76172, -508.69531, -1684.84180],
			name: "NGC 1647 Sector"
			},
			{
			radius: 100.0,
			coords: [855.44141, 84.45312, -2025.11328],
			name: "Cone Sector"
			},
			{
			radius: 250.0,
			coords: [878.88281, -64.39062, -1850.92383],
			name: "Col 97 Sector"
			},
			{
			radius: 350.0,
			coords: [1731.03125, -400.21094, -1396.76758],
			name: "M41 Sector"
			},
			{
			radius: 459.0,
			coords: [1246.80469, -278.00000, -860.11328],
			name: "Col 121 Sector"
			},
			{
			radius: 100.0,
			coords: [1099.23828, -146.67188, -133.58008],
			name: "Regor Sector"
			}
		],
		hd_soi: [
			{
			radius: 150.0,
			coords: [ -78.59375, -149.625, -340.53125],
			name: "Merope"
			},
			{
			radius: 50.0,
			coords: [ -41.3125, -58.96875, -354.78125],
			name: "HIP 22460"
			},
			{
			radius: 70.0,
			coords: [ 432.625, 2.53125, 288.6875],
			name: "Musca Dark Region PJ-P b6-1"
			},
			{
			radius: 100.0,
			coords: [ -319.81250, -216.75, -913.46875],
			name: "California Sector BA-A e6"
			},
			{
			radius: 120.0,
			coords: [ 351.96875, -373.46875, -711.09375 ],
			name: "Shenve"
			},
		],
		g_soi: [
			{
			radius: 750.0,
			coords: [ 1099.21875, -146.68750, -133.59375],
			name: "Gamma Velorum"
			},
			
		]
	},
	formatHDs: async function (hddata, resolvePromise) {
		
		canonnEd3d_challenge.systemsData.pls.sort((a, b) => (a.radius > b.radius) ? 1 : -1)
		for (var i = 0; i < canonnEd3d_challenge.systemsData.pls.length; i++) {
			var plspoi = {
				coords: {
					x: canonnEd3d_challenge.systemsData.pls[i].coords[0],
					y: canonnEd3d_challenge.systemsData.pls[i].coords[1],
					z: canonnEd3d_challenge.systemsData.pls[i].coords[2]
				},
				name: canonnEd3d_challenge.systemsData.pls[i].name,
				'cat': ["1007"]
			}
			canonnEd3d_challenge.systemsData.systems.push(plspoi)
		}
		canonnEd3d_challenge.systemsData.puls.sort((a, b) => (a.radius > b.radius) ? 1 : -1)
		for (var i = 0; i < canonnEd3d_challenge.systemsData.puls.length; i++) {
			var pulspoi = {
				coords: {
					x: canonnEd3d_challenge.systemsData.puls[i].coords[0],
					y: canonnEd3d_challenge.systemsData.puls[i].coords[1],
					z: canonnEd3d_challenge.systemsData.puls[i].coords[2]
				},
				name: canonnEd3d_challenge.systemsData.puls[i].name,
				'cat': ["1008"]
			}
			canonnEd3d_challenge.systemsData.systems.push(pulspoi)
		}
		canonnEd3d_challenge.systemsData.hd_soi.sort((a, b) => (a.radius > b.radius) ? 1 : -1)
		for (var i = 0; i < canonnEd3d_challenge.systemsData.hd_soi.length; i++) {
			var hd_soipoi = {
				coords: {
					x: canonnEd3d_challenge.systemsData.hd_soi[i].coords[0],
					y: canonnEd3d_challenge.systemsData.hd_soi[i].coords[1],
					z: canonnEd3d_challenge.systemsData.hd_soi[i].coords[2]
				},
				name: canonnEd3d_challenge.systemsData.hd_soi[i].name,
				'cat': ["1002"]
			}
			canonnEd3d_challenge.systemsData.systems.push(hd_soipoi)
		}


		//request and parse waypoint info here to use in hyperdiction filters
		console.log("start waypoints sheet api query")
		var apidata = await go(sites)
		console.log("end sheet api query")

		var wps = []
		for (var i=1; i<=Object.keys(apidata).length; i++) {
			var tmpd = apidata["uia/waypoints/"+i]
			if (!tmpd || tmpd.length < 1) continue;
			if (!tmpd[1][1] || tmpd[1][1].length < 1 || tmpd[1][1] == "Placeholder") continue
			wps.push(tmpd)
		}
		//reformat, as first line is only headers

		for (var uiai = 0; uiai < wps.length; uiai++) {
			var uiawps = [];
			if (wps[uiai].length <= 1) {
				console.log("no data for waypoints", wps)
				resolvePromise()
				return
			}
			var headers = wps[uiai][0];
			for (var l = 1; l < wps[uiai].length; l++) {
				var line = {}
				for (var c = 0; c < headers.length; c++) {
					line[headers[c]] = wps[uiai][l][c]
				}
				uiawps.push(line)
			}
			//overwrite our data variable for later
			wps[uiai] = uiawps;
			//parse uia wps into poi and routes
			canonnEd3d_challenge.formatWaypoints(wps[uiai])
		}

		//var reports = apidata["thargoid/hyperdiction/reports"]
		//if (reports == undefined || reports.length < 1) {
		//	console.log("didnt get hyperdiction reports", apidata)
		//	resolvePromise()
		//	return;
		//}

		//first create a unique list of systems involved in hyperdictions
		var hds = {};
		for (var d = 0; d < hddata.length; d++) {
			let hyperData = hddata[d];
		
			var systemName = hyperData["System"]
			var destinationName = hyperData["Destination"]
			//filter by nearest name as provided by plugin
			//if ((hyperData.start.nearest.name != "UIA Route"
			//|| hyperData.destination.nearest.name != "UIA Route")
			//&& (hyperData.start.nearest.name != "UIA Route 2"
			//|| hyperData.destination.nearest.name != "UIA Route 2")
			//&& (hyperData.start.nearest.name != "UIA Route 3"
			//|| hyperData.destination.nearest.name != "UIA Route 3")) {
			//	//console.log("nearest names:", hyperData.start.nearest, hyperData.destination.nearest)
			//	continue
			//}

			if (Object.keys(hds).includes(systemName+":::"+destinationName)) {
				if (hyperData["Hostile"] == "Y") hds[systemName+":::"+destinationName].hostile = "Y"
				continue;
			}
			hds[systemName+":::"+destinationName] = hyperData
		}
		
		//then iterate that list without duplicates
		var maxWPI = 0;
		for (let systemName in hds) {
			var poi = {
				system: hds[systemName]["System"],
				x: hds[systemName]["Sx"],
				y: hds[systemName]["Sy"],
				z: hds[systemName]["Sz"]
			};
			var other = {
				system: hds[systemName]["Destination"],
				x: hds[systemName]["Dx"],
				y: hds[systemName]["Dy"],
				z: hds[systemName]["Dz"]
			};
			//console.log("throwing hyper away", poi, hyperData)
			//ignoring  that are not connected to our waypoints
			if (poi == undefined) { continue }
			var poiSite = {};
			poiSite['name'] = poi.system;
			poiSite['coords'] = {
				x: parseFloat(poi.x),
				y: parseFloat(poi.y),
				z: parseFloat(poi.z),
			}
				
			poiSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + poi.system + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + poi.system + '" target="_blank" rel="noopener">Signals</a>';
			var otherSite = {};
			otherSite['name'] = other.system;
			otherSite['coords'] = {
				x: parseFloat(other.x),
				y: parseFloat(other.y),
				z: parseFloat(other.z),
			}
				
			otherSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + other.system + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + other.system + '" target="_blank" rel="noopener">Signals</a>';
			var waypointIndex=-1;
			//Check Site Type and match categories
			uialoop:
			for (var i = 0; i < wps.length; i++) { //uia1-3
				//sysloop:
				for (var sysi = 0; sysi < wps[i].length; sysi++) {
					var sysdata = wps[i][sysi]
					if (sysdata["System"] == other.system || sysdata["System"] == poi.system) {
						waypointIndex = i//sysi
						break uialoop
					}
				}
			}
			//if its not a wp on either end, it might still be within uia range of influence
			if (waypointIndex == -1) {
				const poi_v3 = new THREE.Vector3(parseFloat(poi.x), parseFloat(poi.y), parseFloat(poi.z))
				const other_v3 = new THREE.Vector3(parseFloat(other.x), parseFloat(other.y), parseFloat(other.z))
				const uia_range = 24//ly
				uialoop:
				for (var i = 0; i < wps.length; i++) {
					//sysloop:
					for (var sysi = 0; sysi < wps[i].length; sysi++) {
						var sysdata = wps[i][sysi]
						if (sysdata["Estimate"] != "F") {
							const sys_v3 = new THREE.Vector3(parseFloat(sysdata["X"]), parseFloat(sysdata["Y"]), parseFloat(sysdata["Z"]))
							if (sys_v3.distanceTo(poi_v3)<uia_range || sys_v3.distanceTo(other_v3)<uia_range) {
								
								waypointIndex = i//sysi;
								break uialoop
							}
						}
					}
				}
			}
			//console.log("waypointIndex:", waypointIndex)
			//discard this hyper as it is not affialiated with the UIAs
			if (waypointIndex == -1) continue
			//prepare the hyper categories
			if (waypointIndex>maxWPI) maxWPI = waypointIndex
			//with this we get increasing amounts of filter categories for the waypoints
			poiSite['cat'] = ["30"+(1+waypointIndex)];
			otherSite['cat'] = ["30"+(1+waypointIndex)];
			poiSite['cat'].push("299")
			otherSite['cat'].push("299")
			if (hds[systemName].hostile == "Y")
			{
				poiSite['cat'].push("300")
				otherSite['cat'].push("300")
			}
			//console.log("adding poi with data:", poiSite, hds[systemName])
			// We can then push the site to the object that stores all systems
			canonnEd3d_challenge.systemsData.systems.push(poiSite);
			canonnEd3d_challenge.systemsData.systems.push(otherSite);
			canonnEd3d_challenge.addRoute(poiSite.cat, [poiSite.name, other.system])
		}
		
		//console.log("global waypoints list:", sites.wps)
		for (var i = 0; i <= maxWPI; i++) {
			canonnEd3d_challenge.systemsData.categories["Hyperdictions"]["30"+(1+i)] = {
				'name': "UIA "+(i+1),
				'color': '999900'
			}
		}
		resolvePromise();
	},
	addRoute: (cat, systems, circle=false) => {
		var route = {
			cat: cat,
			circle: circle,
			points: []
		}
		for (var i = 0; i < systems.length; i++) {
			route['points'].push({ 's': systems[i], 'label': systems[i] })
		}
		canonnEd3d_challenge.systemsData.routes.push(route);
	},
	uia: [],
	formatWaypoints: function (data) {
		var arrivaldate;
		var arrivalcoords;
		var arrivalname;
		var lastarrivaldate;
		var lastcoords;
		var lastname;
		var route = {
			cat: ["101"],
			circle: false,
			points: []
		}
		var fakeroute = {
			cat: ["103"],
			circle: false,
			points: []
		}
		var estimateroute = {
			cat: ["102"],
			circle: false,
			points: []
		}


		var firstwp;
		var midptime = false;
		var lastcase = "X";
		var lastdata = false;
		var sumX = 0, sumY = 0, sumZ = 0;
		var destination_reached = false;
		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {

			if (data[i]["System"] && data[i]["System"].replace(' ', '').length > 1) {

				//manage routes
				var curcase = data[i]["Estimate"];
				switch (curcase){
					//normal route points
					case "N":
						poicat = "101"
						if (lastcase != "N" && lastdata) {
							//end last route, start new
							if (route.points.length>1) canonnEd3d_challenge.systemsData.routes.push(route);
							route = { cat: ["101"], circle: false, points: [] }
							//connect previous routes to this point
							//normal routes are exclusive to surroundings, other routes are inclusive
							if (lastcase == "F") {
								fakeroute.points.push({s:data[i]["System"]})
							}
							if (lastcase == "Y") {
								estimateroute.points.push({s:data[i]["System"]})
							}
						}
						route.points.push({s:data[i]["System"]})
						break;

					//fake route points for weird behavior
					case "F":
						if (lastcase != "F" && lastdata) {
							//end last route, start new
							if (fakeroute.points.length>1) canonnEd3d_challenge.systemsData.routes.push(fakeroute);
							fakeroute = { cat: ["103"], circle: false, points: [] }
							//connect previous point to this route, inclusive
							fakeroute.points.push({s:lastdata["System"]})
						}
						fakeroute.points.push({s:data[i]["System"]})
						poicat = "103"
						break;

					//estimated route points
					case "Y":
						if (lastcase != "Y" && lastdata)  {
							//end last route, start new
							if (estimateroute.points.length>1) canonnEd3d_challenge.systemsData.routes.push(estimateroute);
							estimateroute = { cat: ["102"], circle: false, points: [] }
							//connect previous fake route to this point
							if (lastcase == "F") {
								fakeroute.points.push({s:data[i]["System"]})
							} else {
								//handle the rest inclusively as estimate
								estimateroute.points.push({s:lastdata["System"]})
							}
						}
						estimateroute.points.push({s:data[i]["System"]})
						poicat = "102"
						break;
				}
				lastcase = curcase;
				lastdata = data[i]


				//add POIs
				var poiSite = {};
				poiSite['name'] = data[i]["System"];

				poiSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i]["System"] + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + data[i]["System"] + '" target="_blank" rel="noopener">Signals</a>';
				
				//poiSite['url'] = "https://canonn-science.github.io/canonn-signals/?system=" + poiSite['name']
				poiSite['coords'] = {
					x: parseFloat(data[i]["X"]),
					y: parseFloat(data[i]["Y"]),
					z: parseFloat(data[i]["Z"]),
				};
				if (lastcoords) {
					sumX += poiSite['coords'].x - lastcoords.x
					sumY += poiSite['coords'].y - lastcoords.y
					sumZ += poiSite['coords'].z - lastcoords.z
				}
				
				//Check Site Type and match categories
				poiSite['cat'] = [poicat]
				canonnEd3d_challenge.systemsData.systems.push(poiSite);

				if (i==0) firstwp = poiSite
				


				//manage times for the UIA
				lastcoords = arrivalcoords
				lastname = arrivalname
				arrivalcoords = poiSite['coords']
				arrivalname = poiSite['name']
				var at = data[i]["Traversal Time"]
				var mp = data[i]["Midpoint Time"]
				var thetime = false;
				midptime = false
				if (at.indexOf("/") > 0 && at.indexOf(":") > 0) thetime = at;
				else if (mp.indexOf("/") > 0 && mp.indexOf(":") > 0) {
					thetime = mp
					midptime = true
				}
				if (thetime) {
					lastarrivaldate = arrivaldate
					arrivaldate = new Date(gsheetToZuluTimestamp(thetime)).getTime()
				}
			}
			if (data[i]["Remarks"].search("Destination Reached") >= 0) {
				destination_reached = true;
			}
		}

		if (fakeroute.points.length>1) canonnEd3d_challenge.systemsData.routes.push(fakeroute);
		if (route.points.length>1) canonnEd3d_challenge.systemsData.routes.push(route);
		if (estimateroute.points.length>1) canonnEd3d_challenge.systemsData.routes.push(estimateroute);

		//calculating UIA current estimated position
		if (lastcoords && lastarrivaldate) {
			//console.log(lastcoords, lastarrivaldate, arrivalcoords, arrivaldate)
			const start = new THREE.Vector3(lastcoords.x, lastcoords.y, lastcoords.z)
			const end = new THREE.Vector3(arrivalcoords.x, arrivalcoords.y, arrivalcoords.z)
			const starttime = new Date(lastarrivaldate).getTime()
			const endtime = new Date(arrivaldate).getTime()
			const nowtime = new Date().getTime()
			const timediff = endtime-starttime || 1
			const nowdiff = nowtime-starttime
			var percent = nowdiff/timediff
			if (midptime) percent = percent/2;
			if (destination_reached && percent>1) percent=1;
			const vecdiff = end.clone().sub(start)
			canonnEd3d_challenge.uia.push(start.clone().addScaledVector(vecdiff, percent))
			console.log("% of the way:", percent, new Date(lastarrivaldate).toString(), new Date(arrivaldate).toString())
			var lastuia = canonnEd3d_challenge.uia.length-1
			console.log("current estimated position of the UIA"+(lastuia+1)+": ", percent, canonnEd3d_challenge.uia[lastuia])
			var uia_poi = {
				'name': "Unidentified Interstellar Anomaly "+(lastuia+1),
				'infos': "This is an <strong>estimate</strong> of this UIA's current position.",
				'url': "",
				'coords': {
					x: canonnEd3d_challenge.uia[lastuia].x,
					y: canonnEd3d_challenge.uia[lastuia].y,
					z: canonnEd3d_challenge.uia[lastuia].z
				},
				'cat': ["100"]
			}
			//see finishMap() for the sprite
			canonnEd3d_challenge.systemsData.systems.push(uia_poi)

			canonnEd3d_challenge.uia[lastuia].destination_reached = destination_reached;

			//paint a long line of potential where the UIA is heading at
			var meanX = sumX/data.length
			var meanY = sumY/data.length
			var meanZ = sumZ/data.length
			const v3_mean = new THREE.Vector3(meanX, meanY, meanZ)
			v3_mean.normalize()
			var v3_firstwp = new THREE.Vector3(firstwp.coords.x, firstwp.coords.y, firstwp.coords.z)
			v3_firstwp.addScaledVector(v3_mean, v3_firstwp.length()*predictionFactor)

			//console.log(v3_mean, v3_firstwp)
			var extension = {
				'name': "extended mean direction of UIA#"+(lastuia+1),
				'infos': "Extension system to paint the mean line of UIA#"+(lastuia+1),
				'url': "",
				'coords': { x: v3_firstwp.x, y: v3_firstwp.y, z: v3_firstwp.z },
				'cat': ["100"]
			}
			canonnEd3d_challenge.systemsData.systems.push(extension)
			var meanroute = {
				cat: ["100"],
				circle: false,
				points: [
					{s: firstwp.name, value: firstwp.name},
					{s: extension.name, value: extension.name}
				]
			}
			canonnEd3d_challenge.systemsData.routes.push(meanroute);

			

			/* use once to generate poi by times and coords
			//console.log(lastcoords, lastarrivaldate, arrivalcoords, arrivaldate)
			const fake_start = new THREE.Vector3(-1780.65625,-592.21875,-2365.21875)
			const fake_end = new THREE.Vector3(-1762.46875,-581.84375,-2319.875)
			const fake_starttime = new Date(gsheetToZuluTimestamp("22/09/2022 10:05:00")).getTime()
			const fake_endtime = new Date(gsheetToZuluTimestamp("25/09/2022 07:53:26")).getTime()
			const fake_nowtime = new Date(gsheetToZuluTimestamp("29/09/2022 08:00:00")).getTime()
			const fake_timediff = fake_endtime-fake_starttime || 1
			const fake_nowdiff = fake_nowtime-fake_starttime
			const fake_percent = fake_nowdiff/fake_timediff
			const fake_vecdiff = fake_end.sub(fake_start)
			//add fake lines for the UIAs in broken state//add fake lines for the UIAs in broken state
			const fakev = fake_start.clone().addScaledVector(fake_vecdiff, fake_percent)
			console.log(fakev)
			//*/
		}

	},
	formatMeasurements: async function (data, resolvePromise) {
		//console.log(data);
		var measystems = {};
		for (var i = 0; i < data.length; i++) {
			if (data[i]["Permit Lock"]) continue
			if (data[i]["Accuracy"] > 3) continue
			if (data[i]["Current System"]
			&& data[i]["Current System"].replace(/\s/g, '').length > 1
			&& data[i]["Targetted System"]
			&& data[i]["Targetted System"].replace(/\s/g, '').length > 1) {
				var route = {};
				route['points'] = [
					{ 's': data[i]["Current System"], 'label': data[i]["Current System"] },
					{ 's': data[i]["Targetted System"], 'label': data[i]["Targetted System"] }
				]
				route['cat'] = ["1003"];
				route['circle'] = false;
				canonnEd3d_challenge.systemsData.routes.push(route);
				if (!Object.keys(measystems).includes(data[i]["Current System"]))
					measystems[data[i]["Current System"]] = false;
				if (!Object.keys(measystems).includes(data[i]["Targetted System"]))
					measystems[data[i]["Targetted System"]] = false;
			}
		}
		let response = await getSystemsEDSM(Object.keys(measystems));

		if (response.data.length <= 0)
		{
			console.log("EDSM debug", response);
		}
		for (const index in response.data) {
			let system = response.data[index];
			if (!system.name || !system.coords) continue
			measystems[system.name] = system
		}
		for (let systemName in measystems) {
			if (!measystems[systemName].name || !measystems[systemName].coords) continue;
			var poiSite = {};
			poiSite['name'] = measystems[systemName].name;			
			poiSite['infos'] = '<br/><a href="https://www.edsm.net/en/system?systemName=' + poiSite['name'] + '" target="_blank" rel="noopener">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + poiSite['name'] + '" target="_blank" rel="noopener">Signals</a>';
			//poiSite['url'] = "https://canonn-science.github.io/canonn-signals/?system=" + poiSite['name']
			poiSite['coords'] = {
				x: parseFloat(measystems[systemName].coords.x),
				y: parseFloat(measystems[systemName].coords.y),
				z: parseFloat(measystems[systemName].coords.z),
			};
			//console.log(measystems[systemName])
			poiSite['cat'] = ["1005"];
			// We can then push the site to the object that stores all systems
			canonnEd3d_challenge.systemsData.systems.push(poiSite);
		}
		resolvePromise();
	},
	parseCSVData: function (uri, cb, resolve) {
		Papa.parse(uri, {
			download: true,
			header: true,
			complete: function (results) {
				return cb(results.data, resolve);
			},
		});
	},
	createSphere: function(data, color) {
		//console.log("making sphere: ", data)
		var geometry = new THREE.SphereGeometry(data.radius, 40, 20);
		var sphere = new THREE.Mesh(geometry, color);
		//idk why but the z coordinate is twisted for this
		sphere.position.set(data.coords[0], data.coords[1], -data.coords[2]);
		sphere.name = data.name;
		sphere.clickable = false;
		scene.add(sphere);
	},
	finishMap: function() {
		var redmaterial = new THREE.MeshBasicMaterial({
			color: 0xFF0000,
			transparent: true,
			opacity: 0.3
		})
		for (var i = 0; i < canonnEd3d_challenge.uia.length; i++) {
			var sprite = new THREE.Sprite(Ed3d.material.spiral);
			//console.log("trying stargoid sprite: ", v3_uia)
			sprite.position.set(
				canonnEd3d_challenge.uia[i].x,
				canonnEd3d_challenge.uia[i].y,
				-canonnEd3d_challenge.uia[i].z //for some reason z is inverted
			);
			sprite.scale.set(50, 50, 1);
			scene.add(sprite); // this centers the glow at the mesh
			var names = ["Taranis", "Leigong", "Indra", "Oya", "Cocijo", "Thor", "Raijin", "Hadad"]
			if (canonnEd3d_challenge.uia[i].destination_reached) {
				canonnEd3d_challenge.createSphere({
					radius: 25,
					coords: [
						canonnEd3d_challenge.uia[i].x,
						canonnEd3d_challenge.uia[i].y,
						canonnEd3d_challenge.uia[i].z
					],
					name: "Rogue Signal Source "+ (names[i] || (i+1))
				}, redmaterial)
			}
		}
		for (var i = 0; i < canonnEd3d_challenge.systemsData.pls.length; i++) {
			canonnEd3d_challenge.createSphere(canonnEd3d_challenge.systemsData.pls[i], Ed3d.material.permit_zone)
		}
		var blackmaterial = new THREE.MeshBasicMaterial({
			color: 0x030303,
			transparent: true,
			opacity: 0.3
		})
		for (var i = 0; i < canonnEd3d_challenge.systemsData.puls.length; i++) {
			canonnEd3d_challenge.createSphere(canonnEd3d_challenge.systemsData.puls[i], blackmaterial)
		}
		
		var ygmaterial = new THREE.MeshBasicMaterial({
			color: 0x336600,
			transparent: true,
			opacity: 0.3
		})
		for (var i = 0; i < canonnEd3d_challenge.systemsData.hd_soi.length; i++) {
			canonnEd3d_challenge.createSphere(canonnEd3d_challenge.systemsData.hd_soi[i], ygmaterial)
		}

		var popmaterial = new THREE.MeshBasicMaterial({
			color: 0x333300,
			transparent: true,
			opacity: 0.3
		})
		//canonnEd3d_challenge.createSphere({coords: [0,0,0], radius: 222, name: "Populated Bubble"}, popmaterial)

		var gmaterial = new THREE.MeshBasicMaterial({
			color: 0x000099,
			transparent: true,
			opacity: 0.15
		})
		for (var i = 0; i < canonnEd3d_challenge.systemsData.g_soi.length; i++) {
			canonnEd3d_challenge.createSphere(canonnEd3d_challenge.systemsData.g_soi[i], gmaterial)
		}

		//$("#search").html("<p>Current positions are rough estimates.</p>").css("display", "block").css("color", "#FF4F4F")
	
		document.getElementById("loading").style.display = "none";
	},
	init: function () {
		//var p1 = new Promise(function (resolve, reject) {
		//	canonnEd3d_challenge.parseCSVData('data/csvCache/UIA Vector Survey (Responses) - Waypoints.csv', canonnEd3d_challenge.formatWaypoints, resolve);
		//});
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_challenge.parseCSVData('data/csvCache/route_UIA_Hyperdictions.csv', canonnEd3d_challenge.formatHDs, resolve);
		});

		Promise.all([p2]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_challenge.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: false,
				playerPos: [0, 0, 	 0],
				cameraPos: [0, 0+1000, 0-1500],
				systemColor: '#FF9D00',
				finished: canonnEd3d_challenge.finishMap
			});
		});
	},
};
