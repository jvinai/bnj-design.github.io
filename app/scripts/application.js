//main application module
var appModule = angular.module("bookApp", ["ui.bootstrap", "LocalStorageModule", "ngRoute"]);

appModule.config(function (localStorageServiceProvider) {
	"use strict";

	localStorageServiceProvider
		.setPrefix("bookApp")
		.setStorageType("localStorage")
		.setStorageCookie(45, "/")
		.setStorageCookieDomain("")
		.setNotify(true, true);
})