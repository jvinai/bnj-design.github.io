appModule.config(function($routeProvider) {
	"use strict";

	$routeProvider.
	when("/catalogue", {
		templateUrl: "vues/catalogue.html",
		controller: "CatalogueController"
	}).
	when("/validation", {
		templateUrl: "vues/validation.html",
		controller: "ValidationController"
	}).
	otherwise({
		redirectTo: "/catalogue"
	});
});
