cms
.factory('DataService2', function($q, $timeout) {

    var getNews = function() {

        var deferred = $q.defer();
		var list =[];
		var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/news');
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
        getNews : getNews
    }
})


.controller('newsController', ['$scope','$state','$ionicPopover','$ionicPopup',
  '$ionicLoading','$ionicModal','$ionicHistory', 'DataService2', 
  function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory, DataService2) {
		$scope.listnews = [];
		DataService2.getNews().then(
			function(news) {
				$scope.listnews = news;
        console.log(news);
			}
		)
$scope.addNews = function()
{
  $state.go('addNews')
}

$scope.share= function()
{
	console.log("Share");
}

$scope.like = function(n)
{
	console.log("Like");
	if($scope.listnews[n]['like'] == 'Like')
		$scope.listnews[n]['like'] = 'Unlike';
	else
		$scope.listnews[n]['like'] = 'Like';
}

$scope.showNews = function(n)
{
	//$scope.showNewsModal.title = $scope.listnews[n]['title']
  //$scope.showNewsModal.content = $scope.listnews[n]['content']
	//$scope.showNewsModal.show();
  $state.go('showNews',{title:$scope.listnews[n]['Title'], content:$scope.listnews[n]['Content']});
}

}]);
