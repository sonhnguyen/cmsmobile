cms.controller('newsController', ['$scope','$state','$ionicPopover','$ionicPopup',
  '$ionicLoading','$ionicModal','$ionicHistory',
  function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory) {

$scope.listnews = [
{title: 'Australia quyết tiếp tục do thám trên Biển Đông', content: 'Bộ Quốc phòng Australia ngày 17/12 tuyên bố nước này sẽ không nhượng bộ trước áp lực từ Trung Quốc và sẽ tiếp tục các chuyến tuần tra trên các đảo nhân tạo phi pháp ở Biển Đông.', like: 'Like'}
];

$ionicModal.fromTemplateUrl('view/addNewsPage.html', function(modal) {
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
  $scope.newsModal.show();
}

$scope.backToNews = function()
{
	$scope.newsModal.hide();
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
	$scope.showNewsModal.title = $scope.listnews[n]['title']
    $scope.showNewsModal.content = $scope.listnews[n]['content']
	$scope.showNewsModal.show();
}

}]);
