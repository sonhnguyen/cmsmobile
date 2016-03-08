cms.factory('DataService2', function($q, $timeout) {

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
  '$ionicLoading','$ionicModal','$ionicHistory', 'CakeService', 
  function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory,CakeService) {
		$scope.listnews = [];
		CakeService.getNews().then(
            function(data) {
                $scope.listnews = data;
            }
    )
    $scope.navigateNewsDetail = function(newsId){
      console.log("go news detail", newsId);

      $state.go("tab.newsDetail", { 'newsId': newsId });
    }
/*$ionicModal.fromTemplateUrl('view/addNewsPage.html', function(modal) {
    $scope.newsModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

$ionicModal.fromTemplateUrl('view/showNewsPage.html', function(modal) {
    $scope.showNewsModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

$scope.createNews = function(news) {
    $scope.listnews.push({
      title: news.title,
      content: news.content,
      like: 'Like'
    });
    $scope.newsModal.hide();
    news.title = "";
    news.content = "";
    console.log($scope.listnews)
  };

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
}*/

}]);
