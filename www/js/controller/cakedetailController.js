cms.controller('cakedetailController', ['$scope','$state','$ionicPopover','$ionicPopup',
	'$ionicLoading','$ionicModal','$ionicHistory',
	function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory) {


$scope.backtoMenu = function() {
        $state.go("menu");
    }





}]);
