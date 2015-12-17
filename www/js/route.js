

cms.config(function($stateProvider, $urlRouterProvider) {


  // Each state's controller can be found in controllers.js
  $stateProvider

     .state("menu",{
            url: "/menu",
            templateUrl: "view/menu.html",
            controller: "menuController"
        })
     .state("detail", {
            url: "/detail",
            templateUrl: "view/cakeDetail.html",
            controller: "cakedetailController"
        })
     
        .state("deal", {
            url: "/deal",
            templateUrl: "view/deal.html",
            controller: "dealController"
        })
        .state("news", {
            url: "/news",
            templateUrl: "view/news.html",
            controller: "newsController"
        })
        .state("recipe", {
            params: {
                //blogid:{}
            },
            url: "/recipe",
            templateUrl: "view/recipe.html",
            controller: "recipeController",
            // data: {'blogid':'blogid'}
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
