cms.controller('tabController', ['$scope', '$state', '$ionicPopover', '$ionicPopup', '$ionicLoading',
    '$ionicModal', '$ionicHistory', 'Auth', 'CakeService',
    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, Auth, CakeService, $cordovaSocialSharing) {
        $scope.userName = "";
        $scope.avatar = "";


		Auth.authObj().$onAuth(function(authData) {
            var authData = Auth.authObj().$getAuth();
            console.log(authData);
            if (authData) {
				//console.log(authData);
                usersRef.child(authData.uid).update({
                    Provider: authData.provider,
                    Name: authData.facebook.displayName,
                    Img: authData.facebook.profileImageURL,
					Token: authData.facebook.accessToken
                });
                $scope.userName = authData.facebook.displayName;
                $scope.avatar = authData.facebook.profileImageURL;
                $scope.authData = authData;
            }
            //alert(authData);
            //alert($scope.authData);
        });

        $scope.$watch(function() {

            return CakeService.getcartCakeList();

        }, function(newListCake, oldListCake) {
            console.log("cart page changes", newListCake);
            $scope.cartList = newListCake;

            if (newListCake !== oldListCake) {

                $scope.showtotalnotiSL = CakeService.gettotalnotiSL();
                if ($scope.showtotalnotiSL >= 10)
                    $scope.showtotalnotiSL = "9+";
            }


        }, true);


        $scope.logOut = function() {
            Auth.authObj().$unauth();
            $scope.userName = "";
            $scope.avatar = "";
            console.log("logout", $scope.userName, Auth.authObj().$getAuth());
            $scope.authData = null;
			$state.go('tab.menu');
        };

		$scope.logIn = function() {
			fbSignIn();
		}

        $scope.goToOrder = function() {
            $state.go('tab.order');
        }

        $scope.sendMail = function() {
            $state.go('tab.feedback');
        }

		$scope.shareApp = function() {

                                 /*  Share via native dialog   */
      window.plugins.socialsharing.shareViaFacebook(
        'CapXanhCake app',
        null /* img */,
        null /* url */,
        function() {$ionicPopup.alert({title: 'Thông báo', template: 'Chia sẽ thành công'})},
        function(errormsg){$ionicPopup.alert({title: 'Cảnh báo', template: 'Chia sẽ qua Facebook thất bại.'})}
      )

      /*    Share via mail native
        window.plugins.socialsharing.shareViaEmail(
        'Message', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
        'Subject',
        ['to@person1.com', 'to@person2.com'], // TO: must be null or an array
        ['cc@person1.com'], // CC: must be null or an array
        null, // BCC: must be null or an array
        null, // FILES: can be null, a string, or an array
        function(onSuccess){$ionicPopup.alert({title: 'Note', template: 'success ')}}, // called when sharing worked, but also when the user cancelled sharing via email (I've found no way to detect the difference)
        function(Error){$ionicPopup.alert({title: 'Warning', template: 'failed share.')}} // called when sh*t hits the fan
      );*/
		};

		// Defaults to sessionStorage for storing the Facebook token
		//appId: 1709879085956214 or 153713748346996

		function fbSignIn() {
			/*
            var ref = new Firebase("https://glowing-torch-2466.firebaseio.com");
			ref.authWithOAuthPopup("facebook", function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
					$ionicPopup.alert({title: 'Cảnh báo', template: 'Đăng nhập Facebook thất bại.'})
				} else {
					console.log("Authenticated successfully with payload:", authData);
				}
			},{
				remember: "sessionOnly",
				scope: "email"
			}
			);*/
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

	}]);
