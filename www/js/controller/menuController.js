cms
    .controller('menuController', ['$scope', '$state', '$ionicPopover', '$ionicPopup',
    '$ionicLoading', '$ionicModal', '$ionicHistory', 'CakeService', 'Auth',
    function($scope, $state, $ionicPopover, $ionicPopup, $ionicLoading, $ionicModal, $ionicHistory, CakeService, Auth, $cordovaSocialSharing) {
        $scope.cakes = [];
        $scope.filteredCakes = [];
		$("#menucard").hide();
		$("#menuemptydiv").hide();
		var listCake = CakeService.getcartCakeList();
		var statusFilter = 0;

		CakeService.getCakes().then(
            function(data) {
                $scope.cakes = data;
                $scope.filteredCakes = data;
                // for(var i=0;i<= $scope.filteredCakes.length;i++)
                // {
                //     if(Number($scope.filteredCakes[i].Status) === 1)
                //     {
                //         var temp = "soldoutIcon"+$scope.filteredCakes[i].Key;
                //         var soldout = document.getElementById(temp).value;
                //         soldout.style.visibility = 'visible';
                //     }

                // }

				$("#dvloader").hide();
				$("#menucard").show();
				$("#menusloader").hide();
				if($scope.filteredCakes.length == 0 || $scope.filteredCakes == 'undefined')
				{
					$("#menucard").hide();
					$("#menuemptydiv").show();
				}
            }

        );



        $scope.addtoCart = function(myid, myname, myimage, myprice) {
            var mysl = Number(document.getElementById('soluong' + myid).value);
            if(mysl>0)
            	CakeService.setcartCakeList(myid, myname, mysl, myimage, myprice);

            var quantityInput = document.getElementById('soluong'+ myid);
            quantityInput.value = '';
             $state.transitionTo('tab', {}, {reload: true});
        }

		$scope.cakeDetail = function(cakeId) {
            console.log("go cake detail", cakeId);
            $state.go("tab.cakeDetail", { 'cakeId': cakeId });
        }

		$scope.addCakeFavorite = function(cakeId) {
      console.log($scope.authData);
      if(!$scope.authData)
      {
        var alertFavoLogin = $ionicPopup.alert({title: 'Chú ý', template: 'Hãy đăng nhập trước!'});
        return;
      }
      //get cake ref to cake
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
      //check if cake exist cake.Favo
      //test function service
      //CakeService.addCakeFavo($scope.cakes[pos].Key, $scope.authData.facebook.id);
      //return;
      //check if this user already add to cake.Favo
      var checkfavoexist = false;
      for(var i = 0; i < $scope.cakes[pos].Favo.length; i++)
      {
        if($scope.cakes[pos].Favo[i] == $scope.authData.facebook.id)
        {
          checkfavoexist = true;
          break;
        }
      }
      if (checkfavoexist == false)
      {
        //add new Favo
        $scope.cakes[pos].Favo.push($scope.authData.facebook.id);
        var arrFavo = $scope.cakes[pos].Favo;
        CakeService.updateFavoCake(cakeId,arrFavo);
        console.log('finished');
        var alertLikeAlready = $ionicPopup.alert({title: 'Thông báo', template: 'Thêm bánh vào danh sách yêu thích thành công!'});
        //set favo state in cake service change
        CakeService.setCakeCount(CakeService.getCakeCount() + 1);
      }
      else {
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

        var alertLikeAlready = $ionicPopup.alert({title: 'Thông báo', template: 'Xóa bánh khỏi danh sách yêu thích thành công!'});

      }

		}

		$scope.addCakeLike = function(cakeId) {
			if($scope.authData)
			{
				console.log('already login');
			}
			else
			{
				console.log('not login');
				var alertLikeLogin = $ionicPopup.alert({title: 'Chú ý', template: 'Hãy đăng nhập trước!'});
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
				//unlike action
        
        var alertLikeAlready = $ionicPopup.alert({title: 'Thông báo', template: 'Đã trong danh sách Like!'});

			}
			else {
				$scope.cakes[pos].Likes.push(tmpuid);
				var arrLikes = $scope.cakes[pos].Likes;
				CakeService.updateLikesCake(cakeId,arrLikes);
        console.log('finished');
        var alertLikeAlready = $ionicPopup.alert({title: 'Thông báo', template: 'Like bánh thành công!'});
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
      //check in list share of cake, if exist -> user will get an alert
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
        function(errormsg){$ionicPopup.alert({title: 'Cảnh báo', template: 'Chia sẽ Facebook thất bại!'})}
      )
      //change status for update cake in other tab
      CakeService.setCakeCount(CakeService.getCakeCount() + 1);
			//CheckData( $scope.cakes[pos].Name + ' Cáp Xanh làm ngon quá' + ' cake menu');
		}

		$scope.doRefresh = function() {

			var list = [];
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/');
            ref.on("value", function(snapshot) {
                snapshot.forEach(function(snap) {
                    var mycake = snap.val();
                    mycake.Key = snap.key();
                    list.push(mycake);
                });
				if (list.length == $scope.cakes.length)
				{
					//normal running
				}
				else
				{
					//reload again
					//document.location.href="index.html";
					for(var i = 0; i < list.length; i++)
				{
					var checki = 0;
					for(var j = 0; j < $scope.cakes.length; j++)
					{
						if(list[i].Key == $scope.cakes[j].Key)
						{
							checki = 1;
							break;
						}
					}
					if(checki == 0)
					{
						//exist, continue
					}
					else
					{
						//add cake
						$scope.cakes.unshift(list[i]);
					}
				}
				}
            },function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });


			$scope.$broadcast('scroll.refreshComplete');
			$scope.$apply();
		}

        $scope.filterThisWeek = function() {
            $('#tab-all').removeClass('active');
            $('#tab-week').addClass('active');
            $('#tab-today').removeClass('active');
            $('#tab-hot').removeClass('active');
			statusFilter = 3;
            $scope.filteredCakes = [];
            $scope.cakes.forEach(function(cake) {
                console.log(cake);
                var FromDate, ToDate;
                var currentDate = new Date();
                if (cake.AvailableDays.FromDate) {
                    var datePart = cake.AvailableDays.FromDate.split(/[^0-9]+/);
                    FromDate = new Date(datePart[2], datePart[1] - 1, datePart[0]);
                } else {
                    FromDate = 0;
                }
                if (cake.AvailableDays.ToDate) {
                    var datePart = cake.AvailableDays.ToDate.split(/[^0-9]+/);
                    ToDate = new Date(datePart[2], datePart[1] - 1, datePart[0]);
                } else {
                    ToDate = 0;
                }

                if (((FromDate == 0) && (ToDate == 0)) || ((FromDate < currentDate) && (currentDate < ToDate))) {
                    $scope.filteredCakes.push(cake);
                }

            });
            console.log($scope.filteredCakes);
			if($scope.filteredCakes.length == 0 || $scope.filteredCakes == 'undefined')
			{
				$("#menucard").hide();
				$("#menuemptydiv").show();
			}
        }

		$scope.filterAll = function() {
            $('#tab-all').addClass('active');
            $('#tab-week').removeClass('active');
            $('#tab-today').removeClass('active');
            $('#tab-hot').removeClass('active');
			statusFilter = 1;
            $scope.filteredCakes = [];
            $scope.filteredCakes = $scope.cakes;
			if($scope.filteredCakes.length == 0 || $scope.filteredCakes == 'undefined')
			{
				$("#menucard").hide();
				$("#menuemptydiv").show();
			}
        }

		$scope.filterToday = function() {
            $('#tab-all').removeClass('active');
            $('#tab-week').removeClass('active');
            $('#tab-today').addClass('active');
            $('#tab-hot').removeClass('active');
			statusFilter = 2;
            $scope.filteredCakes = [];
            $scope.cakes.forEach(function(cake) {
                var cakeDay = cake.AvailableDays.WeekDays;
                var currentDate = new Date();
                var currentDay = currentDate.getDay();
                if (cakeDay) {
                    if ((cake.AvailableDays.WeekDays.indexOf(currentDay)) != -1) {
                        $scope.filteredCakes.push(cake);
                    }
                } else {
                    $scope.filteredCakes.push(cake);
                }

            });
            console.log($scope.filteredCakes);
			if($scope.filteredCakes.length == 0 || $scope.filteredCakes == 'undefined')
			{
				$("#menucard").hide();
				$("#menuemptydiv").show();
			}
        }

		$scope.filterHot = function() {
            $('#tab-all').removeClass('active');
            $('#tab-week').removeClass('active');
            $('#tab-today').removeClass('active');
            $('#tab-hot').addClass('active');
			statusFilter = 4;
            $scope.filteredCakes = [];
            $scope.cakes.forEach(function(cake) {
                if (cake.IsHot) {
                    $scope.filteredCakes.push(cake);
                }
            });
            console.log($scope.filteredCakes);
			if($scope.filteredCakes.length == 0 || $scope.filteredCakes == 'undefined')
			{
				$("#menucard").hide();
				$("#menuemptydiv").show();
			}
        }

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
            console.log("onauth menu info");
            if (authData) {
				console.log(authData);
                usersRef.child(authData.uid).update({
                    Provider: authData.provider,
                    Name: authData.facebook.displayName,
                    Img: authData.facebook.profileImageURL,
					Token: authData.facebook.accessToken
                });
            }
            $scope.authData = authData; // This will display the user's name in our view

        });

      $scope.$watch (
        function() {
          return CakeService.getCakeCount();
        },
        function(newCount, oldCount) {
          CakeService.getCakes().then(
                  function(data) {
                      $scope.cakes = data;
                      $scope.filteredCakes = data;
					  filterCakes();
                  }
              );
        },true);

		function filterCakes() {
			if (statusFilter == 4)
			{
				$scope.filterHot();
			}
			else if (statusFilter == 2)
			{
				$scope.filterToday();
			}
			else if (statusFilter == 3)
			{
				$scope.filterThisWeek();
			}
			else
			{
				$scope.filterAll();
			}
		}

        /*
		function CheckData(sharemessage) {
			//access token
			//var tmp = 'https://graph.Facebook.com/me?access_token=';
			var myobj = {
				method: 'POST',
				path: '/me/feed',
				params: {
					message: sharemessage,
					access_token: $scope.authData.Facebook.accessToken
				},
				success: function() {
					console.log('the item was posted on Facebook');
				},
				error: function() {
					console.log('Share failed');
				},
			};
			myapi(myobj);
		}

		function myapi(obj) {

			var method = obj.method || 'GET',
				params = obj.params || {},
				xhr = new XMLHttpRequest(),
				url;

			//params['access_token'] = tokenStore.fbAccessToken;

			url = 'https://graph.Facebook.com' + obj.path + '?' + toQueryString(params);

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						if (obj.success) obj.success(JSON.parse(xhr.responseText));
					} else {
						var error = xhr.responseText ? JSON.parse(xhr.responseText).error : {message: 'An error has occurred'};
						if (obj.error) obj.error(error);
					}
				}
			};
			console.log(url);
			xhr.open(method, url, true);
			xhr.send();
		}

		function toQueryString(obj) {
			var parts = [];
			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
				}
			}
			return parts.join("&");
		}*/

    }
]);
