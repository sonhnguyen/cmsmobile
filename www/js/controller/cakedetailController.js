cms.controller('cakedetailController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', '$stateParams', 'CakeService',
    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, $stateParams, CakeService) {
        cakeId = $stateParams['cakeId'];
        console.log(cakeId);

        CakeService.getCakeById(cakeId).then(
            function(data) {
                var cake = data;
                $scope.myCake = cake;
                console.log(cake);
            }
        )
        $scope.showImages = function(index, parentIndex) {
            $scope.activeSlide = index;
            console.log(index);
            $scope.eventImg = $scope.myCake.Gallery;
            console.log($scope.myCake.Gallery);
            $scope.showModal('view/template/gallery-zoomview.html');
        };

        $scope.showModal = function(templateUrl) {
            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: $scope,
                backdropClickToClose: true

            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
            $scope.modal.remove()
        };

        $scope.updateSlideStatus = function(slide) {
            var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
            if (zoomFactor == $scope.zoomMin) {
                $ionicSlideBoxDelegate.enableSlide(true);
            } else {
                $ionicSlideBoxDelegate.enableSlide(false);
            }
        };


    }
]);
