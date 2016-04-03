cms.controller('recipedetailController',
    ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', '$stateParams',
        'CakeService', '$ionicSlideBoxDelegate', '$ionicScrollDelegate',
        function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, $stateParams, CakeService, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
            
			$("#recipedetailcard").hide();
			recipeId = $stateParams['recipeId'];
            $scope.zoomMin = 1;
            console.log(recipeId);
            CakeService.getRecipeById(recipeId).then(
				
                function(data) {
                    var recipe = data;
                    $scope.myRecipe = recipe;
					
                    $scope.recipeContent = $scope.myRecipe.Content;
                    $scope.arrImages = $scope.myRecipe.Images;
					if(typeof($scope.arrImages) != "undefined")
					{
						//check if Images exist in data
						//exist
						for (var i =0;i< $scope.arrImages.length;i++)
						{
							var tmp = $scope.arrImages[i].toString();
							// $scope.dealContent = $scope.dealContent.replace("myimage"+i, "<img src='"+ tmp + "'>");
							$scope.recipeContent = $scope.recipeContent.replace("[image id=\""+i+"\"]", "<img class=\"full-image\" src='"+ tmp + "'>");
						}
					}
					//Images does not exist in data

                    $scope.recipeContent = $scope.recipeContent.replace("\\n", "</br>");
                    $("#recipedetailloader").hide();

					$("#recipedetailsloader").hide();
					$("#recipedetailcard").show();
                }
                
            )
        }
    ]);
