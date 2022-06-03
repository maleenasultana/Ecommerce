const express= require('express');
const bodyParser=require('body-parser');
const serverConfig= require('./configs/server.config');


//initialising express
const app = express();

/**
 * Using the bodyparser middleware
 * 
 * used for parsing the request
 * parsing the request of the type json and convert that to object
 */


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

/**
 * initialising the database
 */

const db=require(".models");
const Category = db.category;


db.sequelize.sync({force: true})
.then(()=> {
      console.log('tables dropped and created');
      init();
})


function init(){
      //initializing few catogories
      var categories =[
            {
                  name: "Electronics",
                  description: "This category will contain all the electronic products"
            },
            {
                  name: "KitchenItems",
                  description: "This category will contain all the Kitchen  products"
            }];

      Category.bulkCreate(categories)
      .then(()=> {
            console.log("Category table is initialized");
      })
      .catch(err =>{
        console.log("Error while initializing catogories table");
      })
}

/**
 * Importing the routes and using it
 */

require('./routes/category.routes')(app);

//starting the server

app.listen(serverConfig.PORT, () => {
      console.log(`Application started on the port no : ${serverConfig.PORT}`);
})
