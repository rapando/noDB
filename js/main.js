var app = angular.module('mainapp', []);
app.controller('commentController', ['$scope', function($scope) {
	$scope.comment = '';
	$scope.rem = function() {
		return 100 - $scope.comment.length;
	};
}]);


// The JQUery Code
var jq = $.noConflict();
var domainlink = 'http://localhost';
jq(document).ready(function() {
	fetchcomments();
	jq("#loader").hide();
	jq("#submit").on('click', function() {
		jq("#loader").show();
		var name = jq("#username").val();
		name = name.trim();
		var comment = jq("#newcomment").val();
		comment = comment.trim();
		if(name.length >= 2 && comment.length >=2) {
			jq.ajax({
				dataType:'jsonp',
				jsonp:'cb',
				url:domainlink+'/nodb/php/comments.php?req=1&name='+name+'&comment='+comment,
				
				success:function(data) {
					alert(data);
					jq("#loader").hide(500);
					fetchcomments();
				}, error:function() {
					alert("error posting comment");
					
				}, timeout:10000
			});

			jq("#username").val('');
			jq("#newcomment").val('');
		} else {
			alert("Name or comment too short");
		}
	});	

	function fetchcomments() {
		jq.ajax({
			dataType:'jsonp',
			jsonp:'cb',
			url:domainlink+'/nodb/php/comments.php?req=2',
			timeout:10000,
			success:function(data) {
				jq("#noc").html(data.length);
				data=data.reverse();
				var comments = '<ul>';
				for(var i =0; i < data.length; i++) {
					comments += '<li><p><b>'+data[i].name+'</b><br />'+data[i].comment+'<br /><em>'+showtime(data[i].moment)+'</em></p></li>';
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