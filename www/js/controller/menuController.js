cms

.controller('menuController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', 'CakeService',
    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, CakeService) {
        $scope.cakes = [];
        $scope.filteredCakes = [];
        CakeService.getCakes().then(
            function(data) {
                $scope.cakes = data;
                $scope.filteredCakes = data;
            }
        )

        $scope.cakeDetail = function(cakeId) {
            console.log("go cake detail",cakeId);
            $state.go("tab.cakeDetail",{'cakeId': cakeId});
        }

        $scope.filterThisWeek = function() {
            $('#tab-all').removeClass('active');
            $('#tab-week').addClass('active');
            $('#tab-today').removeClass('active');
            $('#tab-hot').removeClass('active');

            $scope.filteredCakes = [];
            $scope.cakes.forEach(function(cake) {
                console.log(cake);
                var FromDate, ToDate;
                var currentDate = new Date();
                if (cake.AvailableDays.FromDate) {
                    var datePart = cake.AvailableDays.FromDate.split(/[^0-9]+/);
                    FromDate = new Date(datePart[2], datePart[1] - 1, datePart[0]);
                } else {
                    FromDate = 0;
                }
                if (cake.AvailableDays.ToDate) {
                    var datePart = cake.AvailableDays.ToDate.split(/[^0-9]+/);
                    ToDate = new Date(datePart[2], datePart[1] - 1, datePart[0]);
                } else {
                    ToDate = 0;
                }

                if (((FromDate == 0) && (ToDate == 0)) || ((FromDate < currentDate) && (currentDate < ToDate))) {
                    $scope.filteredCakes.push(cake);
                }

            });
            console.log($scope.filteredCakes);
        }
        $scope.filterAll = function() {
            $('#tab-all').addClass('active');
            $('#tab-week').removeClass('active');
            $('#tab-today').removeClass('active');
            $('#tab-hot').removeClass('active');

            $scope.filteredCakes = [];
            $scope.filteredCakes = $scope.cakes;
        }
        $scope.filterToday = function() {
            $('#tab-all').removeClass('active');
            $('#tab-week').removeClass('active');
            $('#tab-today').addClass('active');
            $('#tab-hot').removeClass('active');
            $scope.filteredCakes = [];
            $scope.cakes.forEach(function(cake) {
                var cakeDay = cake.AvailableDays.WeekDays;
                var currentDate = new Date();
                var currentDay = currentDate.getDay();
                if (cakeDay) {
                    if ((cake.AvailableDays.WeekDays.indexOf(currentDay)) != -1) {
                        $scope.filteredCakes.push(cake);
                    }
                } else {
                    $scope.filteredCakes.push(cake);
                }

            });
            console.log($scope.filteredCakes);
        }
        $scope.filterHot = function() {
            $('#tab-all').removeClass('active');
            $('#tab-week').removeClass('active');
            $('#tab-today').removeClass('active');
            $('#tab-hot').addClass('active');
            $scope.filteredCakes = [];
            $scope.cakes.forEach(function(cake) {
                if (cake.IsHot) {
                    $scope.filteredCakes.push(cake);
                }
            });
            console.log($scope.filteredCakes);
        }


    }
]);
