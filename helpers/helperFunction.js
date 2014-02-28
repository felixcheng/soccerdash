//Convert number to ordinal number
var changeOrdinal = function(scope){
  if (typeof scope.currentTeam.position ===  'number'){
    scope.currentTeam.positionOr = convertNum(scope.currentTeam.position);            
  }
}

var convertNum = function(num){
  if(num === 1 || num === 21 || num === 31) {
    num = num + 'st';
  }
  else if(num === 2 || num === 22) {
    num = num + 'nd';
  }
  else if(num === 3 || num === 23) {
    num = num + 'rd';
  }
  else {
    num = num + 'th';
  }
  return num;  
}

//Format the ISO dates received by the API
var formatDate = function(isoString) {
  var date = new Date(isoString);
  var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
                  
  return days[date.getDay()] + " " + convertNum(date.getDate()) + " " + months[date.getMonth()]; 
};
