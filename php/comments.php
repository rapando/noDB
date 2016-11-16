<?php
switch($_GET['req']) {
	case '1':
	addcomment();
	break;

	case '2':
	fetchcomments();
	break;

	case '3':
	deletecomments();
	break;
	
}



function addcomment() {
	$name = ucwords(trim(strip_tags($_GET['name'])));
	$comment = trim(strip_tags($_GET['comment']));
	$data = json_decode(file_get_contents('../files/comments.json', true));
	$i = count($data);
	$data[$i]['name'] = $name;
	$data[$i]['comment'] = $comment;
	$data[$i]['moment'] = time();
	file_put_contents('../files/comments.json', json_encode($data));
	print json_encode("Comment posted!");
}

function fetchcomments() {
	$data = file_get_contents('../files/comments.json');
	print  $data;
}

function deletecomments() {
	$data = $_GET['data'];
	file_put_contents('../files/comments.json', $data);
	print json_encode("Comment deleted successfully");
}
?>