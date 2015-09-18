<?php
if(empty($_GET['cb']) or empty($_GET['request'])) {
print "no request";
} 
else {
	switch($_GET['request']) {
		case 'add_user':
		add_user();
		break;
	}
}

#functions go here

function add_user() {
	$data = $_GET['data'];
	

	#we now fetch the data from users.json
	$existingusers = json_decode(file_get_contents('../files/users.json'));
	if(count($existingusers) > 0) {
		$name = $data->uname;
		$usertype = $data->usertype;
		$email = $data->email;

		$i = count($existingusers);
		$existingusers = json_encode($existingusers);

		$existingusers[$i][uname] = $name;
		$existingusers[$i][type] = $usertype;
		$existingusers[$i][email] = $email;

		if(file_put_contents('../files/users.json', $existingusers)) {
			print $_GET['cb'].'('."user added successfully";
		} else {
			print $_GET['cb'].'('."error adding user. Check credentials".')';
		}

	} else {
		file_put_contents('../files/users.json', json_encode($data));
		print $_GET['cb'].'('."user added successfully".')';
	}
}
?>