# term-project-team-1 ( Tetris )
<h1> Authors </h1>
Jose Ortiz Costa </br>
Leopoldo Rodriguez </br>
Adison Lee </br>
Nikhil </br>

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

• Install pg module used by Node to connect posgres and node: 

     npm install pg
     
• Now, inside your project, go to public/globals.js, change all the config variables to your own values, and run the file main.js. 
  After running the app, if you see the following output in console, your local copy of this project is connecting correctely to the database: <\br>
  
  Content of main.js (this code is show here as a demo, and it is already written on main.js)
  
      /**
       * Created by Jose Ortiz on 10/26/16.
       * File : main.js
       * Description: test file
       */
      
      
      var user = require('./core/User.js');
      
      // Add players to database.
      var player1 = user.newPlayer("Player1", "player1@icloud.com", "passwd1");
      var player2 = user.newPlayer("Player2", "player2@icloud.com", "passwd2");
      player1.register();
      player2.register();
      
      
      // Check if a player already exist.
      var player1 = new user ("player1@icloud.com", "passwd1");
      player1.isRegistered(); // true
      var player2 = new user ("player2@icloud.com", "passwd2");
      player2.isRegistered(); // true
      var player3 = new user ("player3@icloud.com", "passwd3");
      player3.isRegistered(); // false
      
      // Update scores
      player1.updateScore(100);
      player2.updateScore(200);
      
      // Print all players info in JSON format.
      player1.printUserInfo();
      player2.printUserInfo();
     
 
 Output of main.js in console after it is executed.
 
     
     Player1 successfully registered
     Player2 successfully registered
     
     Player1 is already registered
     Player2 is already registered
     Player3 not found
     
     Player1 score was updated from 0 to 100
     Player2 score was updated from 0 to 200
     
     { id: 1,
       email: 'player1@icloud.com',
       name: 'Player1',
       password: 'passwd1',
       score: 100 }
     { id: 2,
       email: 'player2@icloud.com',
       name: 'Player2',
       password: 'passwd2',
       score: 200 }
  
    
