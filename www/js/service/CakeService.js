cms
.factory('CakeService', function($q, $timeout) {

    var getCakes = function() {

        var deferred = $q.defer();
		var list =[];
		var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/');
		ref.once("value", function(snapshot) {
		  snapshot.forEach(function(snap){
			  var cake = snap.val();
			  cake.Key = snap.key();
			  list.push(cake);
		  });
		  deferred.resolve(list);
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
        return deferred.promise;
    };

	var getCakeById = function(id){
		var deferred = $q.defer();
		var list =[];
		var ref = new Firebase('https://glowing-torch-2466.firebaseio.com/cakes/' + id);
		ref.once("value", function(snapshot) {
			var cake = snapshot.val();
			cake.Key = snapshot.key();
			deferred.resolve(cake);
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
        return deferred.promise;
	}
	
    return {
        getCakes : getCakes,
		getCakeById : getCakeById
    }
})
