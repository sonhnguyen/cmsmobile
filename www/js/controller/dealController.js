cms

.controller('dealController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', 'CakeService',
    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, CakeService) {
        $("#deallist").hide();
		$("#dealemptydiv").hide();
		CakeService.getDeals().then(
            function(data) {
                $scope.deals = data;
				$("#dealloader").hide();
				$("#dealsloader").hide();
				$("#deallist").show();
				if($scope.deals.length == 0 || $scope.deals == 'undefined')
				{
					$("#deallist").hide();
					$("#dealemptydiv").show();
				}
            }
        )

		$scope.dealDetail = function(dealId) {
			console.log("go deal detail",dealId);
			$state.go("tab.dealDetail",{'dealId': dealId});
		}

		$scope.doRefresh = function() {
			var list = [];
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/deals/');
            ref.on("value", function(snapshot) {
                snapshot.forEach(function(snap) {
                    var mydeal = snap.val();
                    mydeal.Key = snap.key();
                    list.push(mydeal);
                });
				if (list.length == $scope.deals.length)
				{
					//normal running
				}
				else
				{
					//reload again
					for(var i = 0; i < list.length; i++)
					{
						var checki = 0;
						for(var j = 0; j < $scope.deals.length; j++)
						{
							if(list[i].Key == $scope.deals[j].Key)
							{
								checki = 1;
								break;
							}
						}
						if(checki == 0)
						{
							//exist, continue
						}
						else
						{
							//add news
							$scope.deals.unshift(list[i]);
						}
					}
				}
            },function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
			
			
			$scope.$broadcast('scroll.refreshComplete');
			$scope.$apply();
		}

    }
]);
