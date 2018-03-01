function updateUSList(data) {

	// updates the UI of the list during filtering or on page load

	if(typeof data !== 'undefined') {

		console.log('updateUSList data', data);

		var list = $('.js-us-systems');

		// so ugly, but cba with a proper template system for this preview
		var tpl = '';

		var sorted = data.sort(function(a, b) {
			return (a.us_name > b.us_name) ? -1 : (a.us_name < b.us_name) ? 1 : 0;
		});

		for(var i=0; i<data.length; i++) {

			if(data[i].type == 'poi') {

				tpl += '<li class="poi-li js-poi-li" data-poi="'+sorted[i].name+'" data-searchstring="'+sorted[i].name+'">';
				tpl += '<div class="li-poiname">'+sorted[i].name+'</div>';
				tpl += '<div class="li-sysname">POI</div>';
				tpl += '</li>';
			}
		}

		for(var i=0; i<data.length; i++) {

			if(data[i].type == 'us') {

				tpl += '<li class="js-us-li" data-us="'+sorted[i].us_name+'" data-searchstring="'+sorted[i].us_name+' '+sorted[i].system+'">';
				
				if(data[i].active) {
					tpl += '<div class="li-usname active">'+sorted[i].us_name+'</div>';
				} else {
					tpl += '<div class="li-usname">'+sorted[i].us_name+'</div>';
				}
				
				tpl += '<div class="li-sysname">'+sorted[i].system+'</div>';
				tpl += '</li>';
			}
		}

		list.html(tpl);

	} else {
		console.log('Sorry, no data');
		return false;
	}

}

function ed3dZoomInSystem(name) {

	// this is a hack, need to find a better way to do it

	var ed3dSystems = Ed3d.systems;

	for(var i=0; i<ed3dSystems.length; i++) {

		if(ed3dSystems[i].name == name) {
			Ed3d.Action.moveToObj(i, Ed3d.systems[i]);
			break;
		}

	}

}

function getDetailUsTpl() {

	var tpl = '';

	tpl += '<div class="detail-usname js-detail-usname"></div>';
	tpl += '<div class="detail-sysname js-detail-sysname"></div>';

	tpl += '<hr />';

	tpl += '<div class="detail-planet-img">';
		tpl += '<img src="us_sites_mapping/img/planet_grid.png" />';
	tpl += '</div>';
	tpl += '<div class="detail-body js-detail-body"></div>';

	tpl += '<hr />';

	tpl += '<div class="detail-latlngwrap">';
		tpl += '<div class="detail-lat">LAT';
			tpl += '<div class="detail-coord-pos js-detail-lat"></div>';
		tpl += '</div>';
	
		tpl += '<div class="detail-lng">LNG';
			tpl += '<div class="detail-coord-pos js-detail-lng"></div>';
		tpl += '</div>';
	tpl += '</div>';

	tpl += '<hr />';

	tpl += '<div class="detail-usactive js-detail-active"></div>';

	tpl += '<div class="detail-destinations">';
		tpl += '<h2>Message destinations:</h2>';
		tpl += '<table class="destinations-table">';
			tpl += '<tr>';
				tpl += '<td>(MSG3) Top:</td>';
				tpl += '<td class="js-msg1-destination"></td>';
			tpl += '</tr>';
			tpl += '<tr>';
				tpl += '<td>(MSG2) Middle:</td>';
				tpl += '<td class="js-msg2-destination"></td>';
			tpl += '</tr>';
			tpl += '<tr>';
				tpl += '<td>(MSG1) Bottom:</td>';
				tpl += '<td class="js-msg3-destination"></td>';
			tpl += '</tr>';
		tpl += '</table>';
	tpl += '</div>';

	tpl += '<div class="detail-body-info">';
   		tpl += '<h2>Planetary body info:</h2>';
   		tpl += '<table class="bodyinfo-table js-bodyinfo-table">';
   			tpl += '<tr>';
   				tpl += '<td>Arrival:</td>';
   				tpl += '<td class="js-detail-bodyinfo-arrival"></td>';
   			tpl += '</tr>';
   			tpl += '<tr>';
   				tpl += '<td>Gravity:</td>';
   				tpl += '<td class="js-detail-bodyinfo-g"></td>';
   			tpl += '</tr>';
   			tpl += '<tr>';
   				tpl += '<td>Tidally locked:</td>';
   				tpl += '<td class="js-detail-bodyinfo-tidal"></td>';
   			tpl += '</tr>';
   			tpl += '<tr>';
   				tpl += '<td>Earth Masses:</td>';
   				tpl += '<td class="js-detail-bodyinfo-mass"></td>';
   			tpl += '</tr>';
   			tpl += '<tr>';
   				tpl += '<td>Radius:</td>';
   				tpl += '<td class="js-detail-bodyinfo-rad"></td>';
   			tpl += '</tr>';
   			tpl += '<tr>';
   				tpl += '<td>Temperature:</td>';
   				tpl += '<td class="js-detail-bodyinfo-temp"></td>';
   			tpl += '</tr>';
   			tpl += '<tr>';
   				tpl += '<td>Rotation period:</td>';
   				tpl += '<td class="js-detail-bodyinfo-rot"></td>';
   			tpl += '</tr>';
   		tpl += '</table>';
    tpl += '</div>';

	return tpl;
}

