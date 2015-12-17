cms
.factory('DataService', function($q, $timeout) {

    var getRecipes = function() {

        var deferred = $q.defer();
		var list =[];
		var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/recipe/');
		ref.on("value", function(snapshot) {
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
        getRecipes : getRecipes
    }
})
.controller('recipeController', ['$scope','$state','$ionicPopover','$ionicPopup',
  '$ionicLoading','$ionicModal','$ionicHistory', 'DataService',
  function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory, DataService) {
		$scope.recipes = [];
		DataService.getRecipes().then(
			function(recipes) {
				$scope.recipes = recipes;
			}
		)
$ionicModal.fromTemplateUrl('view/addRecipePage.html', function(modal) {
    $scope.recipeModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

$scope.createRecipe = function(recipe) {
    $scope.recipes.push({
      title: recipe.title,
      content: recipe.content,
      like: 'Like'
    });
    $scope.recipeModal.hide();
    recipe.title = "";
    recipe.content = "";
  };

$scope.addRecipe = function()
{
  $scope.recipeModal.show();
}

$scope.backToRecipe = function()
{
	$scope.recipeModal.hide();
}

$scope.share= function()
{
	console.log("Share");
}

$scope.like = function(n)
{
	console.log("Like");
	if($scope.recipes[n]['like'] == 'Like')
		$scope.recipes[n]['like'] = 'Unlike';
	else
		$scope.recipes[n]['like'] = 'Like';
}



}]);
