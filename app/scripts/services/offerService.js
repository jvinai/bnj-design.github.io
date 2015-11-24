appModule.service('OfferService', function ($log, localStorageService, $http) {
	"use strict";

	return { 	
        getOfferFromBook : function(items){
			var isbns = "";
			_.each(items, function(item) {
				isbns += "," + item.isbn;
			});
			isbns = isbns.substring(1);
			
			var promise = $http.get("http://henri-potier.xebia.fr/books/" + isbns + "/commercialOffers");
			
			return promise;
		},	
	};
});
   