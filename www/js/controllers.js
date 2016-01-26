angular.module('cms.controllers', [])

.controller('DashCtrl', function($scope) {})
.controller('mainController',function($scope){})
.controller('menuController',function($scope){})
.controller('dealController',function($scope){})
.controller('newsController',function($scope){})
.controller('addNewsController',function($scope){})
.controller('detailcakeController',function($scope){})
.controller('cakedetailController',function($scope){})
.controller('recipeController',function($scope){})
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
