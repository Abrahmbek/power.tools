
const Definer = require("../lib/mistake");
const assert = require("assert");
const Community = require("../models/Community");



let communityController = module.exports;
communityController.imageInsertion = async (req, res) => {
      try{
     console.log("POST: cont/imageInsertion");   
   assert.ok(req.file, Definer.general_err3);
   const image_url = req.file.path.replace(/\\/g, "/");

    res.json({state: 'succeed', data: image_url});
  }catch(err){
     console.log(`ERORR, cont/imageInsertion ${err.message}`);
     res.json({state: 'fail', message: err.message});
  }
};
communityController.createArticle = async (req, res) => {
      try{
     console.log("POST: cont/createArticle");   
  
   
   const community = new Community();
   const result = await  community.createArticleData(req.member, req.body);
   assert.ok(result, Definer.general_err3);

    res.json({state: 'succeed', data: result});
  }catch(err){
     console.log(`ERORR, cont/createArticle ${err.message}`);
     res.json({state: 'fail', message: err.message});
  }
};

communityController.getMemberArticles = async (req, res) => {
      try{
     console.log("GET: cont/getMemberArticles");   
  
   
   const community = new Community();
   
   const mb_id = req.query.mb_id !== 'none'  ? req.query.mb_id  : req.member?._id;
   assert.ok(mb_id, Definer.article_err1);

    const result = await  community.getMemberArticlesData(req.member, mb_id, req.query);


    res.json({state: 'succeed', data: result});
  }catch(err){
     console.log(`ERORR, cont/getMemberArticles ${err.message}`);
     res.json({state: 'fail', message: err.message});
  }
};

communityController.getArticles = async (req, res) => {
      try{
     console.log("GET: cont/getArticles");   

    const community = new Community();
      const result = await  community.getArticlesData(req.member, req.query);


    res.json({state: 'succeed', data: result});
  }catch(err){
     console.log(`ERORR, cont/getArticles ${err.message}`);
     res.json({state: 'fail', message: err.message});
  }
};

communityController.getChosenArticles = async (req, res) => {
      try{
     console.log("GET: cont/getChosenArticles"); 
     
     const art_id = req.params.art_id;
     console.log("art_id:::", art_id);

    const community = new Community();
      const result = await  community.getChosenArticlesData(req.member, art_id);


    res.json({state: 'succeed', data: result});
  }catch(err){
     console.log(`ERORR, cont/getChosenArticles ${err.message}`);
     res.json({state: 'fail', message: err.message});
  }
};