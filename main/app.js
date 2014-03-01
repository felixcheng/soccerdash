//Main app
var soccerDashApp = angular.module('soccerDashApp', 
  ['ngRoute', 'ngResource', 'soccerDashServices', 'firebase', 'indexControllerModule',
  'leagueResultsControllerModule', 'recentResultControllerModule', 'teamResultsControllerModule',
  'teamTopScorersControllerModule', 'homeControllerModule']);

//Routes configuration
soccerDashApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/main/home.html',
    controller: "HomeController"
  })
  .when('/login', {
    templateUrl: '/main/login.html',
    controller: "HomeController"
  })
  .when('/select', {
    templateUrl: '/main/selectfavoriteteam.html',
    controller: "HomeController"
  })
  .when('/profile', {
    templateUrl: '/main/profile.html',
    controller: "HomeController"
  })
  .when('/league', {
    templateUrl: '../leaguetable/leaguetbl.html',
    controller: 'HomeController'
  })
  .when('/teamresults', {
    templateUrl: 'results/teamresults.html',
    controller: 'TeamResultsController'
  })
  .when('/teamstatus', {
    templateUrl: '../PositionChart/teamstatus.html',
  })
  .when('/leagueresults', {
    templateUrl: 'results/leagueresults.html',
    controller: 'LeagueResultsController'
  })

  .otherwise({redirect_to: '/main/home.html'})
}]);