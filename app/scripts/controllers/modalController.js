appModule.controller('ModalController', function ($rootScope, $scope, $uibModalInstance, $log, CartService, OfferService, CST, $filter, BookService) {
    "use strict";

    $scope.closeModal = function () {
       $uibModalInstance.dismiss('cancel');
    };
    
    
})