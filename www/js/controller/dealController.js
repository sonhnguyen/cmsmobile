cms
.factory('DataService1', function($q, $timeout) {

    var getDeals = function() {

        var deferred = $q.defer();
		var list =[];
		var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/deals/');
		ref.once("value", function(snapshot) {
		  snapshot.forEach(function(snap){
			 list.push(snap.val()); 
		  });
		  deferred.resolve(list);
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
        return deferred.promise;
    };

    return {
        getDeals : getDeals
    }
})
.controller('dealController', ['$scope','$state','$ionicPopover','$ionicPopup',
	'$ionicLoading','$ionicModal','$ionicHistory', 'DataService1',
	function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory, DataService1) {
		$scope.items = [];
		DataService1.getDeals().then(
			function(deals) {
				$scope.items = deals;
			}
		)
}]);
