cms.controller('cartController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', 'CakeService', 'Auth',

    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, CakeService, Auth) {
        var listCake = CakeService.getcartCakeList();
        $scope.shouldShowDelete = true;
        var cartList = listCake;
        $scope.tongcong = 0;
        console.log(listCake);
        $scope.cakeDetail = function(cakeId) {
            console.log("go cake detail", cakeId);
            $state.go("tab.cakeDetail", {
                'cakeId': cakeId
            });
        }
        $scope.removefromCart = function(id) {
            CakeService.removecartCakeList(id);
            var check = CakeService.iscartCakeListNull();
            if (check === true)
            {
                 CakeService.settotalnotiSL(0);
            }

        }
        $scope.navigatecartInfo = function() {
                if (typeof listCake[0] !== 'undefined' && listCake[0] !== null) {
                    $state.go('tab.cartInfo');
                }
				else {
					var alertemptycart = $ionicPopup.alert({title: 'Chú ý', template: 'Bạn chưa thêm sản phẩm nào vào giỏ'});
				}
            }
            //watch when the array cake changes
        $scope.$watch(function() {

            return CakeService.getcartCakeList();

        }, function(newListCake, oldListCake) {
            console.log("cart page changes", newListCake);
            cartList = newListCake;
            $scope.tongcong = 0;
            for (var i = 0; i < newListCake.length; i++) {
                console.log(i);
                $scope.tongcong += newListCake[i].price * newListCake[i].sl;
                console.log($scope.tongcong);
            }

        }, true);

        $scope.fbSignIn = function() {
            console.log('hel');
			if(cartList.length == 0)
			{
				return;
			}
			/*
            var ref = new Firebase("https://glowing-torch-2466.firebaseio.com");
			ref.authWithOAuthPopup("facebook", function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
					var alertloginfailed = $ionicPopup.alert({title: 'Thông báo', template: 'Đăng nhập Facebook thất bại'});
				} else {
					console.log("Authenticated successfully with payload:", authData);
				}
			},{
				remember: "sessionOnly",
				scope: "email"
			}
			);*/
			
			Auth.authObj().$authWithOAuthRedirect("facebook").then(function(authData) {}).catch(function(error) {
                console.log(error.code);
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    Auth.authObj().$authWithOAuthPopup("facebook").then(function(authData) {
                                        console.log(error.code);

                        // User successfully logged in. We can log to the console
                        // since we’re using a popup here
                    });
                } else {
                                    console.log(error.code);

                    // Another error occurred
                }

            });
        };
        $scope.cartAddQuantity = function(myid, myname, myimage, myprice) {
            console.log(myid,myname, myimage, myprice);
            CakeService.setcartCakeList(myid, myname, 1, myimage, myprice);
        }
        $scope.cartRemoveQuantity = function(myid, myname, myimage, myprice) {

            CakeService.setcartCakeList(myid, myname, -1, myimage, myprice);
        }

        Auth.authObj().$onAuth(function(authData) {
            console.log("onauth cartinfo");
            if (authData) {
				console.log(authData)
                usersRef.child(authData.uid).update({
                    Provider: authData.provider,
                    Name: authData.facebook.displayName,
                    Img: authData.facebook.profileImageURL,
					Token: authData.facebook.accessToken
                });
            }
            $scope.authData = authData; // This will display the user's name in our view
        });


    }
]);
