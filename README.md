Digital scoreboard - Hackday 12.04.2024
---------

Simple platform for keeping scores on game nights and similar events. Used as a Live scoreboard during a company event. Built during one day, so expect few hacky things... at least few.

Main functionality:
- User authentication with Login and Register options
- User input score form, where individual users can add, modify and delete scores for each game
- App utilizes Firebase real-time update capabilities, which makes it an excellent dashboard to display on TV
- Score table, sorted by total, automatically scales with each added game
- Photo live feed - each user can upload photos directly from their phone that will be visible on the main dashboard page in the gallery
- Hacky/hardcoded admin that can add games to the dashboard to set everything up during event

---------

Tech details:
App built using Node.js and Material UI. Deployed on Vercel for simplicity. Firebase used for database for live updates. 

Want to use it?
Set up a Firebase and Vercel app. Use next.js deploy on Vercel and submit your keys. Done.
