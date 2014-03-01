angular.module('indexControllerModule', ['soccerDashServices', 'firebase', 'ngAnimate'])

.controller('IndexController',
  ['$scope', '$location', '$firebaseSimpleLogin', '$firebase', 'statsfcService',
    function($scope, $location, $firebaseSimpleLogin, $firebase, statsfcService) {

    //Get Firebase members data collection and store it in scope
    var dataRef = new Firebase('https://soccerdashboard.firebaseio.com/members');
    $scope.members = $firebase(dataRef);

    //Firebase/Twitter Authentication
    $scope.loginObj = $firebaseSimpleLogin(dataRef);

    $scope.showLoader = true; //Start the loader in every widget

    //Listening to login
    $scope.$on("$firebaseSimpleLogin:login", function(evt, user) {

      //Load the teams detailed data when user has logged in
      statsfcService.fetchData(getLeagueUrl('premier-league','2013/2014'))
      .then(function(data) {
        $scope.teams = data;
        changeOrdinal($scope);
      });

      //Add current user to the scope
      $scope.user = user;

      //Test if the new user does already exist in the app members
      var userRef = new Firebase('https://soccerdashboard.firebaseio.com/members/' + user['id']);
      //Listen to the 'value' event only once, the event is triggered when async data is received from Firebase
      userRef.once('value', function(snapshot) {
        //If it is a new user, create a firebase member and set its new attribute to true
        if(snapshot.val() === null) {
          //Create a new member
          $scope.members[user['id']] = user;
          $scope.members.$save(user['id']);
          //When a user is new, redirect him to the '/select''
          $scope.showLoader = false; //Stop the loader in every widget
          $location.path("/select");

          //If it is an existing user, get the fav team, set the curr team, get the fav team results and redirect him to '/'
        } else {  
          //The favorite team is based on Firebase snapshop data and inserted in the $scope.user object
          $scope.user.favoriteTeam = snapshot.val().favoriteTeam;
          //The newFavoriteTeam is the variable used when selecting a team in the list
          $scope.newFavoriteTeam = $scope.user.favoriteTeam;
          //Set the current team as the favorite team
          $scope.currentTeam = snapshot.val().favoriteTeam;
          $scope.showLoader = false; //Stop the loader in every widget

          changeOrdinal($scope);

          $scope.favPo = TeamPo[$scope.user.favoriteTeam.team];
          $scope.favPo = TeamPo[$scope.currentTeam.team];

          //When a user already exists, redirect him to the '/''
          $location.path("/");
          $scope.show = true;
        }
      });

    });

    //Listening to logout
    $scope.$on("$firebaseSimpleLogin:logout", function(evt) {
      $location.path("/login"); //When a user is logged out, redirect him to '/login'
    });

    //Listening to authentication error
    $scope.$on("$firebaseSimpleLogin:error", function(err) {
      console.log("Authentication error: " + err);
    });

    //Navigation menu management
    // show / hide for nav
    $scope.selected = false;

    $scope.showNav = function(){
      $scope.selected = true;
    };

    $scope.hideNav = function(){
      $scope.selected = false;
    };

    $scope.selectNewFavoriteTeam = function(team) {
      $scope.newFavoriteTeam = team;
    };

    //Store the favorite team in the user object and in the Firebase member data
    $scope.saveFavoriteTeam = function() {
      $scope.user.favoriteTeam = $scope.newFavoriteTeam;
      $scope.members[$scope.user.id].favoriteTeam = $scope.newFavoriteTeam;
      $scope.members.$save($scope.user.id);
      //Set the current team as the favorite team when logging in the first time and selecting your fav team
      $scope.currentTeam = $scope.newFavoriteTeam;
      $location.path("/"); //When a user selects the team redirect him to '/'
    };

    //Select another current team
    $scope.selectCurrentTeam = function(team) {
      $scope.currentTeam = team;
      changeOrdinal($scope);
    };

}]);
