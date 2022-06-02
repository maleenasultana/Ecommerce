/**
 * this file will be used to represent the category schema
 * 
 * category fields:
 * 1.id
 * 2.name
 * 3.description
 */
const {sequelize, Sequelize}=require(".");

module.exports=(sequelize,Sequelize)=>{

const Category = Sequelize.define("category",{
      id: {
            type:Sequelize.INTEGER,
            primarykey: true,
            autoIncrement:true
      },
      name: {
            type: Sequelize.STRING,
            allowNull: false
      },
      description: {
            type: Sequelize.STRING
      }
   });
 return Category;
}