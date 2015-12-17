cms.controller('addRecipeController', ['$scope','$state','$ionicPopover','$ionicPopup',
	'$ionicLoading','$ionicModal','$ionicHistory',
	function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory) {


$scope.backToRecipe = function()
{
	$state.go('recipe');
}

$scope.createRecipe = function(recipe)
{
	var fb = new Firebase("https://glowing-torch-2466.firebaseio.com/recipe")
	fb.push({ 'Abstract':'', 'Image': '', 'Title': recipe.title, 'Content': recipe.content })
	$state.go('recipe',{title: recipe.title, content: recipe.content },{reload:true});
}


}]);
