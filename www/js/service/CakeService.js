cms
    .factory('CakeService', function($q, $timeout) {

        var cartCakeList = [];
        var getcartCakeList = function() {
            return cartCakeList;
        };
        var removecartCakeList = function(myid) {
            cartCakeList.pop({
                id: myid
            });
        };
        var deleteCartCakeList = function() {
            cartCakeList = [];
        }
        var setcartCakeList = function(cakeId, cakeName, cakeSl, cakeImage, cakePrice) {
            if (cakeSl > 0) {
                var existed;
                //get the existed cake
                cartCakeList.some(function(cake) {
                    if (cake.id === cakeId)
                        existed = cake;
                    else
                        return false;
                });
                //if there is no existed cake, push new cake
                if (!existed) {
                    cartCakeList.push({
                        id: cakeId,
                        name: cakeName,
                        sl: cakeSl,
                        img: cakeImage,
                        price: cakePrice
                    });
                } else {
                    existed.sl += Number(cakeSl);
                }

            }
        };
        var getCakes = function() {

            var deferred = $q.defer();
            var list = [];
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/');
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(snap) {
                    var cake = snap.val();
                    cake.Key = snap.key();
                    list.push(cake);
                });
                deferred.resolve(list);
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        };
        var getNews = function() {

            var deferred = $q.defer();
            var list = [];
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/news/');
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(snap) {
                    var cake = snap.val();
                    cake.Key = snap.key();
                    list.push(cake);
                });
                deferred.resolve(list);
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        };
        var getDeals = function() {
            var deferred = $q.defer();
            var list = [];
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/deals/');
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(snap) {
                    var deal = snap.val();
                    deal.Key = snap.key();
                    list.push(deal);
                });
                deferred.resolve(list);
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }
        var getCakeById = function(id) {
            var deferred = $q.defer();
            var list = [];
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/' + id);
            ref.once("value", function(snapshot) {
                var cake = snapshot.val();
                cake.Key = snapshot.key();
                deferred.resolve(cake);
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }
        var getNewsById = function(id) {
            var deferred = $q.defer();
            var list = [];
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/news/' + id);
            ref.once("value", function(snapshot) {
                var cake = snapshot.val();
                cake.Key = snapshot.key();
                deferred.resolve(cake);
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }
        var setUser = function(user_data) {
            window.localStorage.starter_facebook_user = JSON.stringify(user_data);
        };

        var getUser = function() {
            return JSON.parse(window.localStorage.starter_facebook_user || '{}');
        };

        var getDealByID = function(id) {
            var deferred = $q.defer();
            var list = [];
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/deals/' + id);
            ref.once("value", function(snapshot) {
                var cake = snapshot.val();
                cake.Key = snapshot.key();
                deferred.resolve(cake);
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }
        var addNewOrder = function(order) {
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/orders/');
            var listCake = {};
            order.cakeList.forEach(function(cake) {
                listCake[cake.id] = cake.sl;
            });
            ref.push({
                Address: order.addr,
                DeliveryDate: order.date,
                PhoneNumber: order.tel,
                Status: 0,
                Name: order.userName,
                CakeList: listCake,
                User: order.user
            });

        }
        return {
            getCakes: getCakes,
            getNews: getNews,
            getCakeById: getCakeById,
            getDeals: getDeals,
            getDealByID: getDealByID,
            getNewsById: getNewsById,
            getcartCakeList: getcartCakeList,
            setcartCakeList: setcartCakeList,
            removecartCakeList: removecartCakeList,
            deleteCartCakeList: deleteCartCakeList,
            getUser: getUser,
            setUser: setUser,
            addNewOrder: addNewOrder
        }
    })
    .factory("Auth", function($firebaseAuth) {
        return {
            authObj: function() {
                return $firebaseAuth(usersRef);
            }
        }
    })
