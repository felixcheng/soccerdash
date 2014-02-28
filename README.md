#SoccerDash

##Description:

SoccerDash is a simple dashboard app to show stats for your favourite English Premier League football (soccer) club.

Users can select their favourite team after logging in with Twitter and will be presented with a dashboard of stats. Hovering on the username will open the team menu and a new team can be selected. The position chart will update and overlay a comparision between the newly selected team and the favourite team.
The favourite team can be changed by selecting My Profile from the main menu.    

##Link to Deployed Version

[Click Here!](https://soccerdashboard.firebaseapp.com)

##Screenshot

![Dashboard](/img/soccerdash.png)

## The Tech Stack

- AngularJS
- D3
- dimple.js
- jQuery
- Firebase
- [StatsFC JSON API](https://statsfc.com/docs/api)

## Challenges

- Making our code as modular as possible. We started with an Angular-Seed file structure but refactored to a functional file structure to cope with issues caused by scaling. 
The Angular-Seed structure moved us towards having a single large controller with many lines of code that became unwieldy.   
- Overcoming multiple asynchronous calls to a RESTful API by implementing Angular promises.  
- Creating a layout that would appear as a single non-scrollable page on multiple desktop screen sizes. 
This was handled by using the CSS3 'vh' unit of measurement for any container heights that needed to be set explicitly. 


<!-- A map of your codebase, and if appropriate, instructions on how to dive in and read the code. -->
