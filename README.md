# NodeReactApp

How the app works:

In this website you can search for a PUBG player's ingame statistics by 
writing their ingame nickname inside the search bar and clicking search. 

The front-end sends the nickname written in the search bar to the backend. The backend
makes a PUBG API request with the given nickname. The backend server waits for the PUBG API response and then
does some data parsing and sends the result back to the front-end in JSON format. The front-end displays
the result by showing player's statistics, or by informing that statistics couldn't be found (No player match for nickname or
no recent matches played).

This app was made solely for learning purposes and has a lot of things to improve on. The website was made with
create-react-app and it was my first time using React. I also still have a lot to learn about backend programming.


Setting up and running the project:

1. Install Node modules for /backend and /myapp
2. To start the backend, run /Backend/app.js file with "node app.js"
3. To start the React front-end, run "npm start" command in /my-app folder



