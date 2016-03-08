cms.controller('cartController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', 'CakeService', 'Auth',

    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, CakeService, Auth) {
        var listCake = CakeService.getcartCakeList();
        $scope.shouldShowDelete = true;
        $scope.cartList = listCake;
        console.log(listCake);
        $scope.cakeDetail = function(cakeId) {
            console.log("go cake detail", cakeId);
            $state.go("tab.cakeDetail", {
                'cakeId': cakeId
            });
        }
        $scope.removefromCart = function(id) {
            CakeService.removecartCakeList(id);
        }
        $scope.navigatecartInfo = function() {
				if (typeof listCake[0] !== 'undefined' && listCake[0] !== null) {
					$state.go('tab.cartInfo');
				}
            }
            //watch when the array cake changes
        $scope.$watch(function() {

            return CakeService.getcartCakeList();

        }, function(newListCake, oldListCake) {
            console.log("cart page changes", newListCake);
            $scope.cartList = newListCake;
            if (newListCake !== oldListCake) {
                $scope.tongcong = 0;
                for (var i = 0; i < newListCake.length; i++) {
                    console.log(i);
                    $scope.tongcong += newListCake[i].price * newListCake[i].sl;
                }
            }

        }, true);

        $scope.fbSignIn = function() {
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

                // save the user's profile into the database so we can list users,
                // use them in Security and Firebase Rules, and show profiles
                usersRef.child(authData.uid).set({
                    provider: authData.provider,
                    name: authData.facebook.displayName
                });
            }
            $scope.authData = authData; // This will display the user's name in our view

        });





        // find a suitable name based on the meta info given by each provider


        /*
        var fbLoginSuccess = function(response) {
            if (!response.authResponse) {
                fbLoginError("Cannot find the authResponse");
                return;
            }

            var authResponse = response.authResponse;

            getFacebookProfileInfo(authResponse)
                .then(function(profileInfo) {
                    // For the purpose of this example I will store user data on local storage
                    CakeService.setUser({
                        authResponse: authResponse,
                        userID: profileInfo.id,
                        name: profileInfo.name,
                        email: profileInfo.email,
                        picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
                    });
                    $ionicLoading.hide();
                    $state.go('app.home');
                }, function(fail) {
                    // Fail get profile info
                    console.log('profile info fail', fail);
                });
        };

        // This is the fail callback from the login method
        var fbLoginError = function(error) {
            console.log('fbLoginError', error);
            $ionicLoading.hide();
        };

        // This method is to get the user profile info from the facebook api
        var getFacebookProfileInfo = function(authResponse) {
            var info = $q.defer();

            facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
                function(response) {
                    console.log(response);
                    info.resolve(response);
                },
                function(response) {
                    console.log(response);
                    info.reject(response);
                }
            );
            return info.promise;
        };

        //This method is executed when the user press the "Login with facebook" button
        $scope.facebookSignIn = function() {

            facebookConnectPlugin.getLoginStatus(function(success) {
                if (success.status === 'connected') {
                    // The user is logged in and has authenticated your app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed request, and the time the access token
                    // and signed request each expire
                    console.log('getLoginStatus', success.status);

                    // Check if we have our user saved
                    var user = CakeService.getUser('facebook');

                    if (!user.userID) {
                        getFacebookProfileInfo(success.authResponse)
                            .then(function(profileInfo) {
                                // For the purpose of this example I will store user data on local storage
                                CakeService.setUser({
                                    authResponse: success.authResponse,
                                    userID: profileInfo.id,
                                    name: profileInfo.name,
                                    email: profileInfo.email,
                                    picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
                                });

                                $state.go('app.home');
                            }, function(fail) {
                                // Fail get profile info
                                console.log('profile info fail', fail);
                            });
                    } else {
                        $state.go('app.home');
                    }
                } else {
                    // If (success.status === 'not_authorized') the user is logged in to Facebook,
                    // but has not authenticated your app
                    // Else the person is not logged into Facebook,
                    // so we're not sure if they are logged into this app or not.

                    console.log('getLoginStatus', success.status);

                    $ionicLoading.show({
                        template: 'Logging in...'
                    });

                    // Ask the permissions you need. You can learn more about
                    // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                    facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
                }
            })
        };

        */


    }
]);
