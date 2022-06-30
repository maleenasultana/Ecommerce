
/**
* This file will be used for the following purpose: 
*
* 1. Create the DB connection with the help of sequelize
* 2. Export all the functionalities of the model through the file. 
* 
* One of the advantages of using index.js file is, other file
* trying to import this file, just need to provide the
* module name.
*
*/
const env = process.env.NODE_ENV || 'development';//env==>production,developmentgit ad
const config = require("../configs/db.config")[env];
const Sequelize = require("sequelize");

/**
 * Creating the DB connection
 */
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require('./category.model.js')(sequelize, Sequelize);
db.product = require('./product.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);

/**
   * Establishing the relationship between Role and User
   */
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin"];


module.exports = db;