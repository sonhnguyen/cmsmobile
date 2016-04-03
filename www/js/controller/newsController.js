cms.controller('newsController', ['$scope','$state','$ionicPopover','$ionicPopup',
  '$ionicLoading','$ionicModal','$ionicHistory', 'CakeService', 
  function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory,CakeService) {
	$scope.listnews = [];
	$("#newslist").hide();
	$("#newsemptydiv").hide();
	
	CakeService.getNews().then(
        function(data) {
            $scope.listnews = data;
			$("#newsloader").hide();
			$("#newssloader").hide();
			$("#newslist").show();
			
			if($scope.listnews.length == 0 || $scope.listnews == 'undefined')
			{
				$("#newslist").hide();
				$("#newsemptydiv").show();
			}
        }
    )
    $scope.navigateNewsDetail = function(newsId){
		console.log("go news detail", newsId);
		$state.go("tab.newsDetail", { 'newsId': newsId });
    }
	
	$scope.doRefresh = function() {
		var list =[];
		var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/news');
		ref.once("value", function(snapshot) {
			snapshot.forEach(function(snap){
				list.push(snap.val()); 
			});
			if (list.length == $scope.listnews.length)
			{
				//normal running
			}
			else
			{
				//reload again
				
				for(var i = 0; i < list.length; i++)
				{
					var checki = 0;
					for(var j = 0; j < $scope.listnews.length; j++)
					{
						if(list[i].title == $scope.listnews[j].title)
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
						$scope.listnews.unshift(list[i]);
					}
				}
				
			}
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$apply();
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
