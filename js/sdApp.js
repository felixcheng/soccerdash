//Main app
var soccerDashApp = angular.module('soccerDashApp', 
  ['ngRoute', 'ngResource', 'soccerDashControllers', 'soccerDashServices', 'firebase']);

//Routes configuration
soccerDashApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: "partials/home.html",
    controller: "HomeController"
  })
  .when('/login', {
    templateUrl: "partials/login.html",
    controller: "LoginController"
  })
  .when('/select', {
    templateUrl: "partials/selectfavoriteteam.html",
    controller: "SelectController"
  })
  .when('/profile', {
    templateUrl: "partials/profile.html",
    controller: "ProfileController"
  })
  .when('/league', {
    templateUrl: 'partials/leaguetbl.html',
    controller: 'LeagueTblCtrl'
  })
  .when('/teamresults', {
    templateUrl: 'partials/teamresults.html',
    controller: 'TeamResultsController'
  })
  .when('/teamstatus', {
    templateUrl: 'partials/teamstatus.html',
    controller: 'TeamSttsCtrl'
  })
  .when('/modal', {
    templateUrl: 'partials/modal.html',
    controller: 'ModalCtrl'
  })
  .when('/leagueresults', {
    templateUrl: 'partials/leagueresults.html',
    controller: 'LeagueResultsController'
  })

  .otherwise({redirect_to: '/login'})
}]);