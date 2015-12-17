starter.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        
       
        .state("menu", {
            url: "/menu",
            templateUrl: "view/menu.html",
            controller: "menuController"
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
            data: {'blogid':'blogid'}
    });
    $urlRouterProvider.otherwise('/');
});