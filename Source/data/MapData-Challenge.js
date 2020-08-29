var canonnEd3d_challenge = {
	//Define Categories
	systemsData: {
		categories: {
			'Permit Locked Regions': {
				'10': {
					name: 'Varati',
					color: 'f5a142',
				},
				'20': {
					name: 'Waypoint',
					color: '42f557',
				},
			},
		},
		systems: [],
                "routes": [
{ 'points': [ {'s': 'Varati', 'label': 'Varati' }, {'s': 'Alaunus', 'label': 'Alaunus: Q09-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Alaunus', 'label': 'Alaunus: Q09-Type Anomaly' }, {'s': 'HIP 15310', 'label': 'HIP 15310: Q04-Type AnomalyQ08-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'HIP 15310', 'label': 'HIP 15310: Q04-Type AnomalyQ08-Type Anomaly' }, {'s': 'Wredguia XD-K d8-24', 'label': 'Wredguia XD-K d8-24: Phoeniceum Gourd Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Wredguia XD-K d8-24', 'label': 'Wredguia XD-K d8-24: Phoeniceum Gourd Mollusc' }, {'s': 'Synuefai KN-C b45-2', 'label': 'Synuefai KN-C b45-2: Purpureum Metallic CrystalsRubeum Metallic Crystals' } ],'circle': false },
{ 'points': [ {'s': 'Synuefai KN-C b45-2', 'label': 'Synuefai KN-C b45-2: Purpureum Metallic CrystalsRubeum Metallic Crystals' }, {'s': 'HIP 139', 'label': 'HIP 139: Puniceum Anemone' } ],'circle': false },
{ 'points': [ {'s': 'HIP 139', 'label': 'HIP 139: Puniceum Anemone' }, {'s': 'Synuefai OF-W b32-0', 'label': 'Synuefai OF-W b32-0: Prasinum Metallic CrystalsAlbulum Gourd Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Synuefai OF-W b32-0', 'label': 'Synuefai OF-W b32-0: Prasinum Metallic CrystalsAlbulum Gourd Mollusc' }, {'s': 'Synuefai GS-G c25-0', 'label': 'Synuefai GS-G c25-0: Flavum Metallic Crystals' } ],'circle': false },
{ 'points': [ {'s': 'Synuefai GS-G c25-0', 'label': 'Synuefai GS-G c25-0: Flavum Metallic Crystals' }, {'s': 'AT Sculptoris', 'label': 'AT Sculptoris: Blatteum Bioluminescent Anemone' } ],'circle': false },
{ 'points': [ {'s': 'AT Sculptoris', 'label': 'AT Sculptoris: Blatteum Bioluminescent Anemone' }, {'s': 'HIP 2665', 'label': 'HIP 2665: Luteolum Anemone' } ],'circle': false },
{ 'points': [ {'s': 'HIP 2665', 'label': 'HIP 2665: Luteolum Anemone' }, {'s': 'Gliese 2026', 'label': 'Gliese 2026: Prasinum Bioluminescent Anemone' } ],'circle': false },
{ 'points': [ {'s': 'Gliese 2026', 'label': 'Gliese 2026: Prasinum Bioluminescent Anemone' }, {'s': 'HIP 6857', 'label': 'HIP 6857: Croceum AnemoneRubeum Bioluminescent Anemone' } ],'circle': false },
{ 'points': [ {'s': 'HIP 6857', 'label': 'HIP 6857: Croceum AnemoneRubeum Bioluminescent Anemone' }, {'s': 'HR 1769', 'label': 'HR 1769: Roseum Anemone' } ],'circle': false },
{ 'points': [ {'s': 'HR 1769', 'label': 'HR 1769: Roseum Anemone' }, {'s': 'Synuefe GR-V e2-4', 'label': 'Synuefe GR-V e2-4: Roseum Bioluminescent Anemone' } ],'circle': false },
{ 'points': [ {'s': 'Synuefe GR-V e2-4', 'label': 'Synuefe GR-V e2-4: Roseum Bioluminescent Anemone' }, {'s': 'BD-12 1172', 'label': 'BD-12 1172: Lattice Mineral SpheresViridans Gourd Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'BD-12 1172', 'label': 'BD-12 1172: Lattice Mineral SpheresViridans Gourd Mollusc' }, {'s': 'Trapezium Sector DB-O c6-1', 'label': 'Trapezium Sector DB-O c6-1: Bark Mounds' } ],'circle': false },
{ 'points': [ {'s': 'Trapezium Sector DB-O c6-1', 'label': 'Trapezium Sector DB-O c6-1: Bark Mounds' }, {'s': 'Running Man Sector HC-L b8-0', 'label': 'Running Man Sector HC-L b8-0: Caeruleum Lagrange Cloud' } ],'circle': false },
{ 'points': [ {'s': 'Running Man Sector HC-L b8-0', 'label': 'Running Man Sector HC-L b8-0: Caeruleum Lagrange Cloud' }, {'s': 'V495 Orionis', 'label': 'V495 Orionis: Croceum Lagrange Cloud' } ],'circle': false },
{ 'points': [ {'s': 'V495 Orionis', 'label': 'V495 Orionis: Croceum Lagrange Cloud' }, {'s': 'KK Orionis', 'label': 'KK Orionis: Luteolum Lagrange CloudRubicundum Lagrange Cloud' } ],'circle': false },
{ 'points': [ {'s': 'KK Orionis', 'label': 'KK Orionis: Luteolum Lagrange CloudRubicundum Lagrange Cloud' }, {'s': 'BC Orionis', 'label': 'BC Orionis: Viride Lagrange CloudRoseum Lagrange Cloud' } ],'circle': false },
{ 'points': [ {'s': 'BC Orionis', 'label': 'BC Orionis: Viride Lagrange CloudRoseum Lagrange Cloud' }, {'s': 'Messier 78 Sector KR-W c1-9', 'label': 'Messier 78 Sector KR-W c1-9: Crystalline Shards' } ],'circle': false },
{ 'points': [ {'s': 'Messier 78 Sector KR-W c1-9', 'label': 'Messier 78 Sector KR-W c1-9: Crystalline Shards' }, {'s': 'Eta Carina Sector JH-V c2-9', 'label': 'Eta Carina Sector JH-V c2-9: Luteolum Bell Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Eta Carina Sector JH-V c2-9', 'label': 'Eta Carina Sector JH-V c2-9: Luteolum Bell Mollusc' }, {'s': 'Thaile HW-V e2-7', 'label': 'Thaile HW-V e2-7: Croceum Lagrange Storm CloudL06-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Thaile HW-V e2-7', 'label': 'Thaile HW-V e2-7: Croceum Lagrange Storm CloudL06-Type Anomaly' }, {'s': 'Drokoe FE-T c19-0', 'label': 'Drokoe FE-T c19-0: Lividum Bullet Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Drokoe FE-T c19-0', 'label': 'Drokoe FE-T c19-0: Lividum Bullet Mollusc' }, {'s': 'Drokoe JA-Q c21-0', 'label': 'Drokoe JA-Q c21-0: Cereum Bullet Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Drokoe JA-Q c21-0', 'label': 'Drokoe JA-Q c21-0: Cereum Bullet Mollusc' }, {'s': 'Drokoe QW-V c18-0', 'label': 'Drokoe QW-V c18-0: Flavum Bullet Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Drokoe QW-V c18-0', 'label': 'Drokoe QW-V c18-0: Flavum Bullet Mollusc' }, {'s': 'Drokoe UK-M d8-1', 'label': 'Drokoe UK-M d8-1: Viride Bullet Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Drokoe UK-M d8-1', 'label': 'Drokoe UK-M d8-1: Viride Bullet Mollusc' }, {'s': 'NGC 3199 Sector AF-A d9', 'label': 'NGC 3199 Sector AF-A d9: Rubeum Bullet Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'NGC 3199 Sector AF-A d9', 'label': 'NGC 3199 Sector AF-A d9: Rubeum Bullet Mollusc' }, {'s': 'GCRV 6493', 'label': 'GCRV 6493: P04-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'GCRV 6493', 'label': 'GCRV 6493: P04-Type Anomaly' }, {'s': 'Col 132 Sector LX-U b31-0', 'label': 'Col 132 Sector LX-U b31-0: Solid Mineral Spheres' } ],'circle': false },
{ 'points': [ {'s': 'Col 132 Sector LX-U b31-0', 'label': 'Col 132 Sector LX-U b31-0: Solid Mineral Spheres' }, {'s': 'HD 63276', 'label': 'HD 63276: Lindigoticum Brain Tree' } ],'circle': false },
{ 'points': [ {'s': 'HD 63276', 'label': 'HD 63276: Lindigoticum Brain Tree' }, {'s': 'HIP 40749', 'label': 'HIP 40749: Rufum Gourd Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'HIP 40749', 'label': 'HIP 40749: Rufum Gourd Mollusc' }, {'s': 'Swoilz XN-B d21', 'label': 'Swoilz XN-B d21: Viride Brain Tree' } ],'circle': false },
{ 'points': [ {'s': 'Swoilz XN-B d21', 'label': 'Swoilz XN-B d21: Viride Brain Tree' }, {'s': 'Col 173 Sector FH-M d7-3', 'label': 'Col 173 Sector FH-M d7-3: Gypseeum Brain Tree' } ],'circle': false },
{ 'points': [ {'s': 'Col 173 Sector FH-M d7-3', 'label': 'Col 173 Sector FH-M d7-3: Gypseeum Brain Tree' }, {'s': 'Synuefe XW-A b44-0', 'label': 'Synuefe XW-A b44-0: Lividum Brain TreeAureum Brain Tree' } ],'circle': false },
{ 'points': [ {'s': 'Synuefe XW-A b44-0', 'label': 'Synuefe XW-A b44-0: Lividum Brain TreeAureum Brain Tree' }, {'s': 'Synuefe IS-J d9-16', 'label': 'Synuefe IS-J d9-16: Roseum Brain Tree' } ],'circle': false },
{ 'points': [ {'s': 'Synuefe IS-J d9-16', 'label': 'Synuefe IS-J d9-16: Roseum Brain Tree' }, {'s': 'Synuefe BS-I d10-14', 'label': 'Synuefe BS-I d10-14: Ostrinum Brain Tree' } ],'circle': false },
{ 'points': [ {'s': 'Synuefe BS-I d10-14', 'label': 'Synuefe BS-I d10-14: Ostrinum Brain Tree' }, {'s': 'Col 285 Sector GG-N c7-34', 'label': 'Col 285 Sector GG-N c7-34: Croceum Gourd Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Col 285 Sector GG-N c7-34', 'label': 'Col 285 Sector GG-N c7-34: Croceum Gourd Mollusc' }, {'s': 'HD 160167', 'label': 'HD 160167: Caeruleum Gourd Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'HD 160167', 'label': 'HD 160167: Caeruleum Gourd Mollusc' }, {'s': 'HIP 116276', 'label': 'HIP 116276: Proto-Lagrange Cloud' } ],'circle': false },
{ 'points': [ {'s': 'HIP 116276', 'label': 'HIP 116276: Proto-Lagrange Cloud' }, {'s': 'Lyed XJ-I d9-0', 'label': 'Lyed XJ-I d9-0: P07-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Lyed XJ-I d9-0', 'label': 'Lyed XJ-I d9-0: P07-Type Anomaly' }, {'s': 'Eorgh Hypa RR-U c19-0', 'label': 'Eorgh Hypa RR-U c19-0: Roseum Gyre Pod' } ],'circle': false },
{ 'points': [ {'s': 'Eorgh Hypa RR-U c19-0', 'label': 'Eorgh Hypa RR-U c19-0: Roseum Gyre Pod' }, {'s': 'Hypoi Hype UA-U d4-0', 'label': 'Hypoi Hype UA-U d4-0: Aurarium Gyre PodViridis Gyre TreeAurarium Gyre Tree' } ],'circle': false },
{ 'points': [ {'s': 'Hypoi Hype UA-U d4-0', 'label': 'Hypoi Hype UA-U d4-0: Aurarium Gyre PodViridis Gyre TreeAurarium Gyre Tree' }, {'s': 'Lyed YJ-I d9-0', 'label': 'Lyed YJ-I d9-0: P05-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Lyed YJ-I d9-0', 'label': 'Lyed YJ-I d9-0: P05-Type Anomaly' }, {'s': 'Trifid Sector DL-Y d157', 'label': 'Trifid Sector DL-Y d157: Albidum Collared Pod' } ],'circle': false },
{ 'points': [ {'s': 'Trifid Sector DL-Y d157', 'label': 'Trifid Sector DL-Y d157: Albidum Collared Pod' }, {'s': 'Trifid Sector FW-W d1-233', 'label': 'Trifid Sector FW-W d1-233: Lividum Collared Pod' } ],'circle': false },
{ 'points': [ {'s': 'Trifid Sector FW-W d1-233', 'label': 'Trifid Sector FW-W d1-233: Lividum Collared Pod' }, {'s': 'Trifid Sector GW-W c1-14', 'label': 'Trifid Sector GW-W c1-14: Blatteum Collared Pod' } ],'circle': false },
{ 'points': [ {'s': 'Trifid Sector GW-W c1-14', 'label': 'Trifid Sector GW-W c1-14: Blatteum Collared Pod' }, {'s': 'Trifid Sector HR-W d1-255', 'label': 'Trifid Sector HR-W d1-255: Rubicundum Collared Pod' } ],'circle': false },
{ 'points': [ {'s': 'Trifid Sector HR-W d1-255', 'label': 'Trifid Sector HR-W d1-255: Rubicundum Collared Pod' }, {'s': 'Nyeajaae KY-P d6-126', 'label': 'Nyeajaae KY-P d6-126: Roseum Sinuous Tubers' } ],'circle': false },
{ 'points': [ {'s': 'Nyeajaae KY-P d6-126', 'label': 'Nyeajaae KY-P d6-126: Roseum Sinuous Tubers' }, {'s': 'Nyeajaae JI-R d5-64', 'label': 'Nyeajaae JI-R d5-64: Blatteum Sinuous TubersLindigoticum Sinuous TubersViolaceum Sinuous TubersViride Sinuous Tubers' } ],'circle': false },
{ 'points': [ {'s': 'Nyeajaae JI-R d5-64', 'label': 'Nyeajaae JI-R d5-64: Blatteum Sinuous TubersLindigoticum Sinuous TubersViolaceum Sinuous TubersViride Sinuous Tubers' }, {'s': 'Traikeou XK-N d7-6', 'label': 'Traikeou XK-N d7-6: Purpureum Gourd Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Traikeou XK-N d7-6', 'label': 'Traikeou XK-N d7-6: Purpureum Gourd Mollusc' }, {'s': 'Pru Aescs NC-M d7-192', 'label': 'Pru Aescs NC-M d7-192: P01-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Pru Aescs NC-M d7-192', 'label': 'Pru Aescs NC-M d7-192: P01-Type Anomaly' }, {'s': 'Spliefooe CT-O d7-1', 'label': 'Spliefooe CT-O d7-1: Caeruleum Peduncle Tree' } ],'circle': false },
{ 'points': [ {'s': 'Spliefooe CT-O d7-1', 'label': 'Spliefooe CT-O d7-1: Caeruleum Peduncle Tree' }, {'s': 'Eolls Ploe CA-A c0', 'label': 'Eolls Ploe CA-A c0: Ostrinum Peduncle TreeRubellum Peduncle Tree' } ],'circle': false },
{ 'points': [ {'s': 'Eolls Ploe CA-A c0', 'label': 'Eolls Ploe CA-A c0: Ostrinum Peduncle TreeRubellum Peduncle Tree' }, {'s': 'Vaimau XC-E c1-0', 'label': 'Vaimau XC-E c1-0: Candidum Peduncle PodViride Peduncle Tree' } ],'circle': false },
{ 'points': [ {'s': 'Vaimau XC-E c1-0', 'label': 'Vaimau XC-E c1-0: Candidum Peduncle PodViride Peduncle Tree' }, {'s': 'Dryeia Blao JS-A d1-5', 'label': 'Dryeia Blao JS-A d1-5: Purpureum Peduncle Pod' } ],'circle': false },
{ 'points': [ {'s': 'Dryeia Blao JS-A d1-5', 'label': 'Dryeia Blao JS-A d1-5: Purpureum Peduncle Pod' }, {'s': 'Dryeia Blao IS-A d1-2', 'label': 'Dryeia Blao IS-A d1-2: Gypseeum Peduncle Pod' } ],'circle': false },
{ 'points': [ {'s': 'Dryeia Blao IS-A d1-2', 'label': 'Dryeia Blao IS-A d1-2: Gypseeum Peduncle Pod' }, {'s': 'Bauloae QN-L b8-0', 'label': 'Bauloae QN-L b8-0: Caeruleum Peduncle Pod' } ],'circle': false },
{ 'points': [ {'s': 'Bauloae QN-L b8-0', 'label': 'Bauloae QN-L b8-0: Caeruleum Peduncle Pod' }, {'s': 'Bauloae SR-W d1-50', 'label': 'Bauloae SR-W d1-50: Rufum Peduncle Pod' } ],'circle': false },
{ 'points': [ {'s': 'Bauloae SR-W d1-50', 'label': 'Bauloae SR-W d1-50: Rufum Peduncle Pod' }, {'s': 'Coesky DW-U d3-0', 'label': 'Coesky DW-U d3-0: Gypseeum Rhizome Pod' } ],'circle': false },
{ 'points': [ {'s': 'Coesky DW-U d3-0', 'label': 'Coesky DW-U d3-0: Gypseeum Rhizome Pod' }, {'s': 'Coesky JC-C d0', 'label': 'Coesky JC-C d0: Cobalteum Rhizome Pod' } ],'circle': false },
{ 'points': [ {'s': 'Coesky JC-C d0', 'label': 'Coesky JC-C d0: Cobalteum Rhizome Pod' }, {'s': 'Scroers OQ-B d14-0', 'label': 'Scroers OQ-B d14-0: Candidum Rhizome Pod' } ],'circle': false },
{ 'points': [ {'s': 'Scroers OQ-B d14-0', 'label': 'Scroers OQ-B d14-0: Candidum Rhizome Pod' }, {'s': 'Ausairg CK-I d9-2', 'label': 'Ausairg CK-I d9-2: Rubeum Rhizome Pod' } ],'circle': false },
{ 'points': [ {'s': 'Ausairg CK-I d9-2', 'label': 'Ausairg CK-I d9-2: Rubeum Rhizome Pod' }, {'s': 'Scroers VV-T d4-1', 'label': 'Scroers VV-T d4-1: Purpureum Rhizome Pod' } ],'circle': false },
{ 'points': [ {'s': 'Scroers VV-T d4-1', 'label': 'Scroers VV-T d4-1: Purpureum Rhizome Pod' }, {'s': 'Whookua AX-W c4-2', 'label': 'Whookua AX-W c4-2: Caeruleum Quadripartite Pod' } ],'circle': false },
{ 'points': [ {'s': 'Whookua AX-W c4-2', 'label': 'Whookua AX-W c4-2: Caeruleum Quadripartite Pod' }, {'s': 'Synookea MS-U d2-4', 'label': 'Synookea MS-U d2-4: Blatteum Quadripartite Pod' } ],'circle': false },
{ 'points': [ {'s': 'Synookea MS-U d2-4', 'label': 'Synookea MS-U d2-4: Blatteum Quadripartite Pod' }, {'s': 'Pre Eaeb AN-H d11-10', 'label': 'Pre Eaeb AN-H d11-10: Albidum Quadripartite Pod' } ],'circle': false },
{ 'points': [ {'s': 'Pre Eaeb AN-H d11-10', 'label': 'Pre Eaeb AN-H d11-10: Albidum Quadripartite Pod' }, {'s': 'Whookua VQ-Y c3-1', 'label': 'Whookua VQ-Y c3-1: Viride Quadripartite Pod' } ],'circle': false },
{ 'points': [ {'s': 'Whookua VQ-Y c3-1', 'label': 'Whookua VQ-Y c3-1: Viride Quadripartite Pod' }, {'s': 'Joorai LX-L d7-223', 'label': 'Joorai LX-L d7-223: P09-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Joorai LX-L d7-223', 'label': 'Joorai LX-L d7-223: P09-Type Anomaly' }, {'s': 'Joorai NI-K d8-9', 'label': 'Joorai NI-K d8-9: P08-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Joorai NI-K d8-9', 'label': 'Joorai NI-K d8-9: P08-Type Anomaly' }, {'s': 'Joorai NI-K d8-115', 'label': 'Joorai NI-K d8-115: P14-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Joorai NI-K d8-115', 'label': 'Joorai NI-K d8-115: P14-Type Anomaly' }, {'s': 'Joorai NI-K d8-163', 'label': 'Joorai NI-K d8-163: P12-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Joorai NI-K d8-163', 'label': 'Joorai NI-K d8-163: P12-Type Anomaly' }, {'s': 'Syrivu DL-P d5-2', 'label': 'Syrivu DL-P d5-2: Ostrinum Chalice Pod' } ],'circle': false },
{ 'points': [ {'s': 'Syrivu DL-P d5-2', 'label': 'Syrivu DL-P d5-2: Ostrinum Chalice Pod' }, {'s': 'Crivoe JO-O d7-0', 'label': 'Crivoe JO-O d7-0: Prasinum Silicate Crystals' } ],'circle': false },
{ 'points': [ {'s': 'Crivoe JO-O d7-0', 'label': 'Crivoe JO-O d7-0: Prasinum Silicate Crystals' }, {'s': 'Crivoe CX-R d5-11', 'label': 'Crivoe CX-R d5-11: Flavum Silicate CrystalsAlbidum Chalice Pod' } ],'circle': false },
{ 'points': [ {'s': 'Crivoe CX-R d5-11', 'label': 'Crivoe CX-R d5-11: Flavum Silicate CrystalsAlbidum Chalice Pod' }, {'s': 'Pyra Dryoae ET-O d7-7', 'label': 'Pyra Dryoae ET-O d7-7: Caeruleum Chalice Pod' } ],'circle': false },
{ 'points': [ {'s': 'Pyra Dryoae ET-O d7-7', 'label': 'Pyra Dryoae ET-O d7-7: Caeruleum Chalice Pod' }, {'s': 'Iorady EI-B d13-0', 'label': 'Iorady EI-B d13-0: K13-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Iorady EI-B d13-0', 'label': 'Iorady EI-B d13-0: K13-Type Anomaly' }, {'s': 'Pyrooe Dryiae CC-B d1-0', 'label': 'Pyrooe Dryiae CC-B d1-0: Cereum Aster Tree' } ],'circle': false },
{ 'points': [ {'s': 'Pyrooe Dryiae CC-B d1-0', 'label': 'Pyrooe Dryiae CC-B d1-0: Cereum Aster Tree' }, {'s': 'Pyrooe Dryiae ZQ-C d0', 'label': 'Pyrooe Dryiae ZQ-C d0: Puniceum Aster Pod' } ],'circle': false },
{ 'points': [ {'s': 'Pyrooe Dryiae ZQ-C d0', 'label': 'Pyrooe Dryiae ZQ-C d0: Puniceum Aster Pod' }, {'s': 'Cliewoae DS-H d11-0', 'label': 'Cliewoae DS-H d11-0: Rubellum Aster PodRubellum Aster Tree' } ],'circle': false },
{ 'points': [ {'s': 'Cliewoae DS-H d11-0', 'label': 'Cliewoae DS-H d11-0: Rubellum Aster PodRubellum Aster Tree' }, {'s': 'Cliewoae VA-L d9-0', 'label': 'Cliewoae VA-L d9-0: Lindigoticum Aster Pod' } ],'circle': false },
{ 'points': [ {'s': 'Cliewoae VA-L d9-0', 'label': 'Cliewoae VA-L d9-0: Lindigoticum Aster Pod' }, {'s': 'Cliewoae UF-L d9-0', 'label': 'Cliewoae UF-L d9-0: Prasinum Aster PodPrasinum Aster Tree' } ],'circle': false },
{ 'points': [ {'s': 'Cliewoae UF-L d9-0', 'label': 'Cliewoae UF-L d9-0: Prasinum Aster PodPrasinum Aster Tree' }, {'s': 'Cliewoae NT-F d12-0', 'label': 'Cliewoae NT-F d12-0: Cereum Aster Pod' } ],'circle': false },
{ 'points': [ {'s': 'Cliewoae NT-F d12-0', 'label': 'Cliewoae NT-F d12-0: Cereum Aster Pod' }, {'s': 'Flyeia Byoea UK-Q b24-6', 'label': 'Flyeia Byoea UK-Q b24-6: Flavum Ice CrystalsPuniceum Squid Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Flyeia Byoea UK-Q b24-6', 'label': 'Flyeia Byoea UK-Q b24-6: Flavum Ice CrystalsPuniceum Squid Mollusc' }, {'s': 'Flyeia Byoea GE-K c11-32', 'label': 'Flyeia Byoea GE-K c11-32: Rubeum Ice CrystalsPurpureum Silicate CrystalsAlbulum Squid Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Flyeia Byoea GE-K c11-32', 'label': 'Flyeia Byoea GE-K c11-32: Rubeum Ice CrystalsPurpureum Silicate CrystalsAlbulum Squid Mollusc' }, {'s': 'Flyeia Byoea WU-W d2-17', 'label': 'Flyeia Byoea WU-W d2-17: Lindigoticum Ice CrystalsRubeum Silicate CrystalsRoseum Squid Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Flyeia Byoea WU-W d2-17', 'label': 'Flyeia Byoea WU-W d2-17: Lindigoticum Ice CrystalsRubeum Silicate CrystalsRoseum Squid Mollusc' }, {'s': 'Ploea Brou RH-D c12-27', 'label': 'Ploea Brou RH-D c12-27: Cymatilis Silicate CrystalsCaeruleum Squid Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Ploea Brou RH-D c12-27', 'label': 'Ploea Brou RH-D c12-27: Cymatilis Silicate CrystalsCaeruleum Squid Mollusc' }, {'s': 'Ploea Brou BD-M c7-34', 'label': 'Ploea Brou BD-M c7-34: Roseum Ice CrystalsPurpureum Ice Crystals' } ],'circle': false },
{ 'points': [ {'s': 'Ploea Brou BD-M c7-34', 'label': 'Ploea Brou BD-M c7-34: Roseum Ice CrystalsPurpureum Ice Crystals' }, {'s': 'Ploea Brou BD-M c7-33', 'label': 'Ploea Brou BD-M c7-33: Roseum Silicate Crystals' } ],'circle': false },
{ 'points': [ {'s': 'Ploea Brou BD-M c7-33', 'label': 'Ploea Brou BD-M c7-33: Roseum Silicate Crystals' }, {'s': 'Ploea Brou BL-Y b14-5', 'label': 'Ploea Brou BL-Y b14-5: Rubeum Squid Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Ploea Brou BL-Y b14-5', 'label': 'Ploea Brou BL-Y b14-5: Rubeum Squid Mollusc' }, {'s': 'Ploea Brou RY-B b13-7', 'label': 'Ploea Brou RY-B b13-7: Prasinum Ice Crystals' } ],'circle': false },
{ 'points': [ {'s': 'Ploea Brou RY-B b13-7', 'label': 'Ploea Brou RY-B b13-7: Prasinum Ice Crystals' }, {'s': 'Throefou KE-E d13-48', 'label': 'Throefou KE-E d13-48: Albidum Silicate Crystals' } ],'circle': false },
{ 'points': [ {'s': 'Throefou KE-E d13-48', 'label': 'Throefou KE-E d13-48: Albidum Silicate Crystals' }, {'s': 'Preae Chroa EI-I c23-43', 'label': 'Preae Chroa EI-I c23-43: Albidum Ice Crystals' } ],'circle': false },
{ 'points': [ {'s': 'Preae Chroa EI-I c23-43', 'label': 'Preae Chroa EI-I c23-43: Albidum Ice Crystals' }, {'s': 'Xothuia SJ-J c24-198', 'label': 'Xothuia SJ-J c24-198: Luteolum Bulb Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Xothuia SJ-J c24-198', 'label': 'Xothuia SJ-J c24-198: Luteolum Bulb Mollusc' }, {'s': 'Eorl Bre VJ-G d11-467', 'label': 'Eorl Bre VJ-G d11-467: Viride Bulb Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Eorl Bre VJ-G d11-467', 'label': 'Eorl Bre VJ-G d11-467: Viride Bulb Mollusc' }, {'s': 'Xothuia EG-Y g95', 'label': 'Xothuia EG-Y g95: Lindigoticum Bulb Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Xothuia EG-Y g95', 'label': 'Xothuia EG-Y g95: Lindigoticum Bulb Mollusc' }, {'s': 'Dryio Bloo LT-Y d1-1089', 'label': 'Dryio Bloo LT-Y d1-1089: Viride Capsule Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Dryio Bloo LT-Y d1-1089', 'label': 'Dryio Bloo LT-Y d1-1089: Viride Capsule Mollusc' }, {'s': 'Dryio Bloo YE-A g1518', 'label': 'Dryio Bloo YE-A g1518: Lindigoticum Capsule Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Dryio Bloo YE-A g1518', 'label': 'Dryio Bloo YE-A g1518: Lindigoticum Capsule Mollusc' }, {'s': 'Dryio Bloo RU-W d2-599', 'label': 'Dryio Bloo RU-W d2-599: Luteolum Capsule Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Dryio Bloo RU-W d2-599', 'label': 'Dryio Bloo RU-W d2-599: Luteolum Capsule Mollusc' }, {'s': 'Aiphaisty YE-A d130', 'label': 'Aiphaisty YE-A d130: Q07-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Aiphaisty YE-A d130', 'label': 'Aiphaisty YE-A d130: Q07-Type Anomaly' }, {'s': 'Dryu Chraea FH-D d12-49', 'label': 'Dryu Chraea FH-D d12-49: Luteolum Calcite PlatesLindigoticum Calcite PlatesViride Calcite PlatesQ01-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Dryu Chraea FH-D d12-49', 'label': 'Dryu Chraea FH-D d12-49: Luteolum Calcite PlatesLindigoticum Calcite PlatesViride Calcite PlatesQ01-Type Anomaly' }, {'s': 'Wembeau KM-V e2-12', 'label': 'Wembeau KM-V e2-12: L03-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Wembeau KM-V e2-12', 'label': 'Wembeau KM-V e2-12: L03-Type Anomaly' }, {'s': 'Flyoo Groa SO-Z e0', 'label': 'Flyoo Groa SO-Z e0: Stolon PodStolon Tree' } ],'circle': false },
{ 'points': [ {'s': 'Flyoo Groa SO-Z e0', 'label': 'Flyoo Groa SO-Z e0: Stolon PodStolon Tree' }, {'s': 'Vegnue AG-O e6-199', 'label': 'Vegnue AG-O e6-199: Lindigoticum Parasol Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Vegnue AG-O e6-199', 'label': 'Vegnue AG-O e6-199: Lindigoticum Parasol Mollusc' }, {'s': 'Vegnue VK-E d12-1282', 'label': 'Vegnue VK-E d12-1282: Luteolum Parasol Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Vegnue VK-E d12-1282', 'label': 'Vegnue VK-E d12-1282: Luteolum Parasol Mollusc' }, {'s': 'Vegnue UE-Q e5-33', 'label': 'Vegnue UE-Q e5-33: Viride Parasol Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Vegnue UE-Q e5-33', 'label': 'Vegnue UE-Q e5-33: Viride Parasol Mollusc' }, {'s': 'Vegnoae QO-I d9-2277', 'label': 'Vegnoae QO-I d9-2277: E02-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Vegnoae QO-I d9-2277', 'label': 'Vegnoae QO-I d9-2277: E02-Type Anomaly' }, {'s': 'Phleedgaa UJ-Q e5-185', 'label': 'Phleedgaa UJ-Q e5-185: E03-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Phleedgaa UJ-Q e5-185', 'label': 'Phleedgaa UJ-Q e5-185: E03-Type Anomaly' }, {'s': 'Gru Hypai DL-X e1-20', 'label': 'Gru Hypai DL-X e1-20: K02-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Gru Hypai DL-X e1-20', 'label': 'Gru Hypai DL-X e1-20: K02-Type Anomaly' }, {'s': 'Blae Hypue FV-O d6-8', 'label': 'Blae Hypue FV-O d6-8: Cymatilis Bell Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Blae Hypue FV-O d6-8', 'label': 'Blae Hypue FV-O d6-8: Cymatilis Bell Mollusc' }, {'s': 'Plaa Ain AA-Q d5-91', 'label': 'Plaa Ain AA-Q d5-91: Amphora Plant' } ],'circle': false },
{ 'points': [ {'s': 'Plaa Ain AA-Q d5-91', 'label': 'Plaa Ain AA-Q d5-91: Amphora Plant' }, {'s': 'Eodgorsts TX-C b13-3', 'label': 'Eodgorsts TX-C b13-3: Q05-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Eodgorsts TX-C b13-3', 'label': 'Eodgorsts TX-C b13-3: Q05-Type Anomaly' }, {'s': 'Wepaa BA-A g1462', 'label': 'Wepaa BA-A g1462: E04-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Wepaa BA-A g1462', 'label': 'Wepaa BA-A g1462: E04-Type Anomaly' }, {'s': 'Wepaa GG-Y f2201', 'label': 'Wepaa GG-Y f2201: K01-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Wepaa GG-Y f2201', 'label': 'Wepaa GG-Y f2201: K01-Type Anomaly' }, {'s': 'Wepaa GG-Y f343', 'label': 'Wepaa GG-Y f343: K04-Type AnomalyK06-Type AnomalyK08-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Wepaa GG-Y f343', 'label': 'Wepaa GG-Y f343: K04-Type AnomalyK06-Type AnomalyK08-Type Anomaly' }, {'s': 'Wepaa GG-Y f772', 'label': 'Wepaa GG-Y f772: K03-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Wepaa GG-Y f772', 'label': 'Wepaa GG-Y f772: K03-Type Anomaly' }, {'s': 'Wepaa BA-A g1712', 'label': 'Wepaa BA-A g1712: K05-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Wepaa BA-A g1712', 'label': 'Wepaa BA-A g1712: K05-Type Anomaly' }, {'s': 'Eol Prou EO-R a35-0', 'label': 'Eol Prou EO-R a35-0: Virens Umbrella Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Eol Prou EO-R a35-0', 'label': 'Eol Prou EO-R a35-0: Virens Umbrella Mollusc' }, {'s': 'Dryoea Flyi II-S e4-6870', 'label': 'Dryoea Flyi II-S e4-6870: Luteolum Lagrange Storm CloudK12-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Dryoea Flyi II-S e4-6870', 'label': 'Dryoea Flyi II-S e4-6870: Luteolum Lagrange Storm CloudK12-Type Anomaly' }, {'s': 'Eol Prou IW-W e1-1868', 'label': 'Eol Prou IW-W e1-1868: Cymatilis Umbrella Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Eol Prou IW-W e1-1868', 'label': 'Eol Prou IW-W e1-1868: Cymatilis Umbrella Mollusc' }, {'s': 'Eol Prou RS-T d3-351', 'label': 'Eol Prou RS-T d3-351: Luteolum Umbrella Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Eol Prou RS-T d3-351', 'label': 'Eol Prou RS-T d3-351: Luteolum Umbrella Mollusc' }, {'s': 'Ovomly AA-H d10-13', 'label': 'Ovomly AA-H d10-13: Rutulum Calcite PlatesCaeruleum Torus Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Ovomly AA-H d10-13', 'label': 'Ovomly AA-H d10-13: Rutulum Calcite PlatesCaeruleum Torus Mollusc' }, {'s': 'Ovomly AA-H d10-10', 'label': 'Ovomly AA-H d10-10: Blatteum Torus Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Ovomly AA-H d10-10', 'label': 'Ovomly AA-H d10-10: Blatteum Torus Mollusc' }, {'s': 'Ovomly DA-Q d5-16', 'label': 'Ovomly DA-Q d5-16: Rubellum Torus Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Ovomly DA-Q d5-16', 'label': 'Ovomly DA-Q d5-16: Rubellum Torus Mollusc' }, {'s': 'Cyuefoo LC-D d12-0', 'label': 'Cyuefoo LC-D d12-0: L09-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Cyuefoo LC-D d12-0', 'label': 'Cyuefoo LC-D d12-0: L09-Type Anomaly' }, {'s': 'Byaa Thoi MI-B d13-0', 'label': 'Byaa Thoi MI-B d13-0: K07-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Byaa Thoi MI-B d13-0', 'label': 'Byaa Thoi MI-B d13-0: K07-Type Anomaly' }, {'s': 'Ovomly SS-K d8-8', 'label': 'Ovomly SS-K d8-8: Viride Torus Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Ovomly SS-K d8-8', 'label': 'Ovomly SS-K d8-8: Viride Torus Mollusc' }, {'s': 'Prai Hypoo SX-B d23', 'label': 'Prai Hypoo SX-B d23: Albidum Peduncle TreeBlatteum Bell Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Prai Hypoo SX-B d23', 'label': 'Prai Hypoo SX-B d23: Albidum Peduncle TreeBlatteum Bell Mollusc' }, {'s': 'Blua Hypa BH-J d10-352', 'label': 'Blua Hypa BH-J d10-352: Albidum Sinuous TubersCaeruleum Sinuous Tubers' } ],'circle': false },
{ 'points': [ {'s': 'Blua Hypa BH-J d10-352', 'label': 'Blua Hypa BH-J d10-352: Albidum Sinuous TubersCaeruleum Sinuous Tubers' }, {'s': 'Blua Hypa KT-F d12-504', 'label': 'Blua Hypa KT-F d12-504: Prasinum Sinuous Tubers' } ],'circle': false },
{ 'points': [ {'s': 'Blua Hypa KT-F d12-504', 'label': 'Blua Hypa KT-F d12-504: Prasinum Sinuous Tubers' }, {'s': 'Ellaisms QX-U e2-43', 'label': 'Ellaisms QX-U e2-43: P02-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Ellaisms QX-U e2-43', 'label': 'Ellaisms QX-U e2-43: P02-Type Anomaly' }, {'s': 'Skaudai YP-O e6-17', 'label': 'Skaudai YP-O e6-17: Carpasinus Bell Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Skaudai YP-O e6-17', 'label': 'Skaudai YP-O e6-17: Carpasinus Bell Mollusc' }, {'s': 'Skaudai CH-B d14-50', 'label': 'Skaudai CH-B d14-50: Albens Bell Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Skaudai CH-B d14-50', 'label': 'Skaudai CH-B d14-50: Albens Bell Mollusc' }, {'s': 'Prua Phoe WN-B d15', 'label': 'Prua Phoe WN-B d15: Puniceum Brain Tree' } ],'circle': false },
{ 'points': [ {'s': 'Prua Phoe WN-B d15', 'label': 'Prua Phoe WN-B d15: Puniceum Brain Tree' }, {'s': 'Blu Ain QC-M d7-3330', 'label': 'Blu Ain QC-M d7-3330: P10-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Blu Ain QC-M d7-3330', 'label': 'Blu Ain QC-M d7-3330: P10-Type Anomaly' }, {'s': 'Greae Phio DT-G d11-1570', 'label': 'Greae Phio DT-G d11-1570: Cymatilis Reel Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Greae Phio DT-G d11-1570', 'label': 'Greae Phio DT-G d11-1570: Cymatilis Reel Mollusc' }, {'s': 'Eeshorks UY-A d960', 'label': 'Eeshorks UY-A d960: Luteolum Reel Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Eeshorks UY-A d960', 'label': 'Eeshorks UY-A d960: Luteolum Reel Mollusc' }, {'s': 'Eeshorks WO-A e191', 'label': 'Eeshorks WO-A e191: Viride Reel Mollusc' } ],'circle': false },
{ 'points': [ {'s': 'Eeshorks WO-A e191', 'label': 'Eeshorks WO-A e191: Viride Reel Mollusc' }, {'s': 'Shrogaae MF-A d700', 'label': 'Shrogaae MF-A d700: Caeruleum Octahedral PodChryseum Void Heart' } ],'circle': false },
{ 'points': [ {'s': 'Shrogaae MF-A d700', 'label': 'Shrogaae MF-A d700: Caeruleum Octahedral PodChryseum Void Heart' }, {'s': 'Shrogaae MF-A d1228', 'label': 'Shrogaae MF-A d1228: Viride Octahedral Pod' } ],'circle': false },
{ 'points': [ {'s': 'Shrogaae MF-A d1228', 'label': 'Shrogaae MF-A d1228: Viride Octahedral Pod' }, {'s': 'Shrogaae KK-A d983', 'label': 'Shrogaae KK-A d983: Niveum Octahedral Pod' } ],'circle': false },
{ 'points': [ {'s': 'Shrogaae KK-A d983', 'label': 'Shrogaae KK-A d983: Niveum Octahedral Pod' }, {'s': 'Shrogeau GG-Y e119', 'label': 'Shrogeau GG-Y e119: Rubicundum Lagrange Storm CloudP03-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Shrogeau GG-Y e119', 'label': 'Shrogeau GG-Y e119: Rubicundum Lagrange Storm CloudP03-Type Anomaly' }, {'s': 'Shrogaae KK-A d2672', 'label': 'Shrogaae KK-A d2672: Rubeum Octahedral Pod' } ],'circle': false },
{ 'points': [ {'s': 'Shrogaae KK-A d2672', 'label': 'Shrogaae KK-A d2672: Rubeum Octahedral Pod' }, {'s': 'Juenae OX-U e2-8852', 'label': 'Juenae OX-U e2-8852: Roseum Lagrange Storm CloudL01-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Juenae OX-U e2-8852', 'label': 'Juenae OX-U e2-8852: Roseum Lagrange Storm CloudL01-Type Anomaly' }, {'s': 'Phraa Pra HH-U e3-1354', 'label': 'Phraa Pra HH-U e3-1354: Viride Lagrange Storm CloudT02-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Phraa Pra HH-U e3-1354', 'label': 'Phraa Pra HH-U e3-1354: Viride Lagrange Storm CloudT02-Type Anomaly' }, {'s': 'Stuemeae FG-Y d7561', 'label': 'Stuemeae FG-Y d7561: L04-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Stuemeae FG-Y d7561', 'label': 'Stuemeae FG-Y d7561: L04-Type Anomaly' }, {'s': 'Stuemeae KM-W c1-342', 'label': 'Stuemeae KM-W c1-342: K11-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Stuemeae KM-W c1-342', 'label': 'Stuemeae KM-W c1-342: K11-Type Anomaly' }, {'s': 'Myriesly HR-N e6-4354', 'label': 'Myriesly HR-N e6-4354: Q02-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Myriesly HR-N e6-4354', 'label': 'Myriesly HR-N e6-4354: Q02-Type Anomaly' }, {'s': 'Myriesly HN-I c23-4504', 'label': 'Myriesly HN-I c23-4504: Q06-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Myriesly HN-I c23-4504', 'label': 'Myriesly HN-I c23-4504: Q06-Type Anomaly' }, {'s': 'Byoomao MI-S e4-5423', 'label': 'Byoomao MI-S e4-5423: L05-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Byoomao MI-S e4-5423', 'label': 'Byoomao MI-S e4-5423: L05-Type Anomaly' }, {'s': 'Byoomao JC-B d1-3681', 'label': 'Byoomao JC-B d1-3681: K10-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Byoomao JC-B d1-3681', 'label': 'Byoomao JC-B d1-3681: K10-Type Anomaly' }, {'s': 'Myriesly MS-T e3-3831', 'label': 'Myriesly MS-T e3-3831: T04-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Myriesly MS-T e3-3831', 'label': 'Myriesly MS-T e3-3831: T04-Type Anomaly' }, {'s': 'Nyuena RO-Z d184', 'label': 'Nyuena RO-Z d184: P15-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Nyuena RO-Z d184', 'label': 'Nyuena RO-Z d184: P15-Type Anomaly' }, {'s': 'Nyuena ID-Z c1-10', 'label': 'Nyuena ID-Z c1-10: P13-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Nyuena ID-Z c1-10', 'label': 'Nyuena ID-Z c1-10: P13-Type Anomaly' }, {'s': 'Agnairy HN-D c15-2598', 'label': 'Agnairy HN-D c15-2598: T01-Type Anomaly' } ],'circle': false },
{ 'points': [ {'s': 'Agnairy HN-D c15-2598', 'label': 'Agnairy HN-D c15-2598: T01-Type Anomaly' }, {'s': 'Varati', 'label': 'Varati' } ],'circle': false }
        ]
	},

	formatChallenge: function(data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].name && data[i].name.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = data[i].name;

				//Check Site Type and match categories

				var component = data[i].name.split(' ');
				if (poiSite['name'] == 'Varati') {
                    poiSite['details'] == 'Start and Finish';
					poiSite['cat'] = [10];
				} else {
                    poiSite['cat'] = [20];    
                }
				
                poiSite['url']="https://tools.canonn.tech/Signals/?system="+poiSite['name']
				poiSite['coords'] = {
					x: parseFloat(data[i].pos_x),
					y: parseFloat(data[i].pos_y),
					z: parseFloat(data[i].pos_z),
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_challenge.systemsData.systems.push(poiSite);
			}
		}
	},

	parseCSVData: function(url, callBack, resolvePromise) {
		Papa.parse(url, {
			download: true,
			header: true,
			complete: function(results) {
				callBack(results.data);

				// after we called the callback
				// (which is synchronous, so we know it's safe here)
				// we can resolve the promise

				document.getElementById("loading").style.display = "none";
				resolvePromise();
			},
		});
	},

	init: function() {
		var p1 = new Promise(function(resolve, reject) {
			canonnEd3d_challenge.parseCSVData('data/csvCache/expedition.csv', canonnEd3d_challenge.formatChallenge, resolve);
		});

		Promise.all([p1]).then(function() {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_challenge.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00',
			});
		});
	},
};
