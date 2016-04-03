cms
    .factory('CakeService', function($q, $timeout) {
        var totalnotiSL = 0;
        var cartCakeList = [];
        //change quen a cake is added to favo or removed
        var CountFavo = 0;

        var getcartCakeList = function() {
            return cartCakeList;
        };

        var getCakeCount = function() {
            return CountFavo;
        };

        var setCakeCount = function(number) {
            CountFavo = number;
        };

        var removecartCakeList = function(myid) {
            cartCakeList.pop({
                id: myid
            });
            totalnotiSL = 0;
        };

        var iscartCakeListNull = function() {
            if (cartCakeList.length === 0)
                return true; //true = it is null
            else return false;
        }

        var deleteCartCakeList = function() {
            cartCakeList = [];
        }

        var notiSLcount = function(mysl) {
            totalnotiSL += mysl;
        }

        var gettotalnotiSL = function() {
            return totalnotiSL;
        }

        var settotalnotiSL = function(bigZero) {
            console.log(totalnotiSL);
            totalnotiSL = bigZero;
        }

        var setcartCakeList = function(cakeId, cakeName, cakeSl, cakeImage, cakePrice) {
            console.log(cakeSl);
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
                totalnotiSL += cakeSl;
            } else {
                console.log('sl them', cakeSl, 'co', existed.sl);
                if (cakeSl > 0 || existed.sl > 1) {
                    existed.sl += Number(cakeSl);
                    totalnotiSL += cakeSl;
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

        var updateLikesCake = function(cakeId, arrLike) {
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/' + cakeId);
            ref.update({
                Likes: arrLike
            });
        };

        var updateFavoCake = function(cakeId, arrFavo) {
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/' + cakeId);
            ref.update({
                Favo: arrFavo
            });
        };

        var updateSharesCake = function(cakeId, arrShare) {
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/' + cakeId);
            ref.update({
                Shares: arrShare
            });
        };

        var addCakeFavo = function(cakeId, fbId) {
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/' + cakeId);
            ref.set({ Favoris: [{ 0: fbId }] });
        }

        var addCakeLike = function(cakeId, fbId) {
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/' + cakeId);
            ref.set({ Likes: [{ fbId }] });
        }

        var addCakeShare = function(cakeId, fbId) {
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/' + cakeId);
            ref.set({ Shares: [{ fbId }] });
        }

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
                var news = snapshot.val();
                news.Key = snapshot.key();
                deferred.resolve(news);
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }

        var getRecipeById = function(id) {
            var deferred = $q.defer();
            var list = [];
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/recipe/' + id);
            ref.once("value", function(snapshot) {
                var recipe = snapshot.val();
                recipe.Key = snapshot.key();
                deferred.resolve(recipe);
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
            var listCake = [];
            var dateCreated = Date.now();
            order.cakeList.forEach(function(cake) {
                var Cake = {};
                Cake.id = cake.id;
                Cake.name = cake.name;
                Cake.price = cake.price;
                Cake.sl = cake.sl;
                listCake.push(Cake);
            });
            ref.push({
                Address: order.addr,
                DeliveryDateTime: order.date,
                PhoneNumber: order.tel,
                Status: 0,
                Name: order.userName,
                CakeList: listCake,
                User: order.user,
                Note: order.desc,
                DateCreated: dateCreated
            });
        }

        var addNewFeedback = function(feedback) {
            var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/feedbacks/');
            ref.push({
                Title: feedback.Title,
                Content: feedback.Content
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
            getCakeCount: getCakeCount,
            setcartCakeList: setcartCakeList,
            settotalnotiSL: settotalnotiSL,
            setCakeCount: setCakeCount,
            iscartCakeListNull: iscartCakeListNull,
            removecartCakeList: removecartCakeList,
            deleteCartCakeList: deleteCartCakeList,
            getRecipeById: getRecipeById,
            gettotalnotiSL: gettotalnotiSL,
            notiSLcount: notiSLcount,
            addNewOrder: addNewOrder,
            addNewFeedback: addNewFeedback,
            updateSharesCake: updateSharesCake,
            updateLikesCake: updateLikesCake,
            updateFavoCake: updateFavoCake,
            addCakeFavo: addCakeFavo,
            addCakeLike: addCakeLike,
            addCakeShare: addCakeShare

        }
    })
    .factory("Auth", function($q, $timeout, $firebaseAuth) {
        return {
            authObj: function() {
                return $firebaseAuth(usersRef);
            },

            // Tests to see if /users/<userId> has any data.
            getOrderList: function() {
                var deferred = $q.defer();
                var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/orders/');
                ref.once("value", function(snapshot) {
                    var orders = [];
                    snapshot.forEach(function(data) {
                        if (data.val().User == $firebaseAuth(usersRef).$getAuth().uid) {
                            var order = data.val();
                            order.Key = data.key();
                            orders.push(order);
                        }
                    })
                    deferred.resolve(orders);

                }, function(errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
                return deferred.promise;
            },

            getUser: function(uid) {
                var deferred = $q.defer();
                var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/users/' + uid);
                ref.once("value", function(snapshot) {
                    var user = snapshot.val();
                    user.Key = snapshot.key();
                    deferred.resolve(user);
                }, function(errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
                return deferred.promise;
            },

            updateUser: function(user) {
                var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/users/' + user.Key);
                ref.update({
                    Name: user.Name,
                    Address: user.Address,
                    PhoneNumber: user.PhoneNumber
                });
            }


        }
    })
