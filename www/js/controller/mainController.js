cms.controller('mainController', ['$scope', '$state', '$ionicPopover', '$ionicPopup', '$ionicLoading', '$ionicModal', '$ionicHistory', function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory) {

    $scope.viewMenu = function($event) {

        $('#menuTab').addClass('active');
        $('#dealTab').removeClass('active');
        $('#newsTab').removeClass('active');
        $('#recipeTab').removeClass('active');
        $('#cartTab').removeClass('active');


    };

    $scope.viewDeal = function($event) {
        $('#menuTab').removeClass('active');
        $('#dealTab').addClass('active');
        $('#newsTab').removeClass('active');
        $('#recipeTab').removeClass('active');
        $('#cartTab').removeClass('active');
        console.log("view deal");
    };
    $scope.viewNews = function($event) {
        $('#menuTab').removeClass('active');
        $('#dealTab').removeClass('active');
        $('#newsTab').addClass('active');
        $('#recipeTab').removeClass('active');
        $('#cartTab').removeClass('active');

    };
    $scope.viewRecipe = function($event) {
        $('#menuTab').removeClass('active');
        $('#dealTab').removeClass('active');
        $('#newsTab').removeClass('active');
        $('#recipeTab').addClass('active');
        $('#cartTab').removeClass('active');

    };
    $scope.viewCart = function($event) {
        $('#menuTab').removeClass('active');
        $('#dealTab').removeClass('active');
        $('#newsTab').removeClass('active');
        $('#recipeTab').removeClass('active');
        $('#cartTab').addClass('active');

    };
    $scope.viewSideInfo = function($event){
        $('#InfoSideTab').addClass('active');
        $('#CartSideTab').removeClass('active');
    };

    $scope.viewSideOrder = function($event){
        $('#InfoSideTab').removeClass('active');
        $('#CartSideTab').addClass('active');
    }



}]);
