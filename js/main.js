var app = angular.module('mainapp', []);
app.controller('commentController', ['$scope', function($scope) {
	$scope.comment = '';
	$scope.rem = function() {
		return 100 - $scope.comment.length;
	};
}]);

// The JQUery Code
var jq = $.noConflict();
jq(document).ready(function() {
	var domainlink = 'http://localhost/noDB';
	jq("#loader").hide();
	jq("#submit").on('click', function() {
		jq("#loader").show();
		var name = jq("#username").val();
		name = name.trim();
		var comment = jq("#newcomment").val();
		comment = comment.trim();
		if(name.length >= 2 && comment.length >=2) {
			var link = domainlink + '/php/comment.php?req=1&name='+name+'&comment='+comment;
			jq.ajax({
				dataType:'jsonp',
				jsonp:'cb',
				timeout:10000,
				success:function(data) {
					alert(data);
					jq("#loader").hide(500);
				}, error:function() {
					alert("check connection status");
					jq("#loader").hide(500);
				}
			});

			jq("#username").val('');
			jq("#newcomment").val('');
		} else {
			alert("Name or comment too short");
		}
	});	
});