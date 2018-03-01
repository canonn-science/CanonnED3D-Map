function getFloat(obj) {

	if( isNaN(obj) ) {
		return false;
	} else {
		return parseFloat(obj);
	}

}

function getInt(obj) {

	if( isNaN(obj) ) {
		return false;
	} else {
		return parseInt(obj);
	}

}

function getActive(active) {

	switch(active) {

		case 'Y':
			return true;

		case 'N':
			return false;

		default: 
			return null;

	}

}

function cleanJSONData(json) {

	// This is just cleanup of bad values and not complete systems.
	// You need:
	// - us name (US017)
	// - system name
	// - coordinates for system
	// to make a system valid for addition

	if(typeof json !== 'undefined') {

		var sysArray = [];

		for(var i=0; i<json.length; i++) {

			if( 
				json[i].us_name.length > 0 &&
				json[i].system.length > 0 &&
				getFloat( json[i].x ) &&
				getFloat( json[i].y ) &&
				getFloat( json[i].z )
				) {


				var sys = {
					type: 'us',
					us_name: json[i].us_name,
					system: json[i].system,
					x: getFloat( json[i].x ),
					y: getFloat( json[i].y ),
					z: getFloat( json[i].z ),
					planet: json[i].planet,
					lat: getFloat( json[i].lat ),
					lng: getFloat( json[i].lng ),
					active: getActive( json[i].active ),
					msg1: json[i].msg1.replace('!',''),
					msg2: json[i].msg2.replace('!',''),
					msg3: json[i].msg3.replace('!','')
				}

				sysArray.push(sys);

			}

		}

		return sysArray;

	} else {
		console.log('Sorry, no data');
		return false;
	}

}

function generatePois() {

	var pois = [
		{
			name: 'Sol',
			us_name: 'Sol',
			system: 'Sol',
			type: 'poi',
			desc: 'Historic system famous as both the birthplace of humanity and as the political capital of the Federation. A very expensive and prestigious system to live in and a popular tourist venue. Most rich humans will visit Earth once in their lives. All the major corporations have their headquarters on Mars, terraformed in 2286, which is the main centre for administration.',
			img1: 'us_sites_mapping/img/pois/sol1.jpg',
			img2: 'us_sites_mapping/img/pois/sol2.jpg',
			credits: 'Screenshot credits to PCGamer & ED Wiki',
			ed3d: {
				name: 'Sol',
				cat: [101],
				coords: {
					x: 0,
					y: 0,
					z: 0
				}
			}

		},
		{
			name: 'Merope',
			us_name: 'Merope',
			system: 'Merope',
			type: 'poi',
			desc: 'This system is seen as the key for a mystery starting in 3301 with the discovery of unknown artefacts that point to this system. The first of an alien species called \'barnacles\' was first discovered on Merope 5C in 3302.<br /><br />This system is the source for the triangulation method used to find Unidentified Sites.',
			img1: 'us_sites_mapping/img/pois/merope1.jpg',
			img2: 'us_sites_mapping/img/pois/merope2.jpg',
			credits: 'Screenshot credits to Canonn & CMDR Kreegr',
			ed3d: {
				name: 'Merope',
				cat: [101],
				coords: {
					x: -78.59375,
					y: -149.625,
					z: -340.53125
				}
			}

		},
		{
			name: 'Col 70 Sector FY-N C21-3',
			us_name: 'Col 70 Sector FY-N C21-3',
			system: 'Col 70 Sector FY-N C21-3',
			type: 'poi',
			desc: 'This system is considered to be of significance in the recent alien discoveries. An alien species called \'Thargoids\' seem to have something to do with that. The mystery deepens even more with the fact that the whole Col 70 sector is currently permit locked.<br /><br />This system is the source for the triangulation method used to find Unidentified Sites.',
			img1: 'us_sites_mapping/img/pois/col1.jpg',
			img2: 'us_sites_mapping/img/pois/col2.jpg',
			credits: 'Screenshot credits to Frontier Developments',
			ed3d: {
				name: 'Col 70 Sector FY-N C21-3',
				cat: [101],
				coords: {
					x: 687.0625,
					y: -362.53125,
					z: -697.0625
				}
			}

		},
		{
			name: ' HIP 22460',
			us_name: ' HIP 22460',
			system: ' HIP 22460',
			type: 'poi',
			desc: 'Some of the recent discoveries point directly to this one system. We only know that a megaship named \'Overlook\' is stationed inside the system as it is currently Permit Locked.',
			img1: 'us_sites_mapping/img/pois/col1.jpg',
			img2: 'us_sites_mapping/img/pois/col2.jpg',
			credits: 'Screenshot credits to Frontier Developments',
			ed3d: {
				name: ' HIP 22460',
				cat: [101],
				coords: {
					x: -41.3125,
					y: -58.96875,
					z: -354.78125
				}
			}

		}

	];

	return pois;

}

