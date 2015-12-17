cms.controller('addNewsController', ['$scope','$state','$ionicPopover','$ionicPopup',
	'$ionicLoading','$ionicModal','$ionicHistory',
	function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory) {


$scope.backToNews = function()
{
	$state.go('news');
}

$scope.createNews = function(news)
{
	var fb = new Firebase("https://glowing-torch-2466.firebaseio.com/news")
	fb.push({ 'Abstract':'', 'Image': '', 'Title': news.title, 'Content': news.content })
	$state.go('news',{title: news.title, content: news.content },{reload:true});
}


}]);
