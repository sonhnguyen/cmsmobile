cms.config(function($stateProvider, $urlRouterProvider) {


    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'view/tabs.html',
            controller: 'tabController'
        })
        .state('tab.menu', {
            url: '/menu',
            views: {
                'tab-menu': {
                    templateUrl: 'view/menuPage.html',
                    controller: 'menuController'
                }
            }
        })
        .state('tab.deal', {
            url: '/deal',
            views: {
                'tab-deal': {
                    templateUrl: 'view/dealPage.html',
                    controller: 'dealController'
                }
            }
        })
        .state('tab.news', {
            url: '/news',
            views: {
                'tab-news': {
                    templateUrl: 'view/newsPage.html',
                    controller: 'newsController'
                }
            }
        })
        .state('tab.recipe', {
            url: '/recipe',
            views: {
                'tab-recipe': {
                    templateUrl: 'view/recipePage.html',
                    controller: 'recipeController'
                }
            }
        })
        .state('tab.cart', {
            url: '/cart',
            views: {
                'tab-cart': {
                    templateUrl: 'view/cartPage.html',
                    controller: 'cartController'
                }
            }
        })
        .state('tab.cakeDetail', {
            url: '/cakedetail/:cakeId/',
            params: {
                cakeId: null
            },
            views: {
                'tab-menu': {
                    templateUrl: 'view/cakeDetail.html',
                    controller: 'cakedetailController'
                }
            }
        })
        .state('tab.newsDetail', {
            url: '/newsdetail/:newsId/',
            params: {
                newsId: null
            },
            views: {
                'tab-news': {
                    templateUrl: 'view/newsDetailPage.html',
                    controller: 'newsdetailController'
                }
            }
        })
        .state('tab.cartInfo', {
            url: '/cartInfo/',

            views: {
                'tab-cart': {
                    templateUrl: 'view/cartInfo.html',
                    controller: 'cartInfoController'
                }
            }
        })
        .state('tab.datepicker', {
            url: "/datepicker",
            views: {
                'tab-cartInfo': {
                    templateUrl: "view/datepicker.html",
                    controller: 'datepickerController'
                }
            }
        })
        .state('tab.dealDetail', {
            url: '/dealdetail/:dealId',
            params: {
                dealId: null
            },
            views: {
                'tab-deal': {
                    templateUrl: 'view/dealdetailPage.html',
                    controller: 'dealdetailController'
                }
            }
        })
        .state('tab.order', {
            url: '/order',
            views: {
                'tab-order': {
                    templateUrl: 'view/orderPage.html',
                    controller: 'orderController'
                }
            }
        })
        .state('tab.orderDetail', {
            url: '/order/:orderId',
            params: {
                orderId: null
            },
            views: {
                'tab-order': {
                    templateUrl: 'view/orderDetailPage.html',
                    controller: 'orderDetailController'
                }
            }
        })
        .state("addNews", {
            params: {
                title: {},
                content: {}
            },
            url: "/addNews",
            templateUrl: "view/addNewsPage.html",
            controller: "addNewsController",
            data: {
                title: {},
                content: {}
            }
        })
        .state("showNews", {
            params: {
                title: {},
                content: {}
            },
            url: "/showNews",
            templateUrl: "view/showNewsPage.html",
            controller: "showNewsController",
            data: {
                title: {},
                content: {}
            }
        })
        .state("addRecipe", {
            params: {
                title: {},
                content: {}
            },
            url: "/addRecipe",
            templateUrl: "view/addRecipePage.html",
            controller: "addRecipeController",
            data: {
                title: {},
                content: {}
            }
        })
        .state("showRecipe", {
            params: {
                title: {},
                content: {}
            },

            url: "/showRecipe",
            templateUrl: "view/showRecipePage.html",
            controller: "showRecipeController",
            data: {
                title: {},
                content: {}
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/menu');

});
