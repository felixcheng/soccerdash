//Main app
var soccerDashApp = angular.module('soccerDashApp', 
  ['ngRoute', 'ngResource', 'soccerDashControllers', 'soccerDashServices', 'firebase']);

soccerDashApp.run(['$rootScope', 'statsfcService', function($rootScope, statsfcService) {

  // statsfcService.getTeams('premier-league', '2013/2014' )
  // .then(function(data) {
  //   var teams = data;
  //   $rootScope.teams = teams;
  // });

  statsfcService.getLeague('premier-league', '2013/2014' )
  .then(function(data) {
    $rootScope.league = data;
    console.log('root league', $rootScope.league)
  });

  // statsfcService.getTeamTopScorers('liverpool')
  // .then(function(data) {
  //   $rootScope.goalData = data;
  //   $rootScope.showGoal = true;
  // });  

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