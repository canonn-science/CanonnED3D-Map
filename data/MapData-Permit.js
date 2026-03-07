var canonnEd3d_permit = {
	//Define Categories
	systemsData: {
		categories: {
			'Permit Locked Regions': {
				'1070': {
					name: 'Col 70 Sector',
					color: '442299',
				},
				'1097': {
					name: 'Col 97 Sector',
					color: '4444dd',
				},
				'1121': {
					name: 'Col 121 Sector',
					color: '11aabb',
				},
				'2000': {
					name: 'Cone Sector',
					color: '22ccaa',
				},
				'3000': {
					name: 'Horsehead Dark Sector',
					color: 'a6cc33',
				},
				'4000': {
					name: 'M41',
					color: '69d025',
				},
				'6647': {
					name: 'NGC 1647',
					color: 'aacc22',
				},
				'7264': {
					name: 'NGC 2264',
					color: 'd0c310',
				},
				'7286': {
					name: 'NGC 2286',
					color: 'ccbb33',
				},
				'8603': {
					name: 'NGC 3603',
					color: 'ff9933',
				},
			},
			'Remote Permit Locked Regions': {
				'9001': { name: 'IC 4673 Sector',   color: 'ee8800' },
				'9002': { name: 'Bleia Permit Zone', color: 'dd7700' },
				'9003': { name: 'Bovomit',           color: 'cc6600' },
				'9004': { name: 'Dryman',            color: 'bb5500' },
				'9005': { name: 'Froadik',           color: 'aa4400' },
				'9006': { name: 'Hyponia',           color: '994433' },
				'9007': { name: 'Praei Permit Zone', color: '883322' },
				'9008': { name: 'Sidgoir',           color: '772211' },
			},
		},
		// Centre-point markers for regions not sourced from CSV
		systems: [
			{ name: 'NGC 2286 Sector', coords: { x: 5456.35547,  y: -379.24609, z: -7706.28711 }, cat: ['7286'] },
			{ name: 'NGC 3603 Sector', coords: { x: 18594.82031, y: -174.53125, z: 7362.21094  }, cat: ['8603'] },
			{ name: 'IC 4673 Sector',  coords: { x: -840.65625,  y: -561.13281, z: 13361.82812 }, cat: ['9001'] },
			{ name: 'Bleia1',          coords: { x: -43,    y: 155,  z: 37500 }, cat: ['9002'] },
			{ name: 'Bleia2',          coords: { x: -43,    y: 155,  z: 37000 }, cat: ['9002'] },
			{ name: 'Bleia3',          coords: { x: -43,    y: 155,  z: 36500 }, cat: ['9002'] },
			{ name: 'Bleia4',          coords: { x: 450,    y: 155,  z: 37000 }, cat: ['9002'] },
			{ name: 'Bleia5',          coords: { x: -450,   y: 155,  z: 37000 }, cat: ['9002'] },
			{ name: 'Bovomit',         coords: { x: -20070, y: 90,   z: -6930 }, cat: ['9003'] },
			{ name: 'Dryman',          coords: { x: 19100,  y: 20,   z: 21160 }, cat: ['9004'] },
			{ name: 'Froadik',         coords: { x: -18860, y: -200, z: 14300 }, cat: ['9005'] },
			{ name: 'Hyponia',         coords: { x: -23020, y: -10,  z: 24080 }, cat: ['9006'] },
			{ name: 'Praei1',          coords: { x: -1000,  y: -155, z: 54000 }, cat: ['9007'] },
			{ name: 'Praei2',          coords: { x: -1000,  y: -155, z: 54400 }, cat: ['9007'] },
			{ name: 'Praei3',          coords: { x: -1000,  y: -155, z: 53600 }, cat: ['9007'] },
			{ name: 'Praei4',          coords: { x: -1000,  y: -555, z: 54000 }, cat: ['9007'] },
			{ name: 'Praei5',          coords: { x: -1000,  y: 455,  z: 54000 }, cat: ['9007'] },
			{ name: 'Praei6',          coords: { x: -500,   y: -100, z: 53500 }, cat: ['9007'] },
			{ name: 'Sidgoir',         coords: { x: -24120, y: 10,   z: -1220 }, cat: ['9008'] },
		],

		// Permit-locked spheres (orange in 3D view)
		pls: [
			{ radius: 514.0, coords: [508.68359, -372.59375, -1090.87891], name: "Col 70 Sector" },
			{ radius: 510.0, coords: [851.16406, 83.68359, -2005.22070],   name: "NGC 2264 Sector" },
			{ radius: 200.0, coords: [608.46094, -404.64453, -1194.16992], name: "Horsehead Dark Region" },
			{ radius: 205.0, coords: [11.76172, -508.69531, -1684.84180],  name: "NGC 1647 Sector" },
			{ radius: 100.0, coords: [855.44141, 84.45312, -2025.11328],   name: "Cone Sector" },
			{ radius: 250.0, coords: [878.88281, -64.39062, -1850.92383],  name: "Col 97 Sector" },
			{ radius: 350.0, coords: [1731.03125, -400.21094, -1396.76758],name: "M41 Sector" },
			{ radius: 459.0, coords: [1246.80469, -278.00000, -860.11328], name: "Col 121 Sector" },
			{ radius: 100.0, coords: [1099.23828, -146.67188, -133.58008], name: "Regor Sector" },
			// Additional permit locked regions from ha_regions (needs_permit=True), not already listed above
			{ radius: 385.0, coords: [5456.35547,  -379.24609, -7706.28711],  name: "NGC 2286 Sector" },
			{ radius: 150.0, coords: [18594.82031, -174.53125,  7362.21094],  name: "NGC 3603 Sector" },
			{ radius: 100.0, coords: [-840.65625,  -561.13281,  13361.82812], name: "IC 4673 Sector" },
			{ radius: 512.0, coords: [-43.0,   155.0,  37500.0], name: "Bleia1" },
			{ radius: 512.0, coords: [-43.0,   155.0,  37000.0], name: "Bleia2" },
			{ radius: 512.0, coords: [-43.0,   155.0,  36500.0], name: "Bleia3" },
			{ radius: 512.0, coords: [450.0,   155.0,  37000.0], name: "Bleia4" },
			{ radius: 512.0, coords: [-450.0,  155.0,  37000.0], name: "Bleia5" },
			{ radius: 512.0, coords: [-20070.0,  90.0,  -6930.0], name: "Bovomit" },
			{ radius: 512.0, coords: [19100.0,   20.0,  21160.0], name: "Dryman" },
			{ radius: 512.0, coords: [-18860.0, -200.0, 14300.0], name: "Froadik" },
			{ radius: 512.0, coords: [-23020.0,  -10.0, 24080.0], name: "Hyponia" },
			{ radius: 512.0, coords: [-1000.0,  -155.0, 53600.0], name: "Praei3" },
			{ radius: 512.0, coords: [-1000.0,  -155.0, 54000.0], name: "Praei1" },
			{ radius: 512.0, coords: [-1000.0,  -155.0, 54400.0], name: "Praei2" },
			{ radius: 512.0, coords: [-1000.0,  -555.0, 54000.0], name: "Praei4" },
			{ radius: 512.0, coords: [-1000.0,   455.0, 54000.0], name: "Praei5" },
			{ radius: 512.0, coords: [-500.0,   -100.0, 53500.0], name: "Praei6" },
			{ radius: 100.0, coords: [-24120.0,   10.0,  -1220.0], name: "Sidgoir" },
		],

		// Permit-unlocked sub-regions carved out of the locked spheres (blue in 3D view)
		puls: [
			{ radius: 100.0, coords: [726.50391, -365.36328, -1377.93555],  name: "Barnard's Loop Sector" },
			{ radius: 426.0, coords: [1355.99609, -235.59766, -690.91602],  name: "Col 132 Sector" },
			{ radius: 150.0, coords: [942.32812, -198.29688, -365.50586],   name: "Col 135 Sector" },
			{ radius: 162.0, coords: [1186.89453, -181.42578, -548.42188],  name: "Col 140 Sector" },
			{ radius: 100.0, coords: [428.26172, -280.66797, -858.96289],   name: "Flame Sector" },
			{ radius: 100.0, coords: [411.68359, -272.99219, -811.47461],   name: "Horsehead Sector" },
			{ radius: 117.0, coords: [1241.61328, 86.52734, -1005.43945],   name: "M47 Sector" },
			{ radius: 100.0, coords: [665.03125, -395.19922, -1400.55469],  name: "Messier 78 Sector" },
			{ radius: 83.0,  coords: [178.12891, -512.99609, -1317.47070],  name: "NGC 1662 Sector" },
			{ radius: 106.0, coords: [578.95703, -423.23828, -1084.28711],  name: "NGC 1981 Sector" },
			{ radius: 100.0, coords: [549.36719, -374.51172, -926.56445],   name: "NGC 1999 Sector" },
			{ radius: 154.0, coords: [655.20312, -154.73828, -956.90234],   name: "NGC 2232 Sector" },
			{ radius: 100.0, coords: [596.77344, -311.86719, -1340.37305],  name: "Orion Dark Region" },
			{ radius: 100.0, coords: [616.52344, -446.42578, -1107.67383],  name: "Orion Sector" },
			{ radius: 100.0, coords: [586.15625, -425.38281, -1079.56836],  name: "Running Man Sector" },
			{ radius: 100.0, coords: [577.89844, -452.66406, -819.22266],   name: "Spirograph Sector" },
			{ radius: 182.0, coords: [594.46875, -431.80859, -1072.44922],  name: "Trapezium Sector" },
			{ radius: 100.0, coords: [991.18750, -121.87109, -51.94531],    name: "Vela Dark Region" },
			{ radius: 300.0, coords: [366.92969, -299.39453, -1359.90039],  name: "Col 69 Sector" },
			{ radius: 100.0, coords: [369.41406, -401.57812, -715.72852],   name: "Witch Head Sector" },
		],
	},

	formatCol: function (data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].name && data[i].name.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = data[i].name;

				//Check Site Type and match categories

				var component = data[i].name.split(' ');
				if (component[0] == 'Col') {
					poiSite['cat'] = [1000 + parseInt(component[1])];
				}
				if (component[0] == 'Cone') {
					poiSite['cat'] = [2000];
				}
				if (component[0] == 'Horsehead') {
					poiSite['cat'] = [3000];
				}
				if (component[0] == 'M41') {
					poiSite['cat'] = [4000];
				}
				if (component[0] == 'NGC') {
					poiSite['cat'] = [5000 + parseInt(component[1])];
				}

				poiSite['coords'] = {
					x: parseFloat(data[i].pos_x),
					y: parseFloat(data[i].pos_y),
					z: parseFloat(data[i].pos_z),
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_permit.systemsData.systems.push(poiSite);
			}
		}
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
		var puls = canonnEd3d_permit.systemsData.puls;
		var pls  = canonnEd3d_permit.systemsData.pls;

		var pulCenters = puls.map(function(p) { return new THREE.Vector3(p.coords[0], p.coords[1], -p.coords[2]); });
		var pulRadii   = puls.map(function(p) { return p.radius; });
		var pulN       = pulCenters.length;

		var plCenters  = pls.map(function(p) { return new THREE.Vector3(p.coords[0], p.coords[1], -p.coords[2]); });
		var plRadii    = pls.map(function(p) { return p.radius; });
		var plN        = plCenters.length;

		// Pass 1 — PL outer shell (orange), holes punched where PUL spheres overlap
		var plSubtractMat = new THREE.ShaderMaterial({
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
				'    vec3 tint = vec3(0.2, 0.7, 1.0);',  // sky blue — permit LOCKED (colour-blind safe)
				'    float a = texture2D(alphaMap, vUv).r;',
				'    gl_FragColor = vec4(tint * light, a * opacity);',
				'}'
			].join('\n'),
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});

		for (var i = 0; i < pls.length; i++) {
			canonnEd3d_permit.createSphere(pls[i], plSubtractMat);
		}

		// Pass 2 — PUL inner cap (blue), DoubleSide, clipped to inside a PL sphere
		var pulCapMat = new THREE.ShaderMaterial({
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
				'    vec3 tint = vec3(1.0, 0.75, 0.1);',  // bright amber — permit UNLOCKED (colour-blind safe)
				'    float a = texture2D(alphaMap, vUv).r;',
				'    gl_FragColor = vec4(tint * light, a * opacity);',
				'}'
			].join('\n'),
			side: THREE.DoubleSide,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});

		for (var i = 0; i < puls.length; i++) {
			canonnEd3d_permit.createSphere(puls[i], pulCapMat);
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
			canonnEd3d_permit.parseCSVData('data/csvCache/col70.csv', canonnEd3d_permit.formatCol, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_permit.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: true,
				showGalaxyInfos: true,
				playerPos: [687.0625, -362.53125, -697.0625],
				cameraPos: [687.0625, -362.53125, -697.0625 - 3000],
				systemColor: '#FF9D00',
				finished: function() {
					canonnEd3d_permit.finishMap();
				},
			});
		});
	},
};
