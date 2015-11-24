appModule.service('BookService', function ($http, $log, CST, localStorageService, $q) {
	"use strict";

	return { 	
        getBooks : function(){
			//if books not present into local storage, get them from the server
			if(localStorageService.get("books") == null){
				//get promise
				var promise = $http.get("http://henri-potier.xebia.fr/books");
				
				//set the books from the server to the local storag
				promise.then(function(response) {
					if(response.data != null) {
						_.each(response.data, function(item) {
							item.nb = 0;
							item.isSelected = false;
						});
						
						localStorageService.set("books", angular.copy(response.data));
					}
				});
				
				//return promise
				return promise;
			} else {
				//if books already into the local storage return them with a promise
				return $q(function(resolve, reject) {
					var response = new Array();
					response.data = localStorageService.get("books");
					resolve(response);
				});
			}
		}
	};
});
   