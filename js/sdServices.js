var soccerDashServices = angular.module('soccerDashServices', ['ngResource']);

soccerDashServices.service('statsfcService', 
 ['$http', '$q',
    function($http, $q) {

    // Retrieve basic information about the teams of a specific competition/year
    var getTeams = function(competition, year) {
     var url = 'https://api.statsfc.com/teams.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k'+
               '&competition='+ competition + '&year=' + year + '&callback=JSON_CALLBACK';
     var config = {
      cache: true
     };

     var d = $q.defer();

     $http.jsonp(url, config)
     .success(function(data, status, headers) {
       d.resolve(data);
     })
     .error(function(data, status, headers) {
       d.reject(data);
     });

     return d.promise;
    };

    //Retrieve detailed information about the teams of a specific competition/year (goals, results, etc... for each team)
    var getLeague = function(competition, year) {
     var url = 'https://api.statsfc.com/table.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k'+
               '&competition='+ competition + '&year=' + year + '&callback=JSON_CALLBACK';
     var config = {
      cache: true
     };

     var d = $q.defer();

     $http.jsonp(url, config)
     .success(function(data, status, headers) {
       d.resolve(data);
     })
     .error(function(data, status, headers) {
       d.reject(data);
     });

     return d.promise;
    };

    //Retrieve most recent result
    var getResult = function(teamName) {
     var url = 'https://api.statsfc.com/results.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&team=' + teamName + '&limit=5&callback=JSON_CALLBACK';
     var config = {
      cache: true
     };

     var d = $q.defer();

     $http.jsonp(url, config)
     .success(function(data, status, headers) {
       d.resolve(data);
     })
     .error(function(data, status, headers) {
       d.reject(data);
     });

     return d.promise;
    };

    //Retrieve specific team results
    var getTeamResults = function(teamName) {
     var url = 'https://api.statsfc.com/results.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&team=' + teamName + '&year=2013/2014&callback=JSON_CALLBACK';

     var config = {
      cache: true
     };

     var d = $q.defer();

     $http.jsonp(url, config)
     .success(function(data, status, headers) {
       d.resolve(data);
     })
     .error(function(data, status, headers) {
       d.reject(data);
     });

     return d.promise;
    };

    //Retrieve all league results
    var getLeagueResults = function(competition, year) {
     var url = 'https://api.statsfc.com/results.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&from=2013-08-16&callback=JSON_CALLBACK';

     var config = {
      cache: true
     };

     var d = $q.defer();

     $http.jsonp(url, config)
     .success(function(data, status, headers) {
       d.resolve(data);
     })
     .error(function(data, status, headers) {
       d.reject(data);
     });

     return d.promise;
    };

    //Retrieve Team Top Scorers
    var getTeamTopScorers = function(teamName) {
     var url = 'https://api.statsfc.com/top-scorers.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&team=' + teamName + '&year=2013/2014&callback=JSON_CALLBACK';

     var config = {
      cache: true
     };

     var d = $q.defer();

     $http.jsonp(url, config)
     .success(function(data, status, headers) {
       d.resolve(data);
     })
     .error(function(data, status, headers) {
       d.reject(data);
     });

     return d.promise;
    };
      
    return {
      getTeams: getTeams,
      getLeague: getLeague,
      getResult: getResult,
      getTeamResults: getTeamResults,
      getLeagueResults: getLeagueResults,
      getTeamTopScorers: getTeamTopScorers,
    }

}]);
