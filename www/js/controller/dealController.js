cms

.controller('dealController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', 'CakeService',
    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, CakeService) {
        CakeService.getDeals().then(
            function(data) {
                $scope.deals = data;
            }
        )

     $scope.dealDetail = function(dealId) {
        console.log("go deal detail",dealId);
        $state.go("tab.dealDetail",{'dealId': dealId});
    }



    }
]);
