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
