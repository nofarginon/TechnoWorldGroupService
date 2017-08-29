const mongoose=require('mongoose');
let user=require('../models/userSchema').User,
    Logger = require('../logger'),
    userLogger = Logger('User_Controller');

/**
 * Adding new User to DB
 * @param req body parameters
 *          name : String
 *          username : String
 *          password : String
 *          email : String
 *          bday : String
 * @param res
 */
exports.login = function (req, res) {
  let newUser=new user({
    name :req.body.name,
    username:req.body.username,
    password: req.body.password,
    email:req.body.email,
    bday:req.body.bday
  });
  newUser.save(
    (err)=>{
      if(err){
          userLogger('err:${err}');
          res.json({error:'could not add a new user'});
      }
      else{
          userLogger('Success : User Added');
          res.json({success:true});
      }

    });
};

