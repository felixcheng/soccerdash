var changeOrdinal = function(scope){
  if (typeof scope.currentTeam.position ===  'number'){
    if (scope.currentTeam.position == 1){
      scope.currentTeam.positionOr = scope.currentTeam.position + "st";
    } else if (scope.currentTeam.position == 2){
      scope.currentTeam.positionOr = scope.currentTeam.position + "nd";
    } else if (scope.currentTeam.position == 3){
      scope.currentTeam.positionOr = scope.currentTeam.position + "rd";
    } else {
      scope.currentTeam.positionOr = scope.currentTeam.position + "th";      
    }      
  }
  console.log('ord', scope.currentTeam.positionOr )
}