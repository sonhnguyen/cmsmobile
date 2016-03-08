cms.controller('cartInfoController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', 'CakeService', 'Auth',

    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, CakeService, Auth) {
        $scope.order = {};
        $scope.navigatedatePicker = function() {
            $state.go("tab.datepicker");
        }

        $scope.buyCart = function() {
            $scope.authData = Auth.authObj().$getAuth();
            $scope.order.user = $scope.authData.uid;
            $scope.order.cakeList = CakeService.getcartCakeList();
            var date = new Date($scope.order.date)
            var dateString = date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString();
            $scope.order.date = dateString;
            CakeService.addNewOrder($scope.order);
            console.log($scope.order);


            var alertPopup = $ionicPopup.alert({
                title: 'Đặt bánh',
                template: 'Đơn đặt bánh của bạn đã được ghi nhận. Chúng tôi sẽ liên lạc với bạn qua thông tin trên.'
            });
			
            alertPopup.then(function(res) {
                CakeService.deleteCartCakeList();
				//$state.go("tab.menu");
				document.location.href = 'index.html';
            });

        }
        $scope.cancelCart = function() {
            CakeService.deleteCartCakeList();
			document.location.href = 'index.html';
            //$state.go("tab.cart");
        };

        var isNewUser = true;

        Auth.authObj().$onAuth(function(authData) {
            console.log("onauth cartinfo");
            if (authData && isNewUser) {

                // save the user's profile into the database so we can list users,
                // use them in Security and Firebase Rules, and show profiles
                usersRef.child(authData.uid).set({
                    provider: authData.provider,
                    name: authData.facebook.displayName
                });
            }
            $scope.authData = authData; // This will display the user's name in our view
            if ($scope.authData) {
                console.log("authdata not null");
                $scope.order.userName = $scope.authData.facebook.displayName;
            } else {
                console.log("authdata null");
                $scope.order.userName = "";
            }

        });

    }


]);
