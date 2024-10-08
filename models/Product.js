const assert = require("assert");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const ProductModel = require("../schema/product.model");
const Definer = require("../lib/mistake");
const Member = require("./Member");


class Product {
      constructor() {
            this.productModel = ProductModel;
      }

    async getAllProductsData(member, data) {
      try {
     
        const auth_mb_id = shapeIntoMongooseObjectId(member?._id);

        let match = {product_status: "PROCESS"};
        if(data.store_mb_id) {
          match['store_mb_id'] =shapeIntoMongooseObjectId(
            data.store_mb_id);
          match['product_collection'] = data.product_collection;

        }
          const sort = 
          data.order === "product_price"
          ? { [data.order]: 1}
          : {[data.order]: -1};

          const result = await this.productModel
          .aggregate([
            { $match: match},
             {$sort: sort}, 
             {$skip:(data.page * 1 - 1) * data.limit},
            { $limit: data.limit * 1},
            ])

          .exec();
           console.log(result);
        assert.ok(result, Definer.general_err1);
        return result;
      } catch(err) {
        throw err
      }
    }
   async getChosenProductData(member, id) {
    try{
    const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
     id = shapeIntoMongooseObjectId(id);

     if(member) {
      const member_obj = new Member();
     await member_obj.viewChosenItemByMember(member, id, "product");
     }

     const result = await this.productModel
     .aggregate([
      { $match: {_id: id, product_status: "PROCESS"}},
       
     ])
     .exec();
     console.log("result:", result);
     assert.ok(result, Definer.general_err1);
     return result[0];
    }catch (err) {
      throw err;
    }
   }


       async  getAllProductsDataStore(member) {
          try {
                member._id = shapeIntoMongooseObjectId(member._id);

                const result = await this.productModel.find({
                      store_mb_id: member._id,
                });
               
                assert.ok(result, Definer.product_err1);
                console.log( "result:::", result);
                return result;
                
          } catch (err) {
                throw err;
        }
      }

    async  addNewProductData(data, member) {
          try {
                data.store_mb_id = shapeIntoMongooseObjectId(member._id);
                console.log(data);

                const new_product = new this.productModel(data);
                const result = await new_product.save();

                assert.ok(result, Definer.product_err1);
                return result;
                
          } catch (err) {
                throw err;
        }
      }

      async  updateChosenProductData(id, updated_data, mb_id) {
          try {
                id = shapeIntoMongooseObjectId(id);
                mb_id = shapeIntoMongooseObjectId(mb_id);
               
                const result = await this.productModel
                      .findOneAndUpdate({ _id: id, store_mb_id: mb_id }, updated_data, {
                            runValidators: true,
                            lean: true,
                            returnDocument: "after",
                      })
                .exec();

                assert.ok(result, Definer.general_err1);
                return result;
                
          } catch (err) {
                throw err;
        }
      }
}

module.exports = Product;