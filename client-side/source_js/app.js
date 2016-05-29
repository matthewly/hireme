var app = angular.module('HireMe', ['ngRoute', 'HireMeControllers', 'HireMeServices']);

app.directive('head', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'E',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if(current && current.$$route && current.$$route.css){
                        if(!angular.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet){
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if(next && next.$$route && next.$$route.css){
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl : 'partials/home.html',
			controller : 'homeController'
		})
		.when('/search', {
			templateUrl : 'partials/search.html',
			controller : 'searchController'
		})
        .when('/internships', {
            templateUrl : 'partials/internships.html',
            conroller : 'internshipController'
        })
		.otherwise({ // if url doesn't exist, go to /home
			redirectTo: '/home'
		});
});

// Service
app.factory('Data', function () {
    return { title: '', location: '' };
});

