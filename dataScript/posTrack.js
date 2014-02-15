var data; http://api.statsfc.com/results.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&year=2013/2014&from2013-09-01&to2014-01-30

var extract = [];
for (var i = 0; i < data.length; i++){ //data.length
	var short = {};
	short.date = data[i].date;
	short.away = data[i].away;
	short.home = data[i].home;
	short.fulltime = data[i].fulltime;
	extract.push(short);
}

// need to fill it with num:date
var dateRange={0:"2013-08-17 00:00:00",
							1:"2013-08-25 00:00:00",
							2:"2013-09-01 00:00:00",
							3:"2013-09-08 00:00:00",
							4:"2013-09-15 00:00:00",
							5:"2013-09-22 00:00:00",
							6:"2013-09-29 00:00:00",
							7:"2013-10-06 00:00:00",
							8:"2013-10-13 00:00:00",
							9:"2013-10-20 00:00:00",
							10:"2013-10-27 00:00:00",
							11:"2013-11-03 00:00:00",
							12:"2013-11-10 00:00:00",
							13:"2013-11-17 00:00:00",
							14:"2013-11-24 00:00:00",
							15:"2013-12-01 00:00:00",
							16:"2013-12-08 00:00:00",
							17:"2013-12-15 00:00:00",
							18:"2013-12-22 00:00:00",
							19:"2013-12-29 00:00:00",
							20:"2014-01-05 00:00:00",
							21:"2014-01-12 00:00:00",
							22:"2014-01-19 00:00:00",
							23:"2014-01-26 00:00:00",
							24:"2014-02-02 00:00:00",
							25:"2014-02-09 00:00:00",
							26:"2014-02-16 00:00:00",
							27:"2014-02-23 00:00:00",
						};

var teams=['Arsenal',
    'Aston Villa',
    'Cardiff City',
    'Chelsea',
    'Crystal Palace',
    'Everton', 
    'Fulham',
    'Hull City',
    'Liverpool', 
     'Manchester City', 
     'Manchester United', 
    'Newcastle United',
    'Norwich City', 
    'Southampton', 
    'Stoke City', 
    'Sunderland', 
    'Swansea City', 
    'Tottenham Hotspur', 
    'West Bromwich Albion', 
    'West Ham United'];

var result = {};

for (var i = 0; i < teams.length; i++) {
	result[teams[i]] ={};
	var week = 0;
	for (var n in dateRange){
		result[teams[i]][week]=0;
		week++
	}
}

for (var n = 0; n < extract.length; n++){
  var con = true;
	var count = 0;
	while(con){
		if ((extract[n].date > dateRange[count]) && (extract[n].date < dateRange[count+1])){
			if (extract[n].fulltime[0] < extract[n].fulltime[1]){
				result[extract[n].away][count] +=3;
			} else if (extract[n].fulltime[0] > extract[n].fulltime[1]){
				result[extract[n].home][count] +=3;
			} else {
				result[extract[n].away][count]++
				result[extract[n].home][count]++
			}
			con= false;
		}
		count++;

	}
};

for (var n in result){
	for (var i = 1; i < 27; i++) {
		result[n][i]+=result[n][i-1];
	};
}

var teamPo ={};

for (var i = 0; i < teams.length; i++) {
	teamPo[teams[i]] = [];
};

var po = {};

for (var n in dateRange) {
	po[n]= [];

	for (var team in result){
		var temp = {};
		temp.teamName = team;
		temp.points = result[team][n];
		po[n].push(temp);
	}

	po[n].sort(function(a,b){
	  if (a.points > b.points)
	    return -1;
	  if (a.points < b.points)
	    return 1;
	  return 0;
	});

	for (var i = 0; i < po[n].length; i++) {
		po[n][i].position = i+1;
		teamPo[po[n][i].teamName][n]= i+1;
	};
};

