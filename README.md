# term-project-team-1 ( Tetris )
<h1> Authors </h1>
Jose Ortiz Costa </br>
Leopoldo Rodriguez </br>
Adison Lee </br>
Nikhil Paratkar</br>

<h1> Instructions to test database connection locally </h1>
• Install postgres database in your local computer </br>
• Once postgress is installed it correctly, you can create your username with the terminal command where [new_username] will be replaced by your new username
    
    
    createuser --pwprompt [new_username]
    
• Create a database in your local system called tetrisDB by executing the following command in terminal and replace [my_username] by your new username created above

    createdb -O[my_username] -Eutf8 tetrisDB

• Finally, in the public folder of the repository, there is a folder called sqlSchema that contains a file tetrisDB.sql. Download it to any directory of your local computer
 and in the same directory where your newly downloaded file is located execute those commands in terminal. 
 
     psql -U [my_username] -W tetrisDB
     \i tetrisDB.sql

• Project was updated to use promises with ES6 and express. So, you need to install 'pg-promise' instead of 'pg'. You can also install both.

     npm install pg-promise@3.2.3 --save
     
• I updated the project by making our database API RESTFULL. Run bin/www in the project. Once you run bin/www, the server is started and the database API is loaded.

• You can check if the database API was loaded correctly by using the following url in your browser 

    localhost:3000/dbAPI/users            // users from your database in json format
    localhost:3000/dbAPI/users/3          // user with id 3 from your database in json format
    localhost:3000/dbAPI/lobbies          // lobbies from your database in json format
    localhost:3000/dbAPI/lobbies/2        // lobby with id 2 from your database in json format
    localhost:3000/dbAPI/games            // games from your database in json format
    localhost:3000/dbAPI/games/2          // games with id 2 from your database in json format
    localhost:3000/dbAPI/games/2/lobby    // the lobby corresponding to game with id 2

• For the client part I implemented a example leader board table in the index page to see it run:
 
    localhost:3000       // index page with leader board example table
    
• Since we haven't implemented yet the registration page. You can simulate to register a user by running the following command in your terminal. This will simulate a post request to register a new user

    // create new user
    curl --data "email=myemail@mail.com&name=annoying&password=passwd&score=33" \
    http://localhost:3000/users
    
    
• After it, you should see in the terminal: 

    {
              "status": "success",
              "message": "Inserted one user"
    }
    
• If everything was correct, you should see your new user listed in the leader board table on http://localhost:3000  

• Remember to install socket.io and remember to change the username and password of the global file to yours.
