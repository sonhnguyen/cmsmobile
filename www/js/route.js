

cms.config(function($stateProvider, $urlRouterProvider) {


  // Each state's controller can be found in controllers.js
  $stateProvider

     .state("menu",{
            url: "/menu",
            templateUrl: "view/menuPage.html",
            controller: "menuController"
        })
     .state("cakedetail", {
            url: "/cakedetail",
            templateUrl: "view/cakeDetail.html",
            controller: "cakedetailController"
        })
     
        .state("deal", {
            url: "/deal",
            templateUrl: "view/dealPage.html",
            controller: "dealController"
        })
        .state("news", {
            url: "/news",
            templateUrl: "view/newsPage.html",
            controller: "newsController"
        })
        .state("recipe", {
            params: {
                //blogid:{}
            },
            url: "/recipe",
            templateUrl: "view/recipePage.html",
            controller: "recipeController",
            // data: {'blogid':'blogid'}
    })
        .state("addNews",{
            url: "/addNews",
            templateUrl: "view/addNewsPage.html",
            controller: "addNewsController"
        });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
