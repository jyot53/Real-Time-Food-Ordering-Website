const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const adminController = require("../app/http/controllers/admin/orderController");
//Middlewares
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");
const admin = require("../app/http/middleware/admin");

function initroutes(app) {
    app.get("/", homeController().index );
    app.get("/cart", cartController().index);
    app.get("/login", guest , authController().login );
    app.get("/register", guest ,authController().register);
    app.post("/update-cart",cartController().update);
    app.post("/postregister",authController().postregister);
    app.post("/postlogin",authController().postlogin);
    app.post("/logout",authController().logout);
    app.post("/orders",auth,orderController().store);
    app.get("/customer/orders",auth,orderController().index);

    //admin routes
    app.get("/admin/orders",admin,adminController().index);
}


module.exports = initroutes;