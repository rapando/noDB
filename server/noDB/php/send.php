<?php
if(isset($_GET['request']) and isset($_GET['cb'])) {
	switch($_GET['request']) {
		case 'get_user_types':
		get_user_types();
		break;


	}

} else {
	print "no request";
}

#functions
function get_user_types() {
	#fetch the usertypes from ../noDb/files/usertypes/usertype.json
	$usertypes = file_get_contents('../files/usertypes/usertypes.json');
	print $_GET['cb'].'('.json_encode($usertypes).')';
}
?>