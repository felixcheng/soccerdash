var soccerDashServices = angular.module('soccerDashServices', ['ngResource']);

soccerDashServices.service('statsfcService', 
 ['$http', '$q',
   function($http, $q) {
 
   //Retrieve basic information about the teams of a specific competition/year
   var getTeams = function(competition, year) {
     var url = 'https://api.statsfc.com/teams.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k'+
               '&competition='+ competition + '&year=' + year + '&callback=JSON_CALLBACK';

     var d = $q.defer();

     $http.jsonp(url)
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

     var d = $q.defer();

     $http.jsonp(url)
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
     getLeague: getLeague
   }

}]);