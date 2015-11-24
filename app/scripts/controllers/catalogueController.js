appModule.controller("CatalogueController", function ($rootScope, $scope, $location, $http, $timeout, $log, BookService, CST, $uibModal, CartService) {
	"use strict";

	//list of books
	$scope.books = undefined;
	
	//init main cart
	$scope.cart = undefined;
	
	//message at top of page
	$scope.mainMessage = undefined;
	
	//message mode (info, warning, error, success)
	$scope.messageMode = undefined;
    
    $scope.bookToZoom = undefined;

	//available nb books for each book (for v1.0.0 : default 10)
	$scope.tabNbBooks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	
	//put contants into the scope
	$scope.CST = CST;

	//capture event from the cart to refresh
	$rootScope.$on('updateCartEvent', function(event, args) {
		$scope.cart = CartService.getCart();
	});

	//reset main modal (used for zooming and displaying message)
	var resetModalAction = function () {
		$scope.messageMode = undefined;
		$scope.mainMessage = undefined;
        $scope.bookToZoom = undefined;
	};

	//init method
	$scope.init = function () {
		//get books from BookService
		BookService.getBooks().then(function (response) {
			$scope.books = angular.copy(response.data);
		});
		
		//get cart from CartService
		$scope.cart = CartService.getCart();
	};
	$scope.init();
	
	//Add or update a book to cart
	$scope.addBookToCart = function(isbn) {
		_.each($scope.books, function (book) {
			if(book.isbn === isbn) {
				if(book.nb > 0) {
					var bookToUpdate = _.find($scope.cart.items, function (item) {
						return item.isbn === isbn;
					});

					if(bookToUpdate != null){
						//update the number of the books in the cart
						bookToUpdate.nb += book.nb;

						//set a success message
						setMessage(CST.MESSAGE_MODE_SUCCESS, CST.MESSAGE_UPDATE_SUCCESS);
					} else {
						var bookToSet = angular.copy(book);
						bookToSet.cover = null;

						//push the book isbn into the cart
						$scope.cart.items.push(bookToSet);
						
						//set a success message
						setMessage(CST.MESSAGE_MODE_SUCCESS, CST.MESSAGE_ADD_SUCCESS);
					}

					//increment number of items in cart
					$scope.cart.nbItems += parseInt(book.nb);

					//increment total cart price
					$scope.cart.totalPrice += parseFloat(book.price) * parseInt(book.nb);

					//reset nb book
					book.nb = 0;
				} else {
					//set an error message
					setMessage(CST.MESSAGE_MODE_ERROR, CST.MESSAGE_ADD_ERROR_0);
				}
			}
		});
		
		//save the cart to local storage
		CartService.setCart($scope.cart);
	};

	//display the cart by a modal window
	$scope.viewCart = function () {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: "viewCart.html",
			controller: "CartController",
			size: "lg",
			resolve: {}
		});

		modalInstance.result.then(function (selectedItem) {
			
		}, function () {
			$log.info("cart closed");
		});
	};
	
	//set a message and open a popup to display it
	var setMessage = function (mode, msg) {
		resetModalAction();

		$scope.mainMessage = msg;
		$scope.messageMode = mode;

		var modalInstance = $uibModal.open({
			animation: true,
			scope: $scope,
			controller: "ModalController",
			templateUrl: "modalAction.html",
			size: "",
			resolve: {}
		});
	};
	
	//set a message at top of the page
	$scope.zoomCover = function (isbn) {
		resetModalAction();

		//get the book to zoom from its isbn
		$scope.bookToZoom = _.find($scope.books, function (book) {
			return book.isbn === isbn;
		});

		var modalInstance = $uibModal.open({
			animation: true,
			scope: $scope,
			controller: "ModalController",
			templateUrl: "modalAction.html",
			size: "",
			resolve: {}
		});
	}; 
})