cms.controller('orderController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', 'CakeService', 'Auth',
    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, CakeService, Auth) {
        function currencyFormatDE(num) {
            return num
                .toFixed(0) // always two decimal digits
                .replace(".", ",") // replace decimal point character with ,
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " VNĐ" // use . as a separator
        }

        var orderList = [];
        $scope.filter = null;
        Auth.getOrderList().then(
            function(data) {
                orderList = data;
                $scope.data = {};
                $scope.data.columns = [
                    { "id": "DeliveryDateTime", "name": "Ngày giao" },
                    { "id": "Total", "name": "Tổng tiền" },
                    { "id": "Status", "name": "Trạng thái" }

                ];
                $scope.data.items = [];
                orderList.forEach(function(order) {
                    var order2 = {};
                    var Total = 0;

                    order.CakeList.forEach(function(cake) {
                        Total += cake.sl * cake.price;
                    });

                    var date = new Date(order.DeliveryDateTime);
                    order2.DeliveryDateTime = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

                    switch (order.Status) {
                        case 0:
                            order2.Status = "Chờ xác nhận";
                            break;
                        case 1:
                            order2.Status = "Đã xác nhận";
                            break;
                        case 2:
                            order2.Status = "Đang làm";
                            break;
                        case 3:
                            order2.Status = "Đang được giao";
                            break;
                        case 4:
                            order2.Status = "Đã nhận bánh";
                            break;
                        case 5:
                            order2.Status = "Đã huỷ";
                            break;
                    }
                    order2.Total = currencyFormatDE(Total);

                    $scope.data.items.push(order2);
                });
                console.log($scope.data);

            }
        )
    }
]);
