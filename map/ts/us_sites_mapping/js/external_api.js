function getBodyInfo(system, body) {

	var url = 'https://api.purrcat.space/v1/unknown-sites';

	url += '?system='+system;
	url += '&body='+body; 

	$.get( url, function( data ) {

		var tpl = '';

		if(typeof data !== 'undefined' && typeof data.data !== 'udefined' && data.data) {

			//console.log(data);
			//console.log(data.data);


			tpl += '<tr><td>Arrival:</td><td>'+data.data.distance_to_arrival+' ls</td></tr>';
			tpl += '<tr><td>Gravity:</td><td>'+data.data.gravity.toFixed(2)+' g</td></tr>';

			if(data.data.is_rotational_period_tidally_locked) {
				tpl += '<tr><td>Tidally locked:</td><td>Yes</td></tr>';
			} else {
				tpl += '<tr><td>Tidally locked:</td><td>No</td></tr>';
			}

			tpl += '<tr><td>Earth Masses:</td><td>'+data.data.earth_masses.toFixed(4)+' g</td></tr>';
			tpl += '<tr><td>Radius:</td><td>'+data.data.radius.toFixed(2)+' km</td></tr>';
			tpl += '<tr><td>Temperature:</td><td>'+data.data.surface_temperature.toFixed(2)+' K</td></tr>';
			tpl += '<tr><td>Rotational Period:</td><td>'+data.data.rotational_period.toFixed(2)+' d</td></tr>';

		} else {
			tpl += '<tr><td>No body data available</td></tr>';
		}


		$('.js-bodyinfo-table').html(tpl);


	}, "json" ).fail(function(data) {
		$('.js-bodyinfo-table').html('<tr><td>No body data available</td></tr>');
	});

}