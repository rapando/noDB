$(document).ready(function() {
	var domainlink = 'http://localhost/noDB';
	getusertypes();

	//code to fetch the data for the users

	$("#adduser").on('click', function() {
		var uname = $("#username").val();
		var usertype = $("#usertype").val();
		var email = $("#email").val();
		var data = JSON.stringify({uname:uname, usertype:usertype, email:email});
		var link = domainlink+'/php/get.php?data='+data+'&request=add_user';

		$.ajax({
			dataType:'jsonp',
			jsonp:'cb',
			timeout:10000,
			url:link,
			success:function(data) {
				alert(data);
				$("#username").val('');
				$("#usertype").val('');
				$("#email").val('');
			}, error:function() {
				alert("Check connection");
			}
		})
	});

	function getusertypes() {
		$.ajax({
			dataType:'jsonp',
			jsonp:'cb',
			url:domainlink+'/php/send.php?request=get_user_types',
			timeout:10000,
			success:function(data) {
				data = JSON.parse(data);
				var output = '';
				for(var i = 0; i < data.length; i++) {
					output += '<option value="'+data[i].id+'">'+data[i].type+'</option>';
				}
				var usertype = '<select id="usertype"><option value=""></option>'+output+'</select>';
				var new_usertype = '<select id="new_usertype"><option value=""></option>'+output+'</select>';
				$("#usertype").html(usertype);
				$("#new_usertype").html(new_usertype);
			}, error:function() {
				alert("no internet");
			}
		});
	}
});