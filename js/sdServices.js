var soccerDashServices = angular.module('soccerDashServices', ['ngResource']);

var cachedResults;
var lastCachedAt;

soccerDashServices.service('statsfcService', 
 ['$http', '$q',
    function($http, $q) {

      var getLeague = function(competition, year) {
        var urlString = 'https://api.statsfc.com/table.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k'+
          '&competition='+ competition + '&year=' + year + '&callback=JSON_CALLBACK';        
        return fetchData(urlString);
      };

      var getResult = function(teamName) {
        var urlString = 'https://api.statsfc.com/results.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k' 
          + '&competition=premier-league&team=' + teamName + '&limit=5&callback=JSON_CALLBACK';
        return fetchData(urlString);
      };

      var getTeamResults = function(teamName) {
        var urlString = 'https://api.statsfc.com/results.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k' 
        + '&competition=premier-league&team=' + teamName + '&year=2013/2014&callback=JSON_CALLBACK';
        return fetchData(urlString);
      };

      //Here we won't use the fetch data function because we implement caching
      var getLeagueResults = function() {
        var urlString = 'https://api.statsfc.com/results.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k' 
          + '&competition=premier-league&from=2013-08-16&callback=JSON_CALLBACK';

        var d = $q.defer();
        var now = new Date();

        //If request done in 12 hours timeframe, provide cached data
        if (cachedResults && (now - lastCachedAt <= 60 * 60 * 12)) {
          d.resolve(cachedResults);
        } else {
          $http.jsonp(url)
          .success(function(data, status, headers) {
            var result = {data: data, cached: false};
            cachedResults = {data: data, cached: true};
            lastCachedAt = new Date();
            d.resolve(result);
          })
          .error(function(data, status, headers) {
            d.reject(data);
          });
        }

        return d.promise;
      };

      var getTeamTopScorers = function(teamName) {
        var urlString = 'https://api.statsfc.com/top-scorers.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k' 
          + '&competition=premier-league&team=' + teamName + '&year=2013/2014&callback=JSON_CALLBACK';
        return fetchData(urlString);
      };

      var fetchData = function(urlString) {
        var url = urlString;  

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
      }

    return {
      getLeague: getLeague,
      getResult: getResult,
      getTeamResults: getTeamResults,
      getLeagueResults: getLeagueResults,
      getTeamTopScorers: getTeamTopScorers
    }
}]);
