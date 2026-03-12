
var HUD = {

  'container' : null,
  'initialized' : false,

  /**
   * Called after each batch completes. Only runs full setup once;
   * on subsequent calls just refreshes the per-category counts.
   */
  'init' : function() {

    if (this.initialized) {
      // Just refresh the counts — don't re-bind events or re-init controls
      this.updateFilterCounts();
      return;
    }
    this.initialized = true;
    Loader.update('Init HUD');
    this.initHudAction();
    this.initControls();

  },

  /**
   * Update the (count) suffix on each filter label in place.
   * Safe to call repeatedly — replaces any existing count span.
   */
  'updateFilterCounts' : function() {
    $('.map_filter').each(function() {
      var idCat = $(this).data('filter');
      var count = (Ed3d.catObjs[idCat] && Ed3d.catObjs[idCat].length) || 0;
      $(this).find('.filter-count').remove();
      if (count > 1) {
        $(this).append('<span class="filter-count"> ('+count+')</span>');
      }
    });
  },

  /**
   *
   */
  'create' : function(container) {

    this.container = container;

    if(!$('#'+this.container+' #controls').length && Ed3d.withOptionsPanel == true) {

      $('#'+this.container).append(
        '  <div id="controls">'+
        '    <a data-view="3d" class="view selected">3D</a>'+
        '    <a data-view="top" class="view">2D</a>'+
        //'    <a data-view="top" class="view">RED</a>'+  // TMP route edit button
        '    <a data-view="infos" class="'+(Ed3d.showGalaxyInfos ? 'selected' : '')+'">i</a>'+
        '    <a data-view="options">'+Ico.cog+'</a>'+
        '    <div id="options" style="display:none;"></div>'+
        '  </div>'
      );
      this.createSubOptions();

      //-- Optionnal button to go fuulscreen

      if(Ed3d.withFullscreenToggle) {
        $( "<a></a>" )
          .attr("id", "tog-fullscreen" )
          .html('Fullscreen')
          .click(function() {
            $('#'+container).toggleClass('map-fullscreen');
            refresh3dMapSize();
          })
          .prependTo( "#controls" );
      }


    }

    if(!Ed3d.withHudPanel) return;

    $('#'+this.container).append('<div id="hud"></div>');
    $('#hud').append(
      '<div>'+
      '    <h2>Infos</h2>'+
      '     Dist. Sol <span id="distsol"></span>'+
      '    <div id="coords" class="coords">'+
      '      <span id="cx"></span><span id="cy"></span><span id="cz"></span></div>'+
      '      <p id="infos"></p>'+
      '    </div>'+
      '  <div id="system-search">'+
      '    <h2>System Search</h2>'+
      '    <div id="system-search-wrap">'+
      '      <input type="text" id="system-search-input" placeholder="System name..." autocomplete="off" />'+
      '      <ul id="system-search-results"></ul>'+
      '    </div>'+
      '  </div>'+
      '  <div id="filters">'+
      '  </div>'+
      '</div>'
    );

    // Append HUD toggle button as a sibling to #hud inside the container
    $('#'+this.container).append(
      '<button id="hud-toggle" title="Collapse panel" aria-label="Collapse panel" aria-expanded="true">'+
      '<i class="fa fa-chevron-left"></i>'+
      '</button>'
    );

    var addClass = (Ed3d.popupDetail ? 'class="popup-detail"' : '');
    $('#'+this.container).append('<div id="systemDetails" style="display:none;"'+addClass+'></div>');

  },

  /**
   * Create option panel
   */
  'createSubOptions' : function() {

    //-- Toggle milky way
    $( "<a></a>" )
      .addClass( "sub-opt active" )
      .html('Toggle Milky Way')
      .click(function() {
        var state = Galaxy.milkyway[0].visible;
        Galaxy.milkyway[0].visible = !state;
        Galaxy.milkyway[1].visible = !state;
        Galaxy.milkyway2D.visible  = !state;
        $(this).toggleClass('active');
      })
      .appendTo( "#options" );

    //-- Toggle Grid
    $( "<a></a>" )
      .addClass( "sub-opt active" )
      .html('Toggle grid')
      .click(function() {
        Ed3d.grid1H.toggleGrid();
        Ed3d.grid1K.toggleGrid();
        Ed3d.grid1XL.toggleGrid();
        $(this).toggleClass('active');
      })
      .appendTo( "#options" );

  },

  /**
   * Controls init for camera views
   */
  'initControls' : function() {

    $('#controls a').click(function(e) {

      if($(this).hasClass('view')) {
        $('#controls a.view').removeClass('selected')
        $(this).addClass('selected');
      }

      var view = $(this).data('view');


      switch(view) {

        case 'top':
          Ed3d.isTopView = true;
          var moveFrom = {x: camera.position.x, y: camera.position.y , z: camera.position.z};
          var moveCoords = {x: controls.target.x, y: controls.target.y+500, z: controls.target.z};
          HUD.moveCamera(moveFrom,moveCoords);
          break;

        case '3d':
          Ed3d.isTopView = false;
          var moveFrom = {x: camera.position.x, y: camera.position.y , z: camera.position.z};
          var moveCoords = {x: controls.target.x-100, y: controls.target.y+500, z: controls.target.z+500};
          HUD.moveCamera(moveFrom,moveCoords);
          break;

        case 'infos':
          if(!Ed3d.showGalaxyInfos) {
            Ed3d.showGalaxyInfos = true;
            Galaxy.infosShow();
          } else {
            Ed3d.showGalaxyInfos = false;
            Galaxy.infosHide();
          }
          $(this).toggleClass('selected');
          break;

        case 'options':
          $('#options').toggle();
          break;

      }




    });

  },

  /**
   * Move camera to a target
   */
  'moveCamera' : function(from, to) {

    Ed3d.tween = new TWEEN.Tween(from, {override:true}).to(to, 800)
      .start()
      .onUpdate(function () {
        camera.position.set(from.x, from.y, from.z);
      })
      .onComplete(function () {
        controls.update();
      });

  },

  /**
   *
   */
  'initHudAction' : function() {

    //-- HUD panel toggle button
    (function() {
      var $toggle = $('#hud-toggle');

      function getActivePanel() {
        return $('#systemDetails').is(':visible') ? $('#systemDetails') : $('#hud');
      }

      function syncTogglePosition(animate) {
        var $panel     = getActivePanel();
        var collapsed  = $panel.hasClass('hud-collapsed');
        var targetLeft = collapsed ? 0 : $panel.outerWidth();
        if (animate) {
          $toggle.css('left', targetLeft + 'px');
        } else {
          $toggle.css({ transition: 'none', left: targetLeft + 'px' });
          setTimeout(function() { $toggle.css('transition', ''); }, 50);
        }
      }

      // Expose so openHudDetails / closeHudDetails can reposition the button
      HUD.repositionToggle = function(animate) {
        syncTogglePosition(animate !== false);
      };

      // Set initial position without animation
      syncTogglePosition(false);

      $toggle.on('click touchend', function(e) {
        e.preventDefault();
        var $panel   = getActivePanel();
        var collapsed = $panel.toggleClass('hud-collapsed').hasClass('hud-collapsed');
        $toggle.attr('aria-expanded', collapsed ? 'false' : 'true');
        $toggle.attr('title', collapsed ? 'Expand panel' : 'Collapse panel');
        $toggle.attr('aria-label', collapsed ? 'Expand panel' : 'Collapse panel');
        $toggle.find('i')
          .toggleClass('fa-chevron-left', !collapsed)
          .toggleClass('fa-chevron-right', collapsed);
        syncTogglePosition(true);
      });
    })();

    //-- Disable 3D controls when mouse hover the Hud
    $( "canvas" ).hover(
      function() {
        controls.enabled = true;
      }, function() {
        controls.enabled = false;
      }
    );

    //-- Disable 3D controls when mouse hover the Hud
    $( "#hud" ).hover(
      function() {
        controls.enabled = false;
      }, function() {
        controls.enabled = true;
      }
    );

    //-- Prevent map drag starting when interacting with the HUD panel
    $( document ).on('mousedown pointerdown touchstart', '#hud, #systemDetails', function(e) {
      e.stopPropagation();
    });

    $( "#systemDetails" ).hide();

    //-- Add Count filters (initial pass — use updateFilterCounts for subsequent updates)
    HUD.updateFilterCounts();

    //-- Add map filters (delegated so dynamically-added filters also respond)
    $('#filters').on('click', '.map_filter', function(e) {
      e.preventDefault();
      var idCat = $(this).data('filter');
      var active = $(this).data('active');
      active = (Math.abs(active-1));

      //------------------------------------------------------------------------
      //-- Single item by once

      if(!Ed3d.hudMultipleSelect) {

        $('.map_filter').addClass('disabled');

        //-- Toggle systems particles
        $(System.particleGeo.vertices).each(function(index, point) {
          point.visible  = 0;
          point.filtered = 0;
          System.particleGeo.colors[index] = new THREE.Color('#111111');
          active = 1;
        });


        //-- Toggle routes
        if(Ed3d.catObjsRoutes.length>0)
        $(Ed3d.catObjsRoutes).each(function(indexCat, listGrpRoutes) {
          if(listGrpRoutes != undefined)
            $(listGrpRoutes).each(function(key, indexRoute) {
              scene.getObjectByName( indexRoute ).visible  = false;
              if(scene.getObjectByName( indexRoute+'-first' ) != undefined)
                scene.getObjectByName( indexRoute+'-first' ).visible  = false;
              if(scene.getObjectByName( indexRoute+'-last' ) != undefined)
                scene.getObjectByName( indexRoute+'-last' ).visible  = false;
            });
        });

      }

      //------------------------------------------------------------------------
      //-- multiple select

      var center = null;
      var nbPoint = 0;
      var pointFar = null;

      //-- Toggle routes

      if(Ed3d.catObjsRoutes.length>0)
      $(Ed3d.catObjsRoutes[idCat]).each(function(key, indexRoute) {
        var isVisible = scene.getObjectByName( indexRoute ).visible;
        if(isVisible == undefined) isVisible = true;
        isVisible = (isVisible ? false : true);
        scene.getObjectByName( indexRoute ).visible  = isVisible;
        if(scene.getObjectByName( indexRoute+'-first' ) != undefined)
          scene.getObjectByName( indexRoute+'-first' ).visible  = isVisible;
        if(scene.getObjectByName( indexRoute+'-last' ) != undefined)
          scene.getObjectByName( indexRoute+'-last' ).visible  = isVisible;
      });

      //-- Toggle systems particles

      $(Ed3d.catObjs[idCat]).each(function(key, indexPoint) {

        obj = System.particleGeo.vertices[indexPoint];

        System.particleGeo.colors[indexPoint] = (active==1)
          ? obj.color
          : new THREE.Color('#111111');

        obj.visible = (active==1);
        obj.filtered = (active==1);

        System.particleGeo.colorsNeedUpdate = true;

        //-- Sum coords to detect the center & detect the most far point
        if(center == null) {
          center   = new THREE.Vector3(obj.x, obj.y, obj.z);
          pointFar = new THREE.Vector3(obj.x, obj.y, obj.z);
        } else {
          center.set(
            (center.x + obj.x),
            (center.y + obj.y),
            (center.z + obj.z)
          );
          if(
            (Math.abs(pointFar.x) - Math.abs(obj.x))+
            (Math.abs(pointFar.y) - Math.abs(obj.y))+
            (Math.abs(pointFar.z) - Math.abs(obj.z)) < 0
          ) {
            pointFar.set(obj.x, obj.y, obj.z);
          }
        }
        nbPoint++;

      });

      if(nbPoint==0) return;

      //------------------------------------------------------------------------
      //-- Calc center of all selected points

      center.set(
        Math.round(center.x/nbPoint),
        Math.round(center.y/nbPoint),
        -Math.round(center.z/nbPoint)
      );

      $(this).data('active',active);
      $(this).toggleClass('disabled');

      //-- If current selection is no more visible, disable active selection
      if(Action.oldSel != null && !Action.oldSel.visible) Action.disableSelection();

      //-- Calc max distance from center of selection
      var distance = pointFar.distanceTo( center )+200;

      //-- Set new camera & target position
      //Ed3d.playerPos = [center.x,center.y,center.z];
      //Ed3d.cameraPos = [
      //  center.x + (Math.floor((Math.random() * 100) + 1)-50), //-- Add a small rotation effect
      //  center.y + distance,
      //  center.z - distance
      //];

      //Action.moveInitalPosition();
    });


    //-- Add map link (delegated)
    $('#hud').on('click', '.map_link', function(e) {

      e.preventDefault();
      var elId = $(this).data('route');
      Action.moveToObj(routes[elId]);
    });

    $('#hud').on('click', '.map_link span', function(e) {

      e.preventDefault();

      var elId = $(this).parent().data('route');
      routes[elId].visible = !routes[elId].visible;
    });

    HUD.initSystemSearch();

  },


  /**
   * Init filter list — safe to call multiple times with growing category sets.
   * New groups and items are appended; existing ones are skipped.
   */

  'initFilters' : function(categories) {

    Loader.update('HUD Filter...');

    // Ensure we have a stable map of typeFilter → groupId so we can
    // append new items into the correct existing group on subsequent calls.
    if (!HUD.filterGroupIds) HUD.filterGroupIds = {};
    var grpNb = Object.keys(HUD.filterGroupIds).length + 1;

    $.each(categories, function(typeFilter, values) {

      if(typeof values === "object" ) {

        var groupId;
        var isNewGroup = !HUD.filterGroupIds[typeFilter];

        if (isNewGroup) {
          // Create the group header and container
          groupId = 'group_' + grpNb;
          HUD.filterGroupIds[typeFilter] = groupId;
          $('#filters').append('<h2>'+typeFilter+'</h2>');
          $('#filters').append('<div id="'+groupId+'"></div>');
          grpNb++;
        } else {
          groupId = HUD.filterGroupIds[typeFilter];
        }

        var nbFilters = values.length;
        var count = isNewGroup ? 0 : $('#' + groupId + ' .filter').length;
        var visible = true;
        var addedAny = false;

        $.each(values, function(key, val) {

          // Skip items already registered
          if (Ed3d.catObjs[key] !== undefined) return;

          visible = true;

          //-- Manage view limit if activated
          if(Ed3d.categoryAutoCollapseSize !== false) {
            count++;
            if(count>Ed3d.categoryAutoCollapseSize) visible = false;
          }

          //-- Add filter
          HUD.addFilter(groupId, key, val, visible);
          Ed3d.catObjs[key] = [];
          addedAny = true;

        });

        // Add/update the "See more" toggle if needed
        if (addedAny && visible == false && $('#'+groupId+' .show_childs').length === 0) {
          $('#'+groupId).append(
            '<a class="show_childs">'+
            '+ See more' +
            '</a>'
          ).click(function(){
            HUD.expandFilters(groupId);
          });
        }
      }

    });


  },

  /**
   * Expand filter
   */

  /**
   * System typeahead search
   */
  'initSystemSearch' : function() {

    var currentSuggestions = [];
    var debounceTimer = null;
    var activeIndex = -1;

    function getApiUrl(q) {
      var encoded = encodeURIComponent(q);
      return 'https://us-central1-canonn-api-236217.cloudfunctions.net/query/typeahead?q=' + encoded;
    }

    function closeResults() {
      $('#system-search-results').hide().empty();
      activeIndex = -1;
    }

    function selectSystem(name) {
      // Case-insensitive match in fetched suggestions
      var nameLower = name.toLowerCase();
      var found = null;
      for (var i = 0; i < currentSuggestions.length; i++) {
        if (currentSuggestions[i].name.toLowerCase() === nameLower) {
          found = currentSuggestions[i];
          break;
        }
      }
      if (!found) return;

      $('#system-search-input').val(found.name);
      closeResults();

      // Check if system already exists on the map (case-insensitive)
      var existingIndex = -1;
      if (System.particleGeo !== null) {
        var verts = System.particleGeo.vertices;
        for (var j = 0; j < verts.length; j++) {
          if (verts[j].name && verts[j].name.toLowerCase() === nameLower) {
            existingIndex = j;
            break;
          }
        }
      }

      var infoHtml = '<a href="https://signals.canonn.tech/?system=' +
        encodeURIComponent(found.name) + '" target="_blank">View on Signals</a>';

      if (existingIndex >= 0) {
        // System already on map — navigate to it
        var selPoint = System.particleGeo.vertices[existingIndex];
        if (!selPoint.infos) selPoint.infos = infoHtml;
        Action.moveToObj(existingIndex, selPoint);
      } else {
        // System not on map — add it as a new pin then navigate
        System.create({
          name: found.name,
          coords: { x: found.x, y: found.y, z: found.z },
          infos: infoHtml
        });
        System.endParticleSystem();
        var newIndex = System.particleGeo.vertices.length - 1;
        var newPoint = System.particleGeo.vertices[newIndex];
        Action.moveToObj(newIndex, newPoint);
      }
    }

    $(document).on('input', '#system-search-input', function() {
      clearTimeout(debounceTimer);
      var q = $(this).val().trim();
      if (q.length < 2) {
        closeResults();
        return;
      }
      debounceTimer = setTimeout(function() {
        $.getJSON(getApiUrl(q), function(data) {
          currentSuggestions = (data && data.min_max) ? data.min_max : [];
          var values = (data && data.values) ? data.values : [];
          var $ul = $('#system-search-results');
          $ul.empty();
          if (values.length === 0) {
            $ul.hide();
            return;
          }
          $.each(values, function(i, name) {
            $('<li/>').text(name).on('click', function() {
              selectSystem($(this).text());
            }).appendTo($ul);
          });
          activeIndex = -1;
          $ul.show();
        });
      }, 300);
    });

    $(document).on('keydown', '#system-search-input', function(e) {
      var $items = $('#system-search-results li');
      if (!$items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, $items.length - 1);
        $items.removeClass('active').eq(activeIndex).addClass('active');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        $items.removeClass('active').eq(activeIndex).addClass('active');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0) {
          selectSystem($items.eq(activeIndex).text());
        } else if ($items.length > 0) {
          selectSystem($items.first().text());
        }
      } else if (e.key === 'Escape') {
        closeResults();
      }
    });

    $(document).on('click', function(e) {
      if (!$(e.target).closest('#system-search-wrap').length) {
        closeResults();
      }
    });

  },

  'expandFilters' : function(groupId) {

    $('#'+groupId)
      .addClass('open');

    $('#hud').addClass('enlarge');


  },

  /**
   * Remove filters list
   */

  'removeFilters' : function() {

    $('#hud #filters').html('');

  },


  /**
   *
   */
  'addFilter' : function(groupId, idCat, val, visible) {

    //-- Add material, if custom color defined, use it
    var back = '#fff';
    var addClass = '';

    if(val.color != undefined) {
      Ed3d.addCustomMaterial(idCat, val.color);
      back = '#'+val.color;
    }

    if(!visible) {
      addClass += ' hidden';
    }

    //-- Add html link
    $('#'+groupId).append(
      '<a class="map_filter'+addClass+'" data-active="1" data-filter="' + idCat + '">'+
      '<span class="check" style="background:'+back+'"> </span>' + val.name +
      '</a>'
    );
  },

  /**
   *
   */
  'openHudDetails' : function() {
    $('#hud').hide();
    $('#systemDetails').removeClass('hud-collapsed').show().hover(
      function() {
        controls.enabled = false;
      }, function() {
        controls.enabled = true;
      }
    );
    // Restore toggle icon to open state and reposition against the detail panel
    var $toggle = $('#hud-toggle');
    $toggle.attr('aria-expanded', 'true')
           .attr('title', 'Collapse panel')
           .attr('aria-label', 'Collapse panel')
           .find('i').removeClass('fa-chevron-right').addClass('fa-chevron-left');
    if (HUD.repositionToggle) HUD.repositionToggle(true);
  },
  /**
   *
   */
  'closeHudDetails' : function() {
    $('#systemDetails').hide().removeClass('hud-collapsed');
    $('#hud').removeClass('hud-collapsed').show();
    // Restore toggle icon and reposition against the main hud panel
    var $toggle = $('#hud-toggle');
    $toggle.attr('aria-expanded', 'true')
           .attr('title', 'Collapse panel')
           .attr('aria-label', 'Collapse panel')
           .find('i').removeClass('fa-chevron-right').addClass('fa-chevron-left');
    if (HUD.repositionToggle) HUD.repositionToggle(false);
  },

  /**
   * Create a Line route
   */
  'setRoute' : function(idRoute, nameR) {
    $('#routes').append('<a class="map_link" data-route="' + idRoute + '"><span class="check"> </span>' + nameR + '</a>');
  },



  /**
   *
   */

  'setInfoPanel' : function(index, point) {

    var html =
      '<h2>'+point.name+'</h2>'+
      '<div class="coords">'+
      '  <span>'+point.x+'</span><span>'+point.y+'</span><span>'+(-point.z)+'</span>'+
      '</div>'+
      (point.infos != undefined && point.infos !== '' ? '<div>'+point.infos+'</div>' : '')+
      '<div class="hover-distance"></div>'+
      '<div id="nav">'+
      '</div>';

    $('#systemDetails').html(html);

    //-- Add navigation

    $('<a/>', {'html': '<'})
    .click(function(){Action.moveNextPrev(index-1, -1);})
    .appendTo("#nav");

    $('<a/>', {'html': 'X'})
    .click(function(){HUD.closeHudDetails();})
    .appendTo("#nav");

    $('<a/>', {'html': '>'})
    .click(function(){Action.moveNextPrev(index+1, 1);})
    .appendTo("#nav");

  },


  /**
   * Add Shape text
   */

  'addText' : function(id, textShow, x, y, z, size, addToObj, isPoint) {

    if(addToObj == undefined) addToObj = scene;
    if(isPoint == undefined) isPoint = false;

    var textShapes = THREE.FontUtils.generateShapes(textShow, {
      'font': 'helvetiker',
      'weight': 'normal',
      'style': 'normal',
      'size': size,
      'curveSegments': 100
    });

    var textGeo = new THREE.ShapeGeometry(textShapes);

    if(Ed3d.textSel[id] == undefined) {
      var textMesh = new THREE.Mesh(textGeo, new THREE.MeshBasicMaterial({
        color: 0xffffff
      }));
    } else {
      var textMesh = Ed3d.textSel[id];
    }

    textMesh.geometry = textGeo;
    textMesh.geometry.needsUpdate = true;

    if(isPoint) {
      textMesh.position.set(addToObj.x, addToObj.y, addToObj.z);
      textMesh.name = id;
      scene.add(textMesh);
    } else {
      textMesh.position.set(x, y, z);
      addToObj.add(textMesh);
    }

    Ed3d.textSel[id] = textMesh;

  },

  /**
   * Add Shape text
   */

  'rotateText' : function(id) {

    //y = -Math.abs(y);

    if(Ed3d.textSel[id] != undefined)
      if(Ed3d.isTopView) {
        Ed3d.textSel[id].rotation.set(-Math.PI/2,0,0);
      } else {
        Ed3d.textSel[id].rotation.x = 0;
        Ed3d.textSel[id].rotation.y = camera.rotation.y;
        Ed3d.textSel[id].rotation.z = 0;
      }

  }
}