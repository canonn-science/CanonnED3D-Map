var canonnEd3d_landscape = {

    // Bounding box tracked during formatSystems
    bounds: {
        minX: Infinity, maxX: -Infinity,
        minY: Infinity, maxY: -Infinity,
        minZ: Infinity, maxZ: -Infinity,
    },

    // Define Categories
    systemsData: {
        categories: {
            'Landscape Signal - Surveyed': {
                '201': {
                    name: 'Surveyed',
                    color: '00C000'
                }
            },
            'Landscape Signal - Visited': {
                '202': {
                    name: 'Visited',
                    color: 'FFA500'
                }
            },
            'Landscape Signal - Unvisited': {
                '203': {
                    name: 'Unvisited',
                    color: 'FF0000'
                }
            }
        },
        systems: []
    },

	isVisited: function (val) {
		if (val === null || val === undefined || val === '') return false;
		let v = String(val).trim().toLowerCase();
		return v === 'visited';
	},

	formatSystems: function (data) {
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			let name = s['System'];
			if (!name || !String(name).trim()) continue;
			let x = parseFloat(String(s['X']).replace(',', ''));
			let y = parseFloat(String(s['Y']).replace(',', ''));
			let z = parseFloat(String(s['Z']).replace(',', ''));
			if (isNaN(x) || isNaN(y) || isNaN(z)) continue;

			let hasCmdrs = s['CMDRS'] !== undefined && String(s['CMDRS']).trim() !== '';
			let visited = canonnEd3d_landscape.isVisited(s['Visited']);
			let cat = hasCmdrs ? [201] : visited ? [202] : [203];

			let info = '';
			if (s['Date']) info += '<b>Date:</b> ' + s['Date'] + '<br>';
			info += '<b>Visited:</b> ' + (visited ? 'Yes' : 'No') + '<br>';
			if (s['Bodies'] !== undefined && s['Bodies'] !== '')
				info += '<b>Bodies:</b> ' + s['Bodies'] + '<br>';
			if (s['BodyCount'] !== undefined && s['BodyCount'] !== '')
				info += '<b>Body Count:</b> ' + s['BodyCount'] + '<br>';
			if (s['Recent'] !== undefined && s['Recent'] !== '')
				info += '<b>Recent:</b> ' + s['Recent'] + '<br>';
			if (s['CMDRS'] !== undefined && s['CMDRS'] !== '')
				info += '<b>CMDRs:</b> ' + s['CMDRS'] + '<br>';
			if (s['FSS Planets'] !== undefined && s['FSS Planets'] !== '')
				info += '<b>FSS Planets:</b> ' + s['FSS Planets'] + '<br>';
			if (s['DSS Planets'] !== undefined && s['DSS Planets'] !== '')
				info += '<b>DSS Planets:</b> ' + s['DSS Planets'] + '<br>';
			if (s['DSS Rings'] !== undefined && s['DSS Rings'] !== '')
				info += '<b>DSS Rings:</b> ' + s['DSS Rings'] + '<br>';

			let b = canonnEd3d_landscape.bounds;
			if (x < b.minX) b.minX = x; if (x > b.maxX) b.maxX = x;
			if (y < b.minY) b.minY = y; if (y > b.maxY) b.maxY = y;
			if (z < b.minZ) b.minZ = z; if (z > b.maxZ) b.maxZ = z;

			canonnEd3d_landscape.systemsData.systems.push({
				name: String(name).trim(),
				coords: { x: x, y: y, z: z },
				infos: info,
				cat: cat,
			});
		}
	},

    // Compute camera positions that frame the full system set
    calcCamera: function () {
        let b = canonnEd3d_landscape.bounds;
        let cx = (b.minX + b.maxX) / 2;
        let cy = (b.minY + b.maxY) / 2;
        let cz = (b.minZ + b.maxZ) / 2;

        // Half-diagonal of the bounding box
        let dx = b.maxX - b.minX;
        let dy = b.maxY - b.minY;
        let dz = b.maxZ - b.minZ;
        let radius = Math.sqrt(dx * dx + dy * dy + dz * dz) / 2;

        // Pull the camera back far enough to see everything (45° FoV camera)
        let dist = radius * 2;

        return {
            player: [cx, cy, cz],
            camera: [cx, cy + dist * 0.6, cz + dist],
        };
    },

    init: function () {
        fetch('https://storage.googleapis.com/canonn-downloads/landscape.json')
            .then(function (r) { return r.json(); })
            .then(function (data) {
                canonnEd3d_landscape.formatSystems(data);
                let cam = canonnEd3d_landscape.calcCamera();
                document.getElementById('loading').style.display = 'none';
                Ed3d.init({
                    container: 'edmap',
                    json: canonnEd3d_landscape.systemsData,
                    withFullscreenToggle: false,
                    withHudPanel: true,
                    hudMultipleSelect: true,
                    effectScaleSystem: [5, 5],
                    startAnim: true,
                    showGalaxyInfos: true,
                    playerPos: cam.player,
                    cameraPos: cam.camera,
                    systemColor: '#FF9D00',
                    finished: function () {
                        // Reduce the glow sprite opacity to tame bloom
                        if (Ed3d.material && Ed3d.material.glow_1) {
                            Ed3d.material.glow_1.opacity = 0.2;
                            Ed3d.material.glow_1.needsUpdate = true;
                        }
                    },
                });
            })
            .catch(function (err) {
                console.error('Failed to load landscape data:', err);
                document.getElementById('loading').innerHTML =
                    '<p style="color:#ff4444;font-family:Orbitron,sans-serif;text-align:center;margin-top:20%;">Failed to load landscape data.<br>' + err.message + '</p>';
            });
    },
};
