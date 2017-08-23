const mongoose=require('mongoose');
var user=require('../models/userSchema').User;

exports.login = function (req, res) {
  var newUser=new user({
    name :req.body.name,
    username:req.body.username,
    password: req.body.password,
    email:req.body.email,
    bday:req.body.bday
  });
  newUser.save(
    (err)=>{
      if(err){
        console.log('err:${err}');
        res.json({error:'couldnot add a new user'});
      }
      else{
        console.log('saved user');
        res.json({success:true});
      }

    });
}

