appModule.controller('CartController', function ($rootScope, $scope, $timeout, $location, $uibModalInstance, $log, CartService, OfferService, CST, $filter, BookService) {
	"use strict";
	
	/***********************************************************************************************/
	/************************************** Declaration ********************************************/
	/***********************************************************************************************/
	
	//declare cart
	$scope.cart = undefined;

	//declare revisedTotalPrice
	$scope.revisedTotalPrice = undefined;
	
	//declare the best offer to use
	$scope.usedOffer = undefined;
	
	//declare the book list
	$scope.books = undefined;

	//declare the boolean to enable/disable the delete button if at less one book has been selected
	$scope.readyToDelete = undefined;
	
	//set into the scope the constants
	$scope.CST = CST;
	
	/***********************************************************************************************/
	/***************************************** Events **********************************************/
	/***********************************************************************************************/

	/***********************************************************************************************/
	/************************************* Local Functions *****************************************/
	/***********************************************************************************************/
	
	//apply one of the different possible offers
	var getPriceWithOffer = function (offer) {
		var toReturn = 0;

		//apply the correct operation depending the offer
		if (offer.type === CST.TYPE_OFFER_PERCENTAGE) {
			toReturn = $scope.cart.totalPrice * (1 - offer.value / 100);
		} else if (offer.type === CST.TYPE_OFFER_MINUS) {
			toReturn = $scope.cart.totalPrice - offer.value;
		} else if (offer.type === CST.TYPE_OFFER_SLICE) {
			toReturn = $scope.cart.totalPrice - parseInt($scope.cart.totalPrice / offer.sliceValue) * offer.value;
		}

		//return the updated price
		return $filter('number')(toReturn, 2);
	};
	
	var processOffers = function () {
		//if there is at less one item into the cart
		if ($scope.cart !== null && $scope.cart.items !== null && $scope.cart.items.length > 0) {
			//get available offers with the current cart
			OfferService.getOfferFromBook($scope.cart.items).then(function (response) {
				//initialize the revised total price with the current cart price
				$scope.revisedTotalPrice = $scope.cart.totalPrice;

				//parse the offers to get the best one
				_.each(response.data.offers, function (offer) {
					//compare the different offers
					if (getPriceWithOffer(offer) < $scope.revisedTotalPrice) {
						$scope.revisedTotalPrice = getPriceWithOffer(offer);

						//set the best offer into the scope
						$scope.usedOffer = angular.copy(offer);
					}
				});
			}, function (error) {
				//initialize the revised total price with the current cart price
				$scope.revisedTotalPrice = $scope.cart.totalPrice;
				
				//since an error has occured, reset the offer
				$scope.usedOffer = undefined;
			});
		} else {
			//initialize the revised total price with the current cart price
			$scope.revisedTotalPrice = $scope.cart.totalPrice;
			
			//since an error has occured, reset the offer
			$scope.usedOffer = undefined;
		}
	};
	
	/***********************************************************************************************/
	/************************************ Scope Functions ******************************************/
	/***********************************************************************************************/

	//update the boolean readyToDelete when an element is checked/unchecked
	$scope.updateReadyToDelete = function () {
		$scope.readyToDelete = !angular.isUndefined(_.find($scope.cart.items, function (item) {
			return item.isSelected === true;
		}));
	};

	//method to delete selected books
	$scope.deleteBooks = function () {
        $scope.cart.items = _.reject($scope.cart.items, function (item) {
            var test = item.isSelected === true;
            
            //if the condition is verified : update cart information
            if (test) {
                $scope.cart.totalPrice -= item.price * item.nb;
                $scope.cart.nbItems -= item.nb;
            }

            return test;
        });

		//re-processing offers
		processOffers();
		
		//save cart
		CartService.setCart($scope.cart);
		
		//emit event to refresh catalogue cart
		$rootScope.$emit('updateCartEvent');
		
		//reset the delete button
		$scope.updateReadyToDelete();
	};
	
	//validate user cart
	$scope.validateCart = function () {
		$uibModalInstance.dismiss('cancel');
		
		$timeout(function () {
			$location.path("/validation");
		}, 400);
	};

	//close user cart
	$scope.closeCart = function () {
		//reset cart selected items
		_.each($scope.cart.items, function (item) {
			item.isSelected = false;
		});
		
		$uibModalInstance.dismiss('cancel');
	};
	
	/***********************************************************************************************/
	/*************************************** Init Method *******************************************/
	/***********************************************************************************************/

	//main controller init method
	$scope.init = function () {
		//get cart from the service
		$scope.cart = CartService.getCart();

		//initialise the readyToDelete boolean
		$scope.readyToDelete = false;

		//get books from service
		BookService.getBooks().then(function (response) {
			$scope.books = angular.copy(response.data);
		});

		//handle offers
		processOffers();
	};
	//launch the init method
	$scope.init();
	
	/***********************************************************************************************/
	/*********************************** End of Controller *****************************************/
	/***********************************************************************************************/
});