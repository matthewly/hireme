var HireMeControllers = angular.module('HireMeControllers', ['ngCookies']);

HireMeControllers.controller('homeController', ['$scope','$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.search_query = {};
	
	$scope.search_submit = function() {
		//console.log("before putting to cookie: " + $scope.search_query.title + " " + $scope.search_query.location);
		$cookies.put('title_cookie', $scope.search_query.title);
		$cookies.put('location_cookie', $scope.search_query.location);
		$location.url('/search');	
	}
}]);

HireMeControllers.controller('searchController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	//alert($cookies.get('search_cookie').title);
	$scope.title = $cookies.get('title_cookie');
	$scope.location = $cookies.get('location_cookie');
	
}]);

HireMeControllers.controller('internshipController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	$http.get('data/internships.json').success(function(data) {
		$scope.items = data.items;

		// for (var i = 0; i < items.length; i++) {
		// 	if (items[i].displayLink ==)
		// }
	
	}).error(function (err) {
		console.log(err);
	});
}]);