var app=angular.module("mp3",["ngRoute"]);app.directive("head",["$rootScope","$compile",function($rootScope,$compile){return{restrict:"E",link:function(scope,elem){var html='<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';elem.append($compile(html)(scope)),scope.routeStyles={},$rootScope.$on("$routeChangeStart",function(e,next,current){current&&current.$$route&&current.$$route.css&&(angular.isArray(current.$$route.css)||(current.$$route.css=[current.$$route.css]),angular.forEach(current.$$route.css,function(sheet){delete scope.routeStyles[sheet]})),next&&next.$$route&&next.$$route.css&&(angular.isArray(next.$$route.css)||(next.$$route.css=[next.$$route.css]),angular.forEach(next.$$route.css,function(sheet){scope.routeStyles[sheet]=sheet}))})}}}]),app.config(function($routeProvider){$routeProvider.when("/index",{templateUrl:"index.html",controller:"indexController"}).when("/home",{templateUrl:"partials/home.html",controller:"homeController",css:"css/style.css"}).when("/details/:rank",{templateUrl:"partials/details.html",controller:"detailsController"}).otherwise({redirectTo:"/home"})});