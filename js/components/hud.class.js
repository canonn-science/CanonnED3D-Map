
var HUD = {

  'container' : null,
  'initialized' : false,

  /**
   * Called after each batch completes. Only runs full setup once;
   * on subsequent calls just refreshes the per-category counts.
   */
  'init' : function() {

    if (this.initialized) {
      // Just refresh the counts â€” don't re-bind events or re-init controls
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
   * Safe to call repeatedly â€” replaces any existing count span.
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
      '    <div id="system-search-heading"><h2>System Search</h2><button id="file-upload-btn" title="Upload route / journal files"><i class="fa fa-folder-open"></i></button></div>'+
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

    //-- Disable 3D controls when mouse is over either HUD panel
    $( "#hud, #systemDetails" ).hover(
      function() {
        controls.enabled = false;
      }, function() {
        controls.enabled = true;
      }
    );

    //-- Prevent ALL pointer/scroll/click events from leaking through the HUD
    //   panels into OrbitControls.  Must be a DIRECT binding (not delegated)
    //   so stopPropagation fires before the event bubbles to #ed3dmap where
    //   OrbitControls is registered.
    $( '#hud, #systemDetails' ).on(
      'mousedown pointerdown touchstart touchmove touchend wheel click contextmenu',
      function(e) { e.stopPropagation(); }
    );

    $( "#systemDetails" ).hide();

    // -----------------------------------------------------------------------
    // File Upload Dialog
    // -----------------------------------------------------------------------
    (function () {

      // Inject overlay once into the map container
      if (!document.getElementById('file-upload-overlay')) {
        var overlay = document.createElement('div');
        overlay.id = 'file-upload-overlay';
        overlay.innerHTML =
          '<div id="file-upload-dialog">' +
          '  <button id="file-upload-close" title="Close">&times;</button>' +
          '  <h3>Upload Files</h3>' +
          '  <p>Upload your journals or other JSON files that contain system names and coordinates and these will be displayed on the map.</p>' +
          '  <label id="file-upload-drop" for="file-upload-input">' +
          '    <i class="fa fa-cloud-upload"></i>' +
          '    Click or drag &amp; drop JSON files here' +
          '    <input id="file-upload-input" type="file" accept=".json,application/json" multiple>' +
          '  </label>' +
          '  <div id="file-upload-messages"></div>' +
          '</div>';
        document.getElementById('ed3dmap').appendChild(overlay);
      }

      var $overlay  = $('#file-upload-overlay');
      var $drop     = $('#file-upload-drop');
      var $input    = $('#file-upload-input');
      var $messages = $('#file-upload-messages');
      var routeCounter = 0;

      function openDialog() {
        $overlay.addClass('active');
      }
      function closeDialog() {
        $overlay.removeClass('active');
      }

      $('#file-upload-btn').on('click', function (e) {
        e.stopPropagation();
        openDialog();
      });
      $('#file-upload-close').on('click', function (e) {
        e.stopPropagation();
        closeDialog();
      });
      $overlay.on('click', function (e) {
        if (e.target === this) closeDialog();
      });

      // Prevent overlay pointer events leaking to the map
      $overlay.on('mousedown pointerdown touchstart wheel click contextmenu', function (e) {
        e.stopPropagation();
      });

      // Drag & drop styling
      $drop.on('dragover dragenter', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('drag-over');
      });
      $drop.on('dragleave dragend drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('drag-over');
      });
      $drop.on('drop', function (e) {
        var files = e.originalEvent.dataTransfer.files;
        processFiles(files);
      });
      // No manual click handler needed â€” the <label for> wires the input natively.
      $input.on('change', function () {
        processFiles(this.files);
        this.value = '';
      });

      function addMessage(text, type) {
        var $m = $('<div class="fu-msg ' + (type || 'info') + '"></div>').text(text);
        $messages.append($m);
        $messages.scrollTop($messages[0].scrollHeight);
      }

      function setDropLoading(on) {
        if (on) {
          $drop.addClass('loading');
          $drop.find('.fa').hide();
          if (!$drop.find('.fu-spinner').length) {
            $drop.prepend('<span class="fu-spinner"></span><br>');
          }
          $drop.find('.fu-spinner').show();
        } else {
          $drop.removeClass('loading');
          $drop.find('.fu-spinner').remove();
          $drop.find('.fa').show();
        }
      }

      var pendingFiles = 0;

      function processFiles(files) {
        if (!files || files.length === 0) return;
        pendingFiles += files.length;
        setDropLoading(true);
        for (var i = 0; i < files.length; i++) {
          (function (file) {
            addMessage('Reading ' + file.name + '\u2026', 'info');
            var reader = new FileReader();
            reader.onload = function (evt) {
              processRawText(file.name, evt.target.result, fileDone);
            };
            reader.onerror = function () {
              addMessage(file.name + ': Failed to read file.', 'error');
              fileDone();
            };
            reader.readAsText(file);

            function fileDone() {
              if (--pendingFiles === 0) {
                setDropLoading(false);
                var $btn = $('<button class="fu-done-btn">\u2713 Done - click here to close<\/button>');
                $btn.on('click', closeDialog);
                $messages.append($btn);
                $messages.scrollTop($messages[0].scrollHeight);
              }
            }
          })(files[i]);
        }
      }

      function isSpanshRoute(data) {
        return data &&
          typeof data.job       === 'string' &&
          typeof data.state     === 'string' &&
          typeof data.status    === 'string' &&
          data.parameters !== undefined &&
          data.result     !== undefined;
      }

      // A small palette of distinct colours for per-commander routes
      var CMDR_PALETTE = [
        0xFF9D00, 0x00BFFF, 0x7FFF00, 0xFF69B4, 0xDA70D6,
        0x40E0D0, 0xFF6347, 0xADFF2F, 0xFFD700, 0x87CEEB
      ];
      var cmdrColorMap  = {};  // cmdrName -> THREE.Color hex
      var cmdrColorIdx  = 0;

      function cmdrColor(name) {
        if (!cmdrColorMap[name]) {
          cmdrColorMap[name] = CMDR_PALETTE[cmdrColorIdx % CMDR_PALETTE.length];
          cmdrColorIdx++;
        }
        return cmdrColorMap[name];
      }

      function parseJsonl(text) {
        // JSONL: one JSON object per line, blank lines ignored.
        // Also handles the "pretty-printed objects run together" format in the
        // sample (no comma between top-level objects, just whitespace).
        var lines = text.split('\n');
        var results = [];
        var buf = '';
        for (var i = 0; i < lines.length; i++) {
          var l = lines[i].trim();
          if (!l) continue;
          buf += l;
          try {
            results.push(JSON.parse(buf));
            buf = '';
          } catch (e) {
            // incomplete yet – accumulate more lines
          }
        }
        return results;
      }

      function isJournalJsonl(events) {
        // Must be an array of objects and at least one must have an "event" field
        return Array.isArray(events) && events.length > 0 &&
          events.some(function (e) { return e && typeof e.event === 'string'; });
      }

      function isSpanshSearch(data) {
        return data &&
          typeof data.count          === 'number' &&
          typeof data.from           === 'number' &&
          typeof data.search_reference === 'string' &&
          data.reference  !== undefined &&
          Array.isArray(data.results);
      }

      function isNavRoute(data) {
        return data && data.event === 'NavRoute' &&
          Array.isArray(data.Route) && data.Route.length > 0 &&
          Array.isArray(data.Route[0].StarPos);
      }

      function handleParsedFile(filename, data, done) {
        if (isSpanshSearch(data)) {
          displaySpanshSearch(filename, data, done);
          return;
        }
        if (isNavRoute(data)) {
          var jumps = data.Route.map(function (s) {
            return { system: s.StarSystem, x: s.StarPos[0], y: s.StarPos[1], z: s.StarPos[2] };
          });
          var from = jumps[0].system;
          var to   = jumps[jumps.length - 1].system;
          displaySpanshRoute(filename, from, to, jumps, done);
          return;
        }
        if (isSpanshRoute(data)) {
          if (data.state !== 'completed' || data.status !== 'ok') {
            addMessage(filename + ': Spansh route is not yet completed (state: ' + data.state + ').', 'error');
            done();
            return;
          }

          // Determine from/to — may be in result or parameters depending on format
          var fromSys = (data.result && data.result.source_system) ||
                        (data.parameters && data.parameters.source_system) || '';
          var toSys   = (data.result && data.result.destination_system) ||
                        (data.parameters && data.parameters.destination_system) || '';

          // Format A: result.system_jumps — each jump has a 'system' field
          var jumps = data.result && data.result.system_jumps;

          // Format B: result.jumps — each jump has a 'name' field; normalise to format A
          if (!jumps || jumps.length === 0) {
            var rawJumps = data.result && data.result.jumps;
            if (rawJumps && rawJumps.length > 0) {
              jumps = rawJumps.map(function (j) {
                return { system: j.name, x: j.x, y: j.y, z: j.z };
              });
            }
          }

          if (!jumps || jumps.length === 0) {
            addMessage(filename + ': Spansh route has no system jumps.', 'error');
            done();
            return;
          }
          displaySpanshRoute(filename, fromSys, toSys, jumps, done);
        } else {
          addMessage(filename + ': Unrecognised file format. Expected a Spansh neutron-router route JSON.', 'error');
          done();
        }
      }

      // Overridden below to also handle raw JSONL text
      var _handleParsedFile = handleParsedFile;

      function processRawText(filename, text, done) {
        // Try JSONL first
        var events = parseJsonl(text);
        if (isJournalJsonl(events)) {
          // A single NavRoute event parses as a one-element JSONL array but
          // should be handled as a plain JSON object, not a journal log.
          if (events.length === 1 && isNavRoute(events[0])) {
            handleParsedFile(filename, events[0], done);
            return;
          }
          handleJournalEvents(filename, events, done);
          return;
        }
        // Fall back to standard JSON object
        var data;
        try { data = JSON.parse(text); } catch (e) {
          addMessage(filename + ': Not valid JSON \u2014 ' + e.message, 'error');
          done(); return;
        }
        handleParsedFile(filename, data, done);
      }

      function handleJournalEvents(filename, events, done) {
        // Collect per-commander system lists
        var cmdrs = {};          // name -> [{ system, x, y, z }]
        var currentCmdr = 'Unknown';

        events.forEach(function (ev) {
          if (!ev || typeof ev.event !== 'string') return;
          if (ev.event === 'Commander' && ev.Name) {
            currentCmdr = ev.Name;
          }
          if ((ev.event === 'FSDJump' || ev.event === 'Location' || ev.event === 'CarrierJump') &&
              ev.StarSystem && Array.isArray(ev.StarPos) && ev.StarPos.length === 3) {
            if (!cmdrs[currentCmdr]) cmdrs[currentCmdr] = [];
            var last = cmdrs[currentCmdr];
            // Deduplicate consecutive identical systems
            if (!last.length || last[last.length - 1].system !== ev.StarSystem) {
              last.push({ system: ev.StarSystem, x: ev.StarPos[0], y: ev.StarPos[1], z: ev.StarPos[2] });
            }
          }
        });

        var cmdrNames = Object.keys(cmdrs);
        if (cmdrNames.length === 0) {
          addMessage(filename + ': No FSDJump/Location events with coordinates found.', 'error');
          done(); return;
        }

        // Display each commander sequentially
        var ci = 0;
        function nextCmdr() {
          if (ci >= cmdrNames.length) { done(); return; }
          var cmdrName = cmdrNames[ci++];
          var systems  = cmdrs[cmdrName];
          addMessage(filename + ' \u2014 Commander ' + cmdrName + ': ' + systems.length + ' systems.', 'info');
          displayJournalRoute(filename, cmdrName, systems, nextCmdr);
        }
        nextCmdr();
      }

      function displayJournalRoute(filename, cmdrName, systems, done) {
        var idx   = ++routeCounter;
        var name  = 'journal-route-' + idx;
        var color = cmdrColor(cmdrName);

        if (!System.particleGeo) System.initParticleSystem();

        var $status = $('<div class="fu-msg info"></div>').text('Adding ' + cmdrName + '\u2026');
        $messages.append($status);
        $messages.scrollTop($messages[0].scrollHeight);

        var i = 0;
        function addNext() {
          if (i < systems.length) {
            var s = systems[i++];
            System.create({ name: s.system, coords: { x: s.x, y: s.y, z: s.z } });
            $status.text('[' + i + '/' + systems.length + '] ' + cmdrName + ': ' + s.system);
            $messages.scrollTop($messages[0].scrollHeight);
            setTimeout(addNext, 0);
          } else {
            finishJournalRoute();
          }
        }

        function finishJournalRoute() {
          System.endParticleSystem();

          if (systems.length > 1) {
            var geo = new THREE.Geometry();
            systems.forEach(function (s) {
              geo.vertices.push(new THREE.Vector3(s.x, s.y, -s.z));
            });
            var lineMat = new THREE.LineBasicMaterial({ color: color });
            var line    = new THREE.Line(geo, lineMat);
            line.name   = name;
            scene.add(line);
          }

          $status.removeClass('info').addClass('success')
            .text(cmdrName + ': ' + systems.length + ' systems plotted.');
          $messages.scrollTop($messages[0].scrollHeight);
          done();
        }

        addNext();
      }

      function displaySpanshSearch(filename, data, done) {
        // Deduplicate by system_name — multiple bodies can share the same system
        var seen = {};
        var systems = [];
        data.results.forEach(function (r) {
          if (r.system_name && !seen[r.system_name]) {
            seen[r.system_name] = true;
            systems.push({ system: r.system_name, x: r.system_x, y: r.system_y, z: r.system_z });
          }
        });

        if (systems.length === 0) {
          addMessage(filename + ': Spansh search result has no systems.', 'error');
          done(); return;
        }

        if (!System.particleGeo) System.initParticleSystem();

        var ref = data.reference ? data.reference.name : '';
        var $status = $('<div class="fu-msg info"></div>').text('Adding systems\u2026');
        $messages.append($status);
        $messages.scrollTop($messages[0].scrollHeight);

        var i = 0;
        function addNext() {
          if (i < systems.length) {
            var s = systems[i++];
            System.create({ name: s.system, coords: { x: s.x, y: s.y, z: s.z } });
            $status.text('[' + i + '/' + systems.length + '] ' + s.system);
            $messages.scrollTop($messages[0].scrollHeight);
            setTimeout(addNext, 0);
          } else {
            System.endParticleSystem();
            $status.removeClass('info').addClass('success')
              .text(filename + ': Loaded \u2014 ' + systems.length + ' system(s)' +
                    (ref ? ' near ' + ref : '') + ' (results ' +
                    data.from + '\u2013' + (data.from + systems.length - 1) +
                    ' of ' + data.count + ').');
            $messages.scrollTop($messages[0].scrollHeight);
            done();
          }
        }
        addNext();
      }

      function displaySpanshRoute(filename, from, to, jumps, done) {
        var idx  = ++routeCounter;
        var name = 'spansh-route-' + idx;

        // Ensure the particle system is ready (it should be after initial load)
        if (!System.particleGeo) System.initParticleSystem();

        // Live status line that updates with each system name
        var $status = $('<div class="fu-msg info"></div>').text('Adding systems\u2026');
        $messages.append($status);
        $messages.scrollTop($messages[0].scrollHeight);

        // Add systems one at a time yielding to the browser between each so
        // the status line and spinner actually repaint.
        var i = 0;
        function addNext() {
          if (i < jumps.length) {
            var jump = jumps[i++];
            System.create({
              name: jump.system,
              coords: { x: jump.x, y: jump.y, z: jump.z }
            });
            $status.text('[' + i + '/' + jumps.length + '] ' + jump.system);
            $messages.scrollTop($messages[0].scrollHeight);
            setTimeout(addNext, 0);
          } else {
            // All systems added â€” flush particles and draw the route line
            finishRoute();
          }
        }

        function finishRoute() {
          // Flush particles first so the new systems appear
          System.endParticleSystem();

          // Build a line through all jump coordinates.
          // The scene uses negated Z (same convention as System.create).
          var geo = new THREE.Geometry();
          jumps.forEach(function (jump) {
            geo.vertices.push(new THREE.Vector3(jump.x, jump.y, -jump.z));
          });

          var lineMat = new THREE.LineBasicMaterial({ color: 0xFF9D00 });
          var line = new THREE.Line(geo, lineMat);
          line.name = name;
          scene.add(line);

          // Replace the live status line with a final success message
          $status.removeClass('info').addClass('success')
            .text(filename + ': Loaded \u2014 ' + jumps.length + ' jumps from \u201c' + from + '\u201d to \u201c' + to + '\u201d.');
          $messages.scrollTop($messages[0].scrollHeight);
          done();
        }

        addNext();
      }

    })();

    //-- Add Count filters (initial pass â€” use updateFilterCounts for subsequent updates)
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
   * Init filter list â€” safe to call multiple times with growing category sets.
   * New groups and items are appended; existing ones are skipped.
   */

  'initFilters' : function(categories) {

    Loader.update('HUD Filter...');

    // Ensure we have a stable map of typeFilter â†’ groupId so we can
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
        // System already on map â€” navigate to it
        var selPoint = System.particleGeo.vertices[existingIndex];
        if (!selPoint.infos) selPoint.infos = infoHtml;
        Action.moveToObj(existingIndex, selPoint);
      } else {
        // System not on map â€” add it as a new pin then navigate
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

