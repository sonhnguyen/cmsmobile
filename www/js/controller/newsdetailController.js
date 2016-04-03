cms.controller('newsdetailController',
    ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', '$stateParams',
        'CakeService', '$ionicSlideBoxDelegate', '$ionicScrollDelegate',
        function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, $stateParams, CakeService, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
            $("#newdetailcard").hide();
			newsId = $stateParams['newsId'];
            $scope.zoomMin = 1;
			
            CakeService.getNewsById(newsId).then(
                function(data) {
                    var news = data;
                    $scope.myNews = news;
					$("#newsdetailsloader").hide();
					$("#newsdetailloader").hide();
					$("#newdetailcard").show();

                    $scope.dealContent = $scope.myNews.Content;
                    $scope.arrImages = $scope.myNews.Images;
					if(typeof($scope.arrImages) != "undefined")
					{
						//check if Images exist in data
						//exist
						for (var i =0; i< $scope.arrImages.length; i++)
						{
							var tmp = $scope.arrImages[i].toString();
							// $scope.dealContent = $scope.dealContent.replace("myimage"+i, "<img src='"+ tmp + "'>");
							$scope.dealContent = $scope.dealContent.replace("[image id=\""+i+"\"]", "<img src='"+ tmp + "' class=\"full-image\">");
						}
					}

                    //$scope.dealContent = $scope.dealContent.replace("\\n", "</br>");
                    // tmp = tmp.toString();
                    // var text = /[image id="0"]/gi;
                    
                    // tmp.replace("myimage0","tqduy");
                    // console.log(tmp);
                    // $scope.dealContent = tmp;

                }			
            )

            $scope.myFunction = function() {
				var str = document.getElementById("tqduy").innerHTML; 
				var texttoReplace = ""
				var res = str.replace("myimage0", "<img src='http://clipartsign.com/upload/2016/01/27/happy-face-clip-art-dr-odd.jpg'>");
				document.getElementById("tqduy").innerHTML = res;
			}
        }
    ]);
