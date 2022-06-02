/**
 * this file contains the controller logic for the category
 * resource.
 * Everytime a CRUD request come for the category, method define
 * in this controller file will be executed.
 */

//const { category } = require("../models");

const db = require("../models");
const Category = db.category;

/**
 * create and save a new category 
 */
exports.create=(req,res)=>{
      /**
       * validation of request body
       */
      if(!req.body.name){
            res.status(400).send( {
                  message:"Name of the category can't be empty!"
            })
            return ;
      }
      /**
       * creation of the category  object  to be stored in the db.
       */
      const category = {
            name: req.body.name,
            description: req.body.description
      };
      Category.create(category)
      .then(category=>{
            console.log(`category name: [$category.name]got inserted`);
            res.status(201).send(category);

      })
      .catch(err =>{
            console.log(`Issue in inserting category name: [${category}]`)
            console.log(`Error Message : ${err.message}`)
            res.status(500).send({
                  message:"Some internal error while storing the category"
            })
      })
}
/**
 * get a list of all the catogories
 */

exports.findAll= (req,res)=>{
      let categoryName= req.query.name;
      let promise;
      if(categoryName){
            promise= Category.findAll({
                  where:{
                        name:categoryName
                  }
            });
      }else{
            promise =CategoryfindAll();
      }
      promise
      .then(categories=>{
            res.status(200).send(categories);
      })
      .catch(err=>{
            res.status(500).send({
                  message: "Some internal error while fetching the category"
            })
      })
}
/**
 * get a category based on the category id
 */
exports.findOne=(req,res)=>{
      const categoryId= req.params.id;//1

      Category.findByPk(categoryId)
      .then(category => {
            res.status(200).send(category);
      })
      .catch(err =>{
            res.status(500).send ({
                  message :"Some internal error while fetching the category based on id"
            })
      })
}
/**
 * update the existing category
 */

exports.update = (req,res) => {
      const category = {
            name: req.body.name,
            description: req.body.description
      };
      const categoryId= req.params.id

      Category.update(category,{
            where: {id: categoryId}
      })
      .then(updatedCategory =>{
       /**
        * where the updation has done successfully.
        * you need to send the updated row to the table.
        * but while fetching  that row and sending it to user
        * there can be an error.
        */
            Category.findByPk(categoryId)
            .then(category => {
                  res.status(200).send(category);
            })
            .catch(err =>{
                  res.status(500).send({
                        message:"Some internal error while updating the category based on id"
                  })
           })
      })
      .catch(err =>{
            //where the updation task failed.
            res.status(500).send({
                  message: "Some internal error while updating the category "
            })
      })
}