function getDetailPoiTpl() {

	var tpl = '';

	tpl += '<div class="detail-poiname js-detail-poiname"></div>';
	tpl += '<div class="detail-poi-img-wrap js-detail-poi-img1">';
	tpl += '</div>';
	tpl += '<div class="detail-poi-desc js-detail-poi-desc"></div>';
	tpl += '<div class="detail-poi-img-wrap js-detail-poi-img2"></div>';
	tpl += '<div class="detail-poi-credits js-detail-poi-credits"></div>';

	return tpl;
}

function changeUs(us, scroll) {

	var list = $('.js-us-systems');
	var listel = $('.js-us-li[data-us="'+us.us_name+'"]');

	if(scroll) {

		$('.us-search-overflow').animate({
    		scrollTop: (listel.position().top - list.offset().top)
    	}, 300);

	}

	$('.js-detail-wrap').html( getDetailUsTpl() );

	$('.js-detail-usname').html(us.us_name);
	$('.js-detail-sysname').html(us.system);
	$('.js-detail-body').html(us.planet);
	$('.js-detail-lat').html(us.lat);
	$('.js-detail-lng').html(us.lng);

	if(us.active) {
		$('.js-detail-active').addClass('active');
		$('.js-detail-active').html('Site active');
	} else {
		$('.js-detail-active').removeClass('active');
		$('.js-detail-active').html('Site inactive');
	}

	$('.js-us-systems li').removeClass('active');
	$('.js-us-li[data-us="'+us.us_name+'"]').addClass('active');

	fillUsDestinations(window.cleanJSON, us);
	getBodyInfo(us.system, us.planet);
	ed3dZoomInSystem(us.us_name);

}

function changePoi(poi, scroll) {

	var list = $('.js-us-systems');
	var listel = $('.js-poi-li[data-poi="'+poi.name+'"]');

	if(scroll) {

		$('.us-search-overflow').animate({
    		scrollTop: (listel.position().top - list.offset().top)
    	}, 300);

	}

	$('.js-detail-wrap').html( getDetailPoiTpl() );

	$('.js-detail-poiname').html(poi.name);
	$('.js-detail-poi-img1').html( '<img src="'+poi.img1+'" />');
	$('.js-detail-poi-desc').html(poi.desc);
	$('.js-detail-poi-img2').html( '<img src="'+poi.img2+'" />');
	$('.js-detail-poi-credits').html( poi.credits );

	ed3dZoomInSystem(poi.name);

}

