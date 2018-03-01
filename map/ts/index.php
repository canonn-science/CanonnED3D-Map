<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <title>Canonn | Thargoid Structures and UL Destinations</title>
  <link href="https://fonts.googleapis.com/css?family=Orbitron:400" rel="stylesheet" type="text/css" />
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&amp;subset=latin-ext" rel="stylesheet">
  <link href="us_sites_mapping/css/us_map.css" rel="stylesheet" type="text/css" />
  <!-- Custom CSS -->
  <style type="text/css">
  /*#systemDetails,
  #hud {
    width:450px;
  }

  h1 {
    position: fixed;
    top: 2%;
    left: 0;
    width: 100%;
    font-size: 1.3rem;
    text-align: center;
    color: #ccc;
    font-family: "Orbitron";
  }

  h1 a {
    color: inherit;
  }

  #edmap {
    position: fixed;
    top: 10%;
    right: 0;
    width: 100%;
    height: 80%;
  }
  #debug {
    position: fixed;
    bottom: 5%;
    right: 0;
    width: 100%;
    text-align: center;
    color: #aaa;
    font-family: "Helvetica";
    font-size: 0.8rem;
  }*/
  </style>

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-102148507-1', 'auto');
    ga('send', 'pageview');
  </script>

</head>

  <body>

    <div class="app-wrap">

      <div class="header">
        Canonn - Thargoid bases and UL destinations
      </div>

      <div class="main-wrap">
        <div class="us-search">
          
          <div class="us-search-static">
            <input class="us-search-input js-us-input" type="text" name="input-us-search" placeholder="US# or system name" />
          </div>

          <div class="us-search-overflow">
            <ul class="us-systems js-us-systems"></ul>
          </div>

        </div>
        <div class="map-wrap">
          <div id="edmap"></div>
          <div id="debug"></div>
        </div>
        <div class="detail-wrap js-detail-wrap">

          <div class="detail-usname js-detail-usname">US001</div>
          <div class="detail-sysname js-detail-sysname">ARIES DARK REGION DB-X D1-63</div>

          <hr />

          <div class="detail-planet-img">
            <img src="us_sites_mapping/img/planet_grid.png" />
          </div>

          <div class="detail-body js-detail-body">A 1 B</div>

          <hr />

          <div class="detail-latlngwrap">
            <div class="detail-lat">
              LAT
              <div class="detail-coord-pos js-detail-lat">-73.62</div>
            </div>

            <div class="detail-lng">
              LNG
              <div class="detail-coord-pos js-detail-lng">169.23</div>
            </div>

          </div>

          <hr />

          <div class="detail-usactive js-detail-active">Site inactive</div>

          <!-- Message destinations here -->

          <div class="detail-destinations">
            <h2>Message destinations:</h2>
            <table class="destinations-table">
              <tr>
                <td>(MSG3) Top:</td>
                <td class="js-msg1-destination"></td>
              </tr>
              <tr>
                <td>(MSG2) Middle:</td>
                <td class="js-msg2-destination"></td>
              </tr>
              <tr>
                <td>(MSG1) Bottom:</td>
                <td class="js-msg3-destination"></td>
              </tr>
            </table>
          </div>

          <div class="detail-body-info">
            <h2>Planetary body info:</h2>
            <table class="bodyinfo-table js-bodyinfo-table">
              <tr>
                <td>Arrival:</td>
                <td class="js-detail-bodyinfo-arrival"></td>
              </tr>
              <tr>
                <td>Gravity:</td>
                <td class="js-detail-bodyinfo-g"></td>
              </tr>
              <tr>
                <td>Tidally locked:</td>
                <td class="js-detail-bodyinfo-tidal"></td>
              </tr>
              <tr>
                <td>Earth Masses:</td>
                <td class="js-detail-bodyinfo-mass"></td>
              </tr>
              <tr>
                <td>Radius:</td>
                <td class="js-detail-bodyinfo-rad"></td>
              </tr>
              <tr>
                <td>Temperature:</td>
                <td class="js-detail-bodyinfo-temp"></td>
              </tr>
              <tr>
                <td>Rotation period:</td>
                <td class="js-detail-bodyinfo-rot"></td>
              </tr>
            </table>
          </div>

        </div>
      </div>

    </div>


  <!-- jQuery -->
  <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
  <!-- Three.js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js"></script>

  <!-- Launch ED3Dmap -->
  <link href="css/styles.css" rel="stylesheet" type="text/css" />
  <script src="js/ed3dmap.js?v=6_2"></script>
  <script src="us_sites_mapping/js/functions.js?v=1_1"></script>
  <script src="us_sites_mapping/js/ui.js?v=1_1"></script>
  <script src="us_sites_mapping/js/external_api.js?v=1_1"></script>

  <script>

  var spreadsheetData = <?php include("spreadsheet.php"); ?>;

  $(document).ready( function() {

    window.cleanJSON = cleanJSONData( spreadsheetData );
    var usData = getUsData( window.cleanJSON, { connections: true } );

    initEd3d( usData, {} );

    var pois = generatePois();
    for(var j=0; j<pois.length; j++) {
      window.cleanJSON.push( pois[j] );
    }

    initUI( window.cleanJSON );

  });
  
  </script>

</body>
</html>