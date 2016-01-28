cms.controller('cakedetailController', ['$scope','$state','$ionicPopover','$ionicPopup',
	'$ionicLoading','$ionicModal','$ionicHistory', '$stateParams', 'CakeService',
	function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory, $stateParams, CakeService) {
		cakeId = $stateParams['cakeId'];
		console.log(cakeId);
        
        CakeService.getCakeById(cakeId).then(
            function(data) {
                var cake = data;
				$scope.myCake = cake;
    			console.log(cake);
            }
        )

}]);