function generateSystems(data) {

	// creates systems compatibile with Ed3d map

	if(typeof data !== 'undefined') {

		var systems = [];
		var pois = generatePois();

		for(var i=0; i<data.length; i++) {

			var system = {
				name: data[i].us_name,
				coords: {
					x: data[i].x,
					y: data[i].y,
					z: data[i].z
				}
			}

			if(data[i].active) {
				system.cat = [1001];
			} else {
				system.cat = [1000];
			}

			systems.push(system);

		}

		for(var j=0; j<pois.length; j++) {
			systems.push( pois[j].ed3d );
		}

		return systems;

	} else {
		console.log('Sorry, no data');
		return false;
	}

}

function generateConnections(data) {

	// creates connections (routes) compatibile with Ed3d map

	if(typeof data !== 'undefined') {

		var connections = [];

		for(var i=0; i<data.length; i++) {

			//msg1 route
			if( data[i].msg1 && data[i].msg1.length > 1) {

				connections.push({
					name: data[i].us_name+' -> '+data[i].msg1,
					active: false,
					cat: [501],
					points: [
						{ s: data[i].us_name },
						{ s: data[i].msg1 }
					]
				});

			}

			//msg2 route
			if( data[i].msg2 && data[i].msg2.length > 1) {

				connections.push({
					name: data[i].us_name+' -> '+data[i].msg2,
					active: false,
					cat: [501],
					points: [
						{ s: data[i].us_name },
						{ s: data[i].msg2 }
					]
				});

			}

			//msg3 route
			if( data[i].msg3 && data[i].msg3.length > 1) {

				connections.push({
					name: data[i].us_name+' -> '+data[i].msg3,
					active: false,
					cat: [501],
					points: [
						{ s: data[i].us_name },
						{ s: data[i].msg3 }
					]
				});

			}

		}

		return connections;

	} else {
		console.log('Sorry, no data');
		return false;
	}

}

function getCategories() {

	var categories = {
		"Site Types":{
			 "100":{
                "name":"Guardian Ruin Location",
                "color":"ffb081"
             },
             "101":{
                "name":"POI",
                "color":"4c7fff"
             },
             "501":{
                "name":"UL Signal Destination",
                "color":"424242"
             },
             "1000":{
                "name":"Inactive",
                "color":"fffdfd"
             },
             "1001":{
                "name":"Active",
                "color":"ff7855"
             }
          }

	};

	return categories;

}

function getUsData(data, options) {

	// combines all elements into Ed3d compatibile map JSON

	var mapJson = {};

	if(typeof options !== 'undefined') {

		var categories = getCategories();

		if(typeof options.connections !== undefined && options.connections) {

			var mapJson = {
				categories: categories,
				systems: generateSystems(data),
				routes: generateConnections(data)
			}

		} else {

			var mapJson = {
				categories: categories,
				systems: generateSystems(data)
			}

		}

	}

	console.log('mapJSON: ', mapJson);

	return mapJson;

}

function initEd3d(data, options) {

	var d = new Date()
    d.setDate(d.getDate() - 1);
    var queryDate = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':00:00';

    Ed3d.init({
        container   : 'edmap',
        json    	: data,
        withHudPanel : false,
        hudMultipleSelect : false,
        effectScaleSystem : [50,10000],
        playerPos: [-78.59375,-149.625,-340.53125],
        startAnim: false,
        showGalaxyInfos: false,
        popupDetail : true,
        withFullscreenToggle : false,
        starSprite: "textures/lensflare/star_round.png"
    });

}