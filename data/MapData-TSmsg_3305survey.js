const API_ENDPOINT = `https://api.canonn.tech`;
const EDSM_ENDPOINT = `https://www.edsm.net/api-v1`;
const API_LIMIT = 1000;

const capi = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

let sites = {
    tssites: [],
};

const edsmapi = axios.create({
    baseURL: EDSM_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

const go = async types => {
    const keys = Object.keys(types);
    return (await Promise.all(
        keys.map(type => getSites(type))
    )).reduce((acc, res, i) => {
        acc[keys[i]] = res;
        return acc;
    }, {});
};

const getSites = async type => {
    let records = [];
    let keepGoing = true;
    let API_START = 0;
    while (keepGoing) {
        let response = await reqSites(API_START, type);
        await records.push.apply(records, response.data);
        API_START += API_LIMIT;
        if (response.data.length < API_LIMIT) {
            keepGoing = false;
            return records;
        }
    }
};

const reqSites = async (API_START, type) => {

    let payload = await capi({
        url: `/${type}?_limit=${API_LIMIT}&_start=${API_START}`,
        method: 'get'
    });

    return payload;
};

const reqSystemName = async (name) => {

    let payload = await capi({
        url: `/systems?systemName=${name}`,
        method: 'get'
    });

    return payload;
};

const getSystemsEDSM = async (systemNames) => {
    if (Array.isArray(systemNames)) {
        systemNames = "systemName[]=" + systemNames.join("&systemName[]=");
    } else {
        systemNames = "systemName=" + systemNames;
    }
    //console.log("EDSM Query: ", systemNames);
    let payload = await edsmapi({
        url: `/systems?showCoordinates=1&${systemNames}`,
        method: 'get'
    });

    return payload;
};

const recenterViewport = (center, distance) => {
    //-- Set new camera & target position
    Ed3d.playerPos = [center.x, center.y, center.z];
    Ed3d.cameraPos = [
        center.x + (Math.floor((Math.random() * 100) + 1) - 50), //-- Add a small rotation effect
        center.y + distance,
        center.z - distance
    ];

    Action.moveInitalPosition();
}

var canonnEd3d_tslinks = {
    //Define Categories
    sitesByIDs: {},
    systemsData: {
        categories: {
            'Thargoid Link Message': {
                '10': {
                    name: 'unspecified',
                    color: '888888',
                },
                '20': {
                    name: 'Populated System',
                    color: '0000FF',
                },
                '40': {
                    name: 'Thargoid Structure Site',
                    color: '008000',
                },
                /* '60': {
                    name: 'Eagle Eye',
                    color: 'FFFF00',
                }, */

                //notes for later / unique stuff: 
                //Outotz system was hand-placed in the cone sector gnosis event
                //2-3 barnacle forests also hand placed (out of usual bio env. parameters)
                //
            },
            'System Properties': {
                '200': {
                    name: 'unspecified',
                    color: '333333',
                },
                '201': {
                    name: 'Active T-Structure',
                    color: '00FF00',
                },
                '202': {
                    name: 'Inactive T-Structure',
                    color: 'FF0000',
                },
                '203': {
                    name: 'Populated System',
                    color: '0000FF',
                },
                '206': {
                    name: 'Eagle Eye',
                    color: 'FFFF00',
                },
            },
            'Leviathan Category': {
                '001': {
                    name: 'No Leviathans',
                    color: '333333',
                },
                '011': {
                    name: 'Small Reposing Leviathans',
                    color: '000088',
                },
                '110': {
                    name: 'Large upright leviathans',
                    color: '008800',
                },
                '110': {
                    name: 'Large upright leviathans, Small Reposing Leviathans',
                    color: '008888',
                },
                '111': {
                    name: 'unspecified',
                    color: '888888',
                }
            },
            'Leviathan Count': {
                '0': {
                    name: '0',
                    color: '333333',
                },
                '1': {
                    name: '1',
                    color: '0000FF',
                },
                '2': {
                    name: '2',
                    color: '00FF00',
                },
                '3': {
                    name: '3',
                    color: '00FFFF',
                },
                '4': {
                    name: '4',
                    color: 'FF0000',
                },
                '5': {
                    name: '5',
                    color: 'FF00FF',
                },
                '6': {
                    name: '6',
                    color: 'FFFF00',
                },
                '7': {
                    name: '7',
                    color: '888888',
                },
                '8': {
                    name: '8',
                    color: 'FFFFFF',
                }
            }
        }
        , systems: []
        , routes: []
    },
    startcoords: [],
    leviathanSystems: [],
    addLeviathans: (systemName, levType, levCount) => {
        if (!systemName) return;
        if (canonnEd3d_tslinks.leviathanSystems.indexOf(systemName) != -1) return;

        var system = {};
        let found = false;
        for (const key in canonnEd3d_tslinks.systemsData.systems) {
            if (systemName.toUpperCase() === canonnEd3d_tslinks.systemsData.systems[key].name.toUpperCase()) {
                system = canonnEd3d_tslinks.systemsData.systems[key];
                found = true;
                break;
            }
        }

        if (!found) {
            console.log(systemName);
            return;
        }

        let cat = [];
        //console.log(canonnEd3d_tslinks.systemsData.systems[key], systemName);
        if (levType.toUpperCase() === "No Leviathans".toUpperCase()) {
            cat.push('001');
        }
        else if (levType.toUpperCase() === "Small Reposing Leviathans".toUpperCase()) {
            cat.push('011');
        }
        else if (levType.toUpperCase() === "Large upright leviathans".toUpperCase()) {
            cat.push('101');
        }
        else if (levType.toUpperCase() === "Large upright leviathans, Small Reposing Leviathans".toUpperCase()) {
            cat.push('110');
        }
        else {
            cat.push('111'); //mix/unspecified for everything else
        }
        canonnEd3d_tslinks.addPOI(
            system.name,
            system.coords.x,
            system.coords.y,
            system.coords.z,
            cat
        );


        levCount = parseInt(levCount);
        if (0 <= levCount && levCount <= 8) {
            cat = [levCount];
        }
        canonnEd3d_tslinks.addPOI(
            system.name,
            system.coords.x,
            system.coords.y,
            system.coords.z,
            cat
        );

        canonnEd3d_tslinks.leviathanSystems.push(systemName);
    },
    parseFormResponses: async (data) => {
        //run through csv format to acumulate Link System targets that are not TSsites.
        for (const index of Object.keys(data)) {
            let entry = data[index];

            canonnEd3d_tslinks.addLeviathans(entry['System'], entry['Leviathans'], entry['Leviathan Count']);

            for (var i = 1; i < 4; i++) {
                let msg = 'Link System ' + i;
                if (!entry[msg]) continue; //empty value
                let msgIsTS = false;
                for (const siteID of Object.keys(canonnEd3d_tslinks.sitesByIDs)) {
                    let siteData = canonnEd3d_tslinks.sitesByIDs[siteID];
                    if (siteData.system.toUpperCase() === entry[msg].toUpperCase()) {
                        //console.log("recognized system to exist: ", siteData.system, "=>", entry[msg]);
                        msgIsTS = true;
                        break;
                    }
                }
                if (!msgIsTS) {
                    //console.log("Not TS Site in Line#" + index+1 + ": ", entry[msg]);
                    let msgSystem = canonnEd3d_tslinks.cleanupMsg(entry[msg]);
                    if (msgSystem) canonnEd3d_tslinks.addNonTSSRoute(entry.System, msgSystem, ['20']);
                }
            }
        }

        await canonnEd3d_tslinks.fetchAddSystems();
    },

    //invalid msg gives empty response
    cleanupMsg: (msg) => {
        let cleanedMsg = "";
        /*
        cleanup entries like:
        * Links: Pleiades Sector LN-T c3-4 https://tool.canonn.tech/linkdecoder/?origin=HIP+16704&data=hlh+lhl+%3B+hll+lll+hlh%0D%0Ahhl+hhh+hll+%3B+lll+llh+lhh%0D%0Ahlh+hhh+lhl+lhl+%3B+hhl+lll+lhl+hhh
        * Questionmark: Ceti Sector DL-X b1-6 (?) https://tool.canonn.tech/linkdecoder/?origin=Taurus+Dark+Region+CL-Y+d53&data=lhl+lhl+hll+%3B+hhl+lll+lhl+hhh%0D%0Ahhl+lhh+hll+%3B+hll+hhl+hhh%0D%0Ahlh+hhl+lhl+%3B+hhl+lll+lhl
        * Newlines: HIP 13806(?)
https://tool.canonn.tech/linkdecoder/?origin=Taurus+Dark+Region+CL-Y+d53&data=lll+hll+%3B+hll+hhl+hhh%0D%0Allh+hll+%3B+hhl+lll+hlh%0D%0Ahlh+hhl+llh+%3B+hhl+lll+lhl
        * ???
        * System names are systematically, right?: a-zA-Z0-9\-\s
        * 
        * from: https://bitbucket.org/Esvandiary/edts/src/3cb1ea78baa45d9a4687191ea6ac610f21996fba/edtslib/pgdata.py#lines-15
        # This does not validate sector names, just ensures that it matches the 'Something AB-C d1' or 'Something AB-C d1-23' format
        pg_system_regex_str = r"(?P<sector>[\w\s'.()/-]+) (?P<l1>[A-Za-z])(?P<l2>[A-Za-z])-(?P<l3>[A-Za-z]) (?P<mcode>[A-Za-z])(?:(?P<n1>\d+)-)?(?P<n2>\d+)"
        *
        * manual names can include ()?* - like Sagittarius A* which broke a lot of tool (eg. screenshot with system in filename)
        */
        let hasLinkIndex = msg.indexOf('http');
        cleanedMsg = msg.substring(0, (hasLinkIndex > 0 ? hasLinkIndex - 1 : msg.length));
        let hasCommentIndex = msg.indexOf(' - ');
        cleanedMsg = cleanedMsg.substring(0, (hasCommentIndex > 0 ? hasCommentIndex - 1 : cleanedMsg.length));
        let nothingIndex = msg.indexOf('do not intersect');
        if (nothingIndex >= 0) return "";
        cleanedMsg = cleanedMsg.replace('\(All 3 consistent with spreadsheet\)', '');
        cleanedMsg = cleanedMsg.replace('\(Points to same site.\)', '');
        cleanedMsg = cleanedMsg.replace('Result: ', '');
        cleanedMsg = cleanedMsg.replace('Match is not proven transcript may be wrong', '');
        cleanedMsg = cleanedMsg.replace('list index out of range', '');
        cleanedMsg = cleanedMsg.replace('LINK POINTS IN SYSTEM', '');
        cleanedMsg = cleanedMsg.replace('– Taylor Keep INRA base', '');
        cleanedMsg = cleanedMsg.replace('13 Sep. 3304 (2018)', '');
        cleanedMsg = cleanedMsg.replace('\(\?\)', '');
        cleanedMsg = cleanedMsg.replace('N/A', '');
        cleanedMsg = cleanedMsg.replace('\n', '');
        cleanedMsg = cleanedMsg.replace('\r', '');
        cleanedMsg = cleanedMsg.replace('Non', '');
        cleanedMsg = cleanedMsg.replace('probe', '');
        cleanedMsg = cleanedMsg.replace('link', '');
        cleanedMsg = cleanedMsg.replace('sensor', '');
        cleanedMsg = cleanedMsg.replace('Only 2 Links', '');
        cleanedMsg = cleanedMsg.trim();
        //console.log("Cleaned Msg of Line#" + index+1 + ": '" + cleanedMsg + "'");
        return cleanedMsg;
    },

    formatTSSites: async (data) => {
        /*
        //not using the extensive json data as it seems to be older than the csv export from the survey sheet
        //also if link target is not thargoid site, it will be "null" while the csv mentions the system name
        //we need to assemble a full list that is used as csv as of now

        sites = await go(data);
        let siteTypes = Object.keys(data);
        */

        //create associative array with siteID as keys, as people use "TS123" to ID sites
        //altho in theory there is only 1 site per system, there is NO guarantee that siteID:system are 1:1 - maybe even siteID:system_planet is not 1:1?
        for (var d = 0; d < data.length; d++) {
            if (data[d].system && data[d].system.replace(' ', '').length > 1) {
                canonnEd3d_tslinks.sitesByIDs[data[d].siteID] = data[d];
            }
        }

        //run through list and add sites and links at once, requires associative array with siteID as keys
        for (const key of Object.keys(canonnEd3d_tslinks.sitesByIDs)) {
            let siteData = canonnEd3d_tslinks.sitesByIDs[key];

            canonnEd3d_tslinks.addPOI(
                siteData.system,
                siteData.galacticX,
                siteData.galacticY,
                siteData.galacticZ,
                siteData.status == '✔' ? ['201'] : ['202'] //thargoid sites have two states, active and inactive
            );

            // adding routes to build the connections and show the msg links
            // arrows would be cool and reusable for hyperdictions map
            canonnEd3d_tslinks.addTSRoute(siteData.system, siteData.msg1);
            canonnEd3d_tslinks.addTSRoute(siteData.system, siteData.msg2);
            canonnEd3d_tslinks.addTSRoute(siteData.system, siteData.msg3);

        }
    },

    addingSystems: {//adding Eagle Eye manually
        "HIP 17225": { done: false, type: "EagleEye" },
        "HIP 17692": { done: false, type: "EagleEye" },
        "HIP 17892": { done: false, type: "EagleEye" },
        "HR 1185": { done: false, type: "EagleEye" },
        "Pleiades Sector IR-W d1-55": { done: false, type: "EagleEye" },
        "Pleiades Sector KC-V c2-4": { done: false, type: "EagleEye" },
    },
    systemsWithStations: [],
    fetchAddSystems: async () => {
        var edsmQueues = [];
        var edsmQueue = [];
        //console.log("Names:", names);

        //check json_stations.json if the target site has a station (populated systems)
        if (canonnEd3d_tslinks.systemsWithStations.length <= 0) {
            //console.log("waiting for stations file");
            canonnEd3d_tslinks.systemsWithStations = await fetch("data/json_stations.json");
            canonnEd3d_tslinks.systemsWithStations = await canonnEd3d_tslinks.systemsWithStations.json();
            //console.log("stations file received");
        }

        //console.log(canonnEd3d_tslinks.addingSystems);
        for (const systemName in canonnEd3d_tslinks.addingSystems) {
            //if (canonnEd3d_tslinks.addingSystems[systemName].done) continue;

            var found = false;
            for (var i = 0; i < canonnEd3d_tslinks.systemsWithStations.length; i++) {
                let stationSystem = canonnEd3d_tslinks.systemsWithStations[i];
                if (systemName.toUpperCase() === stationSystem.name.toUpperCase()) {
                    //console.log(`found system '${system.name}' in stations file, adding as POI`);
                    canonnEd3d_tslinks.addPOI(
                        stationSystem.name,
                        stationSystem.pos_x,
                        stationSystem.pos_y,
                        stationSystem.pos_z,
                        ['203']
                    );
                    if (canonnEd3d_tslinks.addingSystems[systemName].type == "EagleEye") {
                        canonnEd3d_tslinks.addPOI(
                            stationSystem.name,
                            stationSystem.pos_x,
                            stationSystem.pos_y,
                            stationSystem.pos_z,
                            ['206']
                        );
                    }
                    found = true;
                    break;
                }
            }
            if (!found) {
                //console.log("system has no station. adding to edsm queue");
                edsmQueue.push(systemName);
                if (edsmQueue.length > 70) {
                    edsmQueues.push(edsmQueue);
                    edsmQueue = [];
                }
            }
        }
        edsmQueues.push(edsmQueue);

        //*
        //console.log("Queue:", edsmQueue);
        //console.log("Queues:", edsmQueues);
        for (var q = 0; q < edsmQueues.length; q++) {
            //console.log("Queue:", q, edsmQueues[q]);
            let response = await getSystemsEDSM(edsmQueues[q]);

            if (response.data.length <= 0) {
                console.log("EDSM debug", response);
            }
            for (const index in response.data) {
                let system = response.data[index];
                //*
                //EDSM sometimes gives guessed results based on weird input
                //since our input is very weird, i want the response to match what I search
                let found = false;
                for (const addSystemName in canonnEd3d_tslinks.addingSystems) {
                    if (system.name.toUpperCase() === addSystemName.toUpperCase()) {
                        if (canonnEd3d_tslinks.addingSystems[addSystemName].type == "EagleEye") {
                            canonnEd3d_tslinks.addPOI(
                                system.name,
                                system.coords.x,
                                system.coords.y,
                                system.coords.z,
                                ['206']
                            );
                        }
                        found = true;
                        break;
                    }
                }
                if (!found) continue; //if its not matched anything of what we searched, ignore it
                //*/

                canonnEd3d_tslinks.addPOI(
                    system.name,
                    system.coords.x,
                    system.coords.y,
                    system.coords.z,
                    ['200']
                );
            }
        }
        //*/

        let unknownNames = [];
        for (const names in canonnEd3d_tslinks.addingSystems) {
            if (!canonnEd3d_tslinks.addingSystems[names].done)
                unknownNames.push(names);
        }
        if (unknownNames.length > 0)
            console.log("failed to fetch info for systems: ", unknownNames);
    },

    addPOI: (name, x, y, z, category) => {
        /* not sure if we want to add multiples of the same system in different color or add multiple categories to the same system
        //todo has issues on some systems, doing systems double works better. maybe bc of the route algo
        //adding the category only if the system already exists in our data
        for (const key in canonnEd3d_tslinks.systemsData.systems) {
            if (name.toUpperCase() === canonnEd3d_tslinks.systemsData.systems[key].name.toUpperCase()) {
                //console.log(`adding cat ${category} to system ${name}`);
                canonnEd3d_tslinks.systemsData.systems[key].cat.push(category);
                if (name in canonnEd3d_tslinks.addingSystems) {
                    //console.log(`setting system ${name} as DONE`);
                    canonnEd3d_tslinks.addingSystems[name].done = true;
                }
                return;
            }
        }
        //*/
        //add the site
        let poiSite = {};
        poiSite['name'] = name.toUpperCase();
        //console.log(category);
        //todo Check Site Type and match categories
        poiSite['cat'] = category;
        poiSite['coords'] = {
            x: parseFloat(x),
            y: parseFloat(y),
            z: parseFloat(z),
        };

        canonnEd3d_tslinks.systemsData.systems.push(poiSite);
        if (name in canonnEd3d_tslinks.addingSystems) {
            canonnEd3d_tslinks.addingSystems[name].done = true;
        }
    },

    addTSRoute: (originSystem, msg) => {

        //add the route link
        if (msg && msg != 'X' && msg.replace(' ', '').length > 1) {
            let cat = [40];
            let tarname = msg;
            //if its not a thargoid structure, we need to add the system, too
            if (!msg.match(/TS\d+/)) {
                canonnEd3d_tslinks.addNonTSSRoute(originSystem, msg, ['10']);
                return;
            }

            tarname = canonnEd3d_tslinks.sitesByIDs[msg].system;
            canonnEd3d_tslinks.addRoute(originSystem, tarname, cat);
        }

    },
    addNonTSSRoute: (originSystem, msg, cat) => {
        if (!msg || !originSystem) {
            console.log(`Error trying to add Non TSS Route: ${originSystem} => ${msg}`);
            return;
        }

        //add to system fetching queue, checking for stations and calling edsm later
        if (!(msg in canonnEd3d_tslinks.addingSystems)) {
            canonnEd3d_tslinks.addingSystems[msg] = { done: false };
            if (canonnEd3d_tslinks.addingSystems[msg].type == "EagleEye") cat.push('60');
        }


        //console.log("adding Non TSS Route:", msg);

        canonnEd3d_tslinks.addRoute(originSystem, msg, cat);
    },
    addRoute: (originSystem, tarname, category) => {
        var route = {};
        //todo 
        route['cat'] = category;
        route['points'] = [
            { 's': originSystem.toUpperCase(), 'label': originSystem },
            { 's': tarname.toUpperCase(), 'label': tarname },
        ];
        route['circle'] = false;

        // We can then push the site to the object that stores all systems
        canonnEd3d_tslinks.systemsData.routes.push(route);
    },

    parseCSVData: async (url, callBack) => {
        var parsePromise = new Promise(function (resolve, reject) {
            Papa.parse(url, {
                download: true,
                header: true,
                complete: resolve
            });
        });
        var results = await parsePromise;

        await callBack(results.data);

        // after we called the callback
        // (which is synchronous, so we know it's safe here)
        // we can resolve the promise

        document.getElementById("loading").style.display = "none";
    },

    recenterSearch: function () {
        var term = $('#search input').val();

        var foundSystem = {};
        for (key in canonnEd3d_tslinks.systemsData.systems) {
            let system = canonnEd3d_tslinks.systemsData.systems[key];
            if (system.name.indexOf(term) >= 0) {
                foundSystem = system;
                break;
            }
        }
        if (!(Object.keys(foundSystem).length === 0)) {
            recenterViewport(foundSystem.coords, 100);

            //console.log("addtext", "system_hover", systemname, 0, 4, 0, 3, threeObj);
            /* how do we get threeObj? they dont have names. would like to show the mouseover text after search recenter
                        HUD.addText(-1, foundSystem.name,
                            0, 4, 0, 3//, foundSystem.coords, true
                        ); 
            //*/
        }
    },


    init: function () {
        var tssites = canonnEd3d_tslinks.parseCSVData(
            'data/csvCache/202011052200_Canonn Universal Science DB - TS Export - Export CSV Data.csv',
            canonnEd3d_tslinks.formatTSSites
        );

        var nonsiteTargets = canonnEd3d_tslinks.parseCSVData(
            'data/csvCache/Thargoid Surface Site Survey (Responses) - Form responses 1.csv',
            canonnEd3d_tslinks.parseFormResponses
        );

        Promise.all([tssites, nonsiteTargets]).then(function () {
            Ed3d.init({
                container: 'edmap',
                json: canonnEd3d_tslinks.systemsData,
                withFullscreenToggle: false,
                withHudPanel: true,
                hudMultipleSelect: true,
                effectScaleSystem: [20, 500],
                startAnim: true,
                showGalaxyInfos: true,
                //setting camera to Merope and adjusting
                playerPos: [-78.59375, -149.625, -340.53125],
                cameraPos: [-78.59375 - 500, -149.625, -340.53125 - 500],
                systemColor: '#FF9D00',
            });
            setTimeout(() => {
                $('#search').css('display', 'block');
                $('#search input').on('input', canonnEd3d_tslinks.recenterSearch);
            }, 1000);
        });

    },
};
