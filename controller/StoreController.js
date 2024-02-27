const assert = require("assert");
const Member = require("../models/Member");
const Product = require("../models/Product");
const Definer = require("../lib/mistake");

let StoreController = module.exports;

StoreController.home = (req, res) => {
  try {
    console.log("GET cont/home");
    
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR,  cont/home, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

StoreController.getMyStoreProducts = async (req, res) => {
  try {
    console.log("GET cont/getMyStoreProducts");
    const product = new Product();
    const data = await product.getAllProductsDataStore(res.locals.member);
    console.log("data", data);
    res.render("store-menu", {store_data: data});
  } catch (err) {
    console.log(`ERROR,  cont/getMyStoreProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

StoreController.getSignupMyStore = async (req, res) => {
  try {
    console.log("GET cont/getSignupMyStore");
    res.render("sign-up");
  } catch (err) {
    console.log(`ERROR,  cont/getSignupMyStore, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

StoreController.signupProcess = async (req, res) => {
  try {
    console.log("POST cont/signup");
    assert(req.file, Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type = "STORE";
    new_member.mb_image = req.file.path;

    const member = new Member();
      const result = await member.singupData(new_member);
   assert(result, Definer.general_err1);

    req.session.member = result;
    res.redirect("/Store/products/menu");

    res.json({ state: "succeed", data: new_member });
  } catch (err) {
    console.log(`ERROR,  cont/signupProcess , ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

StoreController.getLoginMyStore = async (req, res) => {
  try {
    console.log("GET cont/getSignupMyStore");
    res.render("login-page");
     
  } catch (err) {
    console.log(`ERROR,  cont/getLoginMyStore , ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
StoreController.loginProcess = async (req, res) => {
  try {
    console.log("POST cont/loginProcess");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN"
      ? res.redirect("/Store/all-store")
      : res.redirect("/Store/products/menu");
    });
  } catch (err) {
    console.log(`ERROR,  cont/loginProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
StoreController.logout = (req, res) => {
  try {
    console.log("GET cont/logout");
    req.session.destroy(function () {
      res.redirect("/Store");
    });
  } catch (err) {
    console.log(`ERROR,  cont/logout, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
  
};

StoreController.validateAuthStore = (req, res, next) => {
  if (req.session?.member?.mb_type === "STORE") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail",
      message: "only authenticated members with Store type",
    });
};

StoreController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "succeed", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "you are not authenticated" });
  }
};
