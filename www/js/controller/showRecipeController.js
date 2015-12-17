cms.controller('showRecipeController', ['$scope','$stateParams','$state','$ionicPopover','$ionicPopup',
	'$ionicLoading','$ionicModal','$ionicHistory',
	function ($scope,$stateParams,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory) {

$scope.title = $stateParams.title;
$scope.content = $stateParams.content;
$scope.backToNews = function()
{
	$state.go('recipe')
}
}]);
