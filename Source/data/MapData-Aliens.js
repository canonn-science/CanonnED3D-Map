const API_ENDPOINT = `https://api.canonn.tech`;
const API_LIMIT = 1000;

const capi = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

let sites = {
    btsites: [],
    gbsites: [],
    grsites: [],
    gssites: [],
    tbsites: [],
    tssites: []
};

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

var canonnEd3d_guardians = {

    //Define Categories
    systemsData: {
        categories: {
            'Guardian': {
                '201': {
                    name: 'Brain Tree',
                    color: '0000ff'
                },
                "301": {
                    name: "Beacon",
                    color: '2222ff'
                },
                "401": {
                    name: "Guardian Ruins - (GR)",
                    color: '4444ff'
                },
                "501": {
                    name: "Guardian Structures - (GS)",
                    color: '6666ff'
                },
                "511": {
                    name: "Other",
                    color: '8888ff'
                }
            },
            "Thargoid": {
                "601": {
                    name: "Thargoid Barnacles",
                    color: '00ff00'
                },
                "701": {
                    name: "Thargoid Suface Sites",
                    color: '22ff22'
                },
                "711": {
                    name: "Other",
                    color: '44ff44'
                }
            },
            "Human": {
                "11": {
                    name: "INRA Sites",
                    color: 'ff2222'
                },
                "22": {
                    name: "Sol",
                    color: "f2fff2"
                },

            }

        },
        systems: []
    },
    siteNames: {},
    formatUnknown: function (data) {
        console.log(canonnEd3d_guardians.siteNames)
        console.log(data)
        data.forEach(function (site) {
            if (!canonnEd3d_guardians.siteNames[site.system.toUpperCase()]) {
                console.log("Not found: " + site.system)
                var poiSite = {};
                poiSite['cat'] = [401];
                poiSite['name'] = site.system;
                poiSite["coords"] = { x: parseFloat(site.x), y: parseFloat(site.y), z: parseFloat(site.z) }
                poiSite["infos"] = "Ancient Ruin<br>"
                canonnEd3d_guardians.systemsData.systems.push(poiSite);
            }
        });

    },
    formatINRA: function (data) {
        console.log(canonnEd3d_guardians.inradata)
        console.log(data)
        data.forEach(function (site) {
            if (!canonnEd3d_guardians.siteNames[site.system.toUpperCase()]) {
                console.log("Not found: " + site.system)
                var poiSite = {};
                if (site.category == "INRA") {
                    poiSite['cat'] = [11];
                }
                if (site.category == "Guardian") {
                    poiSite['cat'] = [511];
                }
                if (site.category == "Thargoid") {
                    poiSite['cat'] = [711];
                }
                if (site.category == "Human" && site.name == "Sol") {
                    poiSite['cat'] = [22];
                }

                poiSite['name'] = site.system;
                poiSite["coords"] = { x: site.x, y: site.y, z: site.z }
                if (site.img) {
                    poiSite["infos"] = '<img src="' + site.img + '">' + site.html
                } else {
                    poiSite["infos"] = site.html
                }
                canonnEd3d_guardians.systemsData.systems.push(poiSite);
            }
        });

    },
    gCloudData: [],
    inradata: [],
    parseData: function (url, resolvePromise) {
        let fetchDataFromApi = async (url, resolvePromise) => {
            let response = await fetch(url);
            let result = await response.json();
            canonnEd3d_guardians.gCloudData = result
            resolvePromise();
            console.log("data parsed")
            return result;
        }
        fetchDataFromApi(url, resolvePromise)

        //console.log(data)

    },
    parseINRA: function (url, resolvePromise) {
        let fetchDataFromApi = async (url, resolvePromise) => {
            let response = await fetch(url);
            let result = await response.json();
            canonnEd3d_guardians.inradata = result
            resolvePromise();
            console.log("data parsed")
            return result;
        }
        fetchDataFromApi(url, resolvePromise)

        //console.log(data)

    },
    formatSites: async function (data, resolvePromise) {
        sites = await go(data);

        let siteTypes = Object.keys(data);

        for (var i = 0; i < siteTypes.length; i++) {
            for (var d = 0; d < sites[siteTypes[i]].length; d++) {
                let siteData = sites[siteTypes[i]];
                if (siteData[d].system.systemName && siteData[d].system.systemName.replace(' ', '').length > 1) {
                    var poiSite = {};
                    poiSite['name'] = siteData[d].system.systemName;

                    //Check Site Type and match categories
                    if (siteTypes[i] == 'btsites') {
                        poiSite['cat'] = [201];
                    } else if (siteTypes[i] == 'gbsites') {
                        poiSite['cat'] = [301];
                    } else if (siteTypes[i] == 'grsites') {
                        poiSite['cat'] = [401];
                    } else if (siteTypes[i] == 'gssites') {
                        poiSite['cat'] = [501];
                    } else if (siteTypes[i] == 'tbsites') {
                        poiSite['cat'] = [601];
                    } else if (siteTypes[i] == 'tssites') {
                        poiSite['cat'] = [701];
                    }
                    poiSite['coords'] = {
                        x: parseFloat(siteData[d].system.edsmCoordX),
                        y: parseFloat(siteData[d].system.edsmCoordY),
                        z: parseFloat(siteData[d].system.edsmCoordZ),
                    };

                    // We can then push the site to the object that stores all systems
                    canonnEd3d_guardians.systemsData.systems.push(poiSite);
                }
            }
        }

        resolvePromise();
    },

    init: function () {
        //Sites Data
        var p1 = new Promise(function (resolve, reject) {
            canonnEd3d_guardians.formatSites(sites, resolve);
        });
        var p2 = new Promise(function (resolve, reject) {
            canonnEd3d_guardians.parseData('https://us-central1-canonn-api-236217.cloudfunctions.net/query/get_gr_data', resolve);
        });

        var p3 = new Promise(function (resolve, reject) {
            canonnEd3d_guardians.parseINRA('data/csvCache/notable_systems.json', resolve);
        });

        Promise.all([p1, p2, p3]).then(function () {
            canonnEd3d_guardians.formatUnknown(canonnEd3d_guardians.gCloudData)
            canonnEd3d_guardians.formatINRA(canonnEd3d_guardians.inradata)
            document.getElementById("loading").style.display = "none";
            Ed3d.init({
                container: 'edmap',
                json: canonnEd3d_guardians.systemsData,
                withFullscreenToggle: false,
                withHudPanel: true,
                hudMultipleSelect: true,
                effectScaleSystem: [20, 500],
                startAnim: false,
                showGalaxyInfos: true,
                cameraPos: [25, 14100, -12900],
                systemColor: '#FF9D00'
            });
        });
    }
};