const controller = require("../controllers/auth.controller");
const {verifySignUp} = require("../middleware");



module.exports = function(app) {
    

    app.post("/ecomm/api/v1/auth/signup", [verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRoleExisted] ,controller.signup);
    app.post("/ecomm/api/v1/auth/signin", controller.signin);
};