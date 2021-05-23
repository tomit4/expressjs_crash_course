This is a following of Brad Traversy's Express Crash Course on Youtube. I have included additional notes to further facilitate the learning process of understanding Express JS and its utilization with NodeJS to set up a basic web server.
This was somewhat eyeopening for me as I am beginning to understand the states that data is in when sent vs when stored vs when displayed.

I'll defer any notes on how to create this project to the URL of the YouTube Tutorial:

https://www.youtube.com/watch?v=L72fhGm1tfE

Some dependencies that are helpful/required throughout the tutorial are:

npm install nodemon
npm install moment
npm install uuid
npm install express-handlebars

Also within the handlebars files there will be multiple references to bootstrap classes which automates a lot of the CSS styling.  It is helpful in and of itself to understand that the use of handlebars is rendering the website for us from NodeJS/Express, thusly creating a very basic front end with minimal code.

At the end of the video, Traversy recommends using an extension called passport-local for server side passport authentication.  Otherwise, when implementing authentication on the front end, he mentions the use of JSON web tokens in APIs like ReactJS and VueJS.

All in all this was a good enough tutorial to introduce me to the basics.  I plan to watch other tutorials on ExpressJS to really hammer home the essential syntax and concepts before moving on to other extensions/modules based off of or in competition with ExpressJS.
