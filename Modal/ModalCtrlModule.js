angular.module('ModalCtrlModule', ['soccerDashServices', 'firebase', 'ngAnimate'])

.controller('ModalCtrl',
  ['$scope',function($scope) {
	  $scope.modalShown= false;
	  $scope.toggleModal = function(){
	    $scope.modalShown = !$scope.modalShown;
	  };
  }]
)

soccerDashControllers.controller('ModalCtrl', ['$scope',
  function($scope) {

  $scope.modalShown= false;
  $scope.toggleModal = function(){
    $scope.modalShown = !$scope.modalShown;
  };

}]);