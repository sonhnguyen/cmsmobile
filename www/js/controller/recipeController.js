cms
.factory('DataService', function($q, $timeout) {

    var getRecipes = function() {

        var deferred = $q.defer();
		var list =[];
		var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/recipe/');
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
$scope.addRecipe = function()
{
  $state.go('addRecipe')
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

$scope.showRecipe = function(n)
{
  //$scope.showNewsModal.title = $scope.listnews[n]['title']
  //$scope.showNewsModal.content = $scope.listnews[n]['content']
  //$scope.showNewsModal.show();
  $state.go('showReipce',{title:$scope.recipes[n]['Title'], content:$scope.recipes[n]['Content']});
}

}]);
