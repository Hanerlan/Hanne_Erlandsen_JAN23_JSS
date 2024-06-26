# Meme Central

## Description
This is a Meme web application with a Meme Overview page, displaying a table populated with 100x unique memes. The website also has a login system and a navigation bar. Logged in users are able to access a Meme Details page through the meme table, where the user can see more information about the chosen meme. Guest users will only be able to see the list of memes in the table. 

- **Navbar**: The navbar includes the companies logo, the "Login" or "Logout" button (dependant on the users current status), the relevant user name ("Guest" if not logged in). When the navbar logo is clicked, the user will be redirected to the **Meme Overview Page**. 

- **Meme Overview Page**: An API call is made when the web application initially loads, storing the result in an object. This object is used to populate the table with the 100x memes. A new singular API call will not be made unless the server is restarted and the web app is reopened. Both logged in and guest users will be able to access this page, but only the logged in users will see the "Details" button that opens the **Meme Details page**. For the user to keep track of what memes they have viewed, once the "Details" button has been clicked, the background color of that table row will change. This will stay changed even if the Memes Overview page is refreshed. 

The table also has a search functionality, where the user can input text and click on the "Search" button. This will find memes with the name that matches the search input text, only displaying the matching result in the table. To remove the search, the user must empty the input field and click on the search button again. This will repopulate the table with the original 100x memes, without making a new API call. 

- **Meme Details Page**: Displays information about the meme, such as ID, URL, Image, name, and dimensions (width, height). Only logged in users will be able to access this page. If a guest user enters the URL of a meme and tries to access the details, they will be redirected to the login page. 

- **Login page**: Clicking the "login" button in the navbar will navigate the user to the login page, as long as they are not already logged in. Users log in by entering their usersname and password. 

## Installation
1. Clone the repository 
```
git clone https://github.com/Hanerlan/Hanne_Erlandsen_JAN23_JSS.git
```
2. Navigate to the project directory
```
cd /path/to/Hanne_Erlandsen_JAN23_JSS
```
3. Install the dependencies
```
npm install
```
4. Start the server
```
npm start
```

This will start the server and the application will be accessible at http://localhost:3000/ in your browser. 

### External libraries
The project has been built using external libraries, such as Bootstrap (version 5.2.3), jQuery, Axios, EJS, PassportJS, Express-session, JSON store.

These dependencies are automatically installed when you run command "npm install" in your project directory. 

## Author
This project was developed by [Hanne Erlandsen](https://github.com/Hanerlan)