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

• Now, inside your project, go to public/globals.js, change all the config variables to your own values, and run the file main.js. 
  After running the app, if you see the following output in console, your local copy of this project is connecting correctely to the database: 
  
     User Info:
     { id: 1,
       email: 'joseortizcosta@icloud.com',
       name: 'Jose Ortiz',
       password: 'passwd',
       score: 23 }
  
    
