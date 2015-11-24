appModule.controller('ValidationController', function ($scope, $log, $location) {
	"use strict";

    //change location
	$scope.locate = function (path) {
		$location.path(path);	
	};
})