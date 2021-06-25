const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const guest = require("../app/http/middleware/guest");

function initroutes(app) {
    app.get("/", homeController().index );
    app.get("/cart", cartController().index);
    app.get("/login", guest , authController().login );
    app.get("/register", guest ,authController().register);
    app.post("/update-cart",cartController().update);
    app.post("/postregister",authController().postregister);
    app.post("/postlogin",authController().postlogin);
    app.post("/logout",authController().logout);
}


module.exports = initroutes;