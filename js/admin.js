/*
Samson Rapando
BSc Computer Science,
The University of Nairobi

A simple chat without a database
*/
var jq = $.noConflict();
jq(document).ready(function() {
	/*assign the domain link to a global variable domainlink. In case you are working online, edit this and paste the noDB folder inside server folder into the root of your public_html folder */
	var domainlink = 'http://localhost';
	var curr_comments;
	fetchcomments();
	jq("#loader").hide();
	jq("#delbutton").click(function() {
		jq("#loader").show();
		var commentid = jq("#id").val();
		var coms = curr_comments.reverse();
		if(coms[commentid]) {
			coms.splice(commentid, 1);
			var url = domainlink+'/nodb/php/comments.php?req=3&data='+JSON.stringify(coms);
			jq.ajax({
				dataType:'jsonp',
				jsonp:'cb',
				timeout:10000,
				url:url,
				success:function(data) {
					alert(data);
					fetchcomments();
				}, error:function() {
					alert("check connection");
				}
			});
		} else {
			alert("invalid id");
		}
		jq("#loader").hide(500);
	});

	function fetchcomments() {
		jq.ajax({
			dataType:'jsonp',
			jsonp:'cb',
			url:domainlink+'/nodb/php/comments.php?req=2',
			timeout:10000,
			success:function(data) {
				curr_comments = data;
				jq("#noc").html(data.length);
				data=data.reverse();
				var comments = '<ul>';
				for(var i =0; i < data.length; i++) {
					comments += '<li><p>id: '+(data.length - (i+1))+' >> <b>'+data[i].name+'</b><br />'+data[i].comment+'<br /><em>'+showtime(data[i].moment)+'</em></p></li>';
				}
				comments += '</ul>';
				jq("#comments").html(comments);
			}, error:function() {
				alert("No connection");
			}
		});
	}

	function showtime(epoch) {
		epoch = epoch * 1000;
		var now = new Date(epoch);
		var x = now.getHours()+':'+now.getMinutes()+'  '+now.getDate()+'/'+gettruemonth(now.getMonth())+'/'+now.getFullYear();
		return x;
	}

	function gettruemonth(x) {
		switch(x) {
			case 0:
			return 'Jan';
			break;

			case 1:
			return 'Feb';
			break;

			case 2:
			return 'Mar';
			break;

			case 3:
			return 'Apr';
			break;

			case 4:
			return 'May';
			break;

			case 5:
			return 'Jun';
			break;

			case 6:
			return 'Jul';
			break;

			case 7:
			return 'Aug';
			break;

			case 8:
			return 'Sep';
			break;

			case 9:
			return 'Oct';
			break;

			case 10:
			return 'Nov';
			break;

			case 11:
			return 'Dec';
			break;
		}
	}
});