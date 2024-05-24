const express = require("express");
const router = express.Router();
const memberController = require("./controller/memberController");
const productController = require("./controller/productController");
const StoreController = require("./controller/StoreController");
const orderController = require("./controller/orderController");

/*******************************
 *      REST API
 *******************************/

router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthantication);


router.get("/member/:id",
memberController.retrieveAuthMember,
      memberController.getChosenMember);

      //other routers
router.post("/products",
memberController.retrieveAuthMember,
productController.getAllProducts);

router.get("/products/:id",
memberController.retrieveAuthMember,
productController.getChosenProducts
);
 
//  Stores related routers
router.get("/stores",
      memberController.retrieveAuthMember,
      StoreController.getStores
);
 router.get("/stores/:id",
memberController.retrieveAuthMember,       
StoreController.getChosenStore
 );


  //Order related routers

 router.post("/orders/create",
memberController.retrieveAuthMember,
orderController.createOrder
);

router.get("/orders",
memberController.retrieveAuthMember,
orderController.getMyOrders
);

router.post("/orders/edit",
memberController.retrieveAuthMember,
orderController.editChosenOrder
);


module.exports = router;