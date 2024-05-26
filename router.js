const express = require("express");
const router = express.Router();
const memberController = require("./controller/memberController");
const productController = require("./controller/productController");
const StoreController = require("./controller/StoreController");
const orderController = require("./controller/orderController");
const communityController = require('./controller/communityController');
const uploader_community = require('./utils/upload-multer')('community');
const uploader_member = require('./utils/upload-multer')('members');
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

// community releated routers

router.post("/community/image",
uploader_community.single('community_image'),
 communityController.imageInsertion
);


router.post("/community/create",
memberController.retrieveAuthMember,
 communityController.createArticle
);

router.get("/community/articles",
memberController.retrieveAuthMember,
 communityController.getMemberArticles
);

router.get("/community/target",
memberController.retrieveAuthMember,
 communityController.getArticles
);

router.get("/community/single-article/:art_id",
memberController.retrieveAuthMember,
 communityController.getChosenArticles
);

module.exports = router;