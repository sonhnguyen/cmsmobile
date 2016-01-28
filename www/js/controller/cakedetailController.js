cms.controller('cakedetailController', ['$scope','$state','$ionicPopover','$ionicPopup',
	'$ionicLoading','$ionicModal','$ionicHistory', '$stateParams', 'CakeService',
	function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory, $stateParams, CakeService) {
		cakeId = $stateParams['cakeId'];
		console.log(cakeId);
        CakeService.getCakeById(cakeId).then(
            function(data) {
                var cake = data;
				console.log(data);
            }
        )
	
	
		$scope.backtoMenu = function() {
			$state.go("menu");
		}



}]);
