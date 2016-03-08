cms.controller('cakedetailController',

    ['$scope', '$state', '$ionicPopover', '$ionicPopup',
        '$ionicLoading', '$ionicModal', '$ionicHistory', '$stateParams',
        'CakeService', '$ionicSlideBoxDelegate', '$ionicScrollDelegate',
        function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, $stateParams, CakeService, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
            cakeId = $stateParams['cakeId'];
            $scope.zoomMin = 1;
			
            CakeService.getCakeById(cakeId).then(
                function(data) {
					
                    var cake = data;
                    $scope.myCake = cake;
                    $scope.cakeDesc = $scope.myCake.Description;
                    $scope.images = [];
                    $scope.images.push($scope.myCake.Gallery);
                    $scope.images.push($scope.myCake.Image);
                    console.log($scope.myCake);
                    $scope.myCake.Gallery['newkey'] = $scope.myCake.Image;
					$("#xdvloader").hide();
                }
				
				
            )
            $scope.addtoCart = function(id, name, image, price) {
                var sl = Number(document.getElementById('detailsoluong').value);
                CakeService.setcartCakeList(id, name, sl, image, price);
            }
            $scope.showImages = function(index, parentIndex) {
                $scope.activeSlide = index;
                console.log(index);
                $scope.eventImg = $scope.myCake.Gallery;
                console.log("event img", $scope.eventImg);
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
