appModule.controller('ValidationController', function ($scope, $log, $location) {
	"use strict";

	/***********************************************************************************************/
	/************************************ Scope Functions ******************************************/
	/***********************************************************************************************/
	
    //change location
	$scope.locate = function (path) {
		$location.path(path);	
	};
})