cms.controller('addNewsController', ['$scope','$state','$ionicPopover','$ionicPopup',
	'$ionicLoading','$ionicModal','$ionicHistory',
	function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory) {


$scope.backToNews = function()
{
	$state.go('news');
}





}]);
