cms
.factory('DataService3', function($q, $timeout) {

    var getCakes = function() {

        var deferred = $q.defer();
		var list =[];
		var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/');
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
        getCakes : getCakes
    }
})



.controller('menuController', ['$scope','$state','$ionicPopover','$ionicPopup',
	'$ionicLoading','$ionicModal','$ionicHistory', 'DataService3',
	function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory, DataService3) {
		$scope.cakes = [];
		DataService3.getCakes().then(
			function(data) {
				$scope.cakes = data;
			}
		)


 $scope.cakeDetail  = function() {
        $state.go("cakedetail");
    }
}]);
