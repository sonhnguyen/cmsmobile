cms.controller('tabController', ['$scope', '$state', '$ionicPopover', '$ionicPopup', '$ionicLoading',
    '$ionicModal', '$ionicHistory', 'Auth',
    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, Auth) {
        $scope.userName = "";
        $scope.avatar = "";

        Auth.authObj().$onAuth(function(authData) {
                            console.log("onauth tab");

            var authData = Auth.authObj().$getAuth();
            console.log(authData);
            if (authData) {
                $scope.userName = authData.facebook.displayName;
                $scope.avatar = authData.facebook.profileImageURL;

            }
        });


        $scope.logOut = function() {
            Auth.authObj().$unauth();
            $scope.userName = "";
            $scope.avatar = "";
            console.log("logout", $scope.userName,Auth.authObj().$getAuth());

        };



    }
]);
