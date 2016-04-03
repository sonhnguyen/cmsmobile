cms
    .factory('DataService', function($q, $timeout) {

        var getRecipes = function() {

            var deferred = $q.defer();
            var list = [];
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/recipe/');
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(snap) {
                    var recipe = snap.val();
                    recipe.Key = snap.key();
                    list.push(recipe);
                });
                deferred.resolve(list);
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        };

        return {
            getRecipes: getRecipes
        }
    })
    .controller('recipeController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
        '$ionicLoading', '$ionicModal', '$ionicHistory', 'DataService',
        function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, DataService) {
            $("#recipelist").hide();
			$("#recipeemptydiv").hide();
            $scope.recipes = [];
            DataService.getRecipes().then(
                function(recipes) {
                    $scope.recipes = recipes;
                    $("#recipesloader").hide();
                    $("#recipeloader").hide();
                    $("#recipelist").show();
					if ($scope.recipes.length == 0 || $scope.recipe == 'undefined')
					{
						$("#recipeemptydiv").show();
						$("#recipelist").hide();
					}
                }
            )
            $scope.navigateRecipeDetail = function(recipeId) {

                    console.log("go recipe detail", recipeId);
                    $state.go("tab.recipeDetail", { 'recipeId': recipeId });
                }
                // $scope.addRecipe = function()
                // {
                //   $state.go('addRecipe')
                // }
                // $scope.share= function()
                // {
                //   console.log("Share");
                // }

            // $scope.like = function(n)
            // {
            //   console.log("Like");
            //   if($scope.recipes[n]['like'] == 'Like')
            //     $scope.recipes[n]['like'] = 'Unlike';
            //   else
            //     $scope.recipes[n]['like'] = 'Like';
            // }

            // $scope.showRecipe = function(n)
            // {
            //   //$scope.showNewsModal.title = $scope.listnews[n]['title']
            //   //$scope.showNewsModal.content = $scope.listnews[n]['content']
            //   //$scope.showNewsModal.show();
            //   $state.go('showRecipe',{title:$scope.recipes[n]['Title'], content:$scope.recipes[n]['Content']});
            // }
            $scope.doRefresh = function() {
                var list = [];
                var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/recipe/');
                ref.on("value", function(snapshot) {
                    snapshot.forEach(function(snap) {
                        list.push(snap.val());
                    });
                    if (list.length == $scope.recipes.length) {
                        //normal running
                    } else {
                        //reload again
                        //document.location.href="index.html";
                        for (var i = 0; i < list.length; i++) {
                            var checki = 0;
                            for (var j = 0; j < $scope.recipes.length; j++) {
                                if (list[i].Title == $scope.recipes[j].Title) {
                                    checki = 1;
                                    break;
                                }
                            }
                            if (checki == 0) {
                                //exist, continue
                            } else {
                                //add cake
                                $scope.recipes.unshift(list[i]);
                            }
                        }
                    }
                }, function(errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });


                $scope.$broadcast('scroll.refreshComplete');
                $scope.$apply();
            }
            $scope.addRecipe = function() {
                $state.go('addRecipe')
            }
            $scope.share = function() {
                console.log("Share");
            }
            $scope.like = function(n) {
                console.log("Like");
                if ($scope.recipes[n]['like'] == 'Like')
                    $scope.recipes[n]['like'] = 'Unlike';
                else
                    $scope.recipes[n]['like'] = 'Like';
            }

            $scope.showRecipe = function(n) {
                //$scope.showNewsModal.title = $scope.listnews[n]['title']
                //$scope.showNewsModal.content = $scope.listnews[n]['content']
                //$scope.showNewsModal.show();
                $state.go('showRecipe', { title: $scope.recipes[n]['Title'], content: $scope.recipes[n]['Content'] });
            }
        }
    ]);
