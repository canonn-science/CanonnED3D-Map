// MapData-multifaction.js
// Displays systems for multiple factions from the Spansh factions.json.gz dump.
// URL parameter: factions=Faction One,Faction Two,...

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.href);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Distinct colour pairs [controlled, present] per faction slot
const factionColorPairs = [
	['FF2400', 'FF9D80'], // Red / Salmon
	['1569C7', '7EC8E3'], // Blue / Sky
	['4AA02C', 'A8EB6A'], // Green / Lime
	['C68B17', 'FFDB58'], // Brown / Mustard
	['7D1B7E', 'E580E5'], // Purple / Light Purple
	['1B8A8E', '5EEDED'], // Teal / Pale Teal
	['E56717', 'F9A870'], // Orange / Peach
	['6A287E', 'C88ADB'], // Violet / Lavender
	['CC6600', 'F0A050'], // Dark Orange / Light Orange
	['006400', '90EE90'], // Dark Green / Light Green
	['8B0000', 'FA8072'], // Dark Red / Salmon
	['00008B', '6495ED'], // Dark Blue / Cornflower
];

var canonnEd3d_multifaction = {

	systemsData: {
		categories: {},
		systems: [],
		routes: [],
	},

	// Pre-built index: lowercase system name → [{name, allegiance, government, isControlling}]
	// Populated at load time from the full Spansh dump for fast O(1) click-time lookups.
	systemFactionIndex: {},

	/**
	 * Fetch a .json.gz URL and return the parsed JSON using the browser
	 * DecompressionStream API (supported in Chrome 80+, Firefox 113+, Edge 80+).
	 */
	fetchGzJson: async function (url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Failed to fetch ' + url + ' – status ' + response.status);
		}

		const ds = new DecompressionStream('gzip');
		const decompressedStream = response.body.pipeThrough(ds);
		const reader = decompressedStream.getReader();

		const chunks = [];
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			chunks.push(value);
		}

		// Concatenate all chunks into a single Uint8Array
		const totalLength = chunks.reduce(function (acc, chunk) { return acc + chunk.length; }, 0);
		const combined = new Uint8Array(totalLength);
		let offset = 0;
		chunks.forEach(function (chunk) {
			combined.set(chunk, offset);
			offset += chunk.length;
		});

		return JSON.parse(new TextDecoder().decode(combined));
	},

	init: async function () {
		const factionsParam = getUrlParameter('factions');

		if (!factionsParam) {
			console.warn('multifaction: no "factions" URL parameter supplied.');
			document.getElementById('loading').style.display = 'none';
			return;
		}

		// Special case: factions=All — plot every faction's systems but only
		// show filter categories for Canonn and Canonn Deep Space Research.
		const isAllMode = factionsParam.trim().toLowerCase() === 'all';
		canonnEd3d_multifaction.isAllMode = isAllMode;

		// The factions that always get their own colour-coded filter categories
		const CATEGORY_FACTIONS = ['Canonn', 'Canonn Deep Space Research'];

		// Build a lookup map of lower-case name -> original requested name
		const requestedNames = isAllMode ? CATEGORY_FACTIONS : factionsParam.split(',').map(function (s) { return s.trim(); });
		const requestedLower = {};
		requestedNames.forEach(function (n) { requestedLower[n.toLowerCase()] = n; });

		try {
			// The Spansh dump is a JSON array of faction objects
			const allFactions = await canonnEd3d_multifaction.fetchGzJson(
				'https://downloads.spansh.co.uk/factions.json.gz'
			);

			// Store all faction names (sorted, case-insensitive) for the search UI
			canonnEd3d_multifaction.allFactionNames = allFactions
				.map(function (f) { return f.name; })
				.sort(function (a, b) { return a.toLowerCase().localeCompare(b.toLowerCase()); });

			// The factions that get colour-coded filter categories in the sidebar
			const categoryFactions = allFactions.filter(function (f) {
				return requestedLower.hasOwnProperty(f.name.toLowerCase());
			});

			if (!isAllMode && categoryFactions.length === 0) {
				console.warn('multifaction: none of the requested factions were found in the dump.');
				document.getElementById('loading').style.display = 'none';
				return;
			}

			// Build a map of faction name → {controlledKey, presentKey} for the category factions
			var categoryKeyMap = {};
			categoryFactions.forEach(function (faction, idx) {
				const colors = factionColorPairs[idx % factionColorPairs.length];
				const controlledKey = 'f' + idx + 'c';
				const presentKey    = 'f' + idx + 'p';

				canonnEd3d_multifaction.systemsData.categories[faction.name] = {};
				canonnEd3d_multifaction.systemsData.categories[faction.name][controlledKey] = {
					name: 'Controlled',
					color: colors[0],
				};
				canonnEd3d_multifaction.systemsData.categories[faction.name][presentKey] = {
					name: 'Present',
					color: colors[1],
				};
				categoryKeyMap[faction.name.toLowerCase()] = { controlledKey: controlledKey, presentKey: presentKey };
			});

			// In All mode add a catch-all category for every other faction's systems
			var otherControlledKey = 'other_c';
			var otherPresentKey    = 'other_p';
			if (isAllMode) {
				canonnEd3d_multifaction.systemsData.categories['Other Factions'] = {};
				canonnEd3d_multifaction.systemsData.categories['Other Factions'][otherControlledKey] = {
					name: 'Controlled',
					color: '666666',
				};
				canonnEd3d_multifaction.systemsData.categories['Other Factions'][otherPresentKey] = {
					name: 'Present',
					color: '444444',
				};
			}

			// Which factions to plot on the map:
			// In All mode → every faction in the dump; otherwise → only category factions
			var factionsToPlot = isAllMode ? allFactions : categoryFactions;

			// Track plotted systemId64s to deduplicate across factions, keeping the
			// entry that best represents the system (category faction > other, controlling > present)
			var systemMap = {}; // systemId64 → poiSite

			factionsToPlot.forEach(function (faction) {
				var factionKey = faction.name.toLowerCase();
				var catKeys    = categoryKeyMap[factionKey];

				faction.systems.forEach(function (sys) {
					var sysId        = String(sys.systemId64);
					var isControlled = sys.isControllingFaction === true;
					var catKey       = catKeys
						? (isControlled ? catKeys.controlledKey : catKeys.presentKey)
						: (isAllMode ? (isControlled ? otherControlledKey : otherPresentKey) : null);

					if (!catKey) return; // non-All mode: skip non-category factions

					var existing = systemMap[sysId];
					// Priority: category faction wins over other; controlling wins over present
					var priority      = (catKeys ? 2 : 0) + (isControlled ? 1 : 0);
					var existPriority = existing ? existing._priority : -1;

					if (!existing || priority > existPriority) {
						systemMap[sysId] = {
							name: sys.systemName,
							cat: [catKey],
							infos: '', // non-undefined so action.class.js calls openHudDetails()
							coords: { x: sys.coords.x, y: sys.coords.y, z: sys.coords.z },
							_priority: priority,
						};
					}
				});
			});

			Object.values(systemMap).forEach(function (poi) {
				delete poi._priority;
				canonnEd3d_multifaction.systemsData.systems.push(poi);
			});

			if (isAllMode) {
				// In All mode the system set is the entire galaxy — building an index for every
				// system would require storing millions of entries and hang the browser.
				// Instead, store the faction list and scan it at click time for just the one
				// clicked system (≤60k factions × short systems arrays ≈ <100 ms).
				canonnEd3d_multifaction.allFactions = allFactions;
				canonnEd3d_multifaction.systemFactionIndex = null; // signals click-time scan
				console.log('multifaction: All mode — using click-time faction scan');
			} else {
				// Build a system→factions index covering only the systems on the map.
				// Collect the exact system names as stored in systemsData so keys always match.
				var mapSystemNames = {};
				canonnEd3d_multifaction.systemsData.systems.forEach(function (sys) {
					var lo = (sys.name || '').toLowerCase();
					if (lo) mapSystemNames[lo] = true;
				});

				// factionIdx[systemKey][factionName] = entry — deduplicated, preferring isControlling=true
				var factionIdx = {};
				allFactions.forEach(function (faction) {
					if (!faction.systems || !faction.name) return;
					faction.systems.forEach(function (sys) {
						var key = (sys.systemName || '').toLowerCase().trim();
						if (!key || !mapSystemNames[key]) return;
						if (!factionIdx[key]) factionIdx[key] = {};
						var existing = factionIdx[key][faction.name];
						var isControlling = sys.isControllingFaction === true;
						if (!existing || isControlling) {
							factionIdx[key][faction.name] = {
								name:         faction.name,
								allegiance:   faction.allegiance || '',
								government:   faction.government  || '',
								isControlling: isControlling,
							};
						}
					});
				});
				// Convert inner objects to arrays
				var systemFactionIndex = {};
				Object.keys(factionIdx).forEach(function (sysKey) {
					systemFactionIndex[sysKey] = Object.values(factionIdx[sysKey]);
				});
				canonnEd3d_multifaction.systemFactionIndex = systemFactionIndex;
				console.log('multifaction: faction index built for', Object.keys(factionIdx).length, 'systems');
			}

			document.getElementById('loading').style.display = 'none';

			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_multifaction.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 100],
				startAnim: !isAllMode,
				showGalaxyInfos: true,
				systemColor: '#FF9D00',
				finished: function () {
					canonnEd3d_multifaction.finishMap();
				},
			});

		} catch (err) {
			console.error('multifaction: error loading data –', err);
			document.getElementById('loading').style.display = 'none';
		}
	},

	// Permit-locked sphere data
	permitSpheres: {
		pls: [
			{ radius: 514.0, coords: [508.68359, -372.59375, -1090.87891], name: 'Col 70 Sector' },
			{ radius: 510.0, coords: [851.16406, 83.68359, -2005.22070],   name: 'NGC 2264 Sector' },
			{ radius: 200.0, coords: [608.46094, -404.64453, -1194.16992], name: 'Horsehead Dark Region' },
			{ radius: 205.0, coords: [11.76172, -508.69531, -1684.84180],  name: 'NGC 1647 Sector' },
			{ radius: 100.0, coords: [855.44141, 84.45312, -2025.11328],   name: 'Cone Sector' },
			{ radius: 250.0, coords: [878.88281, -64.39062, -1850.92383],  name: 'Col 97 Sector' },
			{ radius: 350.0, coords: [1731.03125, -400.21094, -1396.76758], name: 'M41 Sector' },
			{ radius: 459.0, coords: [1246.80469, -278.00000, -860.11328], name: 'Col 121 Sector' },
			{ radius: 100.0, coords: [1099.23828, -146.67188, -133.58008], name: 'Regor Sector' },
			{ radius: 385.0, coords: [5456.35547,  -379.24609, -7706.28711],  name: 'NGC 2286 Sector' },
			{ radius: 150.0, coords: [18594.82031, -174.53125,  7362.21094],  name: 'NGC 3603 Sector' },
			{ radius: 100.0, coords: [-840.65625,  -561.13281,  13361.82812], name: 'IC 4673 Sector' },
			{ radius: 512.0, coords: [-43.0,   155.0,  37500.0], name: 'Bleia1' },
			{ radius: 512.0, coords: [-43.0,   155.0,  37000.0], name: 'Bleia2' },
			{ radius: 512.0, coords: [-43.0,   155.0,  36500.0], name: 'Bleia3' },
			{ radius: 512.0, coords: [450.0,   155.0,  37000.0], name: 'Bleia4' },
			{ radius: 512.0, coords: [-450.0,  155.0,  37000.0], name: 'Bleia5' },
			{ radius: 512.0, coords: [-20070.0,  90.0,  -6930.0], name: 'Bovomit' },
			{ radius: 512.0, coords: [19100.0,   20.0,  21160.0], name: 'Dryman' },
			{ radius: 512.0, coords: [-18860.0, -200.0, 14300.0], name: 'Froadik' },
			{ radius: 512.0, coords: [-23020.0,  -10.0, 24080.0], name: 'Hyponia' },
			{ radius: 512.0, coords: [-1000.0,  -155.0, 53600.0], name: 'Praei3' },
			{ radius: 512.0, coords: [-1000.0,  -155.0, 54000.0], name: 'Praei1' },
			{ radius: 512.0, coords: [-1000.0,  -155.0, 54400.0], name: 'Praei2' },
			{ radius: 512.0, coords: [-1000.0,  -555.0, 54000.0], name: 'Praei4' },
			{ radius: 512.0, coords: [-1000.0,   455.0, 54000.0], name: 'Praei5' },
			{ radius: 512.0, coords: [-500.0,   -100.0, 53500.0], name: 'Praei6' },
			{ radius: 100.0, coords: [-24120.0,   10.0,  -1220.0], name: 'Sidgoir' },
		],
		puls: [
			{ radius: 100.0, coords: [726.50391, -365.36328, -1377.93555],  name: "Barnard's Loop Sector" },
			{ radius: 426.0, coords: [1355.99609, -235.59766, -690.91602],  name: 'Col 132 Sector' },
			{ radius: 150.0, coords: [942.32812, -198.29688, -365.50586],   name: 'Col 135 Sector' },
			{ radius: 162.0, coords: [1186.89453, -181.42578, -548.42188],  name: 'Col 140 Sector' },
			{ radius: 100.0, coords: [428.26172, -280.66797, -858.96289],   name: 'Flame Sector' },
			{ radius: 100.0, coords: [411.68359, -272.99219, -811.47461],   name: 'Horsehead Sector' },
			{ radius: 117.0, coords: [1241.61328, 86.52734, -1005.43945],   name: 'M47 Sector' },
			{ radius: 100.0, coords: [665.03125, -395.19922, -1400.55469],  name: 'Messier 78 Sector' },
			{ radius: 83.0,  coords: [178.12891, -512.99609, -1317.47070],  name: 'NGC 1662 Sector' },
			{ radius: 106.0, coords: [578.95703, -423.23828, -1084.28711],  name: 'NGC 1981 Sector' },
			{ radius: 100.0, coords: [549.36719, -374.51172, -926.56445],   name: 'NGC 1999 Sector' },
			{ radius: 154.0, coords: [655.20312, -154.73828, -956.90234],   name: 'NGC 2232 Sector' },
			{ radius: 100.0, coords: [596.77344, -311.86719, -1340.37305],  name: 'Orion Dark Region' },
			{ radius: 100.0, coords: [616.52344, -446.42578, -1107.67383],  name: 'Orion Sector' },
			{ radius: 100.0, coords: [586.15625, -425.38281, -1079.56836],  name: 'Running Man Sector' },
			{ radius: 100.0, coords: [577.89844, -452.66406, -819.22266],   name: 'Spirograph Sector' },
			{ radius: 182.0, coords: [594.46875, -431.80859, -1072.44922],  name: 'Trapezium Sector' },
			{ radius: 100.0, coords: [991.18750, -121.87109, -51.94531],    name: 'Vela Dark Region' },
			{ radius: 300.0, coords: [366.92969, -299.39453, -1359.90039],  name: 'Col 69 Sector' },
			{ radius: 100.0, coords: [369.41406, -401.57812, -715.72852],   name: 'Witch Head Sector' },
		],
	},

	addSearchUI: function () {
		var factionNames = canonnEd3d_multifaction.allFactionNames || [];
		if (factionNames.length === 0) return;

		// Build the search widget and inject it at the top of the HUD #filters panel
		var container = document.createElement('div');
		container.id = 'faction-search-container';
		container.innerHTML =
			'<label id="faction-search-label" for="faction-search-input">Add Faction to Map</label>' +
			'<input id="faction-search-input" type="text" placeholder="Search factions\u2026" autocomplete="off" spellcheck="false">' +
			'<div id="faction-search-dropdown"></div>' +
			'<div id="faction-search-status"></div>';
		var filtersEl = document.getElementById('filters');
		if (filtersEl) {
			filtersEl.insertBefore(container, filtersEl.firstChild);
		} else {
			document.body.appendChild(container);
		}

		var input    = document.getElementById('faction-search-input');
		var dropdown = document.getElementById('faction-search-dropdown');
		var status   = document.getElementById('faction-search-status');
		var activeIdx = -1;

		function escapeHtml(str) {
			return String(str)
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
		}

		function getItems() {
			return dropdown.querySelectorAll('.faction-search-item');
		}

		function setActive(idx) {
			var items = getItems();
			items.forEach(function (el, i) {
				if (i === idx) el.classList.add('active');
				else           el.classList.remove('active');
			});
			activeIdx = idx;
		}

		function renderDropdown(query) {
			dropdown.innerHTML = '';
			activeIdx = -1;
			var q = query.toLowerCase();
			if (q.length < 2) {
				dropdown.style.display = 'none';
				status.textContent = '';
				return;
			}
			var matches = factionNames.filter(function (name) {
				return name.toLowerCase().indexOf(q) >= 0;
			});
			status.textContent = matches.length === 0
				? 'No matches'
				: matches.length + ' faction' + (matches.length === 1 ? '' : 's') + ' found';
			if (matches.length === 0) {
				dropdown.style.display = 'none';
				return;
			}
			var shown = matches.slice(0, 20);
			shown.forEach(function (name) {
				var item = document.createElement('div');
				item.className = 'faction-search-item';
				// Highlight the matched portion (case-insensitive)
				var lname = name.toLowerCase();
				var hi    = lname.indexOf(q);
				item.innerHTML =
					escapeHtml(name.substring(0, hi)) +
					'<strong>' + escapeHtml(name.substring(hi, hi + q.length)) + '</strong>' +
					escapeHtml(name.substring(hi + q.length));
				item.addEventListener('mousedown', function (e) {
					e.preventDefault(); // keep focus on input so blur doesn't hide dropdown early
					canonnEd3d_multifaction.selectFaction(name);
				});
				dropdown.appendChild(item);
			});
			if (matches.length > 20) {
				var hint = document.createElement('div');
				hint.style.cssText = 'padding:4px 10px;font-size:0.6rem;color:#555;text-align:center;border-top:1px solid #222;';
				hint.textContent = '\u2026and ' + (matches.length - 20) + ' more — refine your search.';
				dropdown.appendChild(hint);
			}
			dropdown.style.display = 'block';
		}

		input.addEventListener('input', function () {
			renderDropdown(input.value.trim());
		});

		input.addEventListener('keydown', function (e) {
			var items = getItems();
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				setActive(Math.min(activeIdx + 1, items.length - 1));
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				setActive(Math.max(activeIdx - 1, 0));
			} else if (e.key === 'Enter') {
				if (activeIdx >= 0 && items[activeIdx]) {
					items[activeIdx].dispatchEvent(new MouseEvent('mousedown'));
				}
			} else if (e.key === 'Escape') {
				dropdown.style.display = 'none';
				input.value = '';
				status.textContent = '';
			}
		});

		document.addEventListener('click', function (e) {
			var c = document.getElementById('faction-search-container');
			if (c && !c.contains(e.target)) {
				dropdown.style.display = 'none';
			}
		});
	},

	selectFaction: function (factionName) {
		var currentFactions = getUrlParameter('factions');
		var parts;
		if (!currentFactions || currentFactions.toLowerCase() === 'all') {
			parts = [factionName];
		} else {
			parts = currentFactions.split(',').map(function (s) { return s.trim(); });
			var alreadyPresent = parts.some(function (p) {
				return p.toLowerCase() === factionName.toLowerCase();
			});
			if (alreadyPresent) {
				var inp = document.getElementById('faction-search-input');
				var drp = document.getElementById('faction-search-dropdown');
				var sts = document.getElementById('faction-search-status');
				if (inp) inp.value = '';
				if (drp) drp.style.display = 'none';
				if (sts) sts.textContent = factionName + ' is already on the map.';
				return;
			}
			parts.push(factionName);
		}
		// Re-encode each part individually (handles spaces and special chars)
		var encoded = parts.map(function (p) { return encodeURIComponent(p); }).join(',');
		location.href = location.pathname + '?factions=' + encoded;
	},

	createSphere: function (data, material) {
		var geometry = new THREE.SphereGeometry(data.radius, 40, 20);
		var sphere = new THREE.Mesh(geometry, material);
		sphere.position.set(data.coords[0], data.coords[1], -data.coords[2]);
		sphere.name = data.name;
		sphere.clickable = false;
		scene.add(sphere);
	},

	finishMap: function () {

		// In All mode, position the camera above Sol and animate down.
		// We drive camera/controls directly so OrbitControls registers the
		// starting state correctly (controls.update()) before the tween fires,
		// which prevents orientation flipping.
		if (canonnEd3d_multifaction.isAllMode) {
			// Snap to far above Sol with a safe orientation
			camera.position.set(0, 40000, 500);
			controls.target.set(0, 0, 0);
			controls.update();

			// Smooth zoom into the bubble
			var animFrom = { y: 40000, z: 500 };
			var animTo   = { y: 5000, z: 5000 };
			Ed3d.tween = new TWEEN.Tween(animFrom, { override: true })
				.to(animTo, 4000)
				.easing(TWEEN.Easing.Quadratic.Out)
				.onUpdate(function () {
					camera.position.set(0, animFrom.y, animFrom.z);
					controls.update();
				})
				.start();
		}

		// Completely replace HUD.setInfoPanel for the multifaction map:
		// build a clean panel showing ALL factions in the system, controlling first.
		HUD.setInfoPanel = function (index, point) {
			var systemNameLower = (point.name || '').trim().toLowerCase();

			var entries;
			if (canonnEd3d_multifaction.systemFactionIndex) {
				// Normal mode: O(1) index lookup
				entries = (canonnEd3d_multifaction.systemFactionIndex[systemNameLower] || []).slice();
			} else {
				// All mode: scan allFactions for this one system at click time
				var seen = {};
				entries = [];
				(canonnEd3d_multifaction.allFactions || []).forEach(function (faction) {
					if (!faction.systems || !faction.name) return;
					for (var i = 0; i < faction.systems.length; i++) {
						var sys = faction.systems[i];
						if ((sys.systemName || '').toLowerCase().trim() !== systemNameLower) continue;
						var isControlling = sys.isControllingFaction === true;
						if (!seen[faction.name] || isControlling) {
							seen[faction.name] = true;
							// Replace existing entry if this one is controlling
							var existing = entries.findIndex(function (e) { return e.name === faction.name; });
							var entry = {
								name:         faction.name,
								allegiance:   faction.allegiance || '',
								government:   faction.government  || '',
								isControlling: isControlling,
							};
							if (existing >= 0) entries[existing] = entry;
							else entries.push(entry);
						}
						break; // found this faction's entry for the system
					}
				});
			}

			// Sort: controlling faction(s) first
			entries.sort(function (a, b) {
				return (b.isControlling ? 1 : 0) - (a.isControlling ? 1 : 0);
			});

			// Build faction rows
			var factionHtml = '';
			if (entries.length > 0) {
				factionHtml += '<div style="margin-top:8px;font-size:0.75rem;">';
				factionHtml += '<div style="color:#aaa;border-bottom:1px solid #444;margin-bottom:5px;padding-bottom:2px;font-size:0.8rem;">Factions in System</div>';
				entries.forEach(function (f) {
					var rowStyle = f.isControlling
						? 'margin-bottom:5px;padding:3px;background:rgba(255,140,0,0.1);border-left:2px solid #ff8c00;padding-left:5px;'
						: 'margin-bottom:3px;padding-left:7px;';
					factionHtml += '<div style="' + rowStyle + '">';
					if (f.isControlling) {
						factionHtml += '<span style="color:#ff8c00;font-weight:bold;">' + f.name + '</span>';
						factionHtml += ' <span style="color:#ff8c00;font-size:0.7rem;">(controlling)</span>';
					} else {
						factionHtml += '<span>' + f.name + '</span>';
					}
					if (f.allegiance) {
						factionHtml += '<br><span style="color:#888;font-size:0.7rem;">' + f.allegiance;
						if (f.government) factionHtml += ' &bull; ' + f.government;
						factionHtml += '</span>';
					}
					factionHtml += '</div>';
				});
				factionHtml += '</div>';
			} else {
				// Fallback: show whatever was in the original infos
				if (point.infos) factionHtml = '<div style="margin-top:8px;">' + point.infos + '</div>';
			}

			$('#systemDetails').html(
				'<h2><a href="https://inara.cz/elite/starsystem/?search=' +
				encodeURIComponent(point.name) + '" target="_blank" style="color:inherit;text-decoration:none;border-bottom:1px dotted #ff8c00;">' +
				point.name + '</a></h2>' +
				'<div class="coords">' +
				'  <span>' + point.x + '</span><span>' + point.y + '</span><span>' + (-point.z) + '</span>' +
				'</div>' +
				'<p id="infos"></p>' +
				factionHtml +
				'<div class="hover-distance"></div>' +
				'<div id="nav"></div>'
			);

			// Nav buttons
			$('<a/>', { html: '&lt;' }).click(function () { Action.moveNextPrev(index - 1, -1); }).appendTo('#nav');
			$('<a/>', { html: 'X' }).click(function () { HUD.closeHudDetails(); }).appendTo('#nav');
			$('<a/>', { html: '&gt;' }).click(function () { Action.moveNextPrev(index + 1,  1); }).appendTo('#nav');
		};
		var puls = canonnEd3d_multifaction.permitSpheres.puls;
		var pls  = canonnEd3d_multifaction.permitSpheres.pls;

		var pulCenters = puls.map(function(p) { return new THREE.Vector3(p.coords[0], p.coords[1], -p.coords[2]); });
		var pulRadii   = puls.map(function(p) { return p.radius; });
		var pulN       = pulCenters.length;

		var plCenters  = pls.map(function(p) { return new THREE.Vector3(p.coords[0], p.coords[1], -p.coords[2]); });
		var plRadii    = pls.map(function(p) { return p.radius; });
		var plN        = plCenters.length;

		var plMat = new THREE.ShaderMaterial({
			uniforms: {
				alphaMap:   { type: 't',   value: Ed3d.textures.permit_zone },
				opacity:    { type: 'f',   value: 0.75 },
				pulCenters: { type: 'v3v', value: pulCenters },
				pulRadii:   { type: 'fv1', value: pulRadii }
			},
			vertexShader: [
				'varying vec2 vUv;',
				'varying vec3 vWorldPos;',
				'varying vec3 vNormal;',
				'void main() {',
				'    vUv = uv;',
				'    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;',
				'    vNormal = normalize(normalMatrix * normal);',
				'    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
				'}'
			].join('\n'),
			fragmentShader: [
				'uniform sampler2D alphaMap;',
				'uniform float opacity;',
				'uniform vec3 pulCenters[' + pulN + '];',
				'uniform float pulRadii[' + pulN + '];',
				'varying vec2 vUv;',
				'varying vec3 vWorldPos;',
				'varying vec3 vNormal;',
				'void main() {',
				'    for (int i = 0; i < ' + pulN + '; i++) {',
				'        if (distance(vWorldPos, pulCenters[i]) < pulRadii[i]) discard;',
				'    }',
				'    vec3 lightDir = normalize(vec3(-1.0, 1.5, 1.0));',
				'    float diff = max(dot(vNormal, lightDir), 0.0);',
				'    float light = 0.35 + 0.65 * diff;',
				'    vec3 tint = vec3(0.2, 0.7, 1.0);',
				'    float a = texture2D(alphaMap, vUv).r;',
				'    gl_FragColor = vec4(tint * light, a * opacity);',
				'}'
			].join('\n'),
			transparent: true,
			blending: THREE.NormalBlending,
			depthWrite: false
		});

		for (var i = 0; i < pls.length; i++) {
			canonnEd3d_multifaction.createSphere(pls[i], plMat);
		}

		var pulMat = new THREE.ShaderMaterial({
			uniforms: {
				alphaMap:  { type: 't',   value: Ed3d.textures.permit_zone },
				opacity:   { type: 'f',   value: 0.75 },
				plCenters: { type: 'v3v', value: plCenters },
				plRadii:   { type: 'fv1', value: plRadii }
			},
			vertexShader: [
				'varying vec2 vUv;',
				'varying vec3 vWorldPos;',
				'varying vec3 vNormal;',
				'void main() {',
				'    vUv = uv;',
				'    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;',
				'    vNormal = normalize(normalMatrix * normal);',
				'    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
				'}'
			].join('\n'),
			fragmentShader: [
				'uniform sampler2D alphaMap;',
				'uniform float opacity;',
				'uniform vec3 plCenters[' + plN + '];',
				'uniform float plRadii[' + plN + '];',
				'varying vec2 vUv;',
				'varying vec3 vWorldPos;',
				'varying vec3 vNormal;',
				'void main() {',
				'    bool insidePL = false;',
				'    for (int i = 0; i < ' + plN + '; i++) {',
				'        if (distance(vWorldPos, plCenters[i]) < plRadii[i]) insidePL = true;',
				'    }',
				'    if (!insidePL) discard;',
				'    vec3 n = gl_FrontFacing ? vNormal : -vNormal;',
				'    vec3 lightDir = normalize(vec3(-1.0, 1.5, 1.0));',
				'    float diff = max(dot(n, lightDir), 0.0);',
				'    float light = 0.35 + 0.65 * diff;',
				'    vec3 tint = vec3(1.0, 0.75, 0.1);',
				'    float a = texture2D(alphaMap, vUv).r;',
				'    gl_FragColor = vec4(tint * light, a * opacity);',
				'}'
			].join('\n'),
			side: THREE.DoubleSide,
			transparent: true,
			blending: THREE.NormalBlending,
			depthWrite: false
		});

		for (var i = 0; i < puls.length; i++) {
			canonnEd3d_multifaction.createSphere(puls[i], pulMat);
		}

		// Add the faction search widget now that the map is ready
		canonnEd3d_multifaction.addSearchUI();
	},
};

canonnEd3d_multifaction.init();
