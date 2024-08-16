const express = require("express");
const router_bssr = express.Router();
const StoreController = require("./controller/StoreController");
const productController = require("./controller/productController");
const uploader_product = require("./utils/upload-multer")("products");
const uploader_members = require("./utils/upload-multer")("members");
/*******************************
 *      BSSR EJS
 *******************************/
router_bssr.get("/", StoreController.home);

router_bssr
  .get("/sign-up", StoreController.getSignupMyStore)
  .post("/sign-up", uploader_members.single("store_img"), StoreController.signupProcess);

router_bssr
  .get("/login", StoreController.getLoginMyStore)
  .post("/login", StoreController.loginProcess);

router_bssr.get("/logout", StoreController.logout);
router_bssr.get("/check-me", StoreController.checkSessions);

router_bssr.get("/products/menu", StoreController.getMyStoreProducts);
router_bssr.post(
  "/products/create",
  StoreController.validateAuthStore,
uploader_product.array("product_images", 5),
  productController.addNewProduct
);
router_bssr.post("/products/edit/:id",
  StoreController.validateAuthStore,
  productController.updateChosenProduct);

   router_bssr.get(
    "/all-store", 
 StoreController.validateAdmin, 
 StoreController.getAllStore);
 
 router_bssr.post(
    "/all-store/edit", 
 StoreController.validateAdmin, 
 StoreController.updateStoreByAdmin);

module.exports = router_bssr;
