appModule.service('CartService', function ($log, localStorageService, CST) {
	"use strict";

	return { 
        getCart : function(){
			var toReturn = {
				totalPrice: 0,
				nbItems: 0,
				items : []
			};
			
			if(localStorageService.get(CST.LOCAL_STORAGE_CART) != null) {
				//get the cart from the local storage
				toReturn = angular.copy(localStorageService.get("cart"));
			}
			
			return toReturn;
		},
		
		setCart : function (newCart) {
			localStorageService.set(CST.LOCAL_STORAGE_CART, angular.copy(newCart));
		}		
	};
});
   