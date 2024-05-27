const Member = require("../models/Member");
const assert = require("assert");
const Definer = require("../lib/mistake");

let memberController = module.exports;
const jwt = require("jsonwebtoken");

memberController.signup = async (req, res) => {
       try {
         console.log("POST cont/signup");
         const data = req.body,
         member = new Member(),
          new_member = await member.singupData(data);
              const token = memberController.createToken(new_member);
                res.cookie("access_token", token, {
                        maxAge: 6 * 3600,
                        httpOnly: true,
                 });
     
        res.json({state: "succeed", data: new_member});
       }catch(err) {
      console.log("ERROR,  cont/signup");
       res.json({state: "fail", message: err.message});
       }
};
memberController.login = async (req, res) => {
          try {
         console.log("POST cont/login");
         const data = req.body,
          member = new Member(),
          result = await member.loginData(data);
            
                 const token = memberController.createToken(result);
                 res.cookie("access_token", token, {
                        maxAge: 6 * 3600,
                        httpOnly: true,
                 });
        res.json({state: "succeed", data: result});
       }catch(err) {
      console.log("ERROR,  cont/login");
       res.json({state: "fail", message: err.message});
       }
};
memberController.logout = (req, res) => {
    console.log("GET cont/logout");
    res.cookie("access_token", null, {maxAge: 0, httpOnly: true});
   res.json({state: 'succeed', data: "logout successfully!!"});
};

memberController.createToken = (result) => {
       try {
              const upload_data = {
                     _id: result._id,
                     mb_nick: result.mb_nick,
                     mb_type: result.mb_type,
              };
              const token = jwt.sign(upload_data,
                     process.env.SECRET_TOKEN,{
                     expiresIn: "6h",
                     
              });
              assert.ok(token, Definer.auth_err4);
              return token;
       } catch (err) {
              throw err;  
       }
};
memberController.checkMyAuthantication = (req, res) => {

  try{
      console.log("Get cont/checkMyAuthantication");
     let token = req.cookies["access_token"];
         console.log("token:::", token);
    const member = token ?jwt.verify(
      token, 
      process.env.SECRET_TOKEN) : null;
     assert.ok(member, Definer.auth_err2);
     
     res.json({state: 'succeed', data: member});
  
  }catch(err) {
    throw err;
  }
};


memberController.getChosenMember = async  (req, res) => {
    try {
        console.log("GET cont/getChosenMember");
        const id = req.params.id;
        console.log("getchosenmember:", id);
        const member = new Member();
        const result = await member.getChosenMemberData( req.member, id);

        
        res.json({state: 'succeed', data: result });
       }catch (err) {
         console.log(`ERORR, cont/getChosenMember,${err.message}`);
         res.json({state: 'fail', message: err.message});
       }
};



memberController.likeMemberChosen = async  (req, res) => {
    try {
        console.log("GET cont/likeMemberChosen");
       assert.ok(req.member, Definer.auth_err5);

       const member =  new Member(),
        like_ref_id = req.body.like_ref_id,
       group_type = req.body.group_type;

       const result = await member.likeChosenItemMember(
        req.member,
        like_ref_id,
        group_type
       );
        
        res.json({state: 'succeed', data: result });
       }catch (err) {
         console.log(`ERORR, cont/likeMemberChosen,${err.message}`);
         res.json({state: 'fail', message: err.message});
       }
};
memberController.retrieveAuthMember = (req, res, next) => {
  try{
     const token = req.cookies["access_token"];
    req.member = token ?jwt.verify(
      token,  process.env.SECRET_TOKEN) : null;
    next();
  
  }catch(err) {
       console.log(`ERORR, cont/retrieveAuthMember${err.message}`);
    next();
  }
};

memberController.updateMember = async  (req, res) => {
    try {
        console.log("POST cont/updateMember");
       assert.ok(req.member, Definer.auth_err3);

       const member =  new Member();
     const result = await member.updateMemberData(
        req.member?._id,
       req.body, 
       req.file
       );
        
        res.json({state: 'succeed', data: result });
       }catch (err) {
         console.log(`ERORR, cont/updateMember,${err.message}`);
         res.json({state: 'fail', message: err.message});
       }
};
