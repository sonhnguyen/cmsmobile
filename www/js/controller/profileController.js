cms.controller('profileController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
'$ionicLoading', '$ionicModal', '$ionicHistory', 'CakeService', 'Auth',
function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, CakeService, Auth) {
    $scope.profile = {};

    var authData = Auth.authObj().$getAuth();
    console.log(Auth.getUser(authData.uid));
    if (authData) {
        Auth.getUser(authData.uid).then(function(data){
        	$scope.profile=data;
        })
    }

    $scope.updateProfile = function(){
    	Auth.updateUser($scope.profile);
            var alertPopup = $ionicPopup.alert({
                title: 'Thông tin cá nhân',
                template: 'Thông tin cá nhân của bạn đã được cập nhật.'
            });
    }


}]);
