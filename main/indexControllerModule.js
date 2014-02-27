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

      console.log("User " + user.id + " successfully logged in!");

      //Load the teams detailed data when user has logged in
      statsfcService.getLeague('premier-league','2013/2014')
      .then(function(data) {
        $scope.teams = data;
        $scope.showLoader = false; //Stop the loader in every widget
      });

      //Add current user to the scope
      $scope.user = user;

      //Test if the new user does already exist in the app members
      var userRef = new Firebase('https://soccerdashboard.firebaseio.com/members/' + user['id']);
      //Listen to the 'value' event only once, the event is triggered when async data is received from Firebase
      userRef.once('value', function(snapshot) {
        //If it is a new user, create a firebase member and set its new attribute to true
        //The new attribute will be used to decide if the 'Select a fav team' pop up must be displayed
        if(snapshot.val() === null) {
          console.log('User ' + user['id'] + ' does not exist.');
          //Create a new member
          $scope.members[user['id']] = user;
          $scope.members.$save(user['id']);
          //When a user is new, redirect him to the '/select''
          $location.path("/select");
          //If it is an existing user, get the fav team, set the curr team, get the fav team results and redirect him to '/'
        } else {  
          console.log('The user does already exists:' + user['id']);
          //The favorite team is based on Firebase snapshop data and inserted in the $scope.user object
          $scope.user.favoriteTeam = snapshot.val().favoriteTeam;
          //The newFavoriteTeam is the variable used when selecting a team in the list
          $scope.newFavoriteTeam = $scope.user.favoriteTeam;
          //Set the current team as the favorite team
          $scope.currentTeam = snapshot.val().favoriteTeam;

          // $scope.position = $scope.currentTeam.position;
          changeOrdinal($scope);

          $scope.favPo = TeamPo[$scope.user.favoriteTeam.team];
          $scope.favPo = TeamPo[$scope.currentTeam.team];

          //When a user already exists, redirect him to the '/''
          $location.path("/");
          $scope.show = true;
        }
        //$scope.$broadcast('loaded', $scope.currentTeam)
      });

    });

    //Listening to logout
    $scope.$on("$firebaseSimpleLogin:logout", function(evt) {
      console.log("User logged out!");
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
      console.log('team selected!', team);
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

      if ($scope.currentTeam.position == 1){
        $scope.currentTeam.position = $scope.currentTeam.position + "st"
      } else if ($scope.currentTeam.position == 2){
        $scope.currentTeam.position = $scope.currentTeam.position + "nd"
      } else if ($scope.currentTeam.position == 3){
        $scope.currentTeam.position = $scope.currentTeam.position + "rd"
      } else {
        $scope.currentTeam.position = $scope.currentTeam.position + "th"       
      }
    };

}]);
