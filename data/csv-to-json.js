function formatBN(data) {
    //Here you format BN JSON to ED3D acceptable object

    // this is assuming data is an array []
    for( var i=0; i<data.length; i++ ) {
        var bnSite = {};
			bnSite["name"] = data[1];
			
			//Ripe or Dead Status not enabled yet, pending CSV fixes
			bnSite["cat"] = [200];
			bnSite["coords"] = {
				"x":coords[0],
				"y":coords[1],
				"z":coords[2]
			}

			// We can then push the site to the object that stores all systems
			systemsData.systems.push(bnSite);

    }

}

function formatBT(data) {
    //Here you format BT JSON to ED3D acceptable object

    // this is assuming data is an array []
    for( var i=0; i<data.length; i++ ) {
        var btSite = {};
			btSite["name"] = data[1];
			btSite["cat"] = [300];
			btSite["coords"] = {
				"x":coords[0],
				"y":coords[1],
				"z":coords[2]
			}

			// We can then push the site to the object that stores all systems
			systemsData.systems.push(btSite);

    }

}

function formatTS(data) {
    //Here you format TS JSON to ED3D acceptable object

    // this is assuming data is an array []
    for( var i=0; i<data.length; i++ ) {
        var tsSite = {};
			tsSite["name"] = data[1];
			
			//Check if Site is Active or Inactive, set Category to match
			if(data[8].toLowerCase() == "y"){
				tsSite["cat"] = [500]
			}else{
				tsSite["cat"] = [501]
			}
			tsSite["coords"] = {
				"x":coords[0],
				"y":coords[1],
				"z":coords[2]
			}

			// We can then push the site to the object that stores all systems
			systemsData.systems.push(tsSite);

    }

}

function parseData(url, callBack, resolvePromise) {
    Papa.parse(url, {
        download: true,
		header: true,
        complete: function(results) {
            callBack(results.data);

            // after we called the callback 
            // (which is synchronous, so we know it's safe here)
            // we can resolve the promise

            resolvePromise();
        }
    });
}

var p1 = new Promise(function(resolve, reject) {
    parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTCGOwaRT8ESad9j0GAQ7tMMNj8ObxipFW8fop3eaZ-HoCVo_k9dQsHVvs1oFvARrY5SC6o4uDAWKQA/pub?gid=0&single=true&output=csv", formatBN, resolve);    
}

var p2 = new Promise(function(resolve, reject) {
    parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vRdEQQByWyU8MlzfJw9SzEsaM9c_zDV_RJ49Fiox842EEELrUHpMPexLYhjqNB8SOzB564jJ_oLdBx2/pub?gid=0&single=true&output=csv", formatBT, resolve);    
}

var p3 = new Promise(function(resolve, reject) {
    parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vR4-rhi1p4BU7AlOSj7_78Kvk5Ox6vb39vzzlWU3yI-dqlaLxk-CFLWvAFKc-J7WhomFiQ_u0P7Stxz/pub?gid=0&single=true&output=csv", formatTS, resolve);    
}


Promise.all([p1,p2,p3]).then(function() {
    // We now have all the data needed, this may take 200ms, or 5s, the code will wait.
});
