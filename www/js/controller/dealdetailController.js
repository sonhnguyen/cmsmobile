cms.controller('dealdetailController',

    ['$scope', '$state', '$ionicPopover', '$ionicPopup',
        '$ionicLoading', '$ionicModal', '$ionicHistory', '$stateParams',
        'CakeService', '$ionicSlideBoxDelegate', '$ionicScrollDelegate',
        function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, $stateParams, CakeService, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
            dealId = $stateParams['dealId'];
            $scope.zoomMin = 1;

            CakeService.getDealByID(dealId).then(
                function(data) {
                    var deal = data;
                    $scope.myDeal = deal;
                    $scope.dealAbstract = $scope.myDeal.Abstract;
                    $scope.dealContent = $scope.myDeal.Content;
                    
                    $scope.dealImage= $scope.myDeal.Image;
                    
                    
                }
            )
        //     $scope.addtoCart = function(id,name,image,price){
        //     var sl = Number(document.getElementById('detailsoluong').value);
        //     if (sl <= 0){
        //         var person = prompt("Vui lòng nhập số lượng bánh muốn đặt:", "");
        //         if (person != null) {
        //             CakeService.setcartCakeList(id,name,person,image,price);
        //         }
        //     }
        //     else{
        //         CakeService.setcartCakeList(id,name,sl,image,price);
        //     }
        //     //CakeService.setcartCakeList(id,name,sl,image,price);
        // }
            // $scope.showImages = function(index, parentIndex) {
            //     $scope.activeSlide = index;
            //     console.log(index);
            //     $scope.eventImg = $scope.myCake.Gallery;
            //     console.log("event img", $scope.eventImg);
            //     $scope.showModal('view/template/gallery-zoomview.html');
            // };

            // $scope.showModal = function(templateUrl) {
            //     $ionicModal.fromTemplateUrl(templateUrl, {
            //         scope: $scope,
            //         backdropClickToClose: true

            //     }).then(function(modal) {
            //         $scope.modal = modal;
            //         $scope.modal.show();
            //     });
            // }

            // $scope.closeModal = function() {
            //     $scope.modal.hide();
            //     $scope.modal.remove()
            // };

            // $scope.updateSlideStatus = function(slide) {
            //     var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
            //     if (zoomFactor == $scope.zoomMin) {
            //         $ionicSlideBoxDelegate.enableSlide(true);
            //     } else {
            //         $ionicSlideBoxDelegate.enableSlide(false);
            //     }
            // };


        }
    ]);