function fillUsDestinations(data, us) {

	// filters and fills UL destinations for that US
	// This needs refactoring

	var msg1 = us.msg1;
	var msg2 = us.msg2;
	var msg3 = us.msg3;

	var dest1Node = $('.js-msg1-destination');
	var dest2Node = $('.js-msg2-destination');
	var dest3Node = $('.js-msg3-destination');

	// check if we have the US# already in the system list
	for(var i=0; i<data.length; i++) {

		if(us.msg1 == data[i].us_name) {
			msg1 = data[i];
		}

		if(us.msg2 == data[i].us_name) {
			msg2 = data[i];
		}

		if(us.msg3 == data[i].us_name) {
			msg3 = data[i];
		}

	}

	// If not then there's probably a name difference or the msg desination
	// is either empty or a system name. Let's update the UI.

	// MSG 1
	if(typeof msg1 == 'object') {
		// if we have the desination in our data

		var tpl;

		if(msg1.active) {
			tpl = '<div class="node-sys active node-us js-us-node-link" data-us="'+msg1.us_name+'">'+msg1.us_name+'</div>';
		} else {
			tpl = '<div class="node-sys node-us js-us-node-link" data-us="'+msg1.us_name+'">'+msg1.us_name+'</div>';
		}

		dest1Node.html( tpl );

	} else if (typeof msg1 == 'string') {
		// if there's something there but it doesn't fit the US nodes we have

		var tpl = '<div class="node-sys">'+msg1+'</div>';
		dest1Node.html( tpl );

	} else {
		// If there's nothing there

		dest1Node.html('');
	}

	// MSG 2
	if(typeof msg2 == 'object') {
		// if we have the desination in our data

		var tpl;

		if(msg2.active) {
			tpl = '<div class="node-sys active node-us js-us-node-link" data-us="'+msg2.us_name+'">'+msg2.us_name+'</div>';
		} else {
			tpl = '<div class="node-sys node-us js-us-node-link" data-us="'+msg2.us_name+'">'+msg2.us_name+'</div>';
		}

		dest2Node.html( tpl );

	} else if (typeof msg2 == 'string') {
		// if there's something there but it doesn't fit the US nodes we have

		var tpl = '<div class="node-sys">'+msg2+'</div>';
		dest2Node.html( tpl );

	} else {
		// If there's nothing there

		dest2Node.html('');
	}

	// MSG 3
	if(typeof msg3 == 'object') {
		// if we have the desination in our data

		var tpl;

		if(msg3.active) {
			tpl = '<div class="node-sys active node-us js-us-node-link" data-us="'+msg3.us_name+'">'+msg3.us_name+'</div>';
		} else {
			tpl = '<div class="node-sys node-us js-us-node-link" data-us="'+msg3.us_name+'">'+msg3.us_name+'</div>';
		}

		dest3Node.html( tpl );

	} else if (typeof msg3 == 'string') {
		// if there's something there but it doesn't fit the US nodes we have

		var tpl = '<div class="node-sys">'+msg3+'</div>';
		dest3Node.html( tpl );

	} else {
		// If there's nothing there

		dest3Node.html('');
	}

}

function initUI(data) {

	updateUSList(data);
	changeUs( data[0], false );

}

$(document).ready(function() {

	$('body').on('click', '.js-us-li, .js-us-node-link', function(e) {

		var usName = $(this).data('us');

		var us = window.cleanJSON.filter(function(e) {
			if(e.us_name === usName) {
				return true;
			}
		});

		if( $(this).hasClass('js-us-node-link') ) {
			changeUs(us[0], true);
		} else {
			changeUs(us[0], false);
		}

	});

	$('body').on('click', '.js-poi-li', function(e) {

		var poiName = $(this).data('poi');

		var poi = window.cleanJSON.filter(function(e) {
			if(e.name === poiName) {
				return true;
			}
		});

		changePoi(poi[0]);

	});

	$('.js-us-input').on('keyup', function(e) {

		var val = $(this).val().toLowerCase();

		if(val && val.length > 0) {

			var filtered = window.cleanJSON.filter(function(e) {

				var poilower = '';
				var uslower = '';
				var syslower = '';

				if(typeof e.name !== 'undefined') {
					name = e.name.toLowerCase();
				}

				if(typeof e.us_name !== 'undefined') {
					uslower = e.us_name.toLowerCase();
				}

				if(typeof e.system !== 'undefined') {
					syslower = e.system.toLowerCase();
				}

				if( uslower.indexOf(val) !== -1 || syslower.indexOf(val) !== -1 || name.indexOf(val) !== -1 ) {
					return e;
				}

			});

			updateUSList(filtered);

		} else {
			updateUSList(window.cleanJSON);
		}

	});

	$( document ).on('systemClick', function( event, name, infos, url ) {

		var target = window.cleanJSON.filter(function(e) {
			
			console.log('e: ', e);

			if(e.us_name !== 'undefined') {
				if(e.us_name === name) {
					return e;
				}
			} else if (e.name !== 'undefined') {
				if(e.name === name) {
					return e;
				}
			}

			
		});

		console.log('target', target);
		console.log('target[0]', target[0]);

		if(target[0].type == 'us') {
			changeUs( target[0], true );

		} else if(target[0].type == 'poi') {
			changePoi( target[0], true);
		}
		

	});

});