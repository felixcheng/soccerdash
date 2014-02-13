var soccerDashApp = angular.module('soccerDashApp', 
	['ngRoute', 'ngResource', 'soccerDashControllers', 'soccerDashServices', /*"firebase"*/]);

soccerDashApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$routeProvider.
			when('/league', {
				templateUrl: 'partials/leaguetbl.html',
				controller: 'LeagueTblCtrl'
			}).
			// when('/portfo', {
			// 	templateUrl: 'partials/portfolio.html',
			// 	controller: 'PortfolioCtrl'
			// }).
			otherwise({
				redirectTo: '/index'
			})
}]);
