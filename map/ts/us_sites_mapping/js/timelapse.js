function compareSystems(sys1, sys2) {

	var cleanSys1 = sys1.toLowerCase().replace(' ','');
	var cleanSys2 = sys2.toLowerCase().replace(' ','');

	if( cleanSys1.indexOf( cleanSys2 ) !== -1 ) {
		return true;
	}

	return false;

}

function cleanTimeData(usData, timeData) {

	var timelineSystems = [];

	for(var i=0; i<usData.length; i++) {

		var stepUs = [];

		for(var j=0; j<timeData.length; j++) {

			if( compareSystems(usData.system, timeData.system) ) {
				stepUs.push({
					
				});
			}

		}

	}

}