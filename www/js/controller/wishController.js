cms
    .controller('wishController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', 'CakeService', 'Auth',
    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, CakeService, Auth) {
        $scope.cakes = [];
        $scope.filteredCakes = [];
		$("#wishcard").hide();
		//$("#wishemptydiv").hide();
    $("#wishhiddencard").hide();
    $("#wishhiddencard2").hide();
    $("#wishhiddencard3").hide();

		CakeService.getCakes().then(
            function(data) {
                $scope.cakes = data;
                //set filteredCakes
        if($scope.authData)
        {
          console.log($scope.authData.facebook.id);
          //add cake to filteredCakes
          $scope.filteredCakes.splice(0,$scope.filteredCakes.length);
          var isnotempty = false;
          for(var i = 0; i < $scope.cakes.length; i++)
          {
            for(var j = 0; j < $scope.cakes[i].Favo.length; j++)
            {

              if ($scope.cakes[i].Favo[j] == $scope.authData.facebook.id)
              {
                isnotempty = true;
                $scope.filteredCakes.push($scope.cakes[i]);
                console.log($scope.filteredCakes);
                break;
              }
            }
          }
          if(isnotempty == false)
          {
            //this nick doesnt have any cake in Favorite
            //$("#wishemptydiv").show();
            $("#wishcard").hide();
          }
          else {
            $("#wishcard").show();
            //$("#wishemptydiv").hide();
          }
        }
        else {
          //not login = show list empty
          console.log("failed log in")
          //$("#wishemptydiv").show();
          $("#wishcard").hide();
        }
        //alert("run to hide div feedback");
				$("#wishdvloader").hide();

        console.log($scope.filteredCakes);
				console.log($scope.cakes.length);
				console.log($scope.filteredCakes.length);
            }

        );



        $scope.addtoCart = function(myid, myname, myimage, myprice) {
            var mysl = Number(document.getElementById('soluong' + myid).value);

            CakeService.setcartCakeList(myid, myname, mysl, myimage, myprice);

            var quantityInput = document.getElementById('soluong'+ myid);
            console.log('input',quantityInput);
            quantityInput.value = '';
            console.log('input',quantityInput);


            // $window.location.reload(true);
            // $state.go($state.current, {}, {reload: true});
             $state.transitionTo('tab', {}, {reload: true});
        }

		$scope.cakeDetail = function(cakeId) {
            console.log("go cake detail", cakeId);
            $state.go("tab.cakeDetail", { 'cakeId': cakeId });
        }

		$scope.removeFavor = function(cakeId) {
      //get position of cakeID in cakes
      var pos = 0;
      for(var i = 0; i < $scope.cakes.length; i++)
      {
        if($scope.cakes[i].Key == cakeId)
        {
          pos = i;
          break;
        }
      }
      //remove Favo
      for(var i = 0; i < $scope.cakes[pos].Favo.length; i++)
      {
        if($scope.cakes[pos].Favo[i] == $scope.authData.facebook.id)
        {
          $scope.cakes[pos].Favo.splice(i,1);
          //update new list to firebase
          var arrFavo = $scope.cakes[pos].Favo;
          CakeService.updateFavoCake(cakeId,arrFavo);
          //set favo state change
          CakeService.setCakeCount(CakeService.getCakeCount() + 1);
          break;
        }
      }
      //refresh filteredCakes
      //add cake to filteredCakes
      console.log('refresh filteredCakes after remove a cake')
      $scope.filteredCakes.splice(0,$scope.filteredCakes.length);
      var isnotempty = false;
      for(var i = 0; i < $scope.cakes.length; i++)
      {
        for(var j = 0; j < $scope.cakes[i].Favo.length; j++)
        {

          if ($scope.cakes[i].Favo[j] == $scope.authData.facebook.id)
          {
            isnotempty = true;
            $scope.filteredCakes.push($scope.cakes[i]);
            console.log($scope.filteredCakes);
            break;
          }
        }
      }
      if(isnotempty == false)
      {
        //this nick doesnt have any cake in Favorite
        //$("#wishemptydiv").show();
        $("#wishcard").hide();
      }
      else {
        $("#wishcard").show();
        //$("#wishemptydiv").hide();
      }

    console.log($scope.filteredCakes);
    console.log($scope.cakes.length);
    console.log($scope.filteredCakes.length);


		}

		$scope.addCakeLike = function(cakeId) {
			if($scope.authData)
			{
				console.log('already login');
			}
			else
			{
				console.log('not login');
				var alertLikeLogin = $ionicPopup.alert({title: 'Chú ý', template: 'Hãy đăng nhập trước'});
				return;
			}
			//get position of cakeID in cakes
			var pos = 0;
			for(var i = 0; i < $scope.cakes.length; i++)
			{
				if($scope.cakes[i].Key == cakeId)
				{
					pos = i;
					break;
				}
			}
			var tmpuid = $scope.authData.facebook.id;
			var checkedid = 0;
			for(var i = 0; i < $scope.cakes[pos].Likes.length; i++) {
				if($scope.cakes[pos].Likes[i] == tmpuid)
				{
					checkedid = 1;
					break;
				}
			}
			if(checkedid == 1)
			{
				console.log('already in list like');
				var alertLikeAlready = $ionicPopup.alert({title: 'Chú ý', template: 'Bạn đã Like bánh này rồi!'});
        //unlike action

        return;
			}
			else {
				$scope.cakes[pos].Likes.push(tmpuid);
				var arrLikes = $scope.cakes[pos].Likes;
				CakeService.updateLikesCake(cakeId,arrLikes);
				console.log('finished');
        var alertLikeAlready = $ionicPopup.alert({title: 'Thông báo', template: 'Like bánh thanh cong!'});
        //set state is changed
        CakeService.setCakeCount(CakeService.getCakeCount() + 1);
			}

		}

		$scope.addCakeShare = function(cakeId) {
			if($scope.authData)
			{
				console.log('already login');
			}
			else
			{
				console.log('not login');
				var alertShareLogin = $ionicPopup.alert({title: 'Chú ý', template: 'Hãy đăng nhập trước!'});
				return;
			}
			//get position of cakeID in cakes
			var pos = 0;
			for(var i = 0; i < $scope.cakes.length; i++)
			{
				if($scope.cakes[i].Key == cakeId)
				{
					pos = i;
					break;
				}
			}
			var tmpuid = $scope.authData.facebook.id;
			var checkedid = 0;
			for(var i = 0; i < $scope.cakes[pos].Shares.length; i++) {
				if($scope.cakes[pos].Shares[i] == tmpuid)
				{
					checkedid = 1;
					break;
				}
			}
			if(checkedid == 1)
			{
				console.log('already in list like');
				var alertShareAlready = $ionicPopup.alert({title: 'Chú ý', template: 'Bạn đã chia sẽ bánh! Bánh này vẫn được chia sẽ lần nữa trên wall của bạn.'});
			}
			else {
				$scope.cakes[pos].Shares.push(tmpuid);
				var arrShares = $scope.cakes[pos].Shares;
				CakeService.updateSharesCake(cakeId,arrShares);
				console.log('finished');
			}
      //share message
      var sharemessage = 'Banh ' + $scope.cakes[pos].Name + ' ngon qua';
      window.plugins.socialsharing.shareViaFacebook(
        sharemessage,
        null /* img */,
        null /* url */,
        function() {$ionicPopup.alert({title: 'Thông báo', template: 'Chia sẽ thành công'})},
        function(errormsg){$ionicPopup.alert({title: 'Cánh báo', template: 'Chia sẽ qua facebook thất bại.'})}
      );
      //set state is change
      CakeService.setCakeCount(CakeService.getCakeCount() + 1);
		}

        $scope.$watch(

			function() {
				return CakeService.getCakeCount();
			},
			function(newCount, oldCount) {
				console.log("wish page count changes ", newCount);
				console.log(oldCount);
        $scope.filteredCakes.splice(0,$scope.filteredCakes.length);

        CakeService.getCakes().then(
                function(data) {
                    $scope.cakes = data;
                    //set filteredCakes
            if($scope.authData)
            {
              console.log($scope.authData.facebook.id);
              //add cake to filteredCakes
              var isnotempty = false;
              for(var i = 0; i < $scope.cakes.length; i++)
              {
                for(var j = 0; j < $scope.cakes[i].Favo.length; j++)
                {

                  if ($scope.cakes[i].Favo[j] == $scope.authData.facebook.id)
                  {
                    isnotempty = true;
                    $scope.filteredCakes.push($scope.cakes[i]);
                    console.log($scope.filteredCakes);
                    break;
                  }
                }
              }
              if(isnotempty == false)
              {
                //this nick doesnt have any cake in Favorite
                //$("#wishemptydiv").show();
                $("#wishcard").hide();
              }
              else {
                $("#wishcard").show();
                //$("#wishemptydiv").hide();
              }
            }
            else {
              //not login = show list empty
              console.log("failed log in")
              //$("#wishemptydiv").show();
              $("#wishcard").hide();
            }

    				$("#wishdvloader").hide();
    				$("#wishsloader").hide();

    				console.log($scope.cakes.length);
    				console.log($scope.filteredCakes.length);
                }

            );

			},true);

		function fbSignIn() {

            Auth.authObj().$authWithOAuthRedirect("facebook").then(function(authData) {}).catch(function(error) {
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    Auth.authObj().$authWithOAuthPopup("facebook").then(function(authData) {
                        // User successfully logged in. We can log to the console
                        // since we’re using a popup here
                    });
                } else {
                    // Another error occurred
                }

				});
        };

		Auth.authObj().$onAuth(function(authData) {
            //console.log("onauth cartinfo");
            if (authData) {
				//console.log(authData);
                usersRef.child(authData.uid).update({
                    Provider: authData.provider,
                    Name: authData.facebook.displayName,
                    Img: authData.facebook.profileImageURL,
					          Token: authData.facebook.accessToken
                });
            }
            $scope.authData = authData; // This will display the user's name in our view
        });



    }
]);
