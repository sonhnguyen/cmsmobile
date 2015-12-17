cms.controller('mainControllers', ['$scope','$state','$ionicPopover','$ionicPopup','$ionicLoading','$ionicModal','$ionicHistory',function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory) {

$scope.viewMenu = function($event){
    $('#menuTab').addClass('active');
    $('#dealTab').removeClass('active');
    $('#newsTab').removeClass('active');
    $('#recipeTab').removeClass('active');
  };

$scope.viewDeal = function($event){
    $('#menuTab').removeClass('active');
    $('#dealTab').addClass('active');
    $('#newsTab').removeClass('active');
    $('#recipeTab').removeClass('active');
  };
  $scope.viewNews = function($event){
    $('#menuTab').removeClass('active');
    $('#dealTab').removeClass('active');
    $('#newsTab').addClass('active');
    $('#recipeTab').removeClass('active');
  };
  $scope.viewRecipe = function($event){
    $('#menuTab').removeClass('active');
    $('#dealTab').removeClass('active');
    $('#newsTab').removeClass('active');
    $('#recipeTab').addClass('active');
  };




}]);
