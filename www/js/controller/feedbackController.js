cms.controller('feedBackController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', 'CakeService', 'Auth', 'CakeService',
    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, $cordovaEmailComposer, $cordovaSocialSharing, CakeService) {
		$scope.feedback = {};
	   $("#feedbackhiddencard").hide();
     $("#feedbackhiddencard2").hide();
     $("#feedbackhiddencard3").hide();
		$scope.resetFeed = function(){
      //alert("in reset feedback");
			document.getElementById("myForm").reset();
			$state.go("tab.menu");
		}

		$scope.sendFeed = function(){
      //alert("in sendFeed");
			CakeService.addNewFeedback($scope.feedback);
			$state.go("tab.menu");
		}


	}
]);
