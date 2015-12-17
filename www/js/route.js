

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
            params: {
                title:{},
                content:{}
            },
            url: "/news",
            templateUrl: "view/newsPage.html",
            controller: "newsController",
            data: {title:{},
                content:{}}
        })
        .state("recipe", {
            params: {
                title:{},
                content:{}
            },
            url: "/recipe",
            templateUrl: "view/recipePage.html",
            controller: "recipeController",
            data: {title:{},
                content:{}}
    })
        .state("addNews",{
            params: {
                title:{},
                content:{}
            },
            url: "/addNews",
            templateUrl: "view/addNewsPage.html",
            controller: "addNewsController",
            data: {title:{},
                content:{}}
        })
        .state("showNews",{
             params: {
                title:{},
                content:{}
            },

            url: "/showNews",
            templateUrl: "view/showNewsPage.html",
            controller: "showNewsController",
            data: {title:{},
                content:{}}
        })
        .state("addRecipe",{
            params: {
                title:{},
                content:{}
            },
            url: "/addRecipe",
            templateUrl: "view/addRecipePage.html",
            controller: "addRecipeController",
            data: {title:{},
                content:{}}
        })
        .state("showRecipe",{
             params: {
                title:{},
                content:{}
            },

            url: "/showRecipe",
            templateUrl: "view/showRecipePage.html",
            controller: "showRecipeController",
            data: {title:{},
                content:{}}
        });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
