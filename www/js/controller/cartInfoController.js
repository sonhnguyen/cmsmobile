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
            $scope.order.date = date.getTime();
            if($scope.order.date === "" || $scope.order.tel === undefined || $scope.order.addr === undefined)
            {
                var warningemptyInput = $ionicPopup.alert(
                    {
                        title: 'Cảnh báo',
                        template: 'Bạn chưa điền đầy đủ thông tin'
                    }
                );   
            }
            console.log($scope.order);

            CakeService.addNewOrder($scope.order);


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

        Auth.authObj().$onAuth(function(authData) {
            console.log("onauth cartinfo");
            $scope.authData = authData; // This will display the user's name in our view
            if ($scope.authData) {
                Auth.getUser(authData.uid).then(function(data) {
                    console.log(data);
                    $scope.order.userName = data.Name;
                    $scope.order.addr = data.Address;
                    $scope.order.tel = data.PhoneNumber;

                })
            }

        });

    }


]);
