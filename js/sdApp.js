//Main app
var soccerDashApp = angular.module('soccerDashApp', 
  ['ngRoute', 'ngResource', 'soccerDashControllers', 'soccerDashServices', 'firebase']);

soccerDashApp.run(['$rootScope', 'statsfcService', function($rootScope, statsfcService) {

  statsfcService.getTeams('premier-league', '2013/2014' )
  .then(function(data) {
    $rootScope.teams = data;
  });

  statsfcService.getLeague('premier-league', '2013/2014' )
  .then(function(data) {
    $rootScope.league = data;
  });

}]);

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
  // when('/portfo', {
  //  templateUrl: 'partials/portfolio.html',
  //  controller: 'PortfolioCtrl'
  // }).

  .otherwise({redirect_to: '/login'})
}]);