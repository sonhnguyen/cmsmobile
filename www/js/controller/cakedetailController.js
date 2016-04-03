cms.controller('cakedetailController', ['$scope', '$state', '$ionicPopover', '$ionicPopup', '$ionicLoading', '$ionicModal', '$ionicHistory', '$stateParams',
    'CakeService', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', 'Auth',
    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, $stateParams, CakeService, $ionicSlideBoxDelegate, $ionicScrollDelegate, Auth, $cordovaSocialSharing) {
        $("#xdvloader").show();
        $("#cakedetailcard").hide();
        cakeId = $stateParams['cakeId'];
        $scope.zoomMin = 1;

        CakeService.getCakeById(cakeId).then(
            function(data) {

                var cake = data;
                $scope.myCake = cake;
                $scope.cakeDesc = $scope.myCake.Description;
                console.log($scope.myCake);
                if ($scope.myCake.Gallery) {
                    $scope.myCake.Gallery['newkey'] = $scope.myCake.Image;

                } else {
                    $scope.myCake.Gallery = {};
                    $scope.myCake.Gallery['newkey'] = $scope.myCake.Image;


                }
                console.log($scope.myCake);

                $("#cakedetailloader").hide();
                $("#xdvloader").hide();
                $("#cakedetailcard").show();
            }
        )

        $scope.addCakeFavorite = function() {

            if (!$scope.authData) {
                var alertFavoLogin = $ionicPopup.alert({ title: 'Chú ý', template: 'Hãy đăng nhập trước!' });
                return;
            }
            //check if cake exist cake.Favo


            //check if this user already add to cake.Favo
            var checkfavoexist = false;
            for (var i = 0; i < $scope.myCake.Favo.length; i++) {
                if ($scope.myCake.Favo[i] == $scope.authData.facebook.id) {
                    checkfavoexist = true;
                    break;
                }
            }
            if (checkfavoexist == false) {
                //add new Favo
                $scope.myCake.Favo.push($scope.authData.facebook.id);
                var arrFavo = $scope.myCake.Favo;
                CakeService.updateFavoCake(cakeId, arrFavo);
                console.log('finished');
                var alertLikeAlready = $ionicPopup.alert({ title: 'Thông báo', template: 'Thêm bánh vào yêu thích thành công!' });
                //set favo state in cake service change
                CakeService.setCakeCount(CakeService.getCakeCount() + 1);
            } else {
                //remove Favo
                for (var i = 0; i < $scope.myCake.Favo.length; i++) {
                    if ($scope.myCake.Favo[i] == $scope.authData.facebook.id) {
                        $scope.myCake.Favo.splice(i, 1);
                        //update new list to firebase
                        var arrFavo = $scope.myCake.Favo;
                        CakeService.updateFavoCake(cakeId, arrFavo);
                        //set favo state change
                        CakeService.setCakeCount(CakeService.getCakeCount() + 1);
                        break;
                    }
                }

                var alertLikeAlready = $ionicPopup.alert({ title: 'Thông báo', template: 'Xóa bánh khỏi yêu thích thành công!' });

            }
        }

        $scope.addCakeLike = function(cakeId) {
            if ($scope.authData) {
                console.log('already login');
            } else {
                console.log('not login');
                var alertLikeLogin = $ionicPopup.alert({ title: 'Chú ý', template: 'Hãy đăng nhập trước!' });
                return;
            }

            var tmpuid = $scope.authData.facebook.id;
            var checkedid = 0;
            for (var i = 0; i < $scope.myCake.Likes.length; i++) {
                if ($scope.myCake.Likes[i] == tmpuid) {
                    checkedid = 1;
                    break;
                }
            }
            if (checkedid == 1) {
                console.log('already in list like');
                
                var alertLikeAlready = $ionicPopup.alert({title: 'Thông báo', template: 'Đã trong danh sách Like!'});

            } else {
                $scope.myCake.Likes.push(tmpuid);
                var arrLikes = $scope.myCake.Likes;
                CakeService.updateLikesCake(cakeId, arrLikes);
                console.log('finished');
                var alertLikeAlready = $ionicPopup.alert({ title: 'Thông báo', template: 'Like bánh thành công!' });
                //set state is changed
                CakeService.setCakeCount(CakeService.getCakeCount() + 1);
            }

        }

        $scope.addCakeShare = function(cakeId) {
            if ($scope.authData) {
                console.log('already login');
            } else {
                console.log('not login');
                var alertShareLogin = $ionicPopup.alert({ title: 'Chú ý', template: 'Hãy đăng nhập trước!' });
                return;
            }

            var tmpuid = $scope.authData.facebook.id;
            var checkedid = 0;
            for (var i = 0; i < $scope.myCake.Shares.length; i++) {
                if ($scope.myCake.Shares[i] == tmpuid) {
                    checkedid = 1;
                    break;
                }
            }
            if (checkedid == 1) {
                console.log('already in list like');
              //  var alertShareAlready = $ionicPopup.alert({ title: 'Chú ý', template: 'Bạn đã share bánh! Bánh này vẫn được share lần nữa trên wall của bạn.' });

            } else {
                $scope.myCake.Shares.push(tmpuid);
                var arrShares = $scope.myCake.Shares;
                CakeService.updateSharesCake(cakeId, arrShares);
                console.log('finished');
            }
            //share message
            var sharemessage = 'Banh ' + $scope.myCake.Name + ' ngon qua';
            window.plugins.socialsharing.shareViaFacebook(
                sharemessage,
                null /* img */ ,
                null /* url */ ,
                function() { $ionicPopup.alert({ title: 'Thông báo', template: 'Chia sẽ Facebook thành công.' }) },
                function(errormsg) { $ionicPopup.alert({ title: 'Cảnh báo', template: 'Chia sẽ Facebook thất bại.' }) }
            );
            //set state is change
            CakeService.setCakeCount(CakeService.getCakeCount() + 1);
        };
        $scope.addtoCart = function(id, name, image, price) {
            var sl = Number(document.getElementById('detailsoluong').value);
            CakeService.setcartCakeList(id, name, sl, image, price);
            var quantityInput = document.getElementById('detailsoluong');
            quantityInput.value = '';

            $state.transitionTo('tab', {}, { reload: true });
        };

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
        };

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

			function fbSignIn() {

				Auth.authObj().$authWithOAuthRedirect("facebook").then(function(authData) {}).catch(function(error) {
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    Auth.authObj().$authWithOAuthPopup("facebook").then(function(authData) {
                        // User successfully logged in. We can log to the console
                        // since we’re using a popup here
                    });
                } else {
                    // Another error occurred
                }

				});
			};

			Auth.authObj().$onAuth(function(authData) {
				console.log("onauth cartinfo");
				if (authData) {
					console.log(authData);
					usersRef.child(authData.uid).update({
						Provider: authData.provider,
						Name: authData.facebook.displayName,
						Img: authData.facebook.profileImageURL,
						Token: authData.facebook.accessToken
					});
				}
				$scope.authData = authData; // This will display the user's name in our view


			});


      $scope.$watch(
        function() {
          return CakeService.getCakeCount();
        },
        function(newCount, oldCount) {
          CakeService.getCakeById(cakeId).then(
              function(data) {

                  var cake = data;
                  $scope.myCake = cake;
                  $scope.cakeDesc = $scope.myCake.Description;
                  console.log($scope.myCake);
                  if ($scope.myCake.Gallery) {
                      $scope.myCake.Gallery['newkey'] = $scope.myCake.Image;

                  } else {
                      $scope.myCake.Gallery = {};
                      $scope.myCake.Gallery['newkey'] = $scope.myCake.Image;


                  }
                  console.log($scope.myCake);

              }
          );
        }.true);


    }]);
