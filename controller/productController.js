const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");


let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log("GET cont/getAllProducts");
  } catch (err) {
    console.log(`ERROR,  cont/getAllProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.addNewProduct = async (req, res) => {
  try {
    console.log("GET cont/addNewProducts");
    assert.ok(req.files, Definer.general_err3);

    const product = new Product();
    let data = req.body;
    
    data.product_images = req.files.map((ele) => {
      return ele.path;
    });

    const result = product.addNewProductData(data, req.member);
    assert.ok(result, Definer.product_err1);

    res.send("ok");
  } catch (err) {
    console.log(`ERROR,  cont/addNewProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.updateChosenProduct = async (req, res) => {
  try {
    console.log("GET cont/updateChosenProducts");
    const product = new Product();
    const id = req.params.id;
    const result = await product.updateChosenProductData(
      id,
      req.body,
      req.member._id
    );

    await res.json({ state: "success", data: result });

  } catch (err) {
    console.log(`ERROR,  cont/updateChosenProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
