
const db = require("../models");
const Category = db.category;

const ValidateCategoryRequest =(req, res, next) => {
    // if(!req.body.name) {
    //     res.status(400).send({
    //         message: "Name of category can't be empty!"
    //     })
    //   }

     next();
    }
    const ValidateProductRequest =(req, res, next) => {
        if(!req.body.name) {
            res.status(400).send({
                message: "Name of category can't be empty!"
            })
            return;
          }
          if(!req.body.cost) {
            res.status(400).send({
                message: "cost of product can't be empty!"
            })
            return;
          }
    
    if(req.body.categoryId){

        Category.findByPk(req.body.categoryId)
        .then(category=>{
            if(!category){
                res.status(400).send({
                    message: "category id passed is not available"
                })
                return;
            }
             next();
        })
        .catch(err=> {
            res.status(500).send({
                message: "Some internal error while fetching the product details"
            })
        })
    }else{
        res.status(400).send({
            message: "category id was not passed"
        })
        return;
    }
   
}
module.exports = {
    validateCategoryRequest: ValidateCategoryRequest,
    validateProductRequest: ValidateProductRequest,
}