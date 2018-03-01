
<?php

	function csvToJson($csv) {
    	$rows = explode("\n", trim($csv));
    	$data = array_slice($rows, 1);
    	$keys = array_fill(0, count($data), $rows[0]);
    	$json = array_map(function ($row, $key) {
    	    return array_combine(str_getcsv($key), str_getcsv($row));
    	}, $data, $keys);
	
    	return json_encode($json);
	}

	function getSheetData() {
		$sheetcsv = file_get_contents('https://docs.google.com/spreadsheets/d/19CyxTGuEg984a2sNQ8kM-eKkSHk4ZUXBhXTt_YF4GxU/pub?gid=246996108&single=true&output=csv');

		$json = csvToJson($sheetcsv);

		return $json;
	}

	echo getSheetData();

?>
