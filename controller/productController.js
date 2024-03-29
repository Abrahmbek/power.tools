const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");


let productController = module.exports;

productController.getAllProducts = async (req, res) =>{
    try{ 
        console.log("POST: cont/getAllProducts"); 
            const product = new Product();
            const result = await product.getAllProductsData(req.member, req.body);       
         res.json({state: 'succeed', data: result});
    }catch(err) {
        console.log(`ERORR, cont/getAllProducts ${err.message}`);
        res.json({state: 'fail', message: err.message});
    }
};


productController.getChosenProducts = async (req, res) =>{
    try{ 
        console.log("GET: cont/getChosenProducts"); 
         const product = new Product(),
           id = req.params.id,
           result = await product.getChosenProductData(req.member, id);       
        
         res.json({state: 'succeed', data: result});
    }catch(err) {
        console.log(`ERORR, cont/getChosenProducts ${err.message}`);
        res.json({state: 'fail', message: err.message});
    }
};
/************************************************
 *           BSSR Related Method       * 
 **********************************************/
productController.addNewProduct = async (req, res) => {
  try {
    console.log("GET cont/addNewProducts");
    assert.ok(req.files, Definer.general_err3);

    const product = new Product();
    let data = req.body;
    
    data.product_images = req.files.map((ele) =>{
            return ele.path.replace(/\\/g, "/");
          });

    const result = product.addNewProductData(data, req.member);
    const html = `<script>
                          alert('new product added successfuly');
                          window.location.replace('/Store/products/menu');
                          </script>`;
         res.end(html);                 
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
