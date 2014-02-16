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

    //Retrieve most recent result
    var getResult = function(teamName) {
     var url = 'https:api.statsfc.com/results.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&team=' + teamName + '&limit=1&callback=JSON_CALLBACK';

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

    //Format the ISO dates received by the API
    var formatDate = function(isoString) {
      var date = new Date(isoString);

      var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      var days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
                      
      var dayNum = function(day) {
        var append; 
        if(day == 1 || day === 21 || day === 31) {
          append = 'st';
        }
        else if(day === 2 || day === 22) {
          append = 'nd';
        }
        else if(day === 3 || day === 23) {
          append = 'rd';
        }
        else {
          append = 'th';
        }
        return day+append;
      }

      return days[date.getDay()] + " " + dayNum(date.getDate()) + " " + months[date.getMonth()]; 
    };
      
    return {
      getTeams: getTeams,
      getLeague: getLeague,
      getResult: getResult,
      formatDate: formatDate
    }

}]);