/* Enter CSVs to pull Data from and parse it to json to consume in MapData-output.js */

// Add your CSVs below:

csvData = {
	bn: csvJSON('https://docs.google.com/spreadsheets/d/e/2PACX-1vTCGOwaRT8ESad9j0GAQ7tMMNj8ObxipFW8fop3eaZ-HoCVo_k9dQsHVvs1oFvARrY5SC6o4uDAWKQA/pub?gid=0&single=true&output=csv'),
	bt: csvJSON('https://docs.google.com/spreadsheets/d/e/2PACX-1vRdEQQByWyU8MlzfJw9SzEsaM9c_zDV_RJ49Fiox842EEELrUHpMPexLYhjqNB8SOzB564jJ_oLdBx2/pub?gid=0&single=true&output=csv'),
	gr: csvJSON('https://docs.google.com/spreadsheets/d/e/2PACX-1vTSvkdtHr0SbM4dYOCsDalp1hRilWt2I5Hz1l2OIgbfR8Hs-lOCat_ZUyhyBnuv9R9rXz9vnhaYif2-/pub?gid=0&single=true&output=csv'),
	ts: csvJSON('https://docs.google.com/spreadsheets/d/e/2PACX-1vR4-rhi1p4BU7AlOSj7_78Kvk5Ox6vb39vzzlWU3yI-dqlaLxk-CFLWvAFKc-J7WhomFiQ_u0P7Stxz/pub?gid=0&single=true&output=csv')
}

function csvJSON(url){

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = function() {
      if (xhr.status === 200) {
          
        var csv = xhr.responseText;
        console.log(csv);
      
        var lines=csv.split("\n");
      
        var result = [];
      
        var headers=lines[0].split(",");
      
        for(var i=1;i<lines.length;i++){
      
          var obj = {};
          var currentline=lines[i].split(",");
      
          for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
          }
      
          result.push(obj);
      
        }
        
        //return result; //JavaScript object
        return JSON.stringify(result); //JSON

      }
      else {
          alert('Request failed.  Returned status of ' + xhr.status);
      }
  };

  xhr.send();

}

console.log(csvData.bn);
