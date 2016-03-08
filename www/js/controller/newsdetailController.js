cms.controller('newsdetailController',
    ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', '$stateParams',
        'CakeService', '$ionicSlideBoxDelegate', '$ionicScrollDelegate',
        function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, $stateParams, CakeService, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
            newsId = $stateParams['newsId'];
            $scope.zoomMin = 1;
			
            CakeService.getNewsById(newsId).then(
                function(data) {
                    var news = data;
                    $scope.myNews = news;
					$("#xdvloader").hide();
                }
				
            )
        }
    ]);
