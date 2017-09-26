function doStuff(data) {
    //Data is usable here
    console.log(data);
}

function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
	header: true,
        complete: function(results) {
            callBack(results.data);
        }
    });
}

parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTCGOwaRT8ESad9j0GAQ7tMMNj8ObxipFW8fop3eaZ-HoCVo_k9dQsHVvs1oFvARrY5SC6o4uDAWKQA/pub?gid=0&single=true&output=csv", doStuff);
