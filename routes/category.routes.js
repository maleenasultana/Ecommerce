/**
 * This file will contain the routing logic for the catrgory controller
 */
const {requestValidator}= require("../middlewares");
const  categoryController = require("../controllers/category.controller")

module.exports = function(app) {

 //route for the post request to create a category
app.post("/ecomm/api/v1/categories" , [requestValidator.validateCategoryRequest],categoryController.create);

//route for the GET request to fetch all the categories
app.get("/ecomm/api/v1/categories", categoryController.findAll);

//route for the GET request to fetch a category based on category id
app.get("/ecomm/api/v1/categories/:id",categoryController.findOne);

//route for the PUT request to update a category based on id
app.put("/ecomm/api/v1/categories/:id",[requestValidator.validateCategoryRequest],categoryController.update);

//route for the DELETE request to delete a category based on id
app.delete("/ecomm/api/v1/categories/:id",categoryController.delete);
}

