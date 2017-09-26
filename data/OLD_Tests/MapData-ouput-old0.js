// Pulls the JSON data from csv-to-json.js and api-to-json.js and outputs them for ED3D

//Define Categories
var systemsData = {
	"categories":{
                "Points of Interest":{
                        "100":{
                                "name":"System",
                                "color":"F7F7F7"
                        },
                        "101":{
                                "name":"MegaShips",
                                "color":"F7F7F7"
                        }
                },
		"Barnacles":{
			"200":{
				"name":"Ripe",
				"color":"F7F7F7"
			},
			"201":{
				"name":"Dead",
				"color":"F7F7F7"
			}
		},
		"Brain Trees":{
			"300":{
				"name":"Ripe",
                                "color":"F7F7F7"
			}
		},
		"Guardian Ruins":{
                        "400":{
                                "name":"Alpha",
                                "color":"F7F7F7"
                        },
                        "401":{
                                "name":"Beta",
                                "color":"F7F7F7"
                        },
                        "402":{
                                "name":"Gamma",
                                "color":"F7F7F7"
                        }
                },
                "Thargoid Structures":{
                        "500":{
                                "name":"Active",
                                "color":"F7F7F7"
                        },
                        "501":{
                                "name":"Inactive",
                                "color":"F7F7F7"
                        }
                }
	},
	"systems":[
		{
			"name":"Sol",
                        "coords":{
                        	"x":"0",
                                "y":"0",
                                "z":"0"
                        },
                        "cat":[
                        	"100"
                        ]
                },
                {
                        "name":"Merope",
                        "coords":{
                                "x":"-78.59375",
                                "y":"-149.625",
                                "z":"-340.53125"
                        },
                        "cat":[
                                "100"
                        ]
                },
                {
                        "name":"HIP 22460",
                        "coords":{
                                "x":"-41.3125",
                                "y":"-58.96875",
                                "z":"-354.78125"
                        },
                        "cat":[
                                "100"
                        ]
                 },
                 {
                        "name":"Col 173 Sector LJ-F C12-0 (The Cete)",
                        "coords":{
                                "x":"1202.125",
                                "y":"-213.40625",
                                "z":"-165.5625"
                        },
                        "cat":[
                                "101"
                        ]
                 },
		]
	}

