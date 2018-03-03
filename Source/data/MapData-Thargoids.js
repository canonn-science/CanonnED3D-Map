$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

var canonnEd3d_thargoids = {

    //Define Categories
    systemsData: {
        "categories": {
            "Points of Interest - POI": {
                "100": {
                    "name": "System",
                    "color": "F7F7F7"
                },
                "101": {
                    "name": "Megaship",
                    "color": "42f4df"
                },
                "102": {
                    "name": "Capital Ship",
                    "color": "f442e2"
                },
                "103": {
                    "name": "INRA Base",
                    "color": "ffa500"
                },
            },
            "Barnacles - (BN)": {
                "200": {
                    "name": "Barnacle",
                    "color": "44f441"
                }
            },
            "Thargoid Structures - (TS)": {
                "500": {
                    "name": "Active",
                    "color": "4152f4"
                },
                "501": {
                    "name": "Inactive",
                    "color": "9d41f4"
                },
                "502": {
                    "name": "Link",

                    "color": "f2f2f2"
                },
            },
            "Hyperdictions": {
                "800": {
                    "name": "Start System",
                    "color": "0040ff"
                },
                "801": {
                    "name": "End System",
                    "color": "ff0040"
                },
                "802": {
                    "name": "Route",
                    "color": "50a830"
                },
            },
            "Non Human Signal Sources": {
                "702": {
                    "name": "Threat 2",
                    "color": "99b433"
                },
                "703": {
                    "name": "Threat 3",
                    "color": "1e7145"
                },
                "704": {
                    "name": "Threat 4",
                    "color": "ff0097"
                },
                "705": {
                    "name": "Threat 5",
                    "color": "b91d47"
                },
                "706": {
                    "name": "Threat 6",
                    "color": "e3a21a"
                },
                "707": {
                    "name": "Threat 7",
                    "color": "603cba"
                },
                "708": {
                    "name": "Threat 8",
                    "color": "da532c"
                }
            },
            "Error Sites": {
                "600": {
                    "name": "Invalid Data Information",
                    "color": "150187"
                }
            }
        },
        "routes": [],
        "systems": [{
            "name": "Sol",
            "coords": {
                "x": "0",
                "y": "0",
                "z": "0"
            },
            "cat": [
                "100"
            ]
        }, {
            "name": "Col 70 Sector FY-N c21-3",
            "coords": {
                "x": "687.0625",
                "y": "-362.53125",
                "z": "-697.0625"
            },
            "cat": [
                "100"
            ]
        }, {
            "name": "Merope",
            "coords": {
                "x": "-78.59375",
                "y": "-149.625",
                "z": "-340.53125"
            },
            "cat": [
                "100"
            ]
        }, {
            "name": "HIP 22460",
            "coords": {
                "x": "-41.3125",
                "y": "-58.96875",
                "z": "-354.78125"
            },
            "cat": [
                "100"
            ]
        }, ]
    },

    formatTSL: function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].From && data[i].From.replace(" ", "").length > 1) {

                var tslRoute = {};

                //hdRoute["title"]="CMDR "+data[i].CMDR+" "+data[i].From+" to "+data[i].To
                tslRoute["points"] = [{
                    "s": data[i].From,
                    "label": data[i].From
                }, {
                    "s": data[i].To,
                    "label": data[i].To
                }]
                tslRoute["cat"] = [502]
                tslRoute["circle"] = false

                canonnEd3d_thargoids.systemsData.routes.push(tslRoute);
            }
        }
    },

    formatHD: function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].From && data[i].From.replace(" ", "").length > 1) {

                var hdFrom = {}
                hdFrom["name"] = data[i].From;

                //Ripe or Dead Status not enabled yet, pending CSV fixes
                hdFrom["cat"] = [800];
                hdFrom["coords"] = {
                    "x": parseFloat(data[i].FromX),
                    "y": parseFloat(data[i].FromY),
                    "z": parseFloat(data[i].FromZ)
                };

                // We can then push the site to the object that stores all systems
                canonnEd3d_thargoids.systemsData.systems.push(hdFrom);

                var hdTo = {}
                hdTo["name"] = data[i].To;

                //Ripe or Dead Status not enabled yet, pending CSV fixes
                hdTo["cat"] = [801];
                hdTo["coords"] = {
                    "x": parseFloat(data[i].ToX),
                    "y": parseFloat(data[i].ToY),
                    "z": parseFloat(data[i].ToZ)
                };

                // We can then push the site to the object that stores all systems
                canonnEd3d_thargoids.systemsData.systems.push(hdTo);

                var hdRoute = {};

                hdRoute["title"] = "CMDR " + data[i].CMDR + " " + data[i].From + " to " + data[i].To
                hdRoute["points"] = [{
                    "s": data[i].From,
                    "label": data[i].From
                }, {
                    "s": data[i].To,
                    "label": data[i].To
                }]
                hdRoute["cat"] = [802]
                hdRoute["circle"] = false

                canonnEd3d_thargoids.systemsData.routes.push(hdRoute);
            }
        }
    },

    formatGlyphs: function (data) {
        try {
            var subject = $.urlParam('Sigil');
        } catch (err) {
            console.log(err)
            var subject = "4B-3";
        }

        canonnEd3d_thargoids.systemsData.categories["Thargoid Glyph"] = {
            "302": {
                "name": "<a href=\"https://tools.canonn.technology/thargoid_glyphs/#" + subject + "\"><img src=\"https://tools.canonn.technology/thargoid_glyphs/images/composite/" + subject + ".png\"  style=\"background-color:orange;border-radius: 5%;\"/></a>",
                "color": "ff9900"
            }
        };

        for (var i = 0; i < data.length; i++) {

            var symbol = data[i].Sigil.split("-")
            var inner = symbol[1]
            var outer = symbol[0]

            if (data[i].From && data[i].From.replace(" ", "").length > 1 && data[i].Sigil == subject && data[i].Included == 'Y') {

                var glyphRoute = {};

                glyphRoute["title"] = data[i].Sigi + " " + data[i].From + " to " + data[i].To
                glyphRoute["points"] = [{
                    "s": data[i].From,
                    "label": data[i].From
                }, {
                    "s": data[i].To,
                    "label": data[i].To
                }]
                glyphRoute["cat"] = [302]
                glyphRoute["circle"] = false

                canonnEd3d_thargoids.systemsData.routes.push(glyphRoute);
            }
        }
    },

    formatTI: function (data) {
        //Here you format BN JSON to ED3D acceptable object

        // this is assuming data is an array []
        for (var i = 0; i < data.length; i++) {
            if (data[i].System && data[i].System.replace(" ", "").length > 1) {
                var tiSite = {};
                tiSite["name"] = data[i].System;

                tiSite["coords"] = {
                    "x": parseFloat(data[i].x),
                    "y": parseFloat(data[i].y),
                    "z": parseFloat(data[i].z)
                }

                switch (data[i].Threat) {
                    case '2':
                        tiSite["cat"] = [702];

                        break;
                    case '3':
                        tiSite["cat"] = [703];

                        break;
                    case '4':
                        tiSite["cat"] = [704];

                        break;
                    case '5':
                        tiSite["cat"] = [705];

                        break;
                    case '7':
                        tiSite["cat"] = [707];

                        break;
                    case '8':
                        tiSite["cat"] = [708];

                        break;
                    case '6':
                        tiSite["cat"] = [706];

                        break;
                }

                // We can then push the site to the object that stores all systems
                canonnEd3d_thargoids.systemsData.systems.push(tiSite);
            }
        }
    },

    formatMS: function (data) {
        //Here you format BN JSON to ED3D acceptable object

        // this is assuming data is an array []
        for (var i = 0; i < data.length; i++) {
            if (data[i].System && data[i].System.replace(" ", "").length > 1) {
                var msSite = {};
                msSite["name"] = data[i].System;

                switch (data[i].Type) {
                    case 'Megaship':
                        msSite["cat"] = [101];
                        msSite["coords"] = {
                            "x": parseFloat(data[i].x),
                            "y": parseFloat(data[i].y),
                            "z": parseFloat(data[i].z)
                        }
                        break;
                    case 'Capital Ship':
                        msSite["cat"] = [102];
                        msSite["coords"] = {
                            "x": parseFloat(data[i].x),
                            "y": parseFloat(data[i].y),
                            "z": parseFloat(data[i].z)
                        }
                        break;
                    case 'INRA Base':
                        msSite["cat"] = [103];
                        msSite["coords"] = {
                            "x": parseFloat(data[i].x),
                            "y": parseFloat(data[i].y),
                            "z": parseFloat(data[i].z)
                        }
                        break;
                }

                // We can then push the site to the object that stores all systems
                canonnEd3d_thargoids.systemsData.systems.push(msSite);
            }
        }
    },

    // Lets get data from CSV Files
    formatBN: function (data) {
        //Here you format BN JSON to ED3D acceptable object

        // this is assuming data is an array []
        for (var i = 0; i < data.length; i++) {
            if (data[i].system && data[i].system.replace(" ", "").length > 1) {
                var bnSite = {};
                bnSite["name"] = data[i].system;

                //Ripe or Dead Status not enabled yet, pending CSV fixes
                bnSite["cat"] = [200];
                bnSite["coords"] = {
                    "x": parseFloat(data[i].galacticX),
                    "y": parseFloat(data[i].galacticY),
                    "z": parseFloat(data[i].galacticZ)
                };

                // We can then push the site to the object that stores all systems
                canonnEd3d_thargoids.systemsData.systems.push(bnSite);
            }
        }
    },

    formatTS: function (data) {
        //Here you format TS JSON to ED3D acceptable object

        // this is assuming data is an array []
        for (var i = 0; i < data.length; i++) {
            if (data[i].system && data[i].system.replace(" ", "").length > 1) {
                var tsSite = {};
                tsSite["name"] = data[i].system;

                //Check if Site is Active or Inactive, set Category to match
                if (data[i].active.toString().toLowerCase() == "y") {
                    tsSite["cat"] = [500];
                } else {
                    tsSite["cat"] = [501];
                }
                tsSite["coords"] = {
                    "x": parseFloat(data[i].galacticX),
                    "y": parseFloat(data[i].galacticY),
                    "z": parseFloat(data[i].galacticZ)
                };

                // We can then push the site to the object that stores all systems
                canonnEd3d_thargoids.systemsData.systems.push(tsSite);
            }
        }
    },

    parseData: function (url, callBack, resolvePromise) {
        Papa.parse(url, {
            download: true,
            header: true,
            complete: function (results) {

                callBack(results.data);

                // after we called the callback
                // (which is synchronous, so we know it's safe here)
                // we can resolve the promise

                resolvePromise();
            }
        });
    },

    init: function () {

        //Barnacles
        var p1 = new Promise(function (resolve, reject) {
            canonnEd3d_thargoids.parseData("/data/csvCache/tbSystemCache.csv", canonnEd3d_thargoids.formatBN, resolve);
        });

        //Thargoid Site Links
        var p2 = new Promise(function (resolve, reject) {
            canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vShCRewOJojaJ3XCQ3hzaSihFD46Px2qB6cO0d7NAbNNrb8729fA4UqzTxoKP8UFsE60XomVK8juyXq/pub?gid=0&single=true&output=csv", canonnEd3d_thargoids.formatTSL, resolve);
        });

        //Thargoid Sites
        var p3 = new Promise(function (resolve, reject) {
            canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vR4-rhi1p4BU7AlOSj7_78Kvk5Ox6vb39vzzlWU3yI-dqlaLxk-CFLWvAFKc-J7WhomFiQ_u0P7Stxz/pub?gid=0&single=true&output=csv", canonnEd3d_thargoids.formatTS, resolve);
        });

        //Thargoid Sites
        var p4 = new Promise(function (resolve, reject) {
            canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vRQ9O_WQPF7gpL1dEWgI97GVD_EMN7Sgm4LYxj2N4SQtG5HNInyP08I1eDqkZHQhYeIVNHiwtiDOYlS/pub?gid=981173890&single=true&output=csv", canonnEd3d_thargoids.formatMS, resolve);
        });

        // Thargoid US
        var p5 = new Promise(function (resolve, reject) {
            canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vROqL6zifWWxcwlZ0R6iLvrMrUdfJijnMoZee-SrN0NVPqhTdH3Zdx6E7RxP1wH2xgwfrhwfVWUHnKU/pub?gid=1590459372&single=true&output=csv", canonnEd3d_thargoids.formatTI, resolve);
        });

        // Thargoid Hyperdictions
        var p6 = new Promise(function (resolve, reject) {
            canonnEd3d_thargoids.parseData("/data/csvCache/hdSystemCache.csv", canonnEd3d_thargoids.formatHD, resolve);
        });

        //var p7 = new Promise(function (resolve, reject) {
        //	canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vS3sabePivfqUNdCie_7UPA6cBHzXVNtFfTP6JnHfcQez4GWQoRRkTxvzIRBNnNbDV2ATfEg0iGK0Cj/pub?gid=640903479&single=true&output=csv", canonnEd3d_thargoids.formatVS, resolve);
        //});

        var p0 = new Promise(function (resolve, reject) {
            canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vSlKb1HgU7PZDRRvlDqorEFHfo4sxZZorGRTaMc0qQt9tJGBox-bCxGTbg1gCLQfWi8hXdyltDZGL2t/pub?gid=29696533&single=true&output=csv", canonnEd3d_thargoids.formatGlyphs, resolve);
        });

        Promise.all([p0, p1, p2, p3, p4, p5, p6]).then(function () {
            Ed3d.init({
                container: 'edmap',
                json: canonnEd3d_thargoids.systemsData,
                withHudPanel: true,
                hudMultipleSelect: true,
                effectScaleSystem: [28, 10000],
                startAnim: false,
                showGalaxyInfos: true,
                cameraPos: [25, 14100, -12900],
                systemColor: '#FF9D00'
            });
        });
    }
};