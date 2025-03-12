var canonnEd3d_challenge = {
	//Define Categories
	systemsData: {
		categories: {
			'Challenge': {
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
			{ 'points': [{ 's': 'Varati', 'label': 'Varati (Thompson Dock)' }, { 's': 'Oochorrs NF-L d9-12', 'label': 'Oochorrs NF-L d9-12 (Crystalline Shards)' }], 'circle': false },
			{ 'points': [{ 's': 'Oochorrs NF-L d9-12', 'label': 'Oochorrs NF-L d9-12 (Crystalline Shards)' }, { 's': '116 Tauri', 'label': '116 Tauri (Luteolum Anemone - Croceum Anemone - Blatteum Bioluminescent Anemone - Rubeum Bioluminescent Anemone)' }], 'circle': false },
			{ 'points': [{ 's': '116 Tauri', 'label': '116 Tauri (Luteolum Anemone - Croceum Anemone - Blatteum Bioluminescent Anemone - Rubeum Bioluminescent Anemone)' }, { 's': 'Wredguia XD-K d8-24', 'label': 'Wredguia XD-K d8-24 (Phoeniceum Gourd Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Wredguia XD-K d8-24', 'label': 'Wredguia XD-K d8-24 (Phoeniceum Gourd Mollusc)' }, { 's': 'HIP 115991', 'label': 'HIP 115991 (Roseum Anemone)' }], 'circle': false },
			{ 'points': [{ 's': 'HIP 115991', 'label': 'HIP 115991 (Roseum Anemone)' }, { 's': 'HIP 15310', 'label': 'HIP 15310 (Q04-Type Anomaly - Q08-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'HIP 15310', 'label': 'HIP 15310 (Q04-Type Anomaly - Q08-Type Anomaly)' }, { 's': 'Alaunus', 'label': 'Alaunus (Q09-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Alaunus', 'label': 'Alaunus (Q09-Type Anomaly)' }, { 's': 'Col 285 Sector GG-N c7-34', 'label': 'Col 285 Sector GG-N c7-34 (Croceum Gourd Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Col 285 Sector GG-N c7-34', 'label': 'Col 285 Sector GG-N c7-34 (Croceum Gourd Mollusc)' }, { 's': 'Col 135 Sector DR-V c2-16', 'label': 'Col 135 Sector DR-V c2-16 (Viride Brain Tree)' }], 'circle': false },
			{ 'points': [{ 's': 'Col 135 Sector DR-V c2-16', 'label': 'Col 135 Sector DR-V c2-16 (Viride Brain Tree)' }, { 's': 'HD 81946', 'label': 'HD 81946 (Ostrinum Brain Tree - Roseum Bioluminescent Anemone - Albulum Gourd Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'HD 81946', 'label': 'HD 81946 (Ostrinum Brain Tree - Roseum Bioluminescent Anemone - Albulum Gourd Mollusc)' }, { 's': 'HD 63276', 'label': 'HD 63276 (Lindigoticum Brain Tree)' }], 'circle': false },
			{ 'points': [{ 's': 'HD 63276', 'label': 'HD 63276 (Lindigoticum Brain Tree)' }, { 's': 'BD-12 1172', 'label': 'BD-12 1172 (Lattice Mineral Spheres - Prasinum Bioluminescent Anemone - Viridans Gourd Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'BD-12 1172', 'label': 'BD-12 1172 (Lattice Mineral Spheres - Prasinum Bioluminescent Anemone - Viridans Gourd Mollusc)' }, { 's': 'HIP 139', 'label': 'HIP 139 (Puniceum Anemone)' }], 'circle': false },
			{ 'points': [{ 's': 'HIP 139', 'label': 'HIP 139 (Puniceum Anemone)' }, { 's': 'Cyuefoo LC-D d12-0', 'label': 'Cyuefoo LC-D d12-0 (L09-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Cyuefoo LC-D d12-0', 'label': 'Cyuefoo LC-D d12-0 (L09-Type Anomaly)' }, { 's': 'Byaa Thoi MI-B d13-0', 'label': 'Byaa Thoi MI-B d13-0 (K07-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Byaa Thoi MI-B d13-0', 'label': 'Byaa Thoi MI-B d13-0 (K07-Type Anomaly)' }, { 's': 'Ovomly DA-Q d5-16', 'label': 'Ovomly DA-Q d5-16 (Rubellum Torus Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Ovomly DA-Q d5-16', 'label': 'Ovomly DA-Q d5-16 (Rubellum Torus Mollusc)' }, { 's': 'Ovomly HG-O d6-0', 'label': 'Ovomly HG-O d6-0 (Luteolum Calcite Plates - Lindigoticum Calcite Plates - Viride Calcite Plates - Rutulum Calcite Plates - Blatteum Torus Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Ovomly HG-O d6-0', 'label': 'Ovomly HG-O d6-0 (Luteolum Calcite Plates - Lindigoticum Calcite Plates - Viride Calcite Plates - Rutulum Calcite Plates - Blatteum Torus Mollusc)' }, { 's': 'Ovomly SS-K d8-8', 'label': 'Ovomly SS-K d8-8 (Viride Torus Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Ovomly SS-K d8-8', 'label': 'Ovomly SS-K d8-8 (Viride Torus Mollusc)' }, { 's': 'Ovomly AA-H d10-13', 'label': 'Ovomly AA-H d10-13 (Caeruleum Torus Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Ovomly AA-H d10-13', 'label': 'Ovomly AA-H d10-13 (Caeruleum Torus Mollusc)' }, { 's': 'Prai Hypoo CY-C b3-1', 'label': 'Prai Hypoo CY-C b3-1 (Blatteum Bell Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Prai Hypoo CY-C b3-1', 'label': 'Prai Hypoo CY-C b3-1 (Blatteum Bell Mollusc)' }, { 's': 'Traikeou SE-P d6-16', 'label': 'Traikeou SE-P d6-16 (Purpureum Gourd Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Traikeou SE-P d6-16', 'label': 'Traikeou SE-P d6-16 (Purpureum Gourd Mollusc)' }, { 's': 'Ellaisms QX-U e2-43', 'label': 'Ellaisms QX-U e2-43 (P02-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Ellaisms QX-U e2-43', 'label': 'Ellaisms QX-U e2-43 (P02-Type Anomaly)' }, { 's': 'Skaudai YP-O e6-17', 'label': 'Skaudai YP-O e6-17 (Gypseeum Bell Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Skaudai YP-O e6-17', 'label': 'Skaudai YP-O e6-17 (Gypseeum Bell Mollusc)' }, { 's': 'Graea Hypue DC-T d4-84', 'label': 'Graea Hypue DC-T d4-84 (Puniceum Brain Tree - Amphora Plant)' }], 'circle': false },
			{ 'points': [{ 's': 'Graea Hypue DC-T d4-84', 'label': 'Graea Hypue DC-T d4-84 (Puniceum Brain Tree - Amphora Plant)' }, { 's': 'Blu Ain QC-M d7-3330', 'label': 'Blu Ain QC-M d7-3330 (P10-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Blu Ain QC-M d7-3330', 'label': 'Blu Ain QC-M d7-3330 (P10-Type Anomaly)' }, { 's': 'Greae Phio DT-G d11-1570', 'label': 'Greae Phio DT-G d11-1570 (Lindigoticum Reel Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Greae Phio DT-G d11-1570', 'label': 'Greae Phio DT-G d11-1570 (Lindigoticum Reel Mollusc)' }, { 's': 'Eeshorks QI-B d1496', 'label': 'Eeshorks QI-B d1496 (Luteolum Reel Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Eeshorks QI-B d1496', 'label': 'Eeshorks QI-B d1496 (Luteolum Reel Mollusc)' }, { 's': 'Eeshorks WO-A e191', 'label': 'Eeshorks WO-A e191 (Viride Reel Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Eeshorks WO-A e191', 'label': 'Eeshorks WO-A e191 (Viride Reel Mollusc)' }, { 's': 'Gru Phio DV-W d2-440', 'label': 'Gru Phio DV-W d2-440 (Roseum Sinuous Tubers - Prasinum Sinuous Tubers - Albidum Sinuous Tubers - Caeruleum Sinuous Tubers)' }], 'circle': false },
			{ 'points': [{ 's': 'Gru Phio DV-W d2-440', 'label': 'Gru Phio DV-W d2-440 (Roseum Sinuous Tubers - Prasinum Sinuous Tubers - Albidum Sinuous Tubers - Caeruleum Sinuous Tubers)' }, { 's': 'Gru Hypai DL-X e1-20', 'label': 'Gru Hypai DL-X e1-20 (K02-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Gru Hypai DL-X e1-20', 'label': 'Gru Hypai DL-X e1-20 (K02-Type Anomaly)' }, { 's': 'Blaa Hypai OZ-O d6-16', 'label': 'Blaa Hypai OZ-O d6-16 (Lindigoticum Bell Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Blaa Hypai OZ-O d6-16', 'label': 'Blaa Hypai OZ-O d6-16 (Lindigoticum Bell Mollusc)' }, { 's': 'Eodgorsts TX-C b13-3', 'label': 'Eodgorsts TX-C b13-3 (Q05-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Eodgorsts TX-C b13-3', 'label': 'Eodgorsts TX-C b13-3 (Q05-Type Anomaly)' }, { 's': 'Pru Aescs NC-M d7-192', 'label': 'Pru Aescs NC-M d7-192 (P01-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Pru Aescs NC-M d7-192', 'label': 'Pru Aescs NC-M d7-192 (P01-Type Anomaly)' }, { 's': 'Nyeajaae DA-Z a27-2', 'label': 'Nyeajaae DA-Z a27-2 (Viride Sinuous Tubers)' }], 'circle': false },
			{ 'points': [{ 's': 'Nyeajaae DA-Z a27-2', 'label': 'Nyeajaae DA-Z a27-2 (Viride Sinuous Tubers)' }, { 's': 'Trifid Sector BQ-Y d244', 'label': 'Trifid Sector BQ-Y d244 (Blatteum Collared Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Trifid Sector BQ-Y d244', 'label': 'Trifid Sector BQ-Y d244 (Blatteum Collared Pod)' }, { 's': 'Trifid Sector FW-W d1-233', 'label': 'Trifid Sector FW-W d1-233 (Lividum Collared Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Trifid Sector FW-W d1-233', 'label': 'Trifid Sector FW-W d1-233 (Lividum Collared Pod)' }, { 's': 'Trifid Sector DL-Y d157', 'label': 'Trifid Sector DL-Y d157 (Roseum Lagrange Cloud - Rubicundum Lagrange Cloud - Purpureum Metallic Crystals - Albidum Collared Pod - Rubicundum Collared Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Trifid Sector DL-Y d157', 'label': 'Trifid Sector DL-Y d157 (Roseum Lagrange Cloud - Rubicundum Lagrange Cloud - Purpureum Metallic Crystals - Albidum Collared Pod - Rubicundum Collared Pod)' }, { 's': 'HD 160167', 'label': 'HD 160167 (Caeruleum Gourd Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'HD 160167', 'label': 'HD 160167 (Caeruleum Gourd Mollusc)' }, { 's': 'HIP 98182', 'label': 'HIP 98182 (Rufum Gourd Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'HIP 98182', 'label': 'HIP 98182 (Rufum Gourd Mollusc)' }, { 's': 'Shrogaae KK-A d1791', 'label': 'Shrogaae KK-A d1791 (Caeruleum Octahedral Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Shrogaae KK-A d1791', 'label': 'Shrogaae KK-A d1791 (Caeruleum Octahedral Pod)' }, { 's': 'Shrogaae KK-A d1049', 'label': 'Shrogaae KK-A d1049 (Viride Octahedral Pod - Chryseum Void Heart)' }], 'circle': false },
			{ 'points': [{ 's': 'Shrogaae KK-A d1049', 'label': 'Shrogaae KK-A d1049 (Viride Octahedral Pod - Chryseum Void Heart)' }, { 's': 'Shrogaae KK-A d983', 'label': 'Shrogaae KK-A d983 (Niveum Octahedral Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Shrogaae KK-A d983', 'label': 'Shrogaae KK-A d983 (Niveum Octahedral Pod)' }, { 's': 'Shrogeau GG-Y e119', 'label': 'Shrogeau GG-Y e119 (Rubicundum Lagrange Storm Cloud - P03-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Shrogeau GG-Y e119', 'label': 'Shrogeau GG-Y e119 (Rubicundum Lagrange Storm Cloud - P03-Type Anomaly)' }, { 's': 'Shrogaae KK-A d2672', 'label': 'Shrogaae KK-A d2672 (Rubeum Octahedral Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Shrogaae KK-A d2672', 'label': 'Shrogaae KK-A d2672 (Rubeum Octahedral Pod)' }, { 's': 'Juenae OX-U e2-8852', 'label': 'Juenae OX-U e2-8852 (Roseum Lagrange Storm Cloud - L01-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Juenae OX-U e2-8852', 'label': 'Juenae OX-U e2-8852 (Roseum Lagrange Storm Cloud - L01-Type Anomaly)' }, { 's': 'Phraa Pra HH-U e3-1354', 'label': 'Phraa Pra HH-U e3-1354 (T02-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Phraa Pra HH-U e3-1354', 'label': 'Phraa Pra HH-U e3-1354 (T02-Type Anomaly)' }, { 's': 'Stuemeae FG-Y d7561', 'label': 'Stuemeae FG-Y d7561 (L04-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Stuemeae FG-Y d7561', 'label': 'Stuemeae FG-Y d7561 (L04-Type Anomaly)' }, { 's': 'Stuemeae KM-W c1-342', 'label': 'Stuemeae KM-W c1-342 (K11-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Stuemeae KM-W c1-342', 'label': 'Stuemeae KM-W c1-342 (K11-Type Anomaly)' }, { 's': 'Myriesly HR-N e6-4354', 'label': 'Myriesly HR-N e6-4354 (Q02-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Myriesly HR-N e6-4354', 'label': 'Myriesly HR-N e6-4354 (Q02-Type Anomaly)' }, { 's': 'Myriesly CB-F d11-2373', 'label': 'Myriesly CB-F d11-2373 (Q06-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Myriesly CB-F d11-2373', 'label': 'Myriesly CB-F d11-2373 (Q06-Type Anomaly)' }, { 's': 'Byoomao MI-S e4-5423', 'label': 'Byoomao MI-S e4-5423 (L05-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Byoomao MI-S e4-5423', 'label': 'Byoomao MI-S e4-5423 (L05-Type Anomaly)' }, { 's': 'Byoomao JC-B d1-3681', 'label': 'Byoomao JC-B d1-3681 (K10-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Byoomao JC-B d1-3681', 'label': 'Byoomao JC-B d1-3681 (K10-Type Anomaly)' }, { 's': 'Myriesly MS-T e3-3831', 'label': 'Myriesly MS-T e3-3831 (T04-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Myriesly MS-T e3-3831', 'label': 'Myriesly MS-T e3-3831 (T04-Type Anomaly)' }, { 's': 'Nyuena RO-Z d184', 'label': 'Nyuena RO-Z d184 (P15-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Nyuena RO-Z d184', 'label': 'Nyuena RO-Z d184 (P15-Type Anomaly)' }, { 's': 'Nyuena ID-Z c1-10', 'label': 'Nyuena ID-Z c1-10 (P13-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Nyuena ID-Z c1-10', 'label': 'Nyuena ID-Z c1-10 (P13-Type Anomaly)' }, { 's': 'Agnairy JH-U e3-2113', 'label': 'Agnairy JH-U e3-2113 (Viride Lagrange Storm Cloud - T01-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Agnairy JH-U e3-2113', 'label': 'Agnairy JH-U e3-2113 (Viride Lagrange Storm Cloud - T01-Type Anomaly)' }, { 's': 'Dryoea Flyi II-S e4-6870', 'label': 'Dryoea Flyi II-S e4-6870 (Luteolum Lagrange Storm Cloud - Blatteum Sinuous Tubers - Lindigoticum Sinuous Tubers - Violaceum Sinuous Tubers - Prasinum Metallic Crystals - Rubeum Metallic Crystals - Flavum Metallic Crystals - K12-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Dryoea Flyi II-S e4-6870', 'label': 'Dryoea Flyi II-S e4-6870 (Luteolum Lagrange Storm Cloud - Blatteum Sinuous Tubers - Lindigoticum Sinuous Tubers - Violaceum Sinuous Tubers - Prasinum Metallic Crystals - Rubeum Metallic Crystals - Flavum Metallic Crystals - K12-Type Anomaly)' }, { 's': 'Eol Prou IW-W e1-1868', 'label': 'Eol Prou IW-W e1-1868 (Lindigoticum Umbrella Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Eol Prou IW-W e1-1868', 'label': 'Eol Prou IW-W e1-1868 (Lindigoticum Umbrella Mollusc)' }, { 's': 'Asura', 'label': 'Asura (Luteolum Umbrella Mollusc - Virens Umbrella Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Asura', 'label': 'Asura (Luteolum Umbrella Mollusc - Virens Umbrella Mollusc)' }, { 's': 'Wepaa BF-A f494', 'label': 'Wepaa BF-A f494 (Caeruleum Lagrange Cloud - Croceum Lagrange Cloud - K01-Type Anomaly - K03-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Wepaa BF-A f494', 'label': 'Wepaa BF-A f494 (Caeruleum Lagrange Cloud - Croceum Lagrange Cloud - K01-Type Anomaly - K03-Type Anomaly)' }, { 's': 'Wepaa BA-A g524', 'label': 'Wepaa BA-A g524 (K05-Type Anomaly - E04-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Wepaa BA-A g524', 'label': 'Wepaa BA-A g524 (K05-Type Anomaly - E04-Type Anomaly)' }, { 's': 'Wepaa GG-Y f343', 'label': 'Wepaa GG-Y f343 (K04-Type Anomaly - K06-Type Anomaly - K08-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Wepaa GG-Y f343', 'label': 'Wepaa GG-Y f343 (K04-Type Anomaly - K06-Type Anomaly - K08-Type Anomaly)' }, { 's': 'Wembeau KM-V e2-12', 'label': 'Wembeau KM-V e2-12 (L03-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Wembeau KM-V e2-12', 'label': 'Wembeau KM-V e2-12 (L03-Type Anomaly)' }, { 's': 'Dryu Chraea FH-D d12-49', 'label': 'Dryu Chraea FH-D d12-49 (Q01-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Dryu Chraea FH-D d12-49', 'label': 'Dryu Chraea FH-D d12-49 (Q01-Type Anomaly)' }, { 's': 'Flyoo Groa SO-Z e0', 'label': 'Flyoo Groa SO-Z e0 (Stolon Pod - Stolon Tree)' }], 'circle': false },
			{ 'points': [{ 's': 'Flyoo Groa SO-Z e0', 'label': 'Flyoo Groa SO-Z e0 (Stolon Pod - Stolon Tree)' }, { 's': 'Aiphaisty YE-A d130', 'label': 'Aiphaisty YE-A d130 (Q07-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Aiphaisty YE-A d130', 'label': 'Aiphaisty YE-A d130 (Q07-Type Anomaly)' }, { 's': 'Phleedgaa JS-I d10-280', 'label': 'Phleedgaa JS-I d10-280 (E03-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Phleedgaa JS-I d10-280', 'label': 'Phleedgaa JS-I d10-280 (E03-Type Anomaly)' }, { 's': 'Vegnoae QO-I d9-2277', 'label': 'Vegnoae QO-I d9-2277 (E02-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Vegnoae QO-I d9-2277', 'label': 'Vegnoae QO-I d9-2277 (E02-Type Anomaly)' }, { 's': 'Vegnue AG-O e6-199', 'label': 'Vegnue AG-O e6-199 (Lindigoticum Parasol Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Vegnue AG-O e6-199', 'label': 'Vegnue AG-O e6-199 (Lindigoticum Parasol Mollusc)' }, { 's': 'Vegnue UE-Q e5-33', 'label': 'Vegnue UE-Q e5-33 (Luteolum Parasol Mollusc - Viride Parasol Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Vegnue UE-Q e5-33', 'label': 'Vegnue UE-Q e5-33 (Luteolum Parasol Mollusc - Viride Parasol Mollusc)' }, { 's': 'Eorl Bre ZP-E d12-276', 'label': 'Eorl Bre ZP-E d12-276 (Luteolum Bulb Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Eorl Bre ZP-E d12-276', 'label': 'Eorl Bre ZP-E d12-276 (Luteolum Bulb Mollusc)' }, { 's': 'Eorl Bre TE-L c23-51', 'label': 'Eorl Bre TE-L c23-51 (Viride Bulb Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Eorl Bre TE-L c23-51', 'label': 'Eorl Bre TE-L c23-51 (Viride Bulb Mollusc)' }, { 's': 'Xothuia EG-Y g95', 'label': 'Xothuia EG-Y g95 (Lindigoticum Bulb Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Xothuia EG-Y g95', 'label': 'Xothuia EG-Y g95 (Lindigoticum Bulb Mollusc)' }, { 's': 'Dryio Bloo LT-Y d1-1089', 'label': 'Dryio Bloo LT-Y d1-1089 (Viride Capsule Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Dryio Bloo LT-Y d1-1089', 'label': 'Dryio Bloo LT-Y d1-1089 (Viride Capsule Mollusc)' }, { 's': 'Dryio Bloo LT-Y d1-311', 'label': 'Dryio Bloo LT-Y d1-311 (Luteolum Capsule Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Dryio Bloo LT-Y d1-311', 'label': 'Dryio Bloo LT-Y d1-311 (Luteolum Capsule Mollusc)' }, { 's': 'Dryio Bloo YE-A g1518', 'label': 'Dryio Bloo YE-A g1518 (Lindigoticum Capsule Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Dryio Bloo YE-A g1518', 'label': 'Dryio Bloo YE-A g1518 (Lindigoticum Capsule Mollusc)' }, { 's': 'Joorai NI-K d8-9', 'label': 'Joorai NI-K d8-9 (P08-Type Anomaly - P09-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Joorai NI-K d8-9', 'label': 'Joorai NI-K d8-9 (P08-Type Anomaly - P09-Type Anomaly)' }, { 's': 'Joorai NI-K d8-115', 'label': 'Joorai NI-K d8-115 (P14-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Joorai NI-K d8-115', 'label': 'Joorai NI-K d8-115 (P14-Type Anomaly)' }, { 's': 'Joorai NI-K d8-163', 'label': 'Joorai NI-K d8-163 (P12-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Joorai NI-K d8-163', 'label': 'Joorai NI-K d8-163 (P12-Type Anomaly)' }, { 's': 'Phreia Byio PU-K c10-0', 'label': 'Phreia Byio PU-K c10-0 (Purpureum Peduncle Pod - Rufum Peduncle Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Phreia Byio PU-K c10-0', 'label': 'Phreia Byio PU-K c10-0 (Purpureum Peduncle Pod - Rufum Peduncle Pod)' }, { 's': 'Plua Chruia IB-X d1-5', 'label': 'Plua Chruia IB-X d1-5 (Albidum Chalice Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Plua Chruia IB-X d1-5', 'label': 'Plua Chruia IB-X d1-5 (Albidum Chalice Pod)' }, { 's': 'Syrivu DL-P d5-2', 'label': 'Syrivu DL-P d5-2 (Ostrinum Chalice Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Syrivu DL-P d5-2', 'label': 'Syrivu DL-P d5-2 (Ostrinum Chalice Pod)' }, { 's': 'Pyra Dryoae ET-O d7-7', 'label': 'Pyra Dryoae ET-O d7-7 (Caeruleum Chalice Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Pyra Dryoae ET-O d7-7', 'label': 'Pyra Dryoae ET-O d7-7 (Caeruleum Chalice Pod)' }, { 's': 'Iorady EI-B d13-0', 'label': 'Iorady EI-B d13-0 (K13-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Iorady EI-B d13-0', 'label': 'Iorady EI-B d13-0 (K13-Type Anomaly)' }, { 's': 'Pyrooe Dryiae CC-B d1-0', 'label': 'Pyrooe Dryiae CC-B d1-0 (Cereum Aster Pod - Cereum Aster Tree)' }], 'circle': false },
			{ 'points': [{ 's': 'Pyrooe Dryiae CC-B d1-0', 'label': 'Pyrooe Dryiae CC-B d1-0 (Cereum Aster Pod - Cereum Aster Tree)' }, { 's': 'Cliewoae DS-H d11-0', 'label': 'Cliewoae DS-H d11-0 (Rubellum Aster Pod - Rubellum Aster Tree)' }], 'circle': false },
			{ 'points': [{ 's': 'Cliewoae DS-H d11-0', 'label': 'Cliewoae DS-H d11-0 (Rubellum Aster Pod - Rubellum Aster Tree)' }, { 's': 'Cliewoae VA-L d9-0', 'label': 'Cliewoae VA-L d9-0 (Proto-Lagrange Cloud - Purpureum Ice Crystals - Rubeum Ice Crystals - Albidum Ice Crystals - Flavum Silicate Crystals - Lindigoticum Aster Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Cliewoae VA-L d9-0', 'label': 'Cliewoae VA-L d9-0 (Proto-Lagrange Cloud - Purpureum Ice Crystals - Rubeum Ice Crystals - Albidum Ice Crystals - Flavum Silicate Crystals - Lindigoticum Aster Pod)' }, { 's': 'Cliewoae UF-L d9-0', 'label': 'Cliewoae UF-L d9-0 (Prasinum Aster Pod - Prasinum Aster Tree)' }], 'circle': false },
			{ 'points': [{ 's': 'Cliewoae UF-L d9-0', 'label': 'Cliewoae UF-L d9-0 (Prasinum Aster Pod - Prasinum Aster Tree)' }, { 's': 'Pyrooe Dryiae ZQ-C d0', 'label': 'Pyrooe Dryiae ZQ-C d0 (Puniceum Aster Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Pyrooe Dryiae ZQ-C d0', 'label': 'Pyrooe Dryiae ZQ-C d0 (Puniceum Aster Pod)' }, { 's': 'Flyeia Byoea UK-Q b24-6', 'label': 'Flyeia Byoea UK-Q b24-6 (Puniceum Squid Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Flyeia Byoea UK-Q b24-6', 'label': 'Flyeia Byoea UK-Q b24-6 (Puniceum Squid Mollusc)' }, { 's': 'Flyeia Byoea GE-K c11-32', 'label': 'Flyeia Byoea GE-K c11-32 (Albulum Squid Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Flyeia Byoea GE-K c11-32', 'label': 'Flyeia Byoea GE-K c11-32 (Albulum Squid Mollusc)' }, { 's': 'Ploea Brou RH-D c12-27', 'label': 'Ploea Brou RH-D c12-27 (Caeruleum Squid Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Ploea Brou RH-D c12-27', 'label': 'Ploea Brou RH-D c12-27 (Caeruleum Squid Mollusc)' }, { 's': 'Ploea Brou BL-Y b14-5', 'label': 'Ploea Brou BL-Y b14-5 (Rubeum Squid Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Ploea Brou BL-Y b14-5', 'label': 'Ploea Brou BL-Y b14-5 (Rubeum Squid Mollusc)' }, { 's': 'Preae Chroa EI-I c23-43', 'label': 'Preae Chroa EI-I c23-43 (Roseum Squid Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Preae Chroa EI-I c23-43', 'label': 'Preae Chroa EI-I c23-43 (Roseum Squid Mollusc)' }, { 's': 'Braisao ZP-V d3-16', 'label': 'Braisao ZP-V d3-16 (Candidum Peduncle Pod - Caeruleum Peduncle Pod - Gypseeum Peduncle Pod - Caeruleum Peduncle Tree - Viride Peduncle Tree - Ostrinum Peduncle Tree - Rubellum Peduncle Tree)' }], 'circle': false },
			{ 'points': [{ 's': 'Braisao ZP-V d3-16', 'label': 'Braisao ZP-V d3-16 (Candidum Peduncle Pod - Caeruleum Peduncle Pod - Gypseeum Peduncle Pod - Caeruleum Peduncle Tree - Viride Peduncle Tree - Ostrinum Peduncle Tree - Rubellum Peduncle Tree)' }, { 's': 'Oodgosly GI-B d13-11', 'label': 'Oodgosly GI-B d13-11 (Viride Quadripartite Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Oodgosly GI-B d13-11', 'label': 'Oodgosly GI-B d13-11 (Viride Quadripartite Pod)' }, { 's': 'Oodgosly AH-D d12-10', 'label': 'Oodgosly AH-D d12-10 (Prasinum Ice Crystals - Albidum Quadripartite Pod - Caeruleum Quadripartite Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Oodgosly AH-D d12-10', 'label': 'Oodgosly AH-D d12-10 (Prasinum Ice Crystals - Albidum Quadripartite Pod - Caeruleum Quadripartite Pod)' }, { 's': 'Oodgosly AM-D d12-7', 'label': 'Oodgosly AM-D d12-7 (Blatteum Quadripartite Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Oodgosly AM-D d12-7', 'label': 'Oodgosly AM-D d12-7 (Blatteum Quadripartite Pod)' }, { 's': 'Hyphaups HC-M d7-1', 'label': 'Hyphaups HC-M d7-1 (Rubeum Rhizome Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Hyphaups HC-M d7-1', 'label': 'Hyphaups HC-M d7-1 (Rubeum Rhizome Pod)' }, { 's': 'Hyphaups NI-K d8-0', 'label': 'Hyphaups NI-K d8-0 (Purpureum Rhizome Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Hyphaups NI-K d8-0', 'label': 'Hyphaups NI-K d8-0 (Purpureum Rhizome Pod)' }, { 's': 'Coesky DW-U d3-0', 'label': 'Coesky DW-U d3-0 (Gypseeum Rhizome Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Coesky DW-U d3-0', 'label': 'Coesky DW-U d3-0 (Gypseeum Rhizome Pod)' }, { 's': 'Dryeou Fleau XJ-A d0', 'label': 'Dryeou Fleau XJ-A d0 (Roseum Ice Crystals - Flavum Ice Crystals - Prasinum Silicate Crystals - Purpureum Silicate Crystals - Rubeum Silicate Crystals - Candidum Rhizome Pod - Cobalteum Rhizome Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Dryeou Fleau XJ-A d0', 'label': 'Dryeou Fleau XJ-A d0 (Roseum Ice Crystals - Flavum Ice Crystals - Prasinum Silicate Crystals - Purpureum Silicate Crystals - Rubeum Silicate Crystals - Candidum Rhizome Pod - Cobalteum Rhizome Pod)' }, { 's': 'Drokoe AN-H d11-6', 'label': 'Drokoe AN-H d11-6 (Albidum Silicate Crystals - Cereum Bullet Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Drokoe AN-H d11-6', 'label': 'Drokoe AN-H d11-6 (Albidum Silicate Crystals - Cereum Bullet Mollusc)' }, { 's': 'Thaile HW-V e2-7', 'label': 'Thaile HW-V e2-7 (Croceum Lagrange Storm Cloud - Albidum Peduncle Tree - L06-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Thaile HW-V e2-7', 'label': 'Thaile HW-V e2-7 (Croceum Lagrange Storm Cloud - Albidum Peduncle Tree - L06-Type Anomaly)' }, { 's': 'Eta Carina Sector JH-V c2-9', 'label': 'Eta Carina Sector JH-V c2-9 (Luteolum Bell Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Eta Carina Sector JH-V c2-9', 'label': 'Eta Carina Sector JH-V c2-9 (Luteolum Bell Mollusc)' }, { 's': 'Eta Carina Sector EL-Y d19', 'label': 'Eta Carina Sector EL-Y d19 (Viride Lagrange Cloud - Luteolum Lagrange Cloud - Solid Mineral Spheres - Roseum Brain Tree - Gypseeum Brain Tree - Lividum Brain Tree - Aureum Brain Tree - Bark Mounds - Lindigoticum Silicate Crystals - Roseum Silicate Crystals - Albens Bell Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Eta Carina Sector EL-Y d19', 'label': 'Eta Carina Sector EL-Y d19 (Viride Lagrange Cloud - Luteolum Lagrange Cloud - Solid Mineral Spheres - Roseum Brain Tree - Gypseeum Brain Tree - Lividum Brain Tree - Aureum Brain Tree - Bark Mounds - Lindigoticum Silicate Crystals - Roseum Silicate Crystals - Albens Bell Mollusc)' }, { 's': 'GCRV 6493', 'label': 'GCRV 6493 (P04-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'GCRV 6493', 'label': 'GCRV 6493 (P04-Type Anomaly)' }, { 's': 'NGC 3199 Sector EB-X c1-6', 'label': 'NGC 3199 Sector EB-X c1-6 (Lividum Bullet Mollusc - Viride Bullet Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'NGC 3199 Sector EB-X c1-6', 'label': 'NGC 3199 Sector EB-X c1-6 (Lividum Bullet Mollusc - Viride Bullet Mollusc)' }, { 's': 'Drokoe FU-O b39-0', 'label': 'Drokoe FU-O b39-0 (Rubeum Bullet Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Drokoe FU-O b39-0', 'label': 'Drokoe FU-O b39-0 (Rubeum Bullet Mollusc)' }, { 's': 'Drokoe QK-X b34-0', 'label': 'Drokoe QK-X b34-0 (Flavum Bullet Mollusc)' }], 'circle': false },
			{ 'points': [{ 's': 'Drokoe QK-X b34-0', 'label': 'Drokoe QK-X b34-0 (Flavum Bullet Mollusc)' }, { 's': 'Jongoae UX-L d7-0', 'label': 'Jongoae UX-L d7-0 (Lindigoticum Ice Crystals - Aurarium Gyre Pod - Viridis Gyre Tree - Aurarium Gyre Tree)' }], 'circle': false },
			{ 'points': [{ 's': 'Jongoae UX-L d7-0', 'label': 'Jongoae UX-L d7-0 (Lindigoticum Ice Crystals - Aurarium Gyre Pod - Viridis Gyre Tree - Aurarium Gyre Tree)' }, { 's': 'Eorgh Hypa RR-U c19-0', 'label': 'Eorgh Hypa RR-U c19-0 (Roseum Gyre Pod)' }], 'circle': false },
			{ 'points': [{ 's': 'Eorgh Hypa RR-U c19-0', 'label': 'Eorgh Hypa RR-U c19-0 (Roseum Gyre Pod)' }, { 's': 'Lyed YJ-I d9-0', 'label': 'Lyed YJ-I d9-0 (P05-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Lyed YJ-I d9-0', 'label': 'Lyed YJ-I d9-0 (P05-Type Anomaly)' }, { 's': 'Lyed XJ-I d9-0', 'label': 'Lyed XJ-I d9-0 (P07-Type Anomaly)' }], 'circle': false },
			{ 'points': [{ 's': 'Lyed XJ-I d9-0', 'label': 'Lyed XJ-I d9-0 (P07-Type Anomaly)' }, { 's': 'Varati', 'label': 'Varati (Thompson Dock)' }], 'circle': false },
		]
	},

	formatChallenge: function (data) {
		//Here you format POI & Gnosis JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].name && data[i].name.replace(' ', '').length > 1) {
				var poiSite = {};
				poiSite['name'] = data[i].name;
				poiSite['infos'] = data[i].infos + '<br/><a href="https://www.edsm.net/en/system?systemName=' + data[i].name + '">EDSM</a><br/><a href="https://canonn-science.github.io/canonn-signals/?system=' + data[i].name + '">Signals</a>';
				//Check Site Type and match categories

				var component = data[i].name.split(' ');
				if (poiSite['name'] == 'Varati') {
					poiSite['details'] == 'Start and Finish';
					poiSite['cat'] = [10];

				} else {
					poiSite['cat'] = [20];
				}

				poiSite['url'] = "https://canonn-science.github.io/canonn-signals/?system=" + poiSite['name']
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
			canonnEd3d_challenge.parseCSVData('data/csvCache/expedition.csv', canonnEd3d_challenge.formatChallenge, resolve);
		});

		Promise.all([p1]).then(function () {
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
